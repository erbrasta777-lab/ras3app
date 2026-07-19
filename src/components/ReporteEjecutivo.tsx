import React from 'react';
import { Entity } from '../types';
import { 
  FileText, 
  Triangle, 
  Circle, 
  Diamond, 
  Square, 
  Play, 
  ArrowRight, 
  Award, 
  Zap, 
  Compass, 
  Users, 
  Package, 
  DollarSign, 
  Laptop, 
  Printer
} from 'lucide-react';

interface ReporteEjecutivoProps {
  entity: Entity;
  onExportPDF: (entity: Entity) => void;
  onBack: () => void;
}

export default function ReporteEjecutivo({ entity, onExportPDF, onBack }: ReporteEjecutivoProps) {
  const lastIter = entity.iterations[entity.iterations.length - 1];
  const diagnosis = lastIter?.diagnosis;
  const kpis = lastIter?.kpiDimension;
  const priorities = lastIter?.priorities || [];
  const route = lastIter?.route;

  const totalKPIs = (kpis?.administrativa?.length || 0) + 
                    (kpis?.humana?.length || 0) + 
                    (kpis?.sostenible?.length || 0);

  return (
    <div className="space-y-8 py-6">
      
      {/* Header Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <h3 className="text-2xl font-serif font-bold text-gray-900">
            Resultado Ejecutivo: Método RAS³
          </h3>
          <p className="text-sm text-gray-500 font-sans mt-1">
            Consolidado estratégico para el desarrollo integral de <strong className="text-emerald-950">{entity.name}</strong>.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-1 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-xs hover:bg-gray-50 transition-colors font-medium"
          >
            <span>Volver al Dashboard</span>
          </button>
          
          <button
            onClick={() => onExportPDF(entity)}
            className="inline-flex items-center space-x-2 bg-emerald-800 text-white hover:bg-emerald-900 px-5 py-2 rounded-lg text-xs font-semibold transition-all shadow-md"
            title="Descargar Reporte Ejecutivo en PDF"
          >
            <Printer className="h-4 w-4" />
            <span>Descargar PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 6 Pillars of the RAS3 Method */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Pillar 1: Potencial Primero */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4 hover:border-emerald-100 transition-colors">
          <div className="flex items-center space-x-3 border-b border-gray-50 pb-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl">
              <Triangle className="h-5 w-5 stroke-[1.5]" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 tracking-wider uppercase block">Pilar 1</span>
              <h4 className="text-base font-bold text-gray-900 font-serif">Potencial Primero</h4>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 font-serif italic bg-emerald-50/30 border-l-4 border-emerald-800 p-4 rounded-r-xl leading-relaxed">
            {diagnosis?.potencial ? `"${diagnosis.potencial}"` : 'Aún no se ha definido el potencial primero de la organización en el diagnóstico.'}
          </p>
          
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Comienza por lo que puedes llegar a ser. El desarrollo integral nace de la convicción del potencial, expandiendo el límite de la capacidad organizativa.
          </p>
        </div>

        {/* Pillar 2: Realidad de Partida */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4 hover:border-emerald-100 transition-colors">
          <div className="flex items-center space-x-3 border-b border-gray-50 pb-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl">
              <Circle className="h-5 w-5 stroke-[1.5]" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 tracking-wider uppercase block">Pilar 2</span>
              <h4 className="text-base font-bold text-gray-900 font-serif">Realidad como Punto de Partida</h4>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-gray-600 leading-relaxed font-sans">
              {diagnosis?.realidad || 'Sin descripción de la realidad actual ingresada en el diagnóstico.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase block mb-1">Aciertos a Conservar</span>
                <ul className="list-disc pl-4 space-y-1 text-xs text-gray-500">
                  {diagnosis?.aciertos && diagnosis.aciertos.length > 0 ? (
                    diagnosis.aciertos.map((a, i) => <li key={i}>{a}</li>)
                  ) : (
                    <li>No se han especificado aciertos.</li>
                  )}
                </ul>
              </div>

              <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase block mb-1">Oportunidades de Mejora</span>
                <ul className="list-disc pl-4 space-y-1 text-xs text-gray-500">
                  {diagnosis?.oportunidades_mejora && diagnosis.oportunidades_mejora.length > 0 ? (
                    diagnosis.oportunidades_mejora.map((o, i) => <li key={i}>{o}</li>)
                  ) : (
                    <li>No se han especificado oportunidades de mejora.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 3: Objetivo (La Nueva Realidad) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4 hover:border-emerald-100 transition-colors">
          <div className="flex items-center space-x-3 border-b border-gray-50 pb-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl">
              <Diamond className="h-5 w-5 stroke-[1.5]" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 tracking-wider uppercase block">Pilar 3</span>
              <h4 className="text-base font-bold text-gray-900 font-serif">Objetivo: La Nueva Realidad</h4>
            </div>
          </div>

          <p className="text-sm text-gray-700 font-serif italic bg-emerald-50/30 border-l-4 border-emerald-600 p-4 rounded-r-xl leading-relaxed">
            {route?.realidadEsperada ? `"${route.realidadEsperada}"` : 'El estado futuro objetivo no se ha redactado aún en la etapa de Ruta.'}
          </p>

          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            La reingeniería sostenible exige un norte claro: un estado superior, balanceado e inspirador que sirva como imán para la toma de decisiones estratégicas.
          </p>
        </div>

        {/* Pillar 4: Medición Continua */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4 hover:border-emerald-100 transition-colors">
          <div className="flex items-center space-x-3 border-b border-gray-50 pb-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl">
              <Square className="h-5 w-5 stroke-[1.5]" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 tracking-wider uppercase block">Pilar 4</span>
              <h4 className="text-base font-bold text-gray-900 font-serif">Medición Continua (KPIs)</h4>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-gray-500">
              Crecimiento controlado mediante indicadores balanceados en las tres dimensiones del desarrollo integral ({totalKPIs} registrados):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Adm */}
              <div className="bg-amber-50/30 border border-amber-100 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center space-x-1.5 text-amber-800 font-serif font-bold text-xs">
                  <Zap className="h-3.5 w-3.5 shrink-0" />
                  <span>Administrativa</span>
                </div>
                <div className="text-[11px] font-mono text-gray-600">
                  {kpis?.administrativa && kpis.administrativa.length > 0 ? (
                    kpis.administrativa.map((k, i) => (
                      <div key={i} className="flex justify-between border-b border-gray-100/50 py-0.5 last:border-0">
                        <span className="truncate max-w-[80px]" title={k.name}>{k.name}</span>
                        <span className="text-amber-800 font-semibold">{k.target}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400 italic">Por definir</span>
                  )}
                </div>
              </div>

              {/* Hum */}
              <div className="bg-indigo-50/30 border border-indigo-100 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center space-x-1.5 text-indigo-800 font-serif font-bold text-xs">
                  <Award className="h-3.5 w-3.5 shrink-0" />
                  <span>Humana</span>
                </div>
                <div className="text-[11px] font-mono text-gray-600">
                  {kpis?.humana && kpis.humana.length > 0 ? (
                    kpis.humana.map((k, i) => (
                      <div key={i} className="flex justify-between border-b border-gray-100/50 py-0.5 last:border-0">
                        <span className="truncate max-w-[80px]" title={k.name}>{k.name}</span>
                        <span className="text-indigo-800 font-semibold">{k.target}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400 italic">Por definir</span>
                  )}
                </div>
              </div>

              {/* Sost */}
              <div className="bg-emerald-50/30 border border-emerald-100 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center space-x-1.5 text-emerald-800 font-serif font-bold text-xs">
                  <Compass className="h-3.5 w-3.5 shrink-0" />
                  <span>Sostenible</span>
                </div>
                <div className="text-[11px] font-mono text-gray-600">
                  {kpis?.sostenible && kpis.sostenible.length > 0 ? (
                    kpis.sostenible.map((k, i) => (
                      <div key={i} className="flex justify-between border-b border-gray-100/50 py-0.5 last:border-0">
                        <span className="truncate max-w-[80px]" title={k.name}>{k.name}</span>
                        <span className="text-emerald-800 font-semibold">{k.target}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400 italic">Por definir</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 5: Prioridades por Impacto */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4 hover:border-emerald-100 transition-colors">
          <div className="flex items-center space-x-3 border-b border-gray-50 pb-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl">
              <Play className="h-4 w-4 stroke-[2] fill-transparent" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 tracking-wider uppercase block">Pilar 5</span>
              <h4 className="text-base font-bold text-gray-900 font-serif">Prioridades por Impacto</h4>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-gray-500">
              Oportunidades de mejora con mayor puntuación de impacto tridimensional cruzado (Administrativo + Humano + Sostenible):
            </p>

            {priorities.length > 0 ? (
              <div className="space-y-2 max-h-[140px] overflow-y-auto">
                {priorities.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="space-y-0.5 truncate max-w-[80%]">
                      <span className="text-xs font-bold text-gray-800 block truncate">{p.oportunidad}</span>
                      <span className="text-[10px] text-gray-400 block truncate italic">{p.justificacion}</span>
                    </div>
                    <div className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-sm font-mono text-xs font-bold">
                      {p.puntuacion}/10
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 font-serif italic">No se han ingresado o calculado prioridades por impacto todavía.</p>
            )}
          </div>
        </div>

        {/* Pillar 6: Toma de Decisiones */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4 hover:border-emerald-100 transition-colors">
          <div className="flex items-center space-x-3 border-b border-gray-50 pb-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl">
              <ArrowRight className="h-5 w-5 stroke-[1.5]" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 tracking-wider uppercase block">Pilar 6</span>
              <h4 className="text-base font-bold text-gray-900 font-serif">Toma de Decisiones (Ruta)</h4>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-gray-500">
              Planificación secuencial de las etapas del cambio para materializar la reingeniería:
            </p>

            {route?.etapas && route.etapas.length > 0 ? (
              <div className="space-y-3 max-h-[140px] overflow-y-auto">
                {route.etapas.map((stage, idx) => (
                  <div key={idx} className="p-2.5 border border-dashed border-gray-200 rounded-xl space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="font-bold text-emerald-800">ETAPA {idx + 1}: {stage.nombre}</span>
                      <span className="text-gray-400">{stage.tiempo}</span>
                    </div>
                    <p className="text-xs text-gray-700 font-semibold leading-relaxed">{stage.accion}</p>
                    <div className="flex flex-wrap gap-2 text-[9px] font-mono text-gray-400">
                      <span>RESPONSABLE: {stage.responsable}</span>
                      <span>&bull;</span>
                      <span>MÉTRICA: {stage.indicador}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 font-serif italic">No se han establecido etapas en la ruta de desarrollo para la toma de decisiones.</p>
            )}
          </div>
        </div>

      </div>

      {/* Methodology Author Seal */}
      <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-xs font-serif font-bold text-emerald-950">
            Metodología RAS³ &bull; Herbert Pablo Gamarra Gil
          </p>
          <p className="text-[10px] font-sans text-gray-400 tracking-wider uppercase">
            Inteligencia Sintética y Reingeniería para el Desarrollo Humano, Administrativo y Sostenible
          </p>
        </div>
        <button
          onClick={() => onExportPDF(entity)}
          className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-100 px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
        >
          <FileText className="h-4 w-4" />
          <span>Exportar Reporte Ejecutivo</span>
        </button>
      </div>

    </div>
  );
}
