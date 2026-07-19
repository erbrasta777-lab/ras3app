export interface Entity {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  level: number; // calculated level (e.g. 0 to 100) based on completing steps and KPIs met
  currentStep: 'diagnostico' | 'medicion' | 'priorizacion' | 'ruta' | 'completo';
  iterations: Iteration[];
}

export interface Iteration {
  id: string;
  version: number;
  date: string;
  diagnosis?: Diagnosis;
  kpiDimension?: KPIDimension;
  priorities?: PriorityAction[];
  route?: DevelopmentRoute;
}

export interface Diagnosis {
  potencial: string;
  realidad: string;
  aciertos: string[];
  oportunidades_mejora: string[];
}

export interface KPI {
  id: string;
  name: string;
  baseline: string; // situación actual
  target: string; // meta
  status: 'pendiente' | 'en_progreso' | 'logrado';
  evidence?: string;
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
