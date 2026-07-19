import React, { useState } from 'react';
import { Entity, Diagnosis, KPIDimension, PriorityAction, DevelopmentRoute } from '../types';
import { Sparkles, CheckCircle2, ChevronRight, HelpCircle, FileText, AlertCircle, RefreshCw } from 'lucide-react';

interface AnalizarProps {
  entity: Entity;
  onSaveDiagnosis: (diagnosis: Diagnosis, suggestedKpis: KPIDimension, suggestedPriorities: PriorityAction[], initialRoute: DevelopmentRoute) => void;
  onChangeTab: (tab: string) => void;
}

export default function Analizar({ entity, onSaveDiagnosis, onChangeTab }: AnalizarProps) {
  const [descriptionInput, setDescriptionInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If the entity already has a diagnosis, we can display it!
  const currentIteration = entity.iterations[entity.iterations.length - 1];
  const existingDiagnosis = currentIteration?.diagnosis;

  const handleRunAnalysis = async () => {
    if (!descriptionInput.trim()) {
      setError('Por favor, describe la realidad de tu entidad primero.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: entity.name,
          context: entity.description,
          description: descriptionInput,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al conectar con el servidor.');
      }

      const result = await response.json();

      // Transform suggested KPIs into the KPI state format
      const suggestedKpis: KPIDimension = {
        administrativa: result.medicion.administrativa.map((name: string, index: number) => ({
          id: `kpi-adm-${index}-${Date.now()}`,
          name,
          baseline: 'No establecida',
          target: 'Por definir',
          status: 'pendiente',
        })),
        humana: result.medicion.humana.map((name: string, index: number) => ({
          id: `kpi-hum-${index}-${Date.now()}`,
          name,
          baseline: 'No establecida',
          target: 'Por definir',
          status: 'pendiente',
        })),
        sostenible: result.medicion.sostenible.map((name: string, index: number) => ({
          id: `kpi-sos-${index}-${Date.now()}`,
          name,
          baseline: 'No establecida',
          target: 'Por definir',
          status: 'pendiente',
        })),
      };

      // Transform suggested priorities
      const suggestedPriorities: PriorityAction[] = result.prioridades.map((item: any, index: number) => ({
        id: `priority-${index}-${Date.now()}`,
        oportunidad: item.oportunidad,
        impactoAdministrativo: item.impactoAdministrativo,
        impactoHumano: item.impactoHumano,
        impactoSostenible: item.impactoSostenible,
        justificacion: item.justificacion,
        puntuacion: item.puntuacion,
      }));

      // Transform suggested route
      const initialRoute: DevelopmentRoute = {
        etapas: result.ruta_inicial.etapas.map((stage: any) => ({
          nombre: stage.nombre,
          accion: stage.accion,
          responsable: stage.responsable,
          tiempo: stage.tiempo,
          indicador: stage.indicador,
          recursos: {
            humanos: stage.recursos?.humanos || 'Personal interno',
            materiales: stage.recursos?.materiales || 'Equipos básicos',
            financieros: stage.recursos?.financieros || 'Presupuesto regular',
            tecnologicos: stage.recursos?.tecnologicos || 'Herramientas digitales',
          },
        })),
        realidadEsperada: result.ruta_inicial.realidadEsperada,
      };

      const parsedDiagnosis: Diagnosis = {
        potencial: result.diagnostico.potencial,
        realidad: result.diagnostico.realidad,
        aciertos: result.diagnostico.aciertos,
        oportunidades_mejora: result.diagnostico.oportunidades_mejora,
      };

      onSaveDiagnosis(parsedDiagnosis, suggestedKpis, suggestedPriorities, initialRoute);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al invocar la API del Visir Digital.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-6">
      {/* Title */}
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-xl font-bold text-gray-900 font-serif">Módulo Analizar: Diagnóstico RAS³</h3>
        <p className="text-xs text-gray-500 font-sans">
          Describe la situación actual de <strong>{entity.name}</strong> para que el Visir Digital analice tu potencial y realidad basada en hechos.
        </p>
      </div>

      {existingDiagnosis ? (
        /* Display Diagnosis result if it already exists */
        <div className="space-y-8">
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center space-x-1 bg-emerald-100 text-emerald-950 text-xs px-2.5 py-1 rounded-full font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Diagnóstico Completado</span>
              </span>
              <button
                onClick={() => {
                  if (confirm('¿Deseas volver a redactar la realidad y generar un nuevo diagnóstico? Se sobrescribirá el actual.')) {
                    setDescriptionInput(existingDiagnosis.realidad || '');
                    onSaveDiagnosis({ potencial: '', realidad: '', aciertos: [], oportunidades_mejora: [] }, { administrativa: [], humana: [], sostenible: [] }, [], { etapas: [], realidadEsperada: '' });
                  }
                }}
                className="inline-flex items-center space-x-1 text-xs text-emerald-800 hover:text-emerald-950 font-medium"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Re-analizar</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Potencial block */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-emerald-800 font-mono tracking-wider uppercase">1. EL POTENCIAL LATENTE</h4>
                <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-3xs text-xs text-gray-700 leading-relaxed italic">
                  "{existingDiagnosis.potencial}"
                </div>
              </div>

              {/* Realidad block */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-500 font-mono tracking-wider uppercase">2. REALIDAD OBSERVABLE</h4>
                <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-3xs text-xs text-gray-700 leading-relaxed">
                  {existingDiagnosis.realidad}
                </div>
              </div>
            </div>
          </div>

          {/* Aciertos & Oportunidades Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Aciertos (Qué se hace bien y debe conservarse) */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-gray-50">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <h4 className="text-sm font-bold text-gray-900 font-serif">Aciertos (A conservar y fortalecer)</h4>
              </div>
              <ul className="space-y-3">
                {existingDiagnosis.aciertos?.map((acierto, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs text-gray-700">
                    <span className="inline-flex items-center justify-center bg-emerald-50 text-emerald-800 font-bold rounded-full w-5 h-5 shrink-0 mt-0.5 font-mono">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{acierto}</span>
                  </li>
                ))}
                {(!existingDiagnosis.aciertos || existingDiagnosis.aciertos.length === 0) && (
                  <p className="text-xs text-gray-400 font-serif italic">No se identificaron aciertos específicos.</p>
                )}
              </ul>
            </div>

            {/* Oportunidades de Mejora */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-gray-50">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h4 className="text-sm font-bold text-gray-900 font-serif">Oportunidades de Mejora (A desarrollar)</h4>
              </div>
              <ul className="space-y-3">
                {existingDiagnosis.oportunidades_mejora?.map((op, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs text-gray-700">
                    <span className="inline-flex items-center justify-center bg-amber-50 text-amber-800 font-bold rounded-full w-5 h-5 shrink-0 mt-0.5 font-mono">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{op}</span>
                  </li>
                ))}
                {(!existingDiagnosis.oportunidades_mejora || existingDiagnosis.oportunidades_mejora.length === 0) && (
                  <p className="text-xs text-gray-400 font-serif italic">No se identificaron oportunidades de mejora.</p>
                )}
              </ul>
            </div>
          </div>

          {/* Action to proceed */}
          <div className="flex justify-end pt-4">
            <button
              onClick={() => onChangeTab('medir')}
              className="inline-flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-900 text-white font-medium px-4 py-2 rounded-lg text-xs transition-colors shadow-xs"
            >
              <span>Proceder a Módulo Medir (KPIs)</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Display Input area if no diagnosis is created yet */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left panel: Input Area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-3xs space-y-4">
              <label htmlFor="reality-desc" className="block text-xs font-bold text-gray-500 font-mono tracking-wider uppercase">
                DESCRIBA LA REALIDAD ACTUAL (HECHOS, NO OPINIONES)
              </label>

              <textarea
                id="reality-desc"
                rows={12}
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
                placeholder="Ejemplo: Toyland es una tienda física de juguetes didácticos. Actualmente, nuestras ventas en tienda física han disminuido un 15% en el último trimestre. Tenemos 3 colaboradores en atención al cliente que se sienten poco motivados debido a la falta de incentivos. No contamos con presencia digital ni tienda en línea, y gran parte del inventario de juguetes ecológicos de madera lleva más de 6 meses sin venderse..."
                className="block w-full rounded-lg border border-gray-200 bg-gray-50/50 py-3 px-4 text-xs text-gray-800 shadow-inner focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
              />

              {error && (
                <div className="flex items-center space-x-2 bg-rose-50 border border-rose-100 text-rose-800 rounded-lg p-3 text-xs">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  id="btn-trigger-ai"
                  onClick={handleRunAnalysis}
                  disabled={loading}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 disabled:bg-emerald-800/40 text-white font-medium py-2.5 px-4 rounded-lg text-xs transition-all shadow-xs flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>El Visir está analizando... por favor espera...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5 text-emerald-200" />
                      <span>Generar Diagnóstico Integral con el Visir Digital</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right panel: Methodology Guide */}
          <div className="space-y-6">
            <div className="bg-gray-50/70 border border-gray-100 rounded-xl p-5 space-y-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-emerald-800" />
                <h4 className="text-xs font-bold text-gray-900 font-mono tracking-wider uppercase">GUÍA DE REDACCIÓN RAS³</h4>
              </div>
              
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Para que el <strong>Visir Digital</strong> realice un análisis estratégico de alta precisión, proporcione la mayor cantidad de hechos de su organización o proyecto:
              </p>

              <div className="space-y-3">
                <div className="text-[11px] space-y-1">
                  <span className="font-semibold text-gray-800 block">✓ Administrativo:</span>
                  <span className="text-gray-500 block leading-normal">
                    Mencione ventas, estado de finanzas, problemas operativos, flujos o tiempos actuales.
                  </span>
                </div>

                <div className="text-[11px] space-y-1">
                  <span className="font-semibold text-gray-800 block">✓ Humano:</span>
                  <span className="text-gray-500 block leading-normal">
                    Describa al personal, nivel de motivación, relaciones, liderazgo o clima laboral.
                  </span>
                </div>

                <div className="text-[11px] space-y-1">
                  <span className="font-semibold text-gray-800 block">✓ Sostenible:</span>
                  <span className="text-gray-500 block leading-normal">
                    Describa el impacto ambiental, relación con la comunidad o preservación de la cultura organizativa.
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200/60 pt-4 flex items-start space-x-2 text-[10px] text-gray-400">
                <HelpCircle className="h-3.5 w-3.5 shrink-0 text-gray-300 mt-0.5" />
                <span className="leading-normal">
                  La Inteligencia Artificial estructurará las Oportunidades y Aciertos para sugerirte la Ruta de Desarrollo.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
