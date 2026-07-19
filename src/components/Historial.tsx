import React, { useState } from 'react';
import { Entity, Iteration } from '../types';
import { History, ArrowLeft, RefreshCw, Calendar, CheckCircle2, Layout, Layers, ArrowUpRight } from 'lucide-react';

interface HistorialProps {
  entity: Entity;
  onBack: () => void;
}

export default function Historial({ entity, onBack }: HistorialProps) {
  const [selectedVersionLeft, setSelectedVersionLeft] = useState<number>(entity.iterations[0]?.version || 1);
  const [selectedVersionRight, setSelectedVersionRight] = useState<number>(entity.iterations[entity.iterations.length - 1]?.version || 1);

  const leftIteration = entity.iterations.find((it) => it.version === selectedVersionLeft);
  const rightIteration = entity.iterations.find((it) => it.version === selectedVersionRight);

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-serif flex items-center space-x-2">
            <History className="h-5 w-5 text-emerald-800" />
            <span>Módulo Historial: Evolución RAS³</span>
          </h3>
          <p className="text-xs text-gray-500 font-sans">
            Compara el diagnóstico y las rutas de las diferentes iteraciones y versiones de <strong>{entity.name}</strong>.
          </p>
        </div>
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-1 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-xs hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Volver al ciclo</span>
        </button>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-3xs flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-800">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-xs font-mono text-gray-400">ITERACIONES TOTALES</span>
            <span className="text-lg font-serif font-bold text-gray-900">{entity.iterations.length}</span>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-3xs flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-800">
            <ArrowUpRight className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-xs font-mono text-gray-400">NIVEL ALCANZADO</span>
            <span className="text-lg font-serif font-bold text-gray-900">{entity.level}%</span>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-3xs flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-800">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-xs font-mono text-gray-400">INICIO DEL PROYECTO</span>
            <span className="text-sm font-serif font-bold text-gray-900">
              {new Date(entity.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Selectors for comparison */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-3xs space-y-4">
        <div className="flex items-center space-x-2">
          <Layout className="h-4 w-4 text-emerald-800" />
          <h4 className="text-xs font-bold text-gray-900 font-mono tracking-wider uppercase">COMPARACIÓN DE VERSIONES</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="ver-left-select" className="text-[10px] text-gray-400 font-mono">VERSIÓN DE REFERENCIA (IZQUIERDA)</label>
            <select
              id="ver-left-select"
              value={selectedVersionLeft}
              onChange={(e) => setSelectedVersionLeft(Number(e.target.value))}
              className="block w-full bg-gray-50 border border-gray-200 rounded-md py-1.5 px-3 text-xs text-gray-700"
            >
              {entity.iterations.map((it) => (
                <option key={it.version} value={it.version}>
                  Iteración {it.version} ({new Date(it.date).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="ver-right-select" className="text-[10px] text-gray-400 font-mono">VERSIÓN COMPARATIVA (DERECHA)</label>
            <select
              id="ver-right-select"
              value={selectedVersionRight}
              onChange={(e) => setSelectedVersionRight(Number(e.target.value))}
              className="block w-full bg-gray-50 border border-gray-200 rounded-md py-1.5 px-3 text-xs text-gray-700"
            >
              {entity.iterations.map((it) => (
                <option key={it.version} value={it.version}>
                  Iteración {it.version} ({new Date(it.date).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparative View panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Iteration Display */}
        <div className="space-y-6">
          <div className="bg-emerald-950 text-white rounded-xl p-4 flex items-center justify-between shadow-xs">
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider">Iteración {selectedVersionLeft}</h5>
            <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded-sm">
              {leftIteration ? new Date(leftIteration.date).toLocaleDateString() : ''}
            </span>
          </div>

          {leftIteration ? (
            <div className="space-y-6">
              {/* Diagnosis */}
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-3xs space-y-3">
                <h6 className="text-xs font-bold text-emerald-800 font-mono uppercase border-b border-gray-50 pb-1.5">DIAGNÓSTICO</h6>
                <div className="space-y-3 text-xs text-gray-700">
                  <div className="space-y-1">
                    <span className="font-bold text-gray-900 block">Potencial:</span>
                    <p className="italic leading-relaxed">"{leftIteration.diagnosis?.potencial || 'No establecido.'}"</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-gray-900 block">Realidad:</span>
                    <p className="leading-relaxed">{leftIteration.diagnosis?.realidad || 'No establecida.'}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-gray-900 block">Oportunidades de Mejora:</span>
                    <ul className="list-disc pl-4 space-y-1">
                      {leftIteration.diagnosis?.oportunidades_mejora?.map((op, idx) => (
                        <li key={idx}>{op}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Route stages */}
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-3xs space-y-3">
                <h6 className="text-xs font-bold text-emerald-800 font-mono uppercase border-b border-gray-50 pb-1.5">RUTA DE DESARROLLO</h6>
                {leftIteration.route && leftIteration.route.etapas?.length > 0 ? (
                  <div className="space-y-3">
                    {leftIteration.route.etapas.map((stage, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg text-xs space-y-1">
                        <span className="font-bold text-emerald-800 block">{stage.nombre}</span>
                        <p className="text-gray-700 font-medium">{stage.accion}</p>
                        <p className="text-[10px] text-gray-500 font-mono">RESPONSABLE: {stage.responsable} | TIEMPO: {stage.tiempo}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 font-serif italic">No se guardó un plan de ruta en esta versión.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-400 font-serif italic py-10 text-center bg-white border border-gray-100 rounded-xl">Versión de iteración no encontrada.</p>
          )}
        </div>

        {/* Right Iteration Display */}
        <div className="space-y-6">
          <div className="bg-emerald-900 text-white rounded-xl p-4 flex items-center justify-between shadow-xs">
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider">Iteración {selectedVersionRight}</h5>
            <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded-sm">
              {rightIteration ? new Date(rightIteration.date).toLocaleDateString() : ''}
            </span>
          </div>

          {rightIteration ? (
            <div className="space-y-6">
              {/* Diagnosis */}
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-3xs space-y-3">
                <h6 className="text-xs font-bold text-emerald-800 font-mono uppercase border-b border-gray-50 pb-1.5">DIAGNÓSTICO</h6>
                <div className="space-y-3 text-xs text-gray-700">
                  <div className="space-y-1">
                    <span className="font-bold text-gray-900 block">Potencial:</span>
                    <p className="italic leading-relaxed">"{rightIteration.diagnosis?.potencial || 'No establecido.'}"</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-gray-900 block">Realidad:</span>
                    <p className="leading-relaxed">{rightIteration.diagnosis?.realidad || 'No establecida.'}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-gray-900 block">Oportunidades de Mejora:</span>
                    <ul className="list-disc pl-4 space-y-1">
                      {rightIteration.diagnosis?.oportunidades_mejora?.map((op, idx) => (
                        <li key={idx}>{op}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Route stages */}
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-3xs space-y-3">
                <h6 className="text-xs font-bold text-emerald-800 font-mono uppercase border-b border-gray-50 pb-1.5">RUTA DE DESARROLLO</h6>
                {rightIteration.route && rightIteration.route.etapas?.length > 0 ? (
                  <div className="space-y-3">
                    {rightIteration.route.etapas.map((stage, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg text-xs space-y-1">
                        <span className="font-bold text-emerald-800 block">{stage.nombre}</span>
                        <p className="text-gray-700 font-medium">{stage.accion}</p>
                        <p className="text-[10px] text-gray-500 font-mono">RESPONSABLE: {stage.responsable} | TIEMPO: {stage.tiempo}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 font-serif italic">No se guardó un plan de ruta en esta versión.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-400 font-serif italic py-10 text-center bg-white border border-gray-100 rounded-xl">Versión de iteración no encontrada.</p>
          )}
        </div>

      </div>
    </div>
  );
}
