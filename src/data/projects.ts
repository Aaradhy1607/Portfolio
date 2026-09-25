import type { ProjectData } from '../types';

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: "planet_vaayu",
    name: "VAAYU",
    category: "AI / ML & Geospatial Forecasting",
    subtitle: "Deep Ensemble Atmospheric Intelligence Engine",
    systemModel: "VAAYU-DeepEnsemble-v1.4",
    objective: "Intelligent multi-horizon air-quality forecasting platform delivering predictive environmental diagnostics.",
    description: "An operational atmospheric intelligence system designed for deep spatio-temporal environmental modelling. Deploys ensemble architectures to predict particulate and gas dynamics across granular spatial coordinates.",
    color: "#00f0ff",
    glowColor: "#0284c7",
    radius: 2.2,
    orbitRadius: 18,
    orbitSpeed: 0.15,
    rotationSpeed: 0.008,
    planetType: "storm_gas",
    metrics: [
      { label: "HORIZON FORECAST", value: "T+0h → T+72h" },
      { label: "RMSE ACCURACY RANGE", value: "85% – 90%" },
      { label: "SYSTEM MODEL", value: "DeepEnsemble v1.4" },
      { label: "SPATIAL RESOLUTION", value: "PostGIS Geospatial" }
    ],
    capabilities: [
      "Multi-horizon continuous forecasting (T+0h to T+72h)",
      "Fine particulate (PM2.5) mass density trajectory prediction",
      "Inhalable particulate (PM10) concentration analysis",
      "Nitrogen Dioxide (NO2) dispersion tracking",
      "Composite Air Quality Index (AQI) predictive calculation",
      "Geospatial indexed querying with PostGIS spatial telemetry"
    ],
    techStack: [
      "Python",
      "FastAPI",
      "Uvicorn",
      "Pydantic",
      "pydantic-settings",
      "orjson",
      "structlog",
      "PostgreSQL",
      "PostGIS",
      "Machine Learning",
      "Ensemble Models"
    ],
    architectureLayers: [
      { name: "INGESTION & SPATIAL ETL", details: "Ingests real-time environmental telemetry, cleans anomalies, and indexes multi-coordinate data points via PostGIS spatial structures." },
      { name: "FEATURE ENGINEERING", details: "Extracts atmospheric lag features, wind vectors, seasonal rhythms, and spatial neighbor correlations." },
      { name: "ENSEMBLE CORE (v1.4)", details: "Leverages deep ensemble regressors tuned specifically to handle localized non-linear atmospheric anomalies." },
      { name: "HIGH-THROUGHPUT REST API", details: "FastAPI + Uvicorn engine configured with orjson serialization and structlog structured diagnostic streaming." }
    ],
    holographicStatus: "OPERATIONAL // TELEMETRY ACTIVE",
    githubUrl: "https://github.com/Aaradhy1609"
  },
  {
    id: "planet_crime_radar",
    name: "CRIME RADAR",
    category: "SURVEILLANCE & SECURITY INTELLIGENCE",
    subtitle: "Security & Crime Awareness Platform",
    objective: "Platform focused on public security, real-time awareness and situational intelligence analysis.",
    description: "A digital security framework conceptualized for crime awareness, alert visualization, and territorial intelligence mapping.",
    color: "#f43f5e",
    glowColor: "#e11d48",
    radius: 1.8,
    orbitRadius: 28,
    orbitSpeed: 0.1,
    rotationSpeed: 0.012,
    planetType: "cyber_surveillance",
    metrics: [
      { label: "PRIMARY DOMAIN", value: "Public Security" },
      { label: "INTERFACE", value: "Holographic City Grid" },
      { label: "CORE TELEMETRY", value: "Awareness & Alerts" },
      { label: "GEOGRAPHY", value: "Spatial Node Grid" }
    ],
    capabilities: [
      "Interactive holographic city-grid situational mapping",
      "Territorial awareness node tracking",
      "Location-based safety awareness markers",
      "Security alert visualization vectors",
      "Spatial intelligence scanning and monitoring"
    ],
    techStack: [
      "Software Engineering",
      "Geographic Visualization",
      "Security Telemetry",
      "Spatial Intelligence",
      "Frontend Architecture"
    ],
    architectureLayers: [
      { name: "CITY-GRID HOLOGRAPHY", details: "Renders multi-layered city matrices with spatial node overlays." },
      { name: "SECURITY SCANNER", details: "Radar telemetry sweeps alerting users to localized situational awareness metrics." },
      { name: "ALERT DISPATCH", details: "Structured intelligence feed displaying contextual awareness notifications." }
    ],
    holographicStatus: "GRID SCANNING // SURVEILLANCE STANDBY",
    githubUrl: "https://github.com/Aaradhy1609"
  },
  {
    id: "planet_ixora",
    name: "IXORA",
    category: "EDTECH & KNOWLEDGE SYSTEMS",
    subtitle: "Intelligent Educational Architecture",
    objective: "EdTech platform engineered to create structured, interactive, and connected learning paths.",
    description: "An educational platform designed around modular knowledge structures, cognitive learning pathways, and interactive conceptual nodes.",
    color: "#a855f7",
    glowColor: "#9333ea",
    radius: 1.6,
    orbitRadius: 38,
    orbitSpeed: 0.07,
    rotationSpeed: 0.009,
    planetType: "edtech_knowledge",
    metrics: [
      { label: "DOMAIN", value: "EdTech Systems" },
      { label: "FRAMEWORK", value: "Connected Learning" },
      { label: "STRUCTURE", value: "Knowledge Graph" },
      { label: "EXPERIENCE", value: "Interactive Nodes" }
    ],
    capabilities: [
      "Connected modular knowledge paths",
      "Interactive curriculum structure visualization",
      "Holographic learning node exploration",
      "Structured learning progression tracking"
    ],
    techStack: [
      "Web Technologies",
      "React",
      "Data Architecture",
      "Interactive UI/UX",
      "Educational Graph Structures"
    ],
    architectureLayers: [
      { name: "KNOWLEDGE GRAPH ENGINE", details: "Maps interdependent conceptual units into navigable learning orbits." },
      { name: "STUDENT PROGRESSION VECTOR", details: "Calculates milestone completion along dynamic curriculum paths." }
    ],
    holographicStatus: "KNOWLEDGE MATRIX // READY FOR EXPLORATION",
    githubUrl: "https://github.com/Aaradhy1609"
  },
  {
    id: "planet_finavria",
    name: "FINAVRIA",
    category: "FINTECH & QUANTITATIVE DATA",
    subtitle: "Financial Data & Analytics Platform",
    objective: "Futuristic financial technology platform focusing on dynamic data streaming and analytical visualization.",
    description: "A financial data visualization platform designed to represent real-time capital trajectories, dynamic telemetry, and secure numerical structures.",
    color: "#10b981",
    glowColor: "#059669",
    radius: 2.0,
    orbitRadius: 48,
    orbitSpeed: 0.05,
    rotationSpeed: 0.015,
    planetType: "fintech_matrix",
    metrics: [
      { label: "DOMAIN", value: "FinTech" },
      { label: "DATA ARCHITECTURE", value: "Stream Analytics" },
      { label: "VISUALIZATION", value: "Vector Dynamics" },
      { label: "SECURITY MODEL", value: "Encrypted State" }
    ],
    capabilities: [
      "Real-time dynamic financial stream visualization",
      "Interactive vector graphs and financial trend surfaces",
      "Secure data stream representation",
      "Multi-dimensional financial telemetry analysis"
    ],
    techStack: [
      "Quantitative Analytics",
      "Financial Data Structures",
      "React",
      "API Integrations",
      "Vector Visualization"
    ],
    architectureLayers: [
      { name: "DATA STREAM INGESTION", details: "Buffers high-frequency numeric streams for vector rendering." },
      { name: "FINANCIAL VECTOR GRAPH", details: "Transforms numeric matrix streams into dynamic 3D topographical waveforms." }
    ],
    holographicStatus: "CAPITAL STREAM // SYNCHRONIZED",
    githubUrl: "https://github.com/Aaradhy1609"
  }
];
