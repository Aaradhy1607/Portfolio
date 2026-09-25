import type { SkillNode } from '../types';

export const SKILL_NODES: SkillNode[] = [
  // Programming Core
  {
    id: "python",
    name: "Python",
    category: "programming",
    position: [0, 4, 0],
    color: "#3b82f6",
    whyItMatters: "The foundational language powering deep learning research, data processing, backend microservices, and scientific algorithms.",
    whereItIsUsed: "Core engine for VAAYU predictive systems, ML pipelines, data transformations, and backend server APIs.",
    relatedProjects: ["VAAYU", "AI / ML Pipelines"],
    connectedTo: ["ml", "fastapi", "timeseries", "data_proc"]
  },
  {
    id: "cpp",
    name: "C++",
    category: "programming",
    position: [-6, 3, 2],
    color: "#0284c7",
    whyItMatters: "High-performance systems programming, rigorous memory management, and low-level algorithmic efficiency.",
    whereItIsUsed: "Algorithmic problem solving, performance-critical compute tasks, and core computer science fundamentals.",
    relatedProjects: ["Algorithms", "Competitive Computing"],
    connectedTo: ["c", "algorithms"]
  },
  {
    id: "c",
    name: "C",
    category: "programming",
    position: [-9, 1, 3],
    color: "#64748b",
    whyItMatters: "Low-level understanding of hardware architectures, memory pointers, operating system structures, and deterministic computing.",
    whereItIsUsed: "Foundational computer science, memory optimizations, and systems logic.",
    relatedProjects: ["Systems Fundamentals"],
    connectedTo: ["cpp"]
  },
  {
    id: "java",
    name: "Java",
    category: "programming",
    position: [-7, -2, -2],
    color: "#f59e0b",
    whyItMatters: "Robust object-oriented paradigm, type safety, enterprise grade architecture, and multi-threaded engineering.",
    whereItIsUsed: "Object-oriented design patterns, software architecture design, and enterprise data models.",
    relatedProjects: ["Software Systems", "OOP Architecture"],
    connectedTo: ["algorithms", "databases"]
  },

  // AI / ML & Forecasting
  {
    id: "ml",
    name: "Machine Learning",
    category: "aiml",
    position: [4, 5, -2],
    color: "#00f0ff",
    whyItMatters: "Extracts predictive intelligence from high-dimensional datasets and models complex non-linear relationships.",
    whereItIsUsed: "VAAYU air quality forecasting, pattern detection, feature weighting, and predictive analytics.",
    relatedProjects: ["VAAYU", "Predictive Systems"],
    connectedTo: ["python", "deep_learning", "timeseries", "ensemble_models"]
  },
  {
    id: "deep_learning",
    name: "Deep Learning",
    category: "aiml",
    position: [8, 6, -1],
    color: "#8b5cf6",
    whyItMatters: "Neural architectures capable of learning hierarchical abstractions across spatial and temporal domains.",
    whereItIsUsed: "Complex spatio-temporal modeling, feature extraction, and high-capacity predictive systems.",
    relatedProjects: ["VAAYU", "Vision & Temporal Models"],
    connectedTo: ["ml", "timeseries"]
  },
  {
    id: "timeseries",
    name: "Time-Series Forecasting",
    category: "aiml",
    position: [6, 2, -4],
    color: "#06b6d4",
    whyItMatters: "Models sequential temporal patterns, seasonal lag components, and multi-horizon trend trajectories.",
    whereItIsUsed: "Predicting 72-hour air pollution vectors (PM2.5, PM10, NO2, AQI) in VAAYU.",
    relatedProjects: ["VAAYU"],
    connectedTo: ["ml", "ensemble_models", "python"]
  },
  {
    id: "ensemble_models",
    name: "Ensemble Modeling",
    category: "aiml",
    position: [8, 0, -3],
    color: "#10b981",
    whyItMatters: "Combines multiple diverse model predictions to minimize variance and achieve superior generalization accuracy.",
    whereItIsUsed: "VAAYU-DeepEnsemble-v1.4 core predicting system achieving high resilience against atmospheric anomalies.",
    relatedProjects: ["VAAYU"],
    connectedTo: ["ml", "timeseries", "predictive_analytics"]
  },
  {
    id: "predictive_analytics",
    name: "Predictive Analytics",
    category: "aiml",
    position: [5, -2, -5],
    color: "#14b8a6",
    whyItMatters: "Translates statistical and machine learning distributions into actionable operational decisions.",
    whereItIsUsed: "Evaluating environmental indices, risk scoring, and predictive warning systems.",
    relatedProjects: ["VAAYU", "FINAVRIA"],
    connectedTo: ["ensemble_models", "data_proc"]
  },

  // Backend & APIs
  {
    id: "fastapi",
    name: "FastAPI",
    category: "backend",
    position: [2, 0, 5],
    color: "#10b981",
    whyItMatters: "Modern, high-performance async web framework based on standard Python type hints and ASGI event loops.",
    whereItIsUsed: "Serving real-time inference endpoints and spatial telemetry queries in VAAYU.",
    relatedProjects: ["VAAYU"],
    connectedTo: ["python", "pydantic", "uvicorn", "rest_apis"]
  },
  {
    id: "uvicorn",
    name: "Uvicorn & ASGI",
    category: "backend",
    position: [5, -1, 6],
    color: "#ec4899",
    whyItMatters: "Lightning-fast ASGI server implementation for asynchronous event handling and high concurrent request throughput.",
    whereItIsUsed: "Production application server hosting the VAAYU API platform.",
    relatedProjects: ["VAAYU"],
    connectedTo: ["fastapi", "rest_apis"]
  },
  {
    id: "pydantic",
    name: "Pydantic & Settings",
    category: "backend",
    position: [0, -3, 6],
    color: "#ef4444",
    whyItMatters: "Strict runtime data validation, schema enforcement, environment configuration, and type-safe data serialization.",
    whereItIsUsed: "Validating sensor telemetry payloads and enforcing configuration schemas across backend services.",
    relatedProjects: ["VAAYU"],
    connectedTo: ["fastapi", "python"]
  },
  {
    id: "rest_apis",
    name: "REST API Architecture",
    category: "backend",
    position: [3, -4, 4],
    color: "#6366f1",
    whyItMatters: "Clean, standardized HTTP interface design for seamless frontend-backend decoupling.",
    whereItIsUsed: "Data delivery layer between predictive backends and interactive visualization clients.",
    relatedProjects: ["VAAYU", "CRIME RADAR", "FINAVRIA"],
    connectedTo: ["fastapi", "react"]
  },

  // Databases & Geospatial
  {
    id: "databases",
    name: "PostgreSQL",
    category: "database",
    position: [-2, -4, -3],
    color: "#3b82f6",
    whyItMatters: "Robust relational database system renowned for reliability, SQL standard compliance, and extensibility.",
    whereItIsUsed: "Primary telemetry datastore for environmental observations and persistent historical records.",
    relatedProjects: ["VAAYU"],
    connectedTo: ["postgis", "python"]
  },
  {
    id: "postgis",
    name: "PostGIS Spatial Engine",
    category: "geospatial",
    position: [-1, -6, -1],
    color: "#22c55e",
    whyItMatters: "Spatial database extender enabling geographic indexing, distance calculations, and spatial polygon intersections.",
    whereItIsUsed: "Spatial coordinate indexing and localized air pollution spatial interpolations in VAAYU.",
    relatedProjects: ["VAAYU"],
    connectedTo: ["databases", "geospatial_analytics"]
  },
  {
    id: "geospatial_analytics",
    name: "Spatial Analytics",
    category: "geospatial",
    position: [2, -6, -2],
    color: "#84cc16",
    whyItMatters: "Analyzes geographical patterns, spatial clustering, and multi-location telemetry diffusion.",
    whereItIsUsed: "Multi-station spatial correlation modeling in VAAYU and territorial scanning in CRIME RADAR.",
    relatedProjects: ["VAAYU", "CRIME RADAR"],
    connectedTo: ["postgis", "ml"]
  },

  // Frontend & 3D Interactive
  {
    id: "react",
    name: "React",
    category: "interactive",
    position: [-4, 5, 4],
    color: "#00f0ff",
    whyItMatters: "Declarative component-based architecture for crafting reactive, high-performance user interfaces.",
    whereItIsUsed: "Building responsive frontends, interactive dashboards, and this 3D portfolio interface.",
    relatedProjects: ["Aaradhy Universe", "IXORA", "FINAVRIA"],
    connectedTo: ["rest_apis", "interactive_web"]
  },
  {
    id: "interactive_web",
    name: "3D & Interactive Web",
    category: "interactive",
    position: [-6, 6, 1],
    color: "#a855f7",
    whyItMatters: "Combines WebGL, shaders, and real-time graphics to create immersive cinematic digital experiences.",
    whereItIsUsed: "The Aaradhy Universe spaceship navigation hub, planetary orbits, and interactive constellations.",
    relatedProjects: ["The Aaradhy Universe"],
    connectedTo: ["react"]
  },

  // Data Processing
  {
    id: "data_proc",
    name: "Data Processing & ETL",
    category: "aiml",
    position: [3, 2, 2],
    color: "#fbbf24",
    whyItMatters: "Transforms noisy, missing, or unstructured sensor data streams into clean analytical feature matrices.",
    whereItIsUsed: "Preprocessing atmospheric data streams, outlier filtering, and normalization in VAAYU.",
    relatedProjects: ["VAAYU"],
    connectedTo: ["python", "ml", "databases"]
  },
  {
    id: "algorithms",
    name: "Algorithms & Problem Solving",
    category: "tools",
    position: [-7, 0, 0],
    color: "#f97316",
    whyItMatters: "The bedrock of software engineering: optimal data structures, graph traversals, and algorithmic efficiency.",
    whereItIsUsed: "Competitive programming, hackathon rapid problem decomposition, and algorithmic modeling.",
    relatedProjects: ["Hackathons", "Core CS"],
    connectedTo: ["cpp", "java", "python"]
  }
];
