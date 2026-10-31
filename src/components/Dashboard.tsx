import React from 'react';
import { Entity } from '../types';
import { 
  Briefcase, 
  ChevronRight, 
  Compass, 
  Trash2, 
  Award, 
  Zap, 
  ShieldAlert, 
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  Heart,
  Leaf,
  FileText,
  Lightbulb
} from 'lucide-react';
import RadarTelarana from './RadarTelarana';

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
  selectedEntityId,
  onSelectEntity,
  onDeleteEntity,
  onOpenCreateModal,
  onChangeTab,
}: DashboardProps) {
  const activeEntity = entities.find((e) => e.id === selectedEntityId) || entities[0];
  const lastIter = activeEntity?.iterations?.[activeEntity.iterations.length - 1];

  const getStepLabel = (step: string) => {
    switch (step) {
      case 'diagnostico': return '1. Potencial y Realidad';
      case 'medicion': return '2. Medición 3D';
      case 'priorizacion': return '3. Matriz Prioridades';
      case 'ruta': return '4. Ruta de Desarrollo';
      case 'completo': return '5. Incubación Completa';
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
    <div className="space-y-8 py-4">
      {/* SaaS Hero Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-md">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-12">
          <Compass className="w-96 h-96 text-white" />
        </div>
        
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 bg-emerald-800/80 border border-emerald-700 text-emerald-200 px-3 py-1 rounded-full text-xs font-mono font-medium">
              <Lightbulb className="h-3.5 w-3.5 text-amber-300" />
              <span>BANCO DE LAS IDEAS</span>
            </span>
            <span className="inline-flex items-center space-x-1 bg-white/10 text-emerald-100 px-2.5 py-1 rounded-full text-[11px] font-mono">
              <span>Gobernanza Digital & Ley BIC</span>
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-white leading-tight">
            Incubación y Desarrollo Integral Socioambiental
          </h2>
          
          <p className="text-emerald-100/85 text-xs sm:text-sm md:text-base font-sans leading-relaxed">
            Plataforma SaaS fundamentada 100% en el libro <strong>"Método RAS³: Reingeniería Administrativa Sostenible"</strong> de Herbert Gamarra. 
            Reemplaza el viejo análisis FODA por el protocolo <strong>P-R-O-M-P-T</strong>, guiado por tu <strong>Visir Digital</strong> para armonizar la gestión Administrativa, Humana y Sostenible (Económica, Social, Ambiental y Cultural).
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              id="dash-btn-create-first"
              onClick={onOpenCreateModal}
              className="bg-white hover:bg-emerald-50 text-emerald-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center space-x-1.5"
            >
              <Sparkles className="h-4 w-4 text-emerald-700" />
              <span>Incubar Nueva Idea / Negocio</span>
            </button>
            <button 
              onClick={() => onChangeTab('herramientas')}
              className="border border-white/30 hover:border-white/70 bg-white/5 text-white font-medium px-4 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-1.5"
            >
              <Layers className="h-4 w-4" />
              <span>Herramientas & Checklists RAS³</span>
            </button>
            <button 
              onClick={() => onChangeTab('chat')}
              className="border border-emerald-400/40 hover:border-emerald-300 bg-emerald-800/30 text-emerald-200 font-medium px-4 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-1.5"
            >
              <Zap className="h-4 w-4 text-amber-300" />
              <span>Consultar al Visir Digital</span>
            </button>
          </div>
        </div>
      </div>

      {/* Protocol P-R-O-M-P-T Visual Flow Tracker */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
          <span className="text-xs font-mono font-bold text-gray-700 uppercase tracking-wider flex items-center space-x-1.5">
            <Compass className="h-4 w-4 text-emerald-700" />
            <span>Protocolo Universal RAS³ (Capítulo 24 del Libro)</span>
          </span>
          <span className="text-[11px] font-sans text-gray-400 hidden sm:inline">
            P (Potencial) ──&gt; R (Realidad) ──&gt; O (Objetivo) ──&gt; M (Medición) ──&gt; P (Prioridades) ──&gt; T (Toma de Decisiones)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { step: 'P', title: 'Potencial', desc: 'Capacidades latentes', tab: 'analizar', color: 'border-emerald-200 bg-emerald-50/50 text-emerald-900' },
            { step: 'R', title: 'Realidad', desc: 'Aciertos y Mejoras', tab: 'analizar', color: 'border-teal-200 bg-teal-50/50 text-teal-900' },
            { step: 'O', title: 'Objetivo', desc: 'Capacidad superior', tab: 'analizar', color: 'border-blue-200 bg-blue-50/50 text-blue-900' },
            { step: 'M', title: 'Medición', desc: 'Mido, luego existo', tab: 'medir', color: 'border-indigo-200 bg-indigo-50/50 text-indigo-900' },
            { step: 'P', title: 'Prioridades', desc: 'Efecto multiplicador', tab: 'priorizar', color: 'border-purple-200 bg-purple-50/50 text-purple-900' },
            { step: 'T', title: 'Ruta (Toma)', desc: 'Cronograma dinámico', tab: 'ruta', color: 'border-emerald-300 bg-emerald-100/60 text-emerald-950 font-bold' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => onChangeTab(item.tab)}
              className={`p-3 rounded-xl border text-left transition-all hover:shadow-xs flex flex-col justify-between ${item.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-white font-mono font-bold text-xs flex items-center justify-center shadow-2xs">
                  {item.step}
                </span>
                <ChevronRight className="h-3 w-3 opacity-60" />
              </div>
              <div className="mt-2">
                <p className="text-xs font-serif font-bold leading-tight">{item.title}</p>
                <p className="text-[10px] text-gray-500 font-sans mt-0.5">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Active Project Balance Radar + Entities Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Entity Radar & Status (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold">
                  DIAGRAMA RADIAL (Capítulo 14)
                </span>
                <h3 className="text-base font-serif font-bold text-gray-900">
                  Telaraña RAS³: Equilibrio Multidimensional
                </h3>
              </div>
              {activeEntity && (
                <span className="text-xs font-mono bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full font-bold">
                  {activeEntity.name}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-500 font-sans">
              "El desarrollo integral no consiste en crecer más, sino en crecer equilibradamente en las 3 dimensiones." Muestra el balance entre administración, bienestar humano y los 4 pilares de sostenibilidad.
            </p>

            {/* Radar Component */}
            <div className="pt-2">
              <RadarTelarana scores={lastIter?.radarScores} height={280} showDetails={true} />
            </div>

            {activeEntity && (
              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <button
                  onClick={() => onChangeTab('reporte')}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>Ver Dossier de Inversión</span>
                </button>
                <button
                  onClick={() => onChangeTab('analizar')}
                  className="inline-flex items-center space-x-1 text-xs font-bold bg-emerald-800 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-900 transition-colors shadow-2xs"
                >
                  <span>Optimizar Ruta</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Incubator Portfolio / Ideas Bank (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 font-serif">
                Portafolio del Banco de las Ideas
              </h3>
              <p className="text-xs text-gray-500">
                Proyectos, empresas y emprendimientos en incubación continua bajo RAS³
              </p>
            </div>
            {entities.length > 0 && (
              <span className="text-xs font-mono bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-1 rounded-full font-semibold">
                {entities.length} {entities.length === 1 ? 'PROYECTO' : 'PROYECTOS'}
              </span>
            )}
          </div>

          {entities.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-emerald-50 rounded-full text-emerald-800">
                <Briefcase className="h-10 w-10" />
              </div>
              <div className="max-w-md space-y-2">
                <h4 className="text-base font-serif font-semibold text-gray-900">
                  Tu Banco de Ideas está listo para iniciar
                </h4>
                <p className="text-xs text-gray-500 font-sans">
                  Registra tu primera iniciativa de impacto socioambiental. El Visir Digital te guiará para formular el potencial, la realidad y tu Ruta de Desarrollo.
                </p>
              </div>
              <button
                id="dash-btn-add-empty"
                onClick={onOpenCreateModal}
                className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                Registrar primer Proyecto
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entities.map((entity) => {
                const isSelected = entity.id === activeEntity?.id;
                return (
                  <div
                    key={entity.id}
                    onClick={() => onSelectEntity(entity.id)}
                    className={`bg-white border rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4 cursor-pointer ${
                      isSelected ? 'border-emerald-600 ring-2 ring-emerald-600/10' : 'border-gray-100 hover:border-emerald-200'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="pr-2">
                          <h4 className="font-serif font-bold text-gray-900 text-base line-clamp-1">
                            {entity.name}
                          </h4>
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                            {entity.sector || 'Impacto Socioambiental'}
                          </span>
                        </div>
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
                      
                      <p className="text-xs text-gray-500 line-clamp-2 min-h-[2.5rem] leading-relaxed">
                        {entity.description || 'Sin descripción adicional.'}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-gray-400">FASE PROMPT:</span>
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

                    <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-auto">
                      <div className="flex items-center space-x-2">
                        <div className="text-center bg-emerald-50 text-emerald-800 py-1 px-2.5 rounded-lg border border-emerald-100/50">
                          <span className="block text-xs font-bold leading-none">{entity.level}%</span>
                          <span className="text-[8px] font-mono tracking-widest text-emerald-600">MADUREZ</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEntity(entity.id);
                          if (entity.currentStep === 'diagnostico') onChangeTab('analizar');
                          else if (entity.currentStep === 'medicion') onChangeTab('medir');
                          else if (entity.currentStep === 'priorizacion') onChangeTab('priorizar');
                          else onChangeTab('ruta');
                        }}
                        className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                      >
                        <span>Gestionar</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Three Dimensions Guide Box */}
          <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-mono font-bold text-gray-900 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>Las 3 Dimensiones Inseparables del Desarrollo (Capítulo 6)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-2xs">
                <span className="text-xs font-bold text-amber-800 block">1. Administrativa</span>
                <p className="text-[11px] text-gray-500 mt-1 leading-normal">
                  Estructuración inteligente de recursos, procesos, finanzas y gobernanza.
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-2xs">
                <span className="text-xs font-bold text-indigo-800 block">2. Humana</span>
                <p className="text-[11px] text-gray-500 mt-1 leading-normal">
                  Bienestar del líder y equipo, pausas activas, comunicación horizontal y salud integral.
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-2xs">
                <span className="text-xs font-bold text-emerald-800 block">3. Sostenible</span>
                <p className="text-[11px] text-gray-500 mt-1 leading-normal">
                  4 pilares inseparables: Económico, Social, Ambiental y Cultural (Ley BIC).
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
