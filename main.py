import os
import uuid
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field
import cv2
import numpy as np

# Requisitos de dependencias:
# pip install fastapi uvicorn opencv-python supabase pydantic python-dotenv

# Intentar cargar variables de entorno desde archivo .env si existe
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

app = FastAPI(
    title="Earth Jukebox API - NASA SVS 5196 (Fase 3)",
    description="API con análisis de visión por computador (OpenCV) y persistencia en Supabase.",
    version="3.0.0"
)

# ---------------------------------------------------------------------------
# CONFIGURACIÓN DEL CLIENTE SUPABASE
# ---------------------------------------------------------------------------
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

supabase_client = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        from supabase import create_client, Client
        supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("✓ Cliente Supabase inicializado correctamente con credenciales.")
    except Exception as e:
        print(f"⚠️ Advertencia al conectar con Supabase: {e}")
else:
    print("ℹ️ SUPABASE_URL o SUPABASE_KEY no configuradas en el entorno. Modo fallback en memoria activo.")

# Almacenamiento en memoria como respaldo resiliente si Supabase aún no está configurado
memory_sonifications: List[Dict[str, Any]] = [
    {
        "id": "demo-svs-01",
        "user_label": "Corrientes del Pacífico Sur (Demo)",
        "base_frequency": 130.81,
        "tempo": 96,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "demo-svs-02",
        "user_label": "Remolinos de CO2 Atmosférico",
        "base_frequency": 164.81,
        "tempo": 120,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
]


# ---------------------------------------------------------------------------
# MODELOS DE DATOS PYDANTIC
# ---------------------------------------------------------------------------
class SonificationCreate(BaseModel):
    user_label: str = Field(..., min_length=2, max_length=100, description="Nombre de la pista")
    base_frequency: float = Field(..., gt=20.0, lt=20000.0, description="Frecuencia fundamental en Hz")
    tempo: int = Field(..., ge=40, le=240, description="Tempo en BPM")

class SonificationResponse(BaseModel):
    id: str
    user_label: str
    base_frequency: float
    tempo: int
    created_at: str


# ---------------------------------------------------------------------------
# ENDPOINTS RESTful
# ---------------------------------------------------------------------------
@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "Earth Jukebox API",
        "phase": 3,
        "supabase_connected": supabase_client is not None,
        "opencv_version": cv2.__version__
    }


@app.get("/api/analyze")
def analyze_frame():
    """
    Lee assets/nasa_frame.png usando OpenCV:
    1. Convierte a escala de grises.
    2. Aplica filtro gaussiano y umbralización (Thresholding / Otsu).
    3. Extrae contornos de densidad oceánica/atmosférica y calcula momentos y pesos.
    4. Devuelve la densidad global, tempo recomendado y coordenadas de remolinos/zonas.
    """
    image_path = os.path.join("assets", "nasa_frame.png")
    if not os.path.exists(image_path):
        raise HTTPException(
            status_code=404,
            detail="Fotograma 'assets/nasa_frame.png' no encontrado. Verifica la ruta."
        )

    # Cargar imagen en BGR
    img = cv2.imread(image_path)
    if img is None:
        raise HTTPException(status_code=500, detail="Error decodificando la imagen con OpenCV.")

    h, w, _ = img.shape

    # 1. Escala de grises y desenfoque para reducir ruido de alta frecuencia
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (7, 7), 0)

    # 2. Thresholding: Umbralización adaptativa/Otsu para aislar plumas y remolinos densos
    otsu_val, thresh = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    # 3. Detección de contornos de zonas densas
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    zones = []
    total_area = w * h

    for cnt in contours:
        area = cv2.contourArea(cnt)
        if area > 100:  # Filtrar ruido espurio menor a 100px
            M = cv2.moments(cnt)
            if M["m00"] != 0:
                cx = int(M["m10"] / M["m00"])
                cy = int(M["m01"] / M["m00"])

                # Obtener radio envolvente mínimo para visualización
                (_, _), radius = cv2.minEnclosingCircle(cnt)

                weight = float(area / total_area)
                zones.append({
                    "x": cx,
                    "y": cy,
                    "norm_x": round(cx / w, 4),
                    "norm_y": round(cy / h, 4),
                    "radius": round(float(radius), 2),
                    "area": round(float(area), 2),
                    "weight": round(weight, 5)
                })

    # Ordenar por importancia de área y limitar a las 20 zonas más relevantes
    zones = sorted(zones, key=lambda z: z["area"], reverse=True)[:20]

    # Calcular densidad global (proporción de píxeles activos frente a fondo cósmico)
    non_zero_pixels = cv2.countNonZero(thresh)
    overall_density = round(float(non_zero_pixels / total_area), 4)

    # Mapeo algorítmico a parámetros musicales iniciales:
    # A mayor densidad de masa y turbulencia, tempo más ágil y mayor frecuencia base
    recommended_tempo = int(72 + (overall_density * 90))
    recommended_tempo = max(60, min(160, recommended_tempo))

    # Frecuencia base sugerida: C3 (130.81 Hz) a Eb3 (155.56 Hz)
    recommended_base_freq = round(130.81 + (overall_density * 80.0), 2)

    return {
        "status": "success",
        "dataset": "NASA SVS 5196",
        "dimensions": {"width": w, "height": h},
        "threshold_used": float(otsu_val),
        "overall_density": overall_density,
        "recommended_tempo": recommended_tempo,
        "recommended_base_freq": recommended_base_freq,
        "total_zones": len(zones),
        "zones": zones
    }


@app.get("/api/sonifications", response_model=List[SonificationResponse])
def get_sonifications():
    """
    Obtiene las pistas y sesiones de sonificación guardadas en Supabase (o respaldo en memoria).
    """
    if supabase_client is not None:
        try:
            res = supabase_client.table("sonifications").select("*").order("created_at", desc=True).limit(30).execute()
            return res.data
        except Exception as e:
            print(f"Error consultando Supabase, usando respaldo: {e}")
            return memory_sonifications
    return memory_sonifications


@app.post("/api/sonifications", response_model=SonificationResponse, status_code=201)
def create_sonification(payload: SonificationCreate):
    """
    Inserta un nuevo registro de sonificación en la tabla 'sonifications' de Supabase.
    Campos: id, user_label, base_frequency, tempo, created_at.
    """
    new_record = {
        "id": str(uuid.uuid4()),
        "user_label": payload.user_label.strip(),
        "base_frequency": round(payload.base_frequency, 2),
        "tempo": payload.tempo,
        "created_at": datetime.now(timezone.utc).isoformat()
    }

    if supabase_client is not None:
        try:
            res = supabase_client.table("sonifications").insert(new_record).execute()
            if res.data and len(res.data) > 0:
                return res.data[0]
            return new_record
        except Exception as e:
            print(f"Error insertando en Supabase, guardando en respaldo local: {e}")
            memory_sonifications.insert(0, new_record)
            return new_record
    else:
        # Modo en memoria si no hay credenciales configuradas
        memory_sonifications.insert(0, new_record)
        return new_record


# ---------------------------------------------------------------------------
# ARCHIVOS ESTÁTICOS Y ENRUTAMIENTO FRONTEND
# ---------------------------------------------------------------------------
if os.path.exists("assets"):
    app.mount("/assets", StaticFiles(directory="assets"), name="assets")

if os.path.exists("frontend"):
    app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
else:
    @app.get("/")
    def index_fallback():
        return {"message": "Directorio 'frontend' no encontrado."}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
