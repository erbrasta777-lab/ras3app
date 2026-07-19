import React from 'react';
import { Entity } from '../types';
import { Briefcase, ChevronRight, Compass, Trash2, Award, Zap, ShieldAlert, Sparkles } from 'lucide-react';

interface DashboardProps {
  entities: Entity[];
  selectedEntityId: string;
  onSelectEntity: (id: string) => void;
  onDeleteEntity: (id: string) => void;
  onOpenCreateModal: () => void;
  onChangeTab: (tab: string) => void;
}

export default function Dashboard({
  entities,
  onSelectEntity,
  onDeleteEntity,
  onOpenCreateModal,
  onChangeTab,
}: DashboardProps) {
  
  const getStepLabel = (step: string) => {
    switch (step) {
      case 'diagnostico': return 'Diagnóstico (Analizar)';
      case 'medicion': return 'Medición (Indicadores)';
      case 'priorizacion': return 'Priorización (Matriz)';
      case 'ruta': return 'Ruta de Desarrollo';
      case 'completo': return 'Desarrollo Completo';
      default: return 'No iniciado';
    }
  };

  const getStepProgressColor = (step: string) => {
    switch (step) {
      case 'diagnostico': return 'bg-amber-500';
      case 'medicion': return 'bg-indigo-500';
      case 'priorizacion': return 'bg-purple-500';
      case 'ruta': return 'bg-emerald-600';
      case 'completo': return 'bg-emerald-800';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="space-y-10 py-6">
      {/* Editorial Header Hero Banner */}
      <div className="bg-emerald-950 text-white rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-md">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-12">
          <Compass className="w-96 h-96 text-white" />
        </div>
        
        <div className="max-w-2xl relative z-10 space-y-4">
          <span className="inline-flex items-center space-x-1 bg-emerald-800 text-emerald-100 px-2.5 py-1 rounded-full text-xs font-mono font-medium">
            <Sparkles className="h-3 w-3" />
            <span>Enfoque Científico Práctico</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-white">
            Mide, prioriza y transforma tu organización
          </h2>
          <p className="text-emerald-100/80 text-sm md:text-base font-sans">
            Bienvenido al Método <strong>RAS³</strong> de Reingeniería Administrativa Sostenible. 
            No es un análisis FODA tradicional; es una estructura de desarrollo integral basada en 
            identificar el <strong>Potencial</strong>, diagnosticar la <strong>Realidad</strong> y guiarte con ayuda de tu <strong>Visir Digital</strong>.
          </p>
          <div className="pt-4 flex flex-wrap gap-3">
            <button
              id="dash-btn-create-first"
              onClick={onOpenCreateModal}
              className="bg-white hover:bg-gray-50 text-emerald-950 font-medium px-4 py-2 rounded-lg text-xs transition-all shadow-sm"
            >
              Comenzar Nueva Ruta
            </button>
            <a 
              href="#metodo-details"
              className="border border-white/30 hover:border-white/60 text-white font-medium px-4 py-2 rounded-lg text-xs transition-all"
            >
              Aprender más del Método
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Businesses List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 font-serif">Mis Negocios & Proyectos</h3>
              <p className="text-xs text-gray-500">Gestión de tus entidades activas en el ciclo de Reingeniería Sostenible</p>
            </div>
            {entities.length > 0 && (
              <span className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded-sm">
                TOTAL: {entities.length}
              </span>
            )}
          </div>

          {entities.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-200 rounded-xl p-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-emerald-50 rounded-full text-emerald-800">
                <Briefcase className="h-10 w-10" />
              </div>
              <div className="max-w-md space-y-2">
                <h4 className="text-base font-serif font-semibold text-gray-900">Aún no has registrado ninguna entidad</h4>
                <p className="text-xs text-gray-500 font-sans">
                  Puedes registrar una empresa, una ONG, una municipalidad, una startup o incluso tu propio proyecto personal para iniciar el diagnóstico con tu Visir Digital.
                </p>
              </div>
              <button
                id="dash-btn-add-empty"
                onClick={onOpenCreateModal}
                className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium px-4 py-2 rounded-lg shadow-xs transition-colors"
              >
                Añadir primer Negocio
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entities.map((entity) => (
                <div
                  key={entity.id}
                  className="bg-white border border-gray-100 hover:border-emerald-100 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif font-bold text-gray-900 text-base line-clamp-1">{entity.name}</h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`¿Estás seguro de eliminar "${entity.name}"? Se perderán todos sus diagnósticos e historial.`)) {
                            onDeleteEntity(entity.id);
                          }
                        }}
                        className="text-gray-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                        title="Eliminar entidad"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <p className="text-xs text-gray-500 line-clamp-2 min-h-[2.5rem]">
                      {entity.description || 'Sin descripción adicional.'}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-gray-400">PASO ACTUAL:</span>
                      <span className="font-semibold text-gray-700">{getStepLabel(entity.currentStep)}</span>
                    </div>

                    {/* Step progress bar */}
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getStepProgressColor(entity.currentStep)} transition-all`} 
                        style={{
                          width: entity.currentStep === 'diagnostico' ? '25%' :
                                 entity.currentStep === 'medicion' ? '50%' :
                                 entity.currentStep === 'priorizacion' ? '75%' : '100%'
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                    <div className="flex items-center space-x-2">
                      <div className="text-center bg-emerald-50 text-emerald-800 py-1 px-2.5 rounded-lg border border-emerald-100/50">
                        <span className="block text-xs font-bold leading-none">{entity.level}%</span>
                        <span className="text-[8px] font-mono tracking-widest text-emerald-600">NIVEL</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSelectEntity(entity.id);
                        if (entity.currentStep === 'diagnostico') onChangeTab('analizar');
                        else if (entity.currentStep === 'medicion') onChangeTab('medir');
                        else if (entity.currentStep === 'priorizacion') onChangeTab('priorizar');
                        else onChangeTab('ruta');
                      }}
                      className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-800 hover:text-emerald-900 transition-colors"
                    >
                      <span>Gestionar</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Key Metodology Details */}
        <div id="metodo-details" className="space-y-6 bg-gray-50/50 border border-gray-100 rounded-xl p-6">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900 font-serif">Las 3 Dimensiones del Desarrollo</h3>
            <p className="text-xs text-gray-500">Todo crecimiento sostenible requiere equilibrar:</p>
          </div>

          <div className="space-y-4 pt-2">
            {/* Dim 1 */}
            <div className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow-2xs">
              <div className="p-2 bg-amber-50 rounded-lg text-amber-800 mt-0.5">
                <Zap className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-gray-900">Dimensión Administrativa</h4>
                <p className="text-[11px] text-gray-500 leading-normal">
                  Estructuración, procesos, finanzas y control estratégico de recursos para garantizar efectividad.
                </p>
              </div>
            </div>

            {/* Dim 2 */}
            <div className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow-2xs">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-800 mt-0.5">
                <Award className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-gray-900">Dimensión Humana</h4>
                <p className="text-[11px] text-gray-500 leading-normal">
                  Bienestar integral, desarrollo del talento, cultura, comunicación efectiva y resiliencia emocional.
                </p>
              </div>
            </div>

            {/* Dim 3 */}
            <div className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow-2xs">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-800 mt-0.5">
                <Compass className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-gray-900">Dimensión Sostenible</h4>
                <p className="text-[11px] text-gray-500 leading-normal">
                  Equilibrio de los cuatro pilares: Sostenibilidad ambiental, social, económica y preservación cultural.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-3">
            <h4 className="text-xs font-bold text-gray-900 font-serif flex items-center space-x-1.5">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
              <span>Diferencia con el FODA Tradicional</span>
            </h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              El análisis FODA tradicional fragmenta la realidad en internos/externos de forma estática. 
              <strong> RAS³</strong> se enfoca únicamente en <strong>Aciertos</strong> (que se conservan y fortalecen) 
              y <strong>Oportunidades de Mejora</strong> (el potencial que aún se puede desarrollar), 
              reconociendo que el desarrollo no es una meta final, sino una evolución continua.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
