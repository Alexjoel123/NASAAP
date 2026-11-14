/**
 * ============================================================================
 * EARTH JUKEBOX - ARQUITECTURA DUAL THREE.JS (Hero Visual + Jukebox Interactivo)
 * ============================================================================
 * 1. initHeroEarth(): Modelo puramente visual para la cabecera (#hero-3d)
 * 2. initJukeboxEarth(): Consola interactiva (#view-3d) con CanvasTexture,
 *    pintura térmica en tiempo real, Raycaster, Tone.js y grabación de audio.
 */

// ---------------------------------------------------------------------------
// DICCIONARIO BILINGÜE COMPLETO (i18n: ES / EN)
// ---------------------------------------------------------------------------
const translations = {
    es: {
        hero_badge: "Desafío NASA Space Apps 2026",
        hero_title: "Earth Jukebox",
        hero_subtitle: "Sonificación de Datos Planetarios en Tiempo Real (SVS 5196)",
        hero_summary: "Transformando la ciencia visual en una experiencia auditiva. El Centro de Información de la Tierra (EIC) rastrea nuestro planeta mediante visualizaciones. Este proyecto traduce esos datos en sonido en tiempo real, creando un entorno multisensorial accesible para usuarios ciegos y con baja visión, conectando el impacto climático a través de acordes y ritmos.",
        hero_btn_sonification: "Iniciar Sonificación",
        hero_scroll_prompt: "Explora la Sonificación",
        about_pretitle: "DESAFÍO NASA SPACE APPS 2026",
        about_title: "El Arte y la Ciencia de Escuchar Nuestro Planeta",
        about_lead: "Una experiencia multisensorial diseñada para transformar observaciones satelitales complejas del Centro de Información de la Tierra (EIC) en composiciones acústicas accesibles y significativas.",
        card1_category: "01 · ANTECEDENTES",
        card1_title: "El Problema",
        card1_desc: "Tradicionalmente, las ciencias de la Tierra han dependido casi en su totalidad de la vista. Esta barrera visual limita la accesibilidad universal para personas ciegas o con baja visión y restringe la comprensión pública de dinámicas climáticas complejas. La sonificación cierra esta brecha, democratizando el acceso a los datos de la NASA mediante la audición.",
        card1_pill: "Barrera Visual ➔ Inclusión Sonora",
        card2_category: "02 · JUKEBOX CONCEPT",
        card2_title: "El Objetivo",
        card2_desc: "Crear una experiencia inmersiva e interactiva donde los usuarios exploren diferentes visualizaciones globales del Earth Information Center (EIC). Al pintar temperatura sobre el modelo 3D, el sistema genera paisajes sonoros dinámicos en tiempo real, transformando el monitoreo satelital en un instrumento musical vivo.",
        card2_pill: "Simulación Planetaria 3D",
        card3_category: "03 · ALGORITMO SÓNICO",
        card3_title: "La Traducción",
        card3_desc: "Mapeo algorítmico armónico y ambiental: las manchas frías generan acordes menores extendidos y profundos, mientras las plumas cálidas despliegan acordes mayores con novena. La reverberación espacial y la compresión evitan saturaciones acústicas.",
        card3_pill: "Temperatura ➔ Armonía Pad FM",
        about_btn_access: "Acceder a la Consola de Audio",
        app_title: "EARTH JUKEBOX",
        app_subtitle: "Sonificación Global de Datos Atmosféricos",
        btn_audio_init: "Iniciar Audio",
        btn_audio_active: "Audio Activo",
        btn_scan_start: "Rotación",
        btn_scan_pause: "Pausar",
        speed_label: "Velocidad",
        speed_hint: "Velocidad de rotación de la Tierra",
        music_style_label: "Estilo Musical",
        music_scale_label: "Escala Musical",
        brush_type_label: "Pincel Térmico:",
        brush_size_label: "Tamaño del Pincel:",
        record_btn_start: "🔴 Grabar Audio",
        record_btn_stop: "⏹ Deteniendo...",
        audio_disconnected: "Audio Off",
        audio_connected: "Audio Listo",
        scanning_active: "Rotando...",
        scanning_paused: "En pausa",
        hud_x: "COORD UV",
        hud_lum: "TEMPERATURA",
        hud_pan: "PAN / SEC",
        hud_note: "ACORDE",
        access_title: "NARRACIÓN ACCESIBLE (ARIA-LIVE)",
        narrator_default: "Pulsa 'Iniciar Audio' y haz clic en el globo para pintar temperatura y generar sonido.",
        narrator_audio_ready: "Motor de audio conectado y masterizado. Haz clic sobre la Tierra para pintar temperatura.",
        narrator_recording_started: "Grabación de audio masterizado iniciada.",
        narrator_recording_stopped: "Grabación finalizada. Descargando earth_jukebox_3d.webm.",
        ecco2_legend_title: "Leyenda: Qué Significa Cada Sonido",
        ecco2_legend_desc: "Haz clic para escuchar la escala. Las notas se distribuyen entre los momentos más fríos y cálidos del año.",
        ecco2_btn_low: "Nota baja: más frío",
        ecco2_btn_mid: "Nota media",
        ecco2_btn_high: "Nota alta: más cálido",
        ecco2_legend_pulse: "El pulso grave es más rápido cuando hay más agua a 25 °C o más.",
        ecco2_how_title: "Cómo se convierte la imagen a sonido",
        ecco2_how_1: "1. En cada fotograma, se ignoran la tierra, el fondo y las líneas blancas.",
        ecco2_how_2: "2. El color de cada píxel se convierte a temperatura usando la barra de la NASA (azul 0 °C, verde 10 a 20 °C, amarillo ~25 °C, rojo 32 °C).",
        ecco2_how_3: "3. El promedio de las mitades norte y sur del mapa se calcula por separado.",
        ecco2_how_4: "4. Cada promedio se distribuye entre 13 notas de una escala pentatónica.",
        ecco2_how_5: "5. El porcentaje de agua a 25 °C o más controla la velocidad del pulso.",
        ecco2_how_adj_title: "Escala ajustada:",
        ecco2_how_adj_desc: "La temperatura promedio de un hemisferio cambia solo unos grados al año. Para hacer la diferencia audible, las notas se distribuyen entre los valores mínimo y máximo del video. Los grados mostrados son los valores reales estimados."
    },
    en: {
        hero_badge: "NASA Space Apps Challenge 2026",
        hero_title: "Earth Jukebox",
        hero_subtitle: "Real-Time Planetary Data Sonification (SVS 5196)",
        hero_summary: "Transforming visual science into an auditory experience. The Earth Information Center (EIC) tracks our planet through visualizations. This project translates that data into sound in real time, creating an accessible multisensory environment for blind and low-vision users, connecting climate impact through chords and rhythms.",
        hero_btn_sonification: "Start Sonification",
        hero_scroll_prompt: "Explore Sonification",
        about_pretitle: "NASA SPACE APPS CHALLENGE 2026",
        about_title: "The Art and Science of Listening to Our Planet",
        about_lead: "A multisensory experience designed to transform complex satellite observations from the Earth Information Center (EIC) into accessible, meaningful acoustic compositions.",
        card1_category: "01 · BACKGROUND",
        card1_title: "The Problem",
        card1_desc: "Traditionally, Earth sciences have relied almost entirely on vision. This visual barrier limits universal accessibility for blind or low-vision people and restricts public understanding of complex climate dynamics. Sonification closes this gap, democratizing access to NASA data through hearing.",
        card1_pill: "Visual Barrier ➔ Sound Inclusion",
        card2_category: "02 · JUKEBOX CONCEPT",
        card2_title: "The Objective",
        card2_desc: "Create an immersive and interactive experience where users explore different global visualizations from the Earth Information Center (EIC). By painting temperature onto the 3D globe, the system generates real-time dynamic soundscapes, turning planetary monitoring into a living musical instrument.",
        card2_pill: "Interactive 3D Simulation",
        card3_category: "03 · SONIC ALGORITHM",
        card3_title: "The Translation",
        card3_desc: "Harmonic and ambient mapping: cold zones trigger deep extended minor chords, while warm plumes deploy lush major ninth chords. Spatial reverb and compression protect against acoustic clipping.",
        card3_pill: "Temperature ➔ FM Pad Harmony",
        about_btn_access: "Access Audio Console",
        app_title: "EARTH JUKEBOX",
        app_subtitle: "Global Atmospheric Data Sonification",
        btn_audio_init: "Enable Audio",
        btn_audio_active: "Audio Active",
        btn_scan_start: "Rotation",
        btn_scan_pause: "Pause",
        speed_label: "Speed",
        speed_hint: "Earth rotation speed",
        music_style_label: "Music Style",
        music_scale_label: "Musical Scale",
        brush_type_label: "Thermal Brush:",
        brush_size_label: "Brush Size:",
        record_btn_start: "🔴 Record Audio",
        record_btn_stop: "⏹ Stopping...",
        audio_disconnected: "Audio Off",
        audio_connected: "Audio Ready",
        scanning_active: "Rotating...",
        scanning_paused: "Paused",
        hud_x: "UV COORD",
        hud_lum: "TEMPERATURE",
        hud_pan: "PAN / SEC",
        hud_note: "CHORD",
        access_title: "ACCESSIBILITY SPEECH (ARIA-LIVE)",
        narrator_default: "Press 'Enable Audio' and click on the globe to paint temperature and generate sound.",
        narrator_audio_ready: "Audio engine connected with master chain. Click on Earth to paint temperature.",
        narrator_recording_started: "Mastered audio recording started.",
        narrator_recording_stopped: "Recording finished. Downloading earth_jukebox_3d.webm.",
        ecco2_legend_title: "Legend: What Each Sound Means",
        ecco2_legend_desc: "Click to hear the scale. The notes are distributed between the coldest and warmest moments of the year.",
        ecco2_btn_low: "Low note: the coldest",
        ecco2_btn_mid: "Middle note",
        ecco2_btn_high: "High note: the warmest",
        ecco2_legend_pulse: "The low pulse rate is faster when there is more water at 25 °C or above.",
        ecco2_how_title: "How the image is converted to sound",
        ecco2_how_1: "1. In each frame, the land, background, and white lines are ignored.",
        ecco2_how_2: "2. The color of each pixel is converted to temperature using the NASA color bar (blue 0 °C, green 10 to 20 °C, yellow around 25 °C, red 32 °C).",
        ecco2_how_3: "3. The average of the northern and southern halves of the map is calculated separately.",
        ecco2_how_4: "4. Each average is distributed among 13 notes of a pentatonic scale.",
        ecco2_how_5: "5. The percentage of water at 25 °C or above controls the pulse speed.",
        ecco2_how_adj_title: "Adjusted scale:",
        ecco2_how_adj_desc: "The average temperature of a hemisphere changes only a few degrees over a year. To make the difference audible, the notes are distributed between the minimum and maximum values of this video. The displayed degrees are the estimated actual values."
    }
};

let currentLang = "es";

// ===========================================================================
// 2. LÓGICA DEL HERO (Solo Visual, Liviana y sin Audio)
// ===========================================================================
function initHeroEarth() {
    // 1. Validar el contenedor (Asegúrate de que exista <div id="hero-3d"> en tu HTML)
    const container = document.getElementById('hero-3d');
    if (!container) {
        console.error("Error: No se encontró el contenedor #hero-3d en el DOM.");
        return;
    }

    if (typeof THREE === "undefined") {
        console.error("Error: Three.js no está disponible.");
        return;
    }

    // Limpiar contenedor antes de añadir el nuevo canvas
    container.innerHTML = '';

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // 2. Variables estrictamente LOCALES
    const scene = new THREE.Scene();
    // Usar el tamaño del contenedor, no de la ventana completa
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Luces para el modelo diurno
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    // 4. Carga del Modelo
    let earthMesh;
    const loader = new THREE.GLTFLoader();
    loader.load('assets/earth.glb', (gltf) => {
        earthMesh = gltf.scene;

        // Normalizar escala si el modelo excede las dimensiones de camera.position.z = 2.5
        const box = new THREE.Box3().setFromObject(earthMesh);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 5) {
            const scale = 1.6 / maxDim;
            earthMesh.scale.set(scale, scale, scale);
        }
        const center = box.getCenter(new THREE.Vector3());
        earthMesh.position.sub(center.clone().multiplyScalar(earthMesh.scale.x));

        // En pantallas de escritorio, desplazar ligeramente a la derecha para acompañar el texto
        if (width >= 900) {
            earthMesh.position.x += 0.45;
        }
        earthMesh.rotation.x = 0.22;

        scene.add(earthMesh);

        // Ocultar cualquier indicador de carga activo en el Hero
        const loaders = document.querySelectorAll('.loading-badge, #loading-indicator, #glb-loading-badge, .glb-loader');
        loaders.forEach(l => {
            l.style.display = 'none';
            l.classList.add('loaded');
        });

    }, undefined, (error) => {
        console.error("Error cargando earth.glb en el Hero:", error);
        // Ocultar indicadores en caso de error y levantar esfera de respaldo
        const loaders = document.querySelectorAll('.loading-badge, #loading-indicator, #glb-loading-badge, .glb-loader');
        loaders.forEach(l => {
            l.style.display = 'none';
            l.classList.add('loaded');
        });

        const sphereGeo = new THREE.SphereGeometry(0.8, 48, 48);
        const sphereMat = new THREE.MeshStandardMaterial({ color: 0x154273, roughness: 0.8, metalness: 0.1 });
        earthMesh = new THREE.Mesh(sphereGeo, sphereMat);
        if (width >= 900) earthMesh.position.x += 0.45;
        earthMesh.rotation.x = 0.22;
        scene.add(earthMesh);
    });

    // 5. Bucle de renderizado local
    function animate() {
        requestAnimationFrame(animate);
        if (earthMesh) {
            earthMesh.rotation.y += 0.0015; // Rotación automática suave
        }
        renderer.render(scene, camera);
    }
    animate();

    // 6. Responsividad local
    window.addEventListener('resize', () => {
        if (container && container.clientWidth > 0 && container.clientHeight > 0) {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            if (earthMesh) {
                earthMesh.position.x = container.clientWidth >= 900 ? 0.45 : 0;
            }
        }
    });
}

// ===========================================================================
// 3. LÓGICA DE SONIFICACIÓN (Interactiva: CanvasTexture + Raycaster + Tone.js)
// ===========================================================================
function initJukeboxEarth() {
    const container = document.getElementById('view-3d');
    if (!container || typeof THREE === "undefined") return;

    // Limpiar contenedor antes de añadir el renderizador interactivo
    container.innerHTML = '';

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Configuración del Canvas Interactivo Transparente
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = 2048;
    offscreenCanvas.height = 1024;
    const ctx = offscreenCanvas.getContext('2d');
    // Fondo totalmente transparente para no oscurecer la Tierra original
    ctx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

    const dynamicTexture = new THREE.CanvasTexture(offscreenCanvas);
    if (THREE.SRGBColorSpace) {
        dynamicTexture.colorSpace = THREE.SRGBColorSpace;
    } else if (THREE.sRGBEncoding) {
        dynamicTexture.encoding = THREE.sRGBEncoding;
    }
    dynamicTexture.needsUpdate = true;

    // Material básico transparente para la capa envolvente interactiva
    const paintMaterial = new THREE.MeshBasicMaterial({
        map: dynamicTexture,
        transparent: true,
        blending: THREE.NormalBlending,
        depthWrite: false
    });

    // Escena, Cámara y Renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.id = 'sonification-canvas';
    container.appendChild(renderer.domElement);

    // Iluminación Estándar Potente para resaltar el mapa diurno nativo de earth.glb
    scene.add(new THREE.AmbientLight(0xffffff, 1.3));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    const rimLight = new THREE.PointLight(0x00E5FF, 1.8, 14);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // Puntero 3D de precisión elegante (Anillo hueco cian tecnológico)
    const markerGeometry = new THREE.RingGeometry(0.03, 0.035, 32);
    const markerMaterial = new THREE.MeshBasicMaterial({
        color: 0x00E5FF, // Cian tecnológico y visible
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        depthTest: false // Siempre visible por encima de la textura
    });
    const laserDot = new THREE.Mesh(markerGeometry, markerMaterial);
    laserDot.renderOrder = 999;
    laserDot.visible = false;
    scene.add(laserDot);

    // 2. Carga del Modelo y Creación de la Capa de Pintura (Doble Esfera)
    let earthMesh = null;
    let paintSphere = null;
    let isScanning = true;
    let scanSpeed = 3;

    if (typeof THREE.GLTFLoader !== "undefined") {
        const loader = new THREE.GLTFLoader();
        loader.load('assets/earth.glb', (gltf) => {
            earthMesh = gltf.scene; // Esta es la Tierra original (Visual con texturas diurnas intactas)

            // Normalizar escala si el modelo excede las dimensiones de camera.position.z = 3
            const box = new THREE.Box3().setFromObject(earthMesh);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > 5) {
                const scale = 1.8 / maxDim;
                earthMesh.scale.set(scale, scale, scale);
            }
            const center = box.getCenter(new THREE.Vector3());
            earthMesh.position.sub(center.clone().multiplyScalar(earthMesh.scale.x));
            earthMesh.rotation.x = 0.22;

            scene.add(earthMesh);

            // Buscar el radio de la malla original para crear la envolvente
            const updatedBox = new THREE.Box3().setFromObject(earthMesh);
            const radius = (updatedBox.max.y - updatedBox.min.y) / 2;

            // Crear la Esfera Exterior (Interactiva) un 1% más grande
            const geometry = new THREE.SphereGeometry(radius * 1.01, 64, 64);
            paintSphere = new THREE.Mesh(geometry, paintMaterial);
            paintSphere.rotation.x = 0.22;
            scene.add(paintSphere);

            console.log("✓ Doble Esfera (Visual + Capa Pintura) inicializada correctamente.");
        }, undefined, (err) => {
            console.error("Error al cargar earth.glb en Jukebox, creando esferas procedurales:", err);
            createFallbackSpheres();
        });
    } else {
        createFallbackSpheres();
    }

    function createFallbackSpheres() {
        const sphereGeo = new THREE.SphereGeometry(0.9, 64, 64);
        const sphereMat = new THREE.MeshStandardMaterial({
            color: 0x154273,
            roughness: 0.8,
            metalness: 0.1
        });
        earthMesh = new THREE.Mesh(sphereGeo, sphereMat);
        earthMesh.rotation.x = 0.22;
        scene.add(earthMesh);

        const outerGeo = new THREE.SphereGeometry(0.9 * 1.01, 64, 64);
        paintSphere = new THREE.Mesh(outerGeo, paintMaterial);
        paintSphere.rotation.x = 0.22;
        scene.add(paintSphere);
    }

    // =======================================================================
    // MOTOR DE AUDIO TONE.JS (Mastering Chain: PolySynth -> Comp -> Reverb)
    // =======================================================================
    let audioReady = false;
    let synth = null;
    let compressor = null;
    let reverb = null;
    let recorder = null;
    let lastChordTriggerTime = 0;

    async function initToneAudio() {
        if (audioReady || typeof Tone === "undefined") return;

        try {
            await Tone.start();
            Tone.getDestination().volume.value = -12; // -12 dB máster

            reverb = new Tone.Reverb(4).toDestination();
            await reverb.generate();

            compressor = new Tone.Compressor(-30, 3);
            compressor.connect(reverb);

            if (Tone.Recorder) {
                recorder = new Tone.Recorder();
                reverb.connect(recorder);
            }

            synth = new Tone.PolySynth(Tone.FMSynth, {
                harmonicity: 1.5,
                modulationIndex: 2.2,
                oscillator: { type: "sine" },
                envelope: { attack: 0.5, decay: 1.0, sustain: 0.8, release: 2.0 },
                modulation: { type: "sine" },
                modulationEnvelope: { attack: 0.3, decay: 0.8, sustain: 0.7, release: 2.0 }
            }).connect(compressor);

            audioReady = true;

            const startAudioBtn = document.getElementById("start-audio") || document.getElementById("btn-audio-init");
            if (startAudioBtn) startAudioBtn.classList.add("active");
            const btnAudioLabel = document.getElementById("btn-audio-label");
            if (btnAudioLabel) btnAudioLabel.textContent = translations[currentLang].btn_audio_active || "Audio Activo";
            const stateDot = document.getElementById("state-dot");
            if (stateDot) stateDot.classList.add("active");
            const stateLabel = document.getElementById("state-label");
            if (stateLabel) stateLabel.textContent = translations[currentLang].audio_connected || "Audio Listo";
            const btnScan = document.getElementById("btn-scan-toggle");
            if (btnScan) btnScan.disabled = false;

            announceAccessibility(translations[currentLang].narrator_audio_ready);
        } catch (err) {
            console.error("Error inicializando Tone.js:", err);
        }
    }

    function announceAccessibility(text) {
        const narratorText = document.getElementById("narrator-text");
        const accessDot = document.getElementById("access-dot");
        if (narratorText) narratorText.textContent = text;
        if (accessDot) {
            accessDot.classList.add("pulsing");
            setTimeout(() => accessDot.classList.remove("pulsing"), 1200);
        }
    }

    function triggerTemperatureTone(brushType, uv, forceTrigger = false) {
        if (!audioReady || !synth) return;

        const now = performance.now();
        if (!forceTrigger && (now - lastChordTriggerTime < 260)) return;
        lastChordTriggerTime = now;

        const hudLum = document.getElementById("hud-lum");
        const hudNote = document.getElementById("hud-note");
        const hudX = document.getElementById("hud-x");
        const hudPan = document.getElementById("hud-pan");

        // Mapeo de Espectro Térmico a Acordes (Progresión de baja a alta energía)
        let chordToPlay = ["Bb3", "D4", "F4", "A4"];
        let colorName = "AMARILLO (CÁLIDO)";
        let chordLabel = "Bb3-D4-F4-A4 (Bbmaj7)";

        switch (brushType) {
            case "blue":
                chordToPlay = ["C3", "Eb3", "G3", "Bb3"]; // Cm7: Grave, relajado
                colorName = "AZUL (MUY FRÍO)";
                chordLabel = "C3-Eb3-G3-Bb3 (Cm7)";
                break;
            case "green":
                chordToPlay = ["F3", "Ab3", "C4", "Eb4"]; // Fm7: Subiendo energía
                colorName = "VERDE (FRESCO)";
                chordLabel = "F3-Ab3-C4-Eb4 (Fm7)";
                break;
            case "yellow":
                chordToPlay = ["Bb3", "D4", "F4", "A4"]; // Bbmaj7: Transición cálida
                colorName = "AMARILLO (CÁLIDO)";
                chordLabel = "Bb3-D4-F4-A4 (Bbmaj7)";
                break;
            case "orange":
                chordToPlay = ["D4", "F#4", "A4", "C5"]; // D7: Tensión, calor
                colorName = "NARANJA (CALIENTE)";
                chordLabel = "D4-F#4-A4-C5 (D7)";
                break;
            case "red":
                chordToPlay = ["G4", "B4", "D5", "F#5"]; // Gmaj7: Agudo, intenso
                colorName = "ROJO (EXTREMO)";
                chordLabel = "G4-B4-D5-F#5 (Gmaj7)";
                break;
            default:
                chordToPlay = ["Bb3", "D4", "F4", "A4"];
                colorName = "AMARILLO (CÁLIDO)";
                chordLabel = "Bb3-D4-F4-A4 (Bbmaj7)";
        }

        if (hudLum) hudLum.textContent = colorName;
        if (hudNote) hudNote.textContent = chordLabel;
        announceAccessibility(`Pincel térmico ${colorName}: acorde ${chordLabel}`);

        try {
            if (Tone.context && Tone.context.state === "running") {
                synth.triggerAttackRelease(chordToPlay, "4n");
            }
        } catch (err) {
            console.warn("Tone playback:", err);
        }

        if (hudX && uv) hudX.textContent = `UV(${uv.x.toFixed(2)}, ${(1 - uv.y).toFixed(2)})`;
        if (hudPan && mouse) hudPan.textContent = `${mouse.x.toFixed(2)}`;
    }

    // =======================================================================
    // RAYCASTER Y PINTURA TÉRMICA SOBRE EL GLOBO
    // =======================================================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let isPointerDown = false;
    let isPainting = false;
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    function updateMouse(e) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    function paintThermalSpot(e, forceTrigger = false) {
        if (!paintSphere) return;
        updateMouse(e);
        raycaster.setFromCamera(mouse, camera);

        // Raycasting directo contra la esfera envolvente transparente
        const intersects = raycaster.intersectObject(paintSphere, false);

        if (intersects.length > 0 && intersects[0].uv) {
            const uv = intersects[0].uv;
            const x = uv.x * offscreenCanvas.width;
            const y = (1 - uv.y) * offscreenCanvas.height;

            const brushSizeInput = document.getElementById("brush-size");
            const brushSize = brushSizeInput ? parseInt(brushSizeInput.value, 10) : 25;
            const brushTypeSelect = document.getElementById("brush-type");
            const brushType = brushTypeSelect ? brushTypeSelect.value : "yellow";

            // Definir variables para color y notas
            let colorCenter, colorEdge, chordToPlay;

            // Mapeo de Espectro Térmico a Acordes (Progresión de baja a alta energía)
            switch (brushType) {
                case 'blue':
                    colorCenter = 'rgba(0, 150, 255, 0.8)';
                    colorEdge = 'rgba(0, 150, 255, 0)';
                    chordToPlay = ["C3", "Eb3", "G3", "Bb3"]; // Cm7: Grave, relajado
                    break;
                case 'green':
                    colorCenter = 'rgba(0, 255, 100, 0.8)';
                    colorEdge = 'rgba(0, 255, 100, 0)';
                    chordToPlay = ["F3", "Ab3", "C4", "Eb4"]; // Fm7: Subiendo energía
                    break;
                case 'yellow':
                    colorCenter = 'rgba(255, 200, 0, 0.8)';
                    colorEdge = 'rgba(255, 200, 0, 0)';
                    chordToPlay = ["Bb3", "D4", "F4", "A4"]; // Bbmaj7: Transición cálida
                    break;
                case 'orange':
                    colorCenter = 'rgb(255, 142, 67)';
                    colorEdge = 'rgba(255, 100, 0, 0)';
                    chordToPlay = ["D4", "F#4", "A4", "C5"]; // D7: Tensión, calor
                    break;
                case 'red':
                    colorCenter = 'rgba(255, 50, 0, 0.8)';
                    colorEdge = 'rgba(255, 50, 0, 0)';
                    chordToPlay = ["G4", "B4", "D5", "F#5"]; // Gmaj7: Agudo, intenso
                    break;
                default:
                    colorCenter = 'rgba(255, 200, 0, 0.8)';
                    colorEdge = 'rgba(255, 200, 0, 0)';
                    chordToPlay = ["Bb3", "D4", "F4", "A4"];
            }

            // Aplicar gradiente al CanvasTexture
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, brushSize);
            gradient.addColorStop(0, colorCenter);
            gradient.addColorStop(1, colorEdge);
            ctx.beginPath();
            ctx.arc(x, y, brushSize, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            dynamicTexture.needsUpdate = true;

            // Disparar el sintetizador de Tone.js y actualizar HUD
            triggerTemperatureTone(brushType, uv, forceTrigger);
        }
    }

    const canvasElem = renderer.domElement;

    canvasElem.addEventListener("pointerdown", async (e) => {
        if (e.button === 0) {
            if (!audioReady) {
                await initToneAudio();
            }

            isPointerDown = true;
            updateMouse(e);
            raycaster.setFromCamera(mouse, camera);

            const intersects = paintSphere ? raycaster.intersectObject(paintSphere, false) : [];

            if (intersects.length > 0) {
                isPainting = true;
                isDragging = false;
                paintThermalSpot(e, true);
            } else {
                isPainting = false;
                isDragging = true;
                prevMousePos = { x: e.clientX, y: e.clientY };
            }
        }
    });

    canvasElem.addEventListener("pointermove", (e) => {
        updateMouse(e);

        if (isPointerDown) {
            if (isPainting) {
                paintThermalSpot(e, false);
            } else if (isDragging && earthMesh) {
                const deltaX = e.clientX - prevMousePos.x;
                const deltaY = e.clientY - prevMousePos.y;

                earthMesh.rotation.y += deltaX * 0.005;
                earthMesh.rotation.x += deltaY * 0.005;

                if (paintSphere) {
                    paintSphere.rotation.y = earthMesh.rotation.y;
                    paintSphere.rotation.x = earthMesh.rotation.x;
                }

                prevMousePos = { x: e.clientX, y: e.clientY };
            }
        }
    });

    window.addEventListener("pointerup", () => {
        isPointerDown = false;
        isPainting = false;
        isDragging = false;
    });

    canvasElem.addEventListener("pointerleave", () => {
        isPointerDown = false;
        isPainting = false;
        isDragging = false;
        mouse.set(-999, -999);
        laserDot.visible = false;
    });

    // =======================================================================
    // BOTONES Y CONTROLES DE LA CONSOLA
    // =======================================================================
    const startAudioBtn = document.getElementById("start-audio") || document.getElementById("btn-audio-init");
    if (startAudioBtn) {
        startAudioBtn.addEventListener("click", () => {
            initToneAudio();
        });
    }

    const recordBtn = document.getElementById("record-btn");
    let isRecording = false;

    if (recordBtn) {
        recordBtn.addEventListener("click", async () => {
            if (!audioReady) {
                await initToneAudio();
            }
            if (!recorder) {
                console.warn("Tone.Recorder no disponible.");
                return;
            }

            if (!isRecording) {
                try {
                    recorder.start();
                    isRecording = true;
                    recordBtn.classList.add("recording");
                    recordBtn.textContent = translations[currentLang].record_btn_stop || "⏹ Deteniendo...";
                    announceAccessibility(translations[currentLang].narrator_recording_started);
                } catch (err) {
                    console.error("Error al iniciar grabación:", err);
                }
            } else {
                recordBtn.textContent = "⏳ Procesando audio...";
                recordBtn.classList.remove("recording");

                try {
                    const recording = await recorder.stop();
                    const blob = new Blob([recording], { type: "audio/webm;codecs=opus" });
                    const audioUrl = URL.createObjectURL(blob);

                    const downloadAnchor = document.createElement("a");
                    downloadAnchor.style.display = "none";
                    downloadAnchor.href = audioUrl;
                    downloadAnchor.download = "earth_jukebox_3d.webm";
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    document.body.removeChild(downloadAnchor);

                    URL.revokeObjectURL(audioUrl);
                    announceAccessibility(translations[currentLang].narrator_recording_stopped);
                } catch (err) {
                    console.error("Error al exportar audio grabado:", err);
                } finally {
                    isRecording = false;
                    recordBtn.textContent = translations[currentLang].record_btn_start || "🔴 Grabar Audio";
                }
            }
        });
    }

    const btnScanToggle = document.getElementById("btn-scan-toggle");
    const btnScanLabel = document.getElementById("btn-scan-label");
    const scanIcon = document.getElementById("scan-icon");
    const stateLabel = document.getElementById("state-label");

    if (btnScanToggle) {
        btnScanToggle.addEventListener("click", () => {
            isScanning = !isScanning;
            if (isScanning) {
                btnScanToggle.classList.add("active");
                if (btnScanLabel) btnScanLabel.textContent = translations[currentLang].btn_scan_pause || "Pausar";
                if (scanIcon) scanIcon.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
                if (stateLabel) stateLabel.textContent = translations[currentLang].scanning_active || "Rotando...";
                announceAccessibility("Rotación reactivada.");
            } else {
                btnScanToggle.classList.remove("active");
                if (btnScanLabel) btnScanLabel.textContent = translations[currentLang].btn_scan_start || "Rotación";
                if (scanIcon) scanIcon.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
                if (stateLabel) stateLabel.textContent = translations[currentLang].scanning_paused || "En pausa";
                announceAccessibility("Rotación pausada.");
            }
        });
    }

    const speedSlider = document.getElementById("scan-speed");
    const speedIndicator = document.getElementById("speed-indicator");
    if (speedSlider) {
        speedSlider.addEventListener("input", (e) => {
            scanSpeed = parseInt(e.target.value, 10);
            if (speedIndicator) speedIndicator.textContent = `${scanSpeed}x`;
        });
    }

    const brushSizeInput = document.getElementById("brush-size");
    const brushSizeVal = document.getElementById("brush-size-val");
    if (brushSizeInput && brushSizeVal) {
        brushSizeInput.addEventListener("input", (e) => {
            brushSizeVal.textContent = `${e.target.value}px`;
        });
    }

    const selectMusicStyle = document.getElementById("music-style");
    if (selectMusicStyle) {
        selectMusicStyle.addEventListener("change", (e) => {
            if (!synth) return;
            const styleKey = e.target.value;
            if (styleKey === "synthwave") {
                synth.set({
                    harmonicity: 2.0,
                    modulationIndex: 4.5,
                    oscillator: { type: "fatsawtooth" },
                    envelope: { attack: 0.15, decay: 0.8, sustain: 0.4, release: 1.5 }
                });
            } else if (styleKey === "piano") {
                synth.set({
                    harmonicity: 1.0,
                    modulationIndex: 0.8,
                    oscillator: { type: "triangle" },
                    envelope: { attack: 0.05, decay: 1.2, sustain: 0.2, release: 1.8 }
                });
            } else {
                synth.set({
                    harmonicity: 1.5,
                    modulationIndex: 2.2,
                    oscillator: { type: "sine" },
                    envelope: { attack: 0.5, decay: 1.0, sustain: 0.8, release: 2.0 }
                });
            }
            announceAccessibility(`Estilo musical cambiado a: ${selectMusicStyle.options[selectMusicStyle.selectedIndex].text}`);
        });
    }

    // Selector de idioma (i18n)
    const langButtons = document.querySelectorAll("#language-toggle .lang-btn");
    function setLanguage(lang) {
        if (!translations[lang]) return;
        currentLang = lang;

        langButtons.forEach(btn => {
            btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
        });

        document.querySelectorAll("[data-i18n]").forEach(elem => {
            const key = elem.getAttribute("data-i18n");
            if (translations[lang] && translations[lang][key] !== undefined) {
                elem.textContent = translations[lang][key];
            }
        });

        const btnAudioLabel = document.getElementById("btn-audio-label");
        if (btnAudioLabel) {
            btnAudioLabel.textContent = audioReady 
                ? (translations[lang].btn_audio_active || "Audio Activo")
                : (translations[lang].btn_audio_init || "Iniciar Audio");
        }
        if (btnScanLabel) {
            btnScanLabel.textContent = isScanning 
                ? (translations[lang].btn_scan_pause || "Pausar")
                : (translations[lang].btn_scan_start || "Rotación");
        }
        if (stateLabel) {
            stateLabel.textContent = audioReady
                ? (isScanning ? translations[lang].scanning_active : translations[lang].audio_connected)
                : translations[lang].audio_disconnected;
        }
        if (recordBtn && !isRecording) {
            recordBtn.textContent = translations[lang].record_btn_start || "🔴 Grabar Audio";
        }
    }

    langButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetLang = btn.getAttribute("data-lang");
            if (targetLang) setLanguage(targetLang);
        });
    });

    setLanguage("es");

    // =======================================================================
    // 4. RENDER LOOP CON ROTACIÓN SINCRONIZADA DE AMBAS ESFERAS
    // =======================================================================
    function animateJukebox() {
        requestAnimationFrame(animateJukebox);

        // Rotación en estricto sincronismo
        if (isScanning && !isPainting && !isDragging) {
            if (earthMesh) {
                earthMesh.rotation.y += 0.001 * scanSpeed;
            }
            if (paintSphere && earthMesh) {
                paintSphere.rotation.y = earthMesh.rotation.y;
            }
        }

        // Raycasting continuo para el láser sobre paintSphere
        if (paintSphere) {
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(paintSphere, false);

            if (intersects.length > 0) {
                laserDot.position.copy(intersects[0].point);
                laserDot.visible = true;

                if (intersects[0].uv) {
                    const hudX = document.getElementById("hud-x");
                    const hudPan = document.getElementById("hud-pan");
                    if (hudX) hudX.textContent = `UV(${intersects[0].uv.x.toFixed(2)}, ${(1 - intersects[0].uv.y).toFixed(2)})`;
                    if (hudPan) hudPan.textContent = `${mouse.x.toFixed(2)}`;
                }
            } else {
                laserDot.visible = false;
            }
        }

        renderer.render(scene, camera);
    }
    animateJukebox();

    window.addEventListener("resize", () => {
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
}

// ===========================================================================
// EJECUTAR AMBAS AL CARGAR EL DOM
// ===========================================================================
function startApp() {
    if (document.getElementById('hero-3d')) initHeroEarth();
    if (document.getElementById('view-3d')) initJukeboxEarth();
    if (document.getElementById('v-ecco2')) initHistoricalVideo();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startApp);
} else {
    startApp();
}

// ===========================================================================
// EVENTO PARA EL BOTÓN DE INICIAR SONIFICACIÓN (SMOOTH SCROLL)
// ===========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('btn-scroll-down') || document.getElementById('btn-scroll-to-app');
    const targetSection = document.getElementById('jukebox-section') || document.getElementById('jukebox-app');

    if (startBtn && targetSection) {
        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            targetSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        });
    }
});

// ==========================================
// MÓDULO AISLADO: ARCHIVO HISTÓRICO ECCO2
// ==========================================
function initHistoricalVideo() {
    const v = document.getElementById('v-ecco2');
    const btn = document.getElementById('btn-ecco2');
    const volSlider = document.getElementById('vol-ecco2');
    if (!v || !btn) return;

    const NOTAS = [130.81, 146.83, 164.81, 196, 220, 261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25];
    const NOM = ['Do', 'Re', 'Mi', 'Sol', 'La'];
    const nombre = i => NOM[i % 5] + (3 + Math.floor(i / 5));
    const START = Date.UTC(2007, 2, 25), END = Date.UTC(2008, 2, 3);
    
    let data = null, ctx = null, master = null, voz = [], on = false, vol = 0.7, pTimer = null;
    let rng = { lo: 10, hi: 30, wlo: 0, whi: 0.6 };
    let cur = { n: 15, s: 15, w: 0.3, iN: 6, iS: 6, f: 0 };

    fetch('assets/data.json')
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(d => {
            if (!d.tN) throw 0;
            data = d;
            const a = d.tN.concat(d.tS);
            rng = { lo: Math.min(...a), hi: Math.max(...a), wlo: Math.min(...d.warm), whi: Math.max(...d.warm) };
            rng.hi = Math.max(rng.hi, rng.lo + 0.1); 
            rng.whi = Math.max(rng.whi, rng.wlo + 0.01);
            document.getElementById('modo-ecco2').textContent = `Datos cargados: ${d.n} frames`;
        })
        .catch(() => {
            document.getElementById('modo-ecco2').textContent = 'Error leyendo assets/data.json';
        });

    const k01 = x => Math.max(0, Math.min(1, x));
    const idx = t => Math.round(k01((t - rng.lo) / (rng.hi - rng.lo)) * 12);
    const kw = () => k01((cur.w - rng.wlo) / (rng.whi - rng.wlo));
    const intervalo = () => 1.2 - 0.9 * kw();
    const ritmo = () => { const k = kw(); return k < 0.33 ? 'Lento' : k < 0.66 ? 'Medio' : 'Rápido'; };
    const fecha = () => new Date(START + cur.f * (END - START)).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });

    function ensure() {
        if (!ctx) {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
            master = ctx.createGain();
            master.gain.value = vol;
            master.connect(ctx.destination);
        }
        ctx.resume();
    }

    // Probar notas de la escala en la leyenda
    function probar(k) {
        ensure();
        const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.value = NOTAS[Math.round(k * 12)];
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.4, t + 0.05);
        g.gain.linearRampToValueAtTime(0, t + 1.1);
        o.connect(g).connect(master);
        o.start(t);
        o.stop(t + 1.2);
    }

    // Listeners de los botones de prueba en la leyenda
    document.querySelectorAll('.btn-leg-ecco2').forEach(b => {
        b.onclick = () => probar(+b.dataset.k);
    });

    function pulso() {
        if (!on) return;
        const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine'; o.frequency.value = NOTAS[Math.round((cur.iN + cur.iS) / 2)] / 2;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.5, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        o.connect(g).connect(master); o.start(t); o.stop(t + 0.35);
        pTimer = setTimeout(pulso, intervalo() * 1000);
    }

    btn.onclick = () => {
        ensure(); on = !on;
        if (on) {
            voz = [[-0.8, cur.iN], [0.8, cur.iS]].map(([pan, i]) => {
                const o = ctx.createOscillator(), g = ctx.createGain(), p = ctx.createStereoPanner();
                o.type = 'triangle'; g.gain.value = 0.2; p.pan.value = pan;
                o.frequency.value = NOTAS[i]; o.connect(g).connect(p).connect(master); o.start(); return o;
            });
            pulso();
            btn.style.background = '#00E5FF'; btn.style.color = '#06121f'; btn.textContent = 'Silenciar ECCO2';
        } else {
            voz.forEach(o => o.stop()); clearTimeout(pTimer);
            btn.style.background = 'transparent'; btn.style.color = '#00E5FF'; btn.textContent = 'Habilitar Sonido';
        }
    };

    volSlider.oninput = e => { vol = +e.target.value; if (master) master.gain.value = vol; };

    function leer() {
        const f = v.duration ? v.currentTime / v.duration : 0;
        if (data) {
            const i = Math.min(data.n - 1, Math.floor(f * data.n));
            return { n: data.tN[i], s: data.tS[i], w: data.warm[i], f };
        }
        return null;
    }

    function pintar() {
        document.getElementById('tN-ecco2').textContent = cur.n.toFixed(1);
        document.getElementById('tS-ecco2').textContent = cur.s.toFixed(1);
        document.getElementById('nN-ecco2').textContent = nombre(cur.iN);
        document.getElementById('nS-ecco2').textContent = nombre(cur.iS);
        document.getElementById('pulso-ecco2').textContent = ritmo();
        document.getElementById('fecha-ecco2').textContent = fecha();
        document.getElementById('mN-ecco2').style.left = (k01(cur.n / 32) * 100) + '%';
        document.getElementById('mS-ecco2').style.left = (k01(cur.s / 32) * 100) + '%';
    }

    function tick() {
        const r = leer();
        if (r) {
            cur.n += (r.n - cur.n) * 0.2; cur.s += (r.s - cur.s) * 0.2;
            cur.w = r.w; cur.f = r.f;
            cur.iN = idx(cur.n); cur.iS = idx(cur.s);
            pintar();
            if (on && voz.length) {
                voz[0].frequency.setTargetAtTime(NOTAS[cur.iN], ctx.currentTime, 0.08);
                voz[1].frequency.setTargetAtTime(NOTAS[cur.iS], ctx.currentTime, 0.08);
            }
        }
        requestAnimationFrame(tick);
    }
    
    requestAnimationFrame(tick);
}
