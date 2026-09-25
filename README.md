# 🚀 AARADHY.EXE // 3D Sci-Fi Space Odyssey Portfolio

<div align="center">

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-gray?style=for-the-badge&logo=react&logoColor=white)](https://docs.pmnd.rs/react-three-fiber/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br />

**A state-of-the-art interactive 3D Spaceship Cockpit & Deep-Space Portfolio for Aaradhy Sharma**  
*Turning ideas into operational systems across Artificial Intelligence, Machine Learning, and Engineering.*

[🌌 Live Demo](#) • [🛸 Explore Features](#-key-features) • [🛠️ Tech Stack](#️-tech-stack) • [🚀 Quick Start](#-getting-started) • [👨‍🚀 Commander Profile](#-commander-profile)

</div>

---

## 🛰️ Overview

**AARADHY.EXE** is not an ordinary web portfolio—it is an immersive, real-time 3D sci-fi flight deck experience built on **Three.js**, **React Three Fiber**, and **React 19**. 

Navigate through hyperspace sectors, inspect interactive planetary projects, view skill constellations, engage sub-space audio transmissions, and explore engineering mission logs through a high-tech holographic HUD interface.

```
+-------------------------------------------------------------------------+
| [SECTOR 04] // TEMPORAL CORE: STABLE // WARP DRIVE: ONLINE             |
|                                                                         |
|         🌌 NEBULA & STARFIELDS         🪐 PLANETARY PROJECTS             |
|         ⚡ INTERACTIVE 3D COCKPIT      📡 HOLOGRAPHIC HUD MODALS        |
|         🚀 REAL-TIME WARP TRANSIT      🎵 PROCEDURAL AUDIO SYNTH        |
|                                                                         |
+-------------------------------------------------------------------------+
```

---

## ✨ Key Features

### 🌌 1. Immersive 3D Space & Cockpit Simulation
* **Interactive Starship Cockpit**: Dynamic 3D cockpit interior rendered with glass reflections, instrument glow, and camera pitch/yaw response.
* **Planetary Project Orbitals**: Every featured project is represented as an orbital celestial body with custom atmospheric shaders, rotation vectors, and glow halos.
* **Procedural Starfields & Nebula**: Multi-layered particle systems and volumetric deep-space gas clouds.
* **Wormhole Warp Transit**: Dynamic hyperspace warp animations with camera distortion and particle acceleration when navigating sectors.
* **Temporal Core**: Central quantum energy sphere with rotating containment rings and particle flares.

### 🎛️ 2. Cybernetic HUD & Holographic Modals
* **Boot Sequence Terminal**: Authentic retro-futuristic diagnostic bootloader initialization.
* **Mission Log System**: Detailed breakdown of engineering milestones, achievements, and academic excellence.
* **3D Project Hologram Modals**: Deep-dive telemetry with architecture layers, metrics, system models, and source links.
* **Skill Constellation Matrix**: Visual radar of engineering proficiencies spanning AI/ML, Full-Stack, System Architecture, and Cloud Infrastructure.
* **Sub-Space Communication Array**: Direct encrypted contact terminal.

### 🔊 3. Atmospheric Audio & Micro-Interactions
* Built-in ambient space drone soundscapes and tactile UI sound effects (blips, warp thrums, modal snaps) with full mute/toggle controls.
* Custom sci-fi cursor with target locking and orbital hover effects.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/) |
| **3D & Graphics Engine** | [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/), [@react-three/drei](https://github.com/pmndrs/drei) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/), PostCSS, Custom Sci-Fi Glassmorphism |
| **Motion & UI Animations** | [Framer Motion](https://www.framer.com/motion/), Lucide Icons |
| **Code Quality & Linter** | [Oxlint](https://oxc.rs/) |

---

## 🪐 Featured Missions & Planetary Systems

* **VAAYU (Deep Ensemble Atmospheric Intelligence Engine)**  
  *Multi-horizon air quality & particulate forecasting platform using Deep Ensembles and PostGIS geospatial indexing.*
* **CRIME RADAR (Surveillance & Security Intelligence)**  
  *Real-time public safety awareness and situational intelligence platform.*
* **CHRONO CORE & MISSION LOGS**  
  *Chronological mission milestones, research telemetry, and hackathon prototypes.*

---

## 🚀 Getting Started

Follow these steps to run the flight deck locally on your machine:

### 📋 Prerequisites
* **Node.js**: `v18.0.0` or higher (v20+ recommended)
* **npm** / **yarn** / **pnpm**

### 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aaradhy1607/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development flight deck:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📂 Project Architecture

```plaintext
Portfolio/
├── public/                     # Static assets, fonts & audio files
├── src/
│   ├── assets/                 # Graphics & image resources
│   ├── audio/                  # Space soundscapes & SFX controllers
│   ├── components/
│   │   ├── canvas/             # 3D Three.js & Fiber elements
│   │   │   ├── CameraController.tsx    # Orbital & warp camera motion
│   │   │   ├── Nebula.tsx              # Volumetric nebular clouds
│   │   │   ├── ProjectPlanets.tsx      # Orbiting project spheres
│   │   │   ├── SceneContainer.tsx      # Main R3F canvas wrapper
│   │   │   ├── SkillConstellation.tsx  # Interactive 3D skill network
│   │   │   ├── SpaceshipCockpit.tsx    # 3D ship cockpit interior
│   │   │   ├── StarField.tsx           # Multi-depth star particles
│   │   │   ├── TemporalCore.tsx        # Central glowing reactor
│   │   │   └── Wormhole.tsx            # Hyperspace warp effect
│   │   ├── cursor/             # Sci-fi custom targeting cursor
│   │   └── hud/                # 2D Glassmorphism Cyberpunk UI
│   │       ├── AudioControls.tsx       # Soundscape toggle
│   │       ├── BootSequence.tsx        # System boot terminal
│   │       ├── CommunicationArray.tsx  # Encrypted contact form
│   │       ├── IdentityModal.tsx       # Pilot profile & dossier
│   │       ├── MissionLogModal.tsx     # Career & research logs
│   │       ├── NavigationHUD.tsx       # Main helm control overlay
│   │       ├── ProjectModal3D.tsx      # Planetary project inspector
│   │       ├── SkillDetailModal.tsx    # Deep skill telemetry
│   │       └── TemporalTimelineHUD.tsx # Timeline scrubber
│   ├── data/                   # Structured data for projects, skills & logs
│   │   ├── missions.ts
│   │   ├── profile.ts
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── timeline.ts
│   ├── types/                  # TypeScript interface definitions
│   ├── App.tsx                 # Root application state & sector router
│   ├── index.css               # Global tokens & Tailwind v4 styles
│   └── main.tsx                # Application entrypoint
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🕹️ Cockpit Controls & Keybindings

| Input | Action |
| :---: | :--- |
| **`Mouse Drag / Move`** | Pan ship orientation & pilot view angle |
| **`Click on Planet`** | Initiate orbital lock & open Project Telemetry |
| **`Click on Constellation Node`** | Open Skill Diagnostic breakdown |
| **`Warp Sector Buttons`** | Engage hyperdrive jump to designated sector |
| **`Audio Toggle (Top-Right)`** | Enable / Mute sub-space audio frequencies |
| **`ESC`** | Disengage active holographic modal |

---

## 👨‍🚀 Commander Profile

**Aaradhy Sharma**  
*AI & Machine Learning Engineering Student*  
*University School of Automation & Robotics (USAR) — Batch 2029*

- 🌐 **GitHub**: [@Aaradhy1609](https://github.com/Aaradhy1609) / [@Aaradhy1607](https://github.com/Aaradhy1607)
- 💼 **LinkedIn**: [Aaradhy Sharma](https://www.linkedin.com/in/aaradhy-sharma)
- 📡 **Direct Transmission**: `aaradhysharma7002@gmail.com`

> *"I learn technology by building with it. — LEARN. BUILD. EXPERIMENT. COMPETE. IMPROVE. BUILD AGAIN."*

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to explore, learn, and use elements with attribution.

<div align="center">

⭐ **If you enjoyed exploring this starship cockpit, consider leaving a star!** ⭐

</div>
