import type { TimelineData } from '../types';

export const TIMELINE_DATA: Record<'past' | 'present' | 'future', TimelineData> = {
  past: {
    era: "past",
    title: "FOUNDATIONAL HORIZON // THE GENESIS",
    subtitle: "Academic Rigor & Early Experimentation",
    statusBadge: "TEMPORAL ARCHIVE // VERIFIED",
    coordinates: "SECTOR -01 // EPOCH 2024–2025",
    description: "The beginning of the engineering journey. Driven by curiosity in mathematics, core computation, and algorithmic logic, building a disciplined foundation.",
    highlights: [
      "Consistently performed among the top academic students in school and university.",
      "Secured admission into B.Tech Artificial Intelligence & Machine Learning at University School of Automation & Robotics (USAR).",
      "Maintained top-tier academic standing with CGPA consistently above 9.0 (close to 9.5).",
      "Mastered fundamental programming paradigms across C, C++, Python, and Object-Oriented Java.",
      "Initiated deep study into predictive statistics, database normalization, and algorithmic complexity."
    ],
    quote: "Foundations are forged through consistent curiosity and academic discipline."
  },
  present: {
    era: "present",
    title: "ACTIVE ORBIT // SYSTEM BUILDER",
    subtitle: "AI/ML Systems, Real-World Software & Hackathons",
    statusBadge: "CURRENT ORBIT // ACTIVE TELEMETRY",
    coordinates: "SECTOR 00 // EPOCH 2025–CURRENT",
    description: "The core active development sector. Transforming algorithmic and machine learning concepts into production-grade systems while testing engineering speed and collaboration in competitive hackathons.",
    highlights: [
      "Architected VAAYU: Deep ensemble atmospheric forecasting platform predicting 72-hour pollution dynamics with 85–90% accuracy.",
      "Engineered high-throughput backend services using FastAPI, PostgreSQL, PostGIS, Pydantic, and Uvicorn.",
      "Competed across intensive hackathons: AZINHACK, VibeClash, Zennith, Smart India Hackathon, CodeYourCult, Build With, and RunawaySDK.",
      "Conceptualized security and surveillance platforms (CRIME RADAR), EdTech systems (IXORA), and FinTech data models (FINAVRIA).",
      "Sustaining exceptional academic performance (> 9.0 CGPA) while building real-world software systems."
    ],
    quote: "I learn technology by building with it."
  },
  future: {
    era: "future",
    title: "UNEXPLORED SECTOR // TRAJECTORY 2029+",
    subtitle: "Useful Real-World AI & Scalable Systems",
    statusBadge: "DESTINATION: STILL EVOLVING // TRAJECTORY: CALCULATING...",
    coordinates: "SECTOR +01 // UNEXPLORED HORIZON",
    description: "A vast, open expanse. The future is not a predetermined destination, but an active pursuit of building intelligent technology that transitions beyond laboratory experiments to solve tangible, real-world problems.",
    highlights: [
      "Building intelligent systems that move beyond experiments into real-world utility.",
      "Deepening expertise in large-scale machine learning, autonomous systems, and distributed infrastructure.",
      "Graduating in B.Tech Artificial Intelligence & Machine Learning (Class of 2029).",
      "Continuing to compete, learn, and push technical boundaries."
    ],
    philosophy: [
      "LEARN",
      "BUILD",
      "EXPERIMENT",
      "COMPETE",
      "IMPROVE",
      "BUILD AGAIN"
    ],
    quote: "The future is an unwritten sector — waiting to be built."
  }
};
