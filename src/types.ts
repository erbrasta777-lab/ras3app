export interface Entity {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  level: number; // 0 to 100 level of maturity in RAS³
  currentStep: 'diagnostico' | 'medicion' | 'priorizacion' | 'ruta' | 'completo';
  iterations: Iteration[];
  sector?: string;
  scale?: string;
  challenge?: string;
  category?: 'startup' | 'microempresa' | 'ong' | 'municipalidad' | 'universidad' | 'empresa_familiar' | 'cooperativa' | 'proyecto_personal';
}

export interface Iteration {
  id: string;
  version: number;
  date: string;
  diagnosis?: Diagnosis;
  kpiDimension?: KPIDimension;
  priorities?: PriorityAction[];
  route?: DevelopmentRoute;
  radarScores?: RadarScores;
  motorMeta?: MotorMeta;
  bicGovernance?: BICGovernance;
}

export interface MotorMeta {
  motor: string; // ¿Qué impulso o convicción pone en movimiento la entidad?
  meta: string; // ¿Hacia dónde se orienta el desarrollo?
  precio: string; // ¿Qué esfuerzo, disciplina o inversión asume la entidad?
  premio: string; // Las capacidades adquiridas y valor generado durante el proceso
}

export interface BICGovernance {
  propositoSocioambiental: string; // Propósito de triple impacto alineado a Ley BIC
  beneficiarios: string; // Comunidades o grupos de interés impactados
  modeloImpacto: string; // Cómo se genera valor económico, social, ambiental y cultural
}

export interface RadarScores {
  administrativa: number; // 0 - 100
  humana: number; // 0 - 100
  economica: number; // 0 - 100
  social: number; // 0 - 100
  ambiental: number; // 0 - 100
  cultural: number; // 0 - 100
}

export interface Diagnosis {
  potencial: string;
  realidad: string;
  aciertos: string[];
  oportunidades_mejora: string[];
  objetivo?: {
    estadoSuperior: string;
    capacidadesADesarrollar: string;
  };
}

export interface KPI {
  id: string;
  name: string;
  baseline: string; // situación actual
  target: string; // meta
  status: 'pendiente' | 'en_progreso' | 'logrado';
  evidence?: string;
  pilar?: 'administrativo' | 'humano' | 'economico' | 'social' | 'ambiental' | 'cultural';
}

export interface KPIDimension {
  administrativa: KPI[];
  humana: KPI[];
  sostenible: KPI[];
}

export interface PriorityAction {
  id: string;
  oportunidad: string;
  impactoAdministrativo: 'bajo' | 'medio' | 'alto';
  impactoHumano: 'bajo' | 'medio' | 'alto';
  impactoSostenible: 'bajo' | 'medio' | 'alto';
  justificacion: string;
  puntuacion: number; // 1-10 priority score
  efectoMultiplicador?: string; // Por qué apalanca las tres dimensiones simultáneamente
}

export interface RouteStage {
  nombre: string;
  accion: string;
  responsable: string;
  tiempo: string;
  indicador: string;
  recursos: {
    humanos?: string;
    materiales?: string;
    financieros?: string;
    tecnologicos?: string;
  };
}

export interface DevelopmentRoute {
  etapas: RouteStage[];
  realidadEsperada: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'visir';
  text: string;
  timestamp: string;
}

export interface ScenarioSimulation {
  id: string;
  scenario: string;
  impactoAdministrativo: string;
  impactoHumano: string;
  impactoSostenible: string;
  recomendacionVisir: string;
  viabilidad: 'alta' | 'media' | 'prudente';
}
