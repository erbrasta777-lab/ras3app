import React, { useState } from 'react';
import { Entity, PriorityAction } from '../types';
import { Award, Zap, Compass, Star, ChevronRight, ArrowLeft, ArrowUpRight, CheckCircle2, Shield } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface PriorizarProps {
  entity: Entity;
  onSavePriorities: (priorities: PriorityAction[]) => void;
  onBack: () => void;
  onChangeTab: (tab: string) => void;
}

export default function Priorizar({ entity, onSavePriorities, onBack, onChangeTab }: PriorizarProps) {
  const currentIteration = entity.iterations[entity.iterations.length - 1];
  
  // Use existing priorities or fallback
  const [priorities, setPriorities] = useState<PriorityAction[]>(
    currentIteration?.priorities || []
  );

  const getImpactBadgeStyle = (impact: 'bajo' | 'medio' | 'alto') => {
    switch (impact) {
      case 'bajo': return 'bg-gray-100 text-gray-700';
      case 'medio': return 'bg-indigo-50 text-indigo-700 border border-indigo-100/50';
      case 'alto': return 'bg-emerald-50 text-emerald-800 border border-emerald-100/50';
    }
  };

  const handleUpdateScore = (id: string, newScore: number) => {
    setPriorities((prev) =>
      prev.map((item) => (item.id === id ? { ...item, puntuacion: newScore } : item))
    );
  };

  const handleSaveAndContinue = () => {
    onSavePriorities(priorities);
    onChangeTab('ruta');
  };

  // Compute average metrics for the radar chart based on priorities
  const radarData = [
    {
      subject: 'Administrativo',
      A: priorities.reduce((acc, p) => acc + (p.impactoAdministrativo === 'alto' ? 9 : p.impactoAdministrativo === 'medio' ? 5 : 2), 0) / (priorities.length || 1),
      fullMark: 10,
    },
    {
      subject: 'Humano',
      A: priorities.reduce((acc, p) => acc + (p.impactoHumano === 'alto' ? 9 : p.impactoHumano === 'medio' ? 5 : 2), 0) / (priorities.length || 1),
      fullMark: 10,
    },
    {
      subject: 'Sostenible',
      A: priorities.reduce((acc, p) => acc + (p.impactoSostenible === 'alto' ? 9 : p.impactoSostenible === 'medio' ? 5 : 2), 0) / (priorities.length || 1),
      fullMark: 10,
    },
  ];

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-serif">Módulo Priorizar: Matriz de Prioridades</h3>
          <p className="text-xs text-gray-500 font-sans">
            Evalúa el efecto multiplicador de cada acción y determina el orden de ejecución para un Desarrollo Integral.
          </p>
        </div>
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-1 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-xs hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Volver a KPIs</span>
        </button>
      </div>

      {/* Grid: Priorities vs Balanced Radar Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Interactive Priorities List */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-900 font-serif">Oportunidades Evaluadas</h4>
            <span className="text-[10px] text-gray-500 font-mono tracking-widest">ORDENADAS POR VISIR</span>
          </div>

          {priorities.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-400 text-xs font-serif italic">
              No hay oportunidades de mejora para priorizar. Primero completa el módulo Analizar.
            </div>
          ) : (
            <div className="space-y-4">
              {priorities
                .sort((a, b) => b.puntuacion - a.puntuacion) // sort descending by priority score
                .map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-100 rounded-xl p-5 shadow-3xs space-y-4 hover:border-emerald-100 transition-colors relative"
                  >
                    {/* Position indicator badge */}
                    <div className="absolute right-4 top-4 flex items-center space-x-1 bg-emerald-50 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold font-mono">
                      <span># {index + 1}</span>
                    </div>

                    <div className="space-y-1 pr-12">
                      <span className="inline-flex items-center space-x-1 text-[10px] font-mono text-emerald-700 uppercase">
                        <ArrowUpRight className="h-3 w-3" />
                        <span>Oportunidad de desarrollo</span>
                      </span>
                      <h5 className="text-xs font-bold text-gray-900 font-serif">{item.oportunidad}</h5>
                    </div>

                    {/* Impact scores across 3 dimensions */}
                    <div className="grid grid-cols-3 gap-2 py-1 bg-gray-50/50 p-2 rounded-lg border border-gray-50">
                      <div className="text-center space-y-1">
                        <span className="text-[8px] text-gray-400 font-mono block">ADM</span>
                        <span className={`inline-block text-[9px] px-2 py-0.5 rounded-full font-medium capitalize ${getImpactBadgeStyle(item.impactoAdministrativo)}`}>
                          {item.impactoAdministrativo}
                        </span>
                      </div>
                      <div className="text-center space-y-1">
                        <span className="text-[8px] text-gray-400 font-mono block">HUMANO</span>
                        <span className={`inline-block text-[9px] px-2 py-0.5 rounded-full font-medium capitalize ${getImpactBadgeStyle(item.impactoHumano)}`}>
                          {item.impactoHumano}
                        </span>
                      </div>
                      <div className="text-center space-y-1">
                        <span className="text-[8px] text-gray-400 font-mono block">SOSTENIBLE</span>
                        <span className={`inline-block text-[9px] px-2 py-0.5 rounded-full font-medium capitalize ${getImpactBadgeStyle(item.impactoSostenible)}`}>
                          {item.impactoSostenible}
                        </span>
                      </div>
                    </div>

                    {/* Justification */}
                    <p className="text-[11px] text-gray-600 leading-relaxed italic bg-emerald-50/10 p-3 rounded-lg border border-emerald-100/10">
                      <strong>Fundamento del Visir:</strong> {item.justificacion}
                    </p>

                    {/* Priority rating slider */}
                    <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-gray-400 font-mono">PUNTUACIÓN DE PRIORIDAD:</span>
                        <span className="text-xs font-bold text-gray-800 font-mono">{item.puntuacion} / 10</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleUpdateScore(item.id, star)}
                            className="focus:outline-none transition-colors"
                          >
                            <Star
                              className={`h-3.5 w-3.5 ${
                                star <= item.puntuacion
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-gray-200 hover:text-amber-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Right Column: Radar Analysis & Method Summary */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-3xs space-y-4">
            <h4 className="text-xs font-bold text-gray-900 font-mono tracking-wider uppercase border-b border-gray-50 pb-2">
              EQUILIBRIO DE IMPACTO PROMEDIO
            </h4>

            {priorities.length > 0 ? (
              <div className="h-64 flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#f1f5f9" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10, fontFamily: 'monospace' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: '#94a3b8', fontSize: 8 }} />
                    <Radar
                      name={entity.name}
                      dataKey="A"
                      stroke="#065f46"
                      fill="#10b981"
                      fillOpacity={0.2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-xs text-gray-400 font-serif italic text-center py-10">Sin datos de equilibrio suficientes.</p>
            )}

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-2 text-[10px] leading-relaxed text-gray-500">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1" />
                <span>
                  El gráfico muestra el balance del impacto esperado de tus oportunidades. Buscamos armonía y sinergia, no extremos.
                </span>
              </div>
              <div className="flex items-start space-x-2 text-[10px] leading-relaxed text-gray-500">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1" />
                <span>
                  Una oportunidad con alto impacto en las tres dimensiones tiene un efecto multiplicador mayor en el Desarrollo Integral.
                </span>
              </div>
            </div>
          </div>

          {/* Book Principles Reflection */}
          <div className="bg-emerald-950 text-white rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold font-mono tracking-wider uppercase flex items-center space-x-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>La prioridad nace del análisis</span>
            </h4>
            <p className="text-[11px] text-emerald-100/80 leading-relaxed font-sans">
              "Con frecuencia se piensa que una prioridad depende de la urgencia. No necesariamente. Una acción urgente puede aportar muy poco al desarrollo, mientras otra menos urgente puede transformar profundamente una entidad. Por ello, la prioridad no debe surgir de la presión. Debe surgir del análisis."
            </p>
          </div>
        </div>

      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          onClick={handleSaveAndContinue}
          className="inline-flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-900 text-white font-medium px-5 py-2 rounded-lg text-xs transition-colors shadow-xs"
        >
          <span>Guardar Prioridades y Diseñar la Ruta</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
