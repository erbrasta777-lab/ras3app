import React, { useState } from 'react';
import { Entity, DevelopmentRoute, RouteStage } from '../types';
import { Compass, CheckCircle2, ChevronRight, ArrowLeft, Calendar, User, Eye, Plus, Trash2, Sliders, DollarSign, Package, Laptop, Users } from 'lucide-react';

interface RutaProps {
  entity: Entity;
  onSaveRoute: (route: DevelopmentRoute) => void;
  onBack: () => void;
  onFinishCycle: () => void;
}

export default function Ruta({ entity, onSaveRoute, onBack, onFinishCycle }: RutaProps) {
  const currentIteration = entity.iterations[entity.iterations.length - 1];
  
  // Use existing route or fallback
  const [route, setRoute] = useState<DevelopmentRoute>(
    currentIteration?.route || {
      etapas: [],
      realidadEsperada: 'Al completar esta ruta, se espera alcanzar un estado de Desarrollo Integral Sostenible superior.',
    }
  );

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editStage, setEditStage] = useState<Partial<RouteStage>>({});

  const handleUpdateStage = (index: number, updatedStage: RouteStage) => {
    const updatedStages = [...route.etapas];
    updatedStages[index] = updatedStage;
    const newRoute = { ...route, etapas: updatedStages };
    setRoute(newRoute);
    onSaveRoute(newRoute);
  };

  const handleAddStage = () => {
    const newStage: RouteStage = {
      nombre: `Etapa ${route.etapas.length + 1}`,
      accion: 'Nueva acción estratégica',
      responsable: 'Equipo General',
      tiempo: 'Próximo mes',
      indicador: 'Por definir',
      recursos: {
        humanos: 'Personal interno',
        materiales: 'Oficinas',
        financieros: 'Flujo operativo',
        tecnologicos: 'Computadores',
      },
    };
    const newRoute = { ...route, etapas: [...route.etapas, newStage] };
    setRoute(newRoute);
    onSaveRoute(newRoute);
  };

  const handleDeleteStage = (index: number) => {
    const updatedStages = route.etapas.filter((_, idx) => idx !== index);
    const newRoute = { ...route, etapas: updatedStages };
    setRoute(newRoute);
    onSaveRoute(newRoute);
  };

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-serif">Módulo Ruta: Plan de Desarrollo Integral</h3>
          <p className="text-xs text-gray-500 font-sans">
            La secuencia estratégica y ordenada para la reingeniería sostenible de <strong>{entity.name}</strong>.
          </p>
        </div>
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-1 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-xs hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Volver a Prioridades</span>
        </button>
      </div>

      {/* Visual Roadmap Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Timeline list */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-900 font-serif">Secuencia de Etapas de la Ruta</h4>
            <button
              onClick={handleAddStage}
              className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-800 border border-emerald-100/50 hover:bg-emerald-100 text-xs font-semibold py-1 px-2.5 rounded-lg transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Añadir Etapa</span>
            </button>
          </div>

          {route.etapas.length === 0 ? (
            <p className="text-xs text-gray-400 font-serif italic py-10 bg-white border border-gray-100 rounded-xl text-center">
              No hay etapas definidas. Puedes usar el diagnóstico automático para generar una ruta o pulsar "Añadir Etapa".
            </p>
          ) : (
            <div className="relative border-l border-emerald-100/80 ml-4 pl-8 space-y-8">
              {route.etapas.map((stage, idx) => (
                <div key={idx} className="relative group bg-white border border-gray-100 rounded-xl p-6 shadow-3xs space-y-4 hover:border-emerald-200 transition-colors">
                  
                  {/* Timeline circle marker */}
                  <div className="absolute -left-[41px] top-6 flex items-center justify-center bg-emerald-800 text-white rounded-full w-6 h-6 border-4 border-white font-mono text-[10px] font-bold shadow-xs">
                    {idx + 1}
                  </div>

                  {/* Header info */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={stage.nombre}
                        onChange={(e) => handleUpdateStage(idx, { ...stage, nombre: e.target.value })}
                        className="block bg-transparent border-0 border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:ring-0 text-xs font-bold text-emerald-800 font-mono uppercase py-0.5 px-0"
                      />
                    </div>
                    
                    <button
                      onClick={() => handleDeleteStage(idx)}
                      className="text-gray-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                      title="Eliminar etapa"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Core Action Statement */}
                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 font-mono tracking-wider">ACCIÓN ESTRATÉGICA</label>
                    <textarea
                      rows={2}
                      value={stage.accion}
                      onChange={(e) => handleUpdateStage(idx, { ...stage, accion: e.target.value })}
                      className="block w-full bg-gray-50/50 border border-gray-100 rounded-md py-1.5 px-2.5 text-xs text-gray-800 focus:bg-white focus:border-emerald-500 focus:ring-0 font-sans"
                    />
                  </div>

                  {/* Details grid: responsible & time & kpi */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2 border-t border-b border-gray-50">
                    <div className="flex items-center space-x-2 text-xs">
                      <User className="h-4 w-4 text-gray-400 shrink-0" />
                      <div className="space-y-0.5 w-full">
                        <span className="text-[9px] text-gray-400 font-mono block">RESPONSABLE</span>
                        <input
                          type="text"
                          value={stage.responsable}
                          onChange={(e) => handleUpdateStage(idx, { ...stage, responsable: e.target.value })}
                          className="block w-full bg-transparent border-0 text-xs font-medium text-gray-700 p-0 focus:ring-0 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-xs">
                      <Calendar className="h-4 w-4 text-gray-400 shrink-0" />
                      <div className="space-y-0.5 w-full">
                        <span className="text-[9px] text-gray-400 font-mono block">TIEMPO ESTIMADO</span>
                        <input
                          type="text"
                          value={stage.tiempo}
                          onChange={(e) => handleUpdateStage(idx, { ...stage, tiempo: e.target.value })}
                          className="block w-full bg-transparent border-0 text-xs font-medium text-gray-700 p-0 focus:ring-0 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-xs">
                      <Compass className="h-4 w-4 text-gray-400 shrink-0" />
                      <div className="space-y-0.5 w-full">
                        <span className="text-[9px] text-gray-400 font-mono block">MÉTRICA / INDICADOR</span>
                        <input
                          type="text"
                          value={stage.indicador}
                          onChange={(e) => handleUpdateStage(idx, { ...stage, indicador: e.target.value })}
                          className="block w-full bg-transparent border-0 text-xs font-medium text-gray-700 p-0 focus:ring-0 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Required Resources Checklist */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[9px] text-gray-400 font-mono tracking-wider block">RECURSOS REQUERIDOS</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {/* Human */}
                      <div className="flex items-start space-x-1.5 p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <Users className="h-3 w-3 text-indigo-600 mt-0.5 shrink-0" />
                        <div className="text-[10px]">
                          <span className="font-semibold text-gray-800 block">Humanos</span>
                          <input
                            type="text"
                            value={stage.recursos?.humanos || ''}
                            onChange={(e) => handleUpdateStage(idx, {
                              ...stage,
                              recursos: { ...stage.recursos, humanos: e.target.value }
                            })}
                            className="bg-transparent border-0 p-0 w-full text-[10px] text-gray-500 focus:ring-0"
                          />
                        </div>
                      </div>

                      {/* Material */}
                      <div className="flex items-start space-x-1.5 p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <Package className="h-3 w-3 text-amber-600 mt-0.5 shrink-0" />
                        <div className="text-[10px]">
                          <span className="font-semibold text-gray-800 block">Materiales</span>
                          <input
                            type="text"
                            value={stage.recursos?.materiales || ''}
                            onChange={(e) => handleUpdateStage(idx, {
                              ...stage,
                              recursos: { ...stage.recursos, materiales: e.target.value }
                            })}
                            className="bg-transparent border-0 p-0 w-full text-[10px] text-gray-500 focus:ring-0"
                          />
                        </div>
                      </div>

                      {/* Financial */}
                      <div className="flex items-start space-x-1.5 p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <DollarSign className="h-3 w-3 text-emerald-600 mt-0.5 shrink-0" />
                        <div className="text-[10px]">
                          <span className="font-semibold text-gray-800 block">Financieros</span>
                          <input
                            type="text"
                            value={stage.recursos?.financieros || ''}
                            onChange={(e) => handleUpdateStage(idx, {
                              ...stage,
                              recursos: { ...stage.recursos, financieros: e.target.value }
                            })}
                            className="bg-transparent border-0 p-0 w-full text-[10px] text-gray-500 focus:ring-0"
                          />
                        </div>
                      </div>

                      {/* Tech */}
                      <div className="flex items-start space-x-1.5 p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <Laptop className="h-3 w-3 text-purple-600 mt-0.5 shrink-0" />
                        <div className="text-[10px]">
                          <span className="font-semibold text-gray-800 block">Tecnológicos</span>
                          <input
                            type="text"
                            value={stage.recursos?.tecnologicos || ''}
                            onChange={(e) => handleUpdateStage(idx, {
                              ...stage,
                              recursos: { ...stage.recursos, tecnologicos: e.target.value }
                            })}
                            className="bg-transparent border-0 p-0 w-full text-[10px] text-gray-500 focus:ring-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Nueva Realidad Esperada */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-3xs space-y-4">
            <h4 className="text-xs font-bold text-gray-900 font-mono tracking-wider uppercase border-b border-gray-50 pb-2 flex items-center space-x-1.5">
              <Eye className="h-4 w-4 text-emerald-800" />
              <span>NUEVA REALIDAD ESPERADA</span>
            </h4>

            <textarea
              rows={8}
              value={route.realidadEsperada}
              onChange={(e) => {
                const newRoute = { ...route, realidadEsperada: e.target.value };
                setRoute(newRoute);
                onSaveRoute(newRoute);
              }}
              className="block w-full rounded-md border border-gray-200 bg-gray-50/50 py-2.5 px-3 text-xs text-gray-700 shadow-inner focus:border-emerald-500 focus:bg-white focus:outline-none"
            />
            
            <p className="text-[10px] text-gray-400 font-serif leading-relaxed italic">
              Este bloque representa el objetivo de Desarrollo Integral final de la ruta: cómo se verá la organización tras sincronizar el ámbito administrativo, humano y ecológico.
            </p>
          </div>

          <div className="bg-emerald-950 text-emerald-100 rounded-xl p-5 space-y-3 shadow-xs">
            <h4 className="text-xs font-bold font-mono tracking-wider uppercase flex items-center space-x-1.5">
              <Compass className="h-4 w-4 text-emerald-400" />
              <span>La Ruta es Flexible</span>
            </h4>
            <p className="text-[10px] text-emerald-200/80 leading-relaxed font-sans">
              "En RAS³, la Ruta de Desarrollo no es un documento inalterable, sino que debe revisarse, ajustarse y enriquecerse continuamente. Cambiar el camino no significa abandonar el propósito, significa adaptarse para alcanzarlo de una mejor manera."
            </p>
          </div>
        </div>

      </div>

      {/* Footer / Finishing Cycle */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-100">
        <p className="text-xs text-gray-500 font-serif italic">
          Al pulsar "Finalizar", registrarás esta iteración y aumentarás el nivel de desarrollo de tu entidad.
        </p>
        
        <button
          onClick={onFinishCycle}
          className="inline-flex items-center space-x-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-medium px-5 py-2.5 rounded-lg text-xs transition-all shadow-md"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-300" />
          <span>Finalizar e Iterar Ciclo</span>
        </button>
      </div>
    </div>
  );
}
