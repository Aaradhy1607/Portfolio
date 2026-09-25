export type TimelineEra = 'past' | 'present' | 'future';

export type NavigationTarget = 
  | 'cockpit'
  | 'universe'
  | 'identity'
  | 'temporal_core'
  | 'project_system'
  | 'planet_vaayu'
  | 'planet_crime_radar'
  | 'planet_ixora'
  | 'planet_finavria'
  | 'skill_constellation'
  | 'mission_log'
  | 'communication';

export interface ProjectData {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  systemModel?: string;
  objective: string;
  description: string;
  color: string;
  glowColor: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  planetType: 'storm_gas' | 'cyber_surveillance' | 'edtech_knowledge' | 'fintech_matrix';
  metrics?: { label: string; value: string }[];
  capabilities?: string[];
  techStack: string[];
  architectureLayers?: { name: string; details: string }[];
  holographicStatus: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'programming' | 'aiml' | 'backend' | 'database' | 'geospatial' | 'tools' | 'interactive';
  position: [number, number, number];
  color: string;
  whyItMatters: string;
  whereItIsUsed: string;
  relatedProjects: string[];
  connectedTo: string[];
}

export interface MissionLog {
  id: string;
  missionCode: string;
  title: string;
  status: 'COMPLETED' | 'ARCHIVED' | 'IN_ORBIT';
  category: 'HACKATHON' | 'MILESTONE' | 'ACADEMIC';
  objective: string;
  context: string;
  year?: string;
}

export interface TimelineData {
  era: TimelineEra;
  title: string;
  subtitle: string;
  description: string;
  statusBadge: string;
  coordinates: string;
  highlights: string[];
  quote?: string;
  philosophy?: string[];
}
