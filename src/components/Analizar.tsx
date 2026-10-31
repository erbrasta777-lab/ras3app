import React, { useState } from 'react';
import { Entity, Diagnosis, KPIDimension, PriorityAction, DevelopmentRoute, RadarScores, MotorMeta } from '../types';
import { 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  HelpCircle, 
  FileText, 
  AlertCircle, 
  RefreshCw,
  Target,
  Eye,
  Lightbulb,
  Plus,
  Trash2,
  Compass,
  Zap,
  ArrowRight
} from 'lucide-react';
import { generateFullProcess } from '../utils/processGenerator';

interface AnalizarProps {
  entity: Entity;
  onSaveDiagnosis: (
    diagnosis: Diagnosis, 
    suggestedKpis: KPIDimension, 
    suggestedPriorities: PriorityAction[], 
    initialRoute: DevelopmentRoute,
    radarScores?: RadarScores,
    motorMeta?: MotorMeta
  ) => void;
  onChangeTab: (tab: string) => void;
}

export default function Analizar({ entity, onSaveDiagnosis, onChangeTab }: AnalizarProps) {
  const currentIteration = entity.iterations[entity.iterations.length - 1];
  const existingDiagnosis = currentIteration?.diagnosis;

  // Multi-step form state for P-R-O formulation
  const [potencialInput, setPotencialInput] = useState(existingDiagnosis?.potencial || '');
  const [realidadInput, setRealidadInput] = useState(existingDiagnosis?.realidad || '');
  const [objetivoInput, setObjetivoInput] = useState(existingDiagnosis?.objetivo?.estadoSuperior || '');
  
  // Custom interactive editing for aciertos & oportunidades
  const [editableAciertos, setEditableAciertos] = useState<string[]>(existingDiagnosis?.aciertos || []);
  const [editableOportunidades, setEditableOportunidades] = useState<string[]>(existingDiagnosis?.oportunidades_mejora || []);
  const [newAciertoText, setNewAciertoText] = useState('');
  const [newOportunidadText, setNewOportunidadText] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRunAnalysis = async () => {
    if (!realidadInput.trim() && !potencialInput.trim()) {
      setError('Por favor describe el potencial y la realidad observable de tu proyecto.');
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
          context: entity.description || entity.sector,
          description: realidadInput || potencialInput,
          potencialInput,
          objetivoInput,
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
          baseline: 'En evaluación',
          target: 'Meta trimestral definida',
          status: 'pendiente',
          pilar: 'administrativo',
        })),
        humana: result.medicion.humana.map((name: string, index: number) => ({
          id: `kpi-hum-${index}-${Date.now()}`,
          name,
          baseline: 'En evaluación',
          target: 'Meta de bienestar definida',
          status: 'pendiente',
          pilar: 'humano',
        })),
        sostenible: result.medicion.sostenible.map((name: string, index: number) => ({
          id: `kpi-sos-${index}-${Date.now()}`,
          name,
          baseline: 'En evaluación',
          target: 'Meta socioambiental definida',
          status: 'pendiente',
          pilar: index === 0 ? 'economico' : index === 1 ? 'social' : 'ambiental',
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
        efectoMultiplicador: item.efectoMultiplicador || 'Apalanca armónicamente las tres dimensiones.',
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
            humanos: stage.recursos?.humanos || 'Equipo del proyecto',
            materiales: stage.recursos?.materiales || 'Insumos sostenibles',
            financieros: stage.recursos?.financieros || 'Presupuesto de incubación',
            tecnologicos: stage.recursos?.tecnologicos || 'Herramientas digitales / PWA',
          },
        })),
        realidadEsperada: result.ruta_inicial.realidadEsperada,
      };

      const parsedDiagnosis: Diagnosis = {
        potencial: result.diagnostico.potencial,
        realidad: result.diagnostico.realidad,
        aciertos: result.diagnostico.aciertos,
        oportunidades_mejora: result.diagnostico.oportunidades_mejora,
        objetivo: result.diagnostico.objetivo || {
          estadoSuperior: objetivoInput || 'Consolidar el desarrollo integral sostenible.',
          capacidadesADesarrollar: 'Capacidad permanente de adaptación y gobernanza participativa.'
        }
      };

      setEditableAciertos(parsedDiagnosis.aciertos);
      setEditableOportunidades(parsedDiagnosis.oportunidades_mejora);

      onSaveDiagnosis(
        parsedDiagnosis, 
        suggestedKpis, 
        suggestedPriorities, 
        initialRoute,
        result.radarScores,
        result.motorMeta
      );
    } catch (err: any) {
      console.warn("API call failed or key absent, using autonomous RAS³ generator:", err);
      const fallbackIter = generateFullProcess(
        entity.name, 
        entity.sector || 'Comercio / Retail', 
        entity.scale || 'Autoempleo / Microempresa (1-5 colaboradores)', 
        entity.challenge || 'Digitalización y Comercio Electrónico',
        realidadInput || potencialInput
      );

      if (fallbackIter && fallbackIter.diagnosis && fallbackIter.kpiDimension && fallbackIter.priorities && fallbackIter.route) {
        if (potencialInput) fallbackIter.diagnosis.potencial = potencialInput;
        if (realidadInput) fallbackIter.diagnosis.realidad = realidadInput;
        if (objetivoInput && fallbackIter.diagnosis.objetivo) {
          fallbackIter.diagnosis.objetivo.estadoSuperior = objetivoInput;
        }

        setEditableAciertos(fallbackIter.diagnosis.aciertos);
        setEditableOportunidades(fallbackIter.diagnosis.oportunidades_mejora);

        onSaveDiagnosis(
          fallbackIter.diagnosis, 
          fallbackIter.kpiDimension, 
          fallbackIter.priorities, 
          fallbackIter.route,
          fallbackIter.radarScores,
          fallbackIter.motorMeta
        );
        return;
      }
      
      let userFriendlyMsg = err.message || 'Error al conectar con el Visir Digital.';
      setError(userFriendlyMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAcierto = () => {
    if (!newAciertoText.trim() || !existingDiagnosis) return;
    const updated = [...editableAciertos, newAciertoText.trim()];
    setEditableAciertos(updated);
    setNewAciertoText('');
    saveEditedDiagnosis({ ...existingDiagnosis, aciertos: updated });
  };

  const handleRemoveAcierto = (index: number) => {
    if (!existingDiagnosis) return;
    const updated = editableAciertos.filter((_, i) => i !== index);
    setEditableAciertos(updated);
    saveEditedDiagnosis({ ...existingDiagnosis, aciertos: updated });
  };

  const handleAddOportunidad = () => {
    if (!newOportunidadText.trim() || !existingDiagnosis) return;
    const updated = [...editableOportunidades, newOportunidadText.trim()];
    setEditableOportunidades(updated);
    setNewOportunidadText('');
    saveEditedDiagnosis({ ...existingDiagnosis, oportunidades_mejora: updated });
  };

  const handleRemoveOportunidad = (index: number) => {
    if (!existingDiagnosis) return;
    const updated = editableOportunidades.filter((_, i) => i !== index);
    setEditableOportunidades(updated);
    saveEditedDiagnosis({ ...existingDiagnosis, oportunidades_mejora: updated });
  };

  const saveEditedDiagnosis = (d: Diagnosis) => {
    if (!currentIteration?.kpiDimension || !currentIteration?.priorities || !currentIteration?.route) return;
    onSaveDiagnosis(
      d,
      currentIteration.kpiDimension,
      currentIteration.priorities,
      currentIteration.route,
      currentIteration.radarScores,
      currentIteration.motorMeta
    );
  };

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto">
      {/* Title & Method Badge */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-800 border border-emerald-100 font-bold px-2 py-0.5 rounded-md">
              FASES P - R - O DEL PROTOCOLO RAS³
            </span>
            <span className="text-xs text-gray-400 font-serif italic">Capítulos 11 y 24</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 font-serif mt-1">
            Formulación: Potencial, Realidad y Objetivo
          </h3>
          <p className="text-xs text-gray-500 font-sans mt-0.5">
            Incubación estratégica para <strong>{entity.name}</strong> asistida por el <strong>Visir Digital</strong>.
          </p>
        </div>

        {existingDiagnosis && (
          <button
            onClick={() => {
              if (confirm('¿Deseas volver a formular el diagnóstico? Podrás reescribir el potencial y los hechos.')) {
                setPotencialInput(existingDiagnosis.potencial || '');
                setRealidadInput(existingDiagnosis.realidad || '');
                setObjetivoInput(existingDiagnosis.objetivo?.estadoSuperior || '');
                onSaveDiagnosis(
                  { potencial: '', realidad: '', aciertos: [], oportunidades_mejora: [] },
                  { administrativa: [], humana: [], sostenible: [] },
                  [],
                  { etapas: [], realidadEsperada: '' }
                );
              }
            }}
            className="inline-flex items-center space-x-1.5 text-xs text-emerald-800 hover:text-emerald-950 font-medium border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Re-formular</span>
          </button>
        )}
      </div>

      {existingDiagnosis ? (
        /* Result view: P, R, O and Aciertos / Oportunidades */
        <div className="space-y-6">
          {/* Top 3 Cards: P (Potencial), R (Realidad), O (Objetivo) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* P */}
            <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-xs space-y-2 relative overflow-hidden">
              <div className="flex items-center space-x-2 text-emerald-800 font-mono text-xs font-bold uppercase">
                <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs">P</span>
                <span>Potencial Primero</span>
              </div>
              <p className="text-xs text-gray-700 italic font-serif leading-relaxed bg-emerald-50/40 p-3 rounded-xl border-l-3 border-emerald-700">
                "{existingDiagnosis.potencial}"
              </p>
              <p className="text-[10px] text-gray-400">
                El desarrollo comienza por lo que la entidad puede llegar a ser, no por sus carencias.
              </p>
            </div>

            {/* R */}
            <div className="bg-white border border-teal-100 rounded-2xl p-5 shadow-xs space-y-2 relative overflow-hidden">
              <div className="flex items-center space-x-2 text-teal-800 font-mono text-xs font-bold uppercase">
                <span className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-xs">R</span>
                <span>Realidad Observable</span>
              </div>
              <p className="text-xs text-gray-700 font-sans leading-relaxed bg-teal-50/40 p-3 rounded-xl border-l-3 border-teal-700">
                {existingDiagnosis.realidad}
              </p>
              <p className="text-[10px] text-gray-400">
                Hechos objetivos verificables y observables, libres de prejuicios.
              </p>
            </div>

            {/* O */}
            <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-xs space-y-2 relative overflow-hidden">
              <div className="flex items-center space-x-2 text-blue-800 font-mono text-xs font-bold uppercase">
                <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-xs">O</span>
                <span>Objetivo Superior</span>
              </div>
              <p className="text-xs text-gray-700 font-sans leading-relaxed bg-blue-50/40 p-3 rounded-xl border-l-3 border-blue-700">
                {existingDiagnosis.objetivo?.estadoSuperior || 'Alcanzar estado superior de madurez armónica y triple impacto (Ley BIC).'}
              </p>
              <p className="text-[10px] text-gray-400">
                Capacidad a desarrollar: {existingDiagnosis.objetivo?.capacidadesADesarrollar || 'Gestión ágil y cultura participativa.'}
              </p>
            </div>
          </div>

          {/* Aciertos & Oportunidades de Mejora (Replacing FODA) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Aciertos */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-600" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 font-serif">
                      Aciertos (A Conservar y Fortalecer)
                    </h4>
                    <span className="text-[10px] text-gray-400 block font-mono">
                      Capítulo 11: Lo que genera valor duradero
                    </span>
                  </div>
                </div>
              </div>

              <ul className="space-y-2.5">
                {editableAciertos.map((acierto, idx) => (
                  <li key={idx} className="flex items-start justify-between space-x-2 text-xs text-gray-700 bg-gray-50/70 p-2.5 rounded-xl group">
                    <div className="flex items-start space-x-2">
                      <span className="inline-flex items-center justify-center bg-emerald-100 text-emerald-800 font-bold rounded-full w-4 h-4 shrink-0 mt-0.5 text-[10px] font-mono">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{acierto}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveAcierto(idx)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-rose-600 transition-opacity p-0.5"
                      title="Eliminar acierto"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Add custom acierto */}
              <div className="flex items-center space-x-2 pt-2 border-t border-gray-50">
                <input
                  type="text"
                  value={newAciertoText}
                  onChange={(e) => setNewAciertoText(e.target.value)}
                  placeholder="Agregar nuevo acierto observable..."
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:bg-white focus:outline-none focus:border-emerald-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddAcierto();
                  }}
                />
                <button
                  onClick={handleAddAcierto}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white p-1.5 rounded-lg text-xs shrink-0"
                  title="Agregar"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Oportunidades de Mejora */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 font-serif">
                      Oportunidades de Mejora (A Desarrollar)
                    </h4>
                    <span className="text-[10px] text-gray-400 block font-mono">
                      Reemplaza la noción de debilidad por potencial
                    </span>
                  </div>
                </div>
              </div>

              <ul className="space-y-2.5">
                {editableOportunidades.map((op, idx) => (
                  <li key={idx} className="flex items-start justify-between space-x-2 text-xs text-gray-700 bg-gray-50/70 p-2.5 rounded-xl group">
                    <div className="flex items-start space-x-2">
                      <span className="inline-flex items-center justify-center bg-amber-100 text-amber-800 font-bold rounded-full w-4 h-4 shrink-0 mt-0.5 text-[10px] font-mono">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{op}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveOportunidad(idx)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-rose-600 transition-opacity p-0.5"
                      title="Eliminar oportunidad"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Add custom oportunidad */}
              <div className="flex items-center space-x-2 pt-2 border-t border-gray-50">
                <input
                  type="text"
                  value={newOportunidadText}
                  onChange={(e) => setNewOportunidadText(e.target.value)}
                  placeholder="Agregar oportunidad para desarrollar..."
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:bg-white focus:outline-none focus:border-amber-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddOportunidad();
                  }}
                />
                <button
                  onClick={handleAddOportunidad}
                  className="bg-amber-600 hover:bg-amber-700 text-white p-1.5 rounded-lg text-xs shrink-0"
                  title="Agregar"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Bar to next step in P-R-O-M-P-T protocol */}
          <div className="bg-emerald-950 text-white rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300">
                SIGUIENTE PASO DEL PROTOCOLO
              </span>
              <p className="text-sm font-serif font-bold">
                Paso 4: Medición (M) · Indicadores 3D
              </p>
            </div>
            <button
              onClick={() => onChangeTab('medir')}
              className="bg-white hover:bg-emerald-50 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-xs"
            >
              <span>Continuar a Módulo Medir</span>
              <ArrowRight className="h-4 w-4 text-emerald-800" />
            </button>
          </div>
        </div>
      ) : (
        /* Form view: Capturing P, R, O with Visir Guidance */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-6">
              
              {/* Field 1: Potencial (P) */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs">1</span>
                  <span>P · Potencial Primero (Capítulo 11)</span>
                </label>
                <p className="text-[11px] text-gray-500 font-sans">
                  ¿Cuál es el mayor valor latente o capacidad que tu proyecto puede llegar a desarrollar? <em>(Empieza por el potencial, jamás por la carencia).</em>
                </p>
                <textarea
                  rows={3}
                  value={potencialInput}
                  onChange={(e) => setPotencialInput(e.target.value)}
                  placeholder="Ejemplo: Transformar el restaurante en un referente de gastronomía circular y comercio justo con comunidades campesinas..."
                  className="w-full text-xs rounded-xl border border-gray-200 bg-gray-50/50 p-3.5 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Field 2: Realidad Observable (R) */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-xs font-mono font-bold text-gray-700 uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs">2</span>
                  <span>R · Realidad Observable (Hechos, no opiniones)</span>
                </label>
                <p className="text-[11px] text-gray-500 font-sans">
                  Describe los datos reales, cifras y procesos cotidianos verificables de tu entidad hoy.
                </p>
                <textarea
                  rows={5}
                  value={realidadInput}
                  onChange={(e) => setRealidadInput(e.target.value)}
                  placeholder="Ejemplo: Tenemos 4 colaboradores. Reportamos 18% de merma de verduras en almacén, alta fatiga del personal en horas punta, y aún registramos pedidos en comandas de papel. Los clientes valoran mucho el sabor artesanal..."
                  className="w-full text-xs rounded-xl border border-gray-200 bg-gray-50/50 p-3.5 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Field 3: Objetivo (O) */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-xs font-mono font-bold text-blue-800 uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-xs">3</span>
                  <span>O · Objetivo Superior de Desarrollo</span>
                </label>
                <p className="text-[11px] text-gray-500 font-sans">
                  ¿Hacia qué estado superior de funcionamiento y gobernanza sostenible deseas evolucionar?
                </p>
                <input
                  type="text"
                  value={objetivoInput}
                  onChange={(e) => setObjetivoInput(e.target.value)}
                  placeholder="Ejemplo: Acreditar la empresa bajo el régimen Ley BIC con cero merma y tienda digital..."
                  className="w-full text-xs rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              {error && (
                <div className="flex items-center space-x-2 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-3 text-xs">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Action Button */}
              <button
                id="btn-trigger-ai"
                onClick={handleRunAnalysis}
                disabled={loading}
                className="w-full bg-emerald-800 hover:bg-emerald-900 disabled:bg-emerald-800/50 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>El Visir Digital está formulando el diagnóstico integral...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-emerald-200" />
                    <span>Generar Diagnóstico RAS³ con el Visir Digital</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Sidebar: Visir Advice & Methodology (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-emerald-950 text-white rounded-2xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center space-x-2 border-b border-emerald-800/80 pb-2">
                <Zap className="h-4 w-4 text-amber-300" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-200">
                  Sabiduría del Visir
                </h4>
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed font-serif italic">
                "¿Son tus ojos o es el enfoque? La copa de vino está en el mismo nivel; lo único que cambia es la forma de interpretarla. Cuando cambias tu enfoque de la carencia hacia el potencial, la realidad comienza a responder."
              </p>
              <p className="text-[10px] text-emerald-300/80 font-mono">
                — Herbert Gamarra, Capítulo 0
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-mono font-bold text-gray-800 uppercase tracking-wide flex items-center space-x-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-emerald-700" />
                <span>¿Por qué NO usamos FODA?</span>
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                El FODA tradicional categoriza "debilidades" fijando a las personas en el juicio. En el <strong>Método RAS³</strong> no hay debilidades: hay <strong>Aciertos</strong> que se deben conservar y <strong>Oportunidades de Mejora</strong> que representan el potencial a desarrollar.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-2 text-xs text-gray-600">
              <span className="font-bold text-gray-800 font-mono block uppercase text-[10px]">
                DINÁMICA DEL DESARROLLO (Cap. 17)
              </span>
              <p className="text-[11px] leading-relaxed">
                <strong>Motor:</strong> El impulso inicial que te mueve.<br/>
                <strong>Meta:</strong> Hacia dónde orientas el esfuerzo.<br/>
                <strong>Precio:</strong> La disciplina e inversión de tiempo.<br/>
                <strong>Premio:</strong> Las capacidades permanentes que adquieres.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
