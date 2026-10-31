import React, { useState, useRef, useEffect } from 'react';
import { Entity, ChatMessage, ScenarioSimulation } from '../types';
import { 
  Send, 
  Sparkles, 
  Compass, 
  AlertCircle, 
  RefreshCw, 
  MessageSquare, 
  Zap, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp,
  BrainCircuit,
  Sliders,
  Lightbulb,
  Rocket,
  Award,
  DollarSign
} from 'lucide-react';

interface VisirChatProps {
  entity: Entity;
}

export default function VisirChat({ entity }: VisirChatProps) {
  const currentIteration = entity.iterations[entity.iterations.length - 1];
  const diagnosis = currentIteration?.diagnosis;

  const [activeMode, setActiveMode] = useState<'chat' | 'simulador'>('chat');
  const [visirRole, setVisirRole] = useState<'solucionador' | 'gobernanza'>('solucionador');

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'visir',
      text: `¡Saludos, gestor! Soy tu Visir Digital en el Banco de las Ideas. 

Aquí no vengo a juzgarte ni a encasillarte con dogmas rígidos: mi misión es ser tu **co-piloto creativo y solucionador estratégico**, usando el Método RAS³ de Herbert Gamarra como un trampolín para potenciar ideas, no como un límite.

¿Tienes un cuello de botella con clientes, costos, motivación del equipo, economía circular o inversión? Cuéntame tu desafío o pulsa una de las propuestas rápidas para que empecemos a destrabarlo juntos.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Scenario Simulator state
  const [scenarioInput, setScenarioInput] = useState('');
  const [simulating, setSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<ScenarioSimulation | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeMode === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeMode]);

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const queryText = customText || input;
    if (!queryText.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customText) setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          entityName: entity.name,
          currentContext: entity.description || entity.sector,
          diagnosis: diagnosis,
          route: currentIteration?.route,
          mode: visirRole === 'solucionador' ? 'Solucionador Creativo y Hacks de Crecimiento' : 'Gobernanza y Ley BIC',
        }),
      });

      if (!response.ok) {
        throw new Error('Servidor no disponible');
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-visir`,
          sender: 'visir',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err: any) {
      console.warn("API fallback to autonomous creative advisor:", err);
      
      const query = queryText.toLowerCase();
      let replyText = '';

      if (query.includes('monetiz') || query.includes('ingreso') || query.includes('dinero') || query.includes('financ')) {
        replyText = `### 💡 3 Soluciones Creativas de Monetización con Impacto para "${entity.name}":

1. **Modelo de Suscripción o Membresía Circular (Consumo Consciente):**
   - En vez de vender sólo un producto transaccional, ofrece entregas programadas o acceso anticipado a lotes especiales ecológicos/artesanales.
   - *Impacto RAS³:* Aportas flujo de caja predecible (Administrativa), fidelizas a la comunidad (Social) y reduces la sobreproducción al producir bajo pedido (Ambiental).

2. **Copatrocinio B2B y Ley BIC (Empresas Aliadas):**
   - Ofrece kits de bienestar o regalos corporativos sostenibles para empresas que buscan cumplir sus metas ESG o reporte de sostenibilidad.
   - *Ventaja:* Ticket promedio 5x más alto que la venta al detalle y menor costo de adquisición por cliente.

3. **Monetización del Saber (Talleres o Experiencias Vivenciales):**
   - Capitaliza tu conocimiento: realiza catas, talleres de elaboración o masterclasses de impacto socioambiental para turistas, estudiantes o profesionales.
   - *Efecto Multiplicador:* Genera margen neto >70% y posiciona a tu equipo como referentes del sector.`;
      } else if (query.includes('cliente') || query.includes('ventas') || query.includes('marketing') || query.includes('traccion')) {
        replyText = `### 🚀 Hacks de Tracción y Primeros Clientes sin Presupuesto:

1. **Alianzas Simbióticas Locales:**
   - Ubica 3 negocios vecinos o marcas complementarias que compartan tus mismos valores éticos (ej. cafés sostenibles, espacios culturales, estudios de yoga). Realicen promociones cruzadas o colaboraciones exclusivas.
2. **Historia de Origen Auténtica (Storytelling de Impacto):**
   - No vendas características; muestra el rostro de las personas y la historia detrás de cada lote o servicio. El consumidor actual recompensa la transparencia radical y el comercio justo.
3. **Muestra y Validación Comunitaria (Activación de Embajadores):**
   - Invita a 10 líderes de opinión o clientes pioneros a probar tu solución a cambio de testimonios honestos en video. El boca a boca orgánico multiplica la credibilidad más que cualquier pauta publicitaria.`;
      } else if (query.includes('equipo') || query.includes('burnout') || query.includes('estres') || query.includes('humana') || query.includes('motiva')) {
        replyText = `### 🌿 Potenciación de la Dimensión Humana: Soluciones Rápidas

1. **Pausas Conscientes de 10 Minutos (Micro-recargas):**
   - Implementar dos cortes diarios de estiramiento ergonómico y respiración diafragmática. La neurociencia demuestra que recupera la atención selectiva y reduce errores en un 35%.
2. **Protocolo "Viernes de Ideas sin Filtro":**
   - Dedica 30 minutos a la semana a escuchar al equipo: ¿qué proceso diario les quita más energía? Automatizar o simplificar un solo formulario o trámite devuelve motivación inmediata.
3. **Claridad de Roles (Motor y Meta):**
   - Cuando el equipo conoce la 'Meta' y comprende el 'Premio' colectivo (no solo metas financieras, sino impacto en la comunidad), el compromiso se vuelve genuino y autónomo.`;
      } else if (query.includes('empaque') || query.includes('ecolog') || query.includes('sostenib') || query.includes('residuo') || query.includes('merma')) {
        replyText = `### ♻️ Solución Integral de Economía Circular y Costos:

1. **Upcycling y Aprovechamiento de Mermas:**
   - Evalúa qué sobrantes de tu operación pueden transformarse en subproductos secundarios (ej. compostaje para huertos urbanos, embalajes reciclados o donación a proyectos comunitarios).
2. **Bio-empaques a Granel / Retornables:**
   - Incentiva a tus clientes frecuentes con un descuento o beneficio extra si traen su propio envase reutilizable. Esto fideliza al cliente y reduce tu costo de adquisición de envases en un 20%.
3. **Certificación o Distintivo BIC:**
   - La sostenibilidad no es un gasto, es un activo. Incluye sellos de comercio local y baja huella hídrica/carbono en tu comunicación para justificar un precio premium justo.`;
      } else if (query.includes('fondo') || query.includes('inversion') || query.includes('banco') || query.includes('capital')) {
        replyText = `### 🏛️ Estrategia para Atraer Fondos y Capital de Impacto:

1. **Utiliza tu Dossier de Inversión RAS³ descargable:**
   - En la pestaña **Dossier**, tienes el expediente estandarizado con el Radar Telaraña y los compromisos Ley BIC listos para presentar ante comités evaluadores.
2. **Destaca la Medición Multidimensional:**
   - Los inversionistas modernos de impacto buscan proyectos donde el rendimiento económico esté respaldado por métricas sociales y ambientales auditables.
3. **Postulación a Subsidios de Innovación:**
   - Fondos como ProInnóvate, Retos de Innovación Circular y aceleradoras socioambientales priorizan proyectos con gobernanza clara y formalización BIC.`;
      } else {
        replyText = `### ⚡ Análisis Creativo para "${entity.name}":

Bajo el Método RAS³, enfoquémonos en **ampliar el potencial latente** en vez de preocuparnos por limitaciones aparentes:

- **Estrategia Inmediata:** ¿Cómo podemos simplificar el proceso que hoy te consume más tiempo para liberar energía hacia la venta y el contacto directo con tu comunidad?
- **Innovación con Valor Compartido:** Pregúntate qué elemento de tu identidad cultural o compromiso ambiental puede ser tu factor diferenciador único en el mercado.
- **Acción Sugerida:** Si deseas, activa el **Simulador de Escenarios** aquí arriba para medir el impacto numérico de tomar una decisión operativa en los próximos 90 días.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-visir`,
          sender: 'visir',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateScenario = async (customPrompt?: string) => {
    const textToSimulate = customPrompt || scenarioInput;
    if (!textToSimulate.trim()) return;

    setSimulating(true);
    setSimulationResult(null);

    try {
      const response = await fetch('/api/simulate-scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: textToSimulate,
          entityName: entity.name,
          sector: entity.sector,
        }),
      });

      if (!response.ok) throw new Error("Fallback local");

      const data = await response.json();
      setSimulationResult({
        id: `sim-${Date.now()}`,
        scenario: textToSimulate,
        impactoAdministrativo: data.impactoAdministrativo,
        impactoHumano: data.impactoHumano,
        impactoSostenible: data.impactoSostenible,
        recomendacionVisir: data.recomendacionVisir,
        viabilidad: data.viabilidad || 'alta',
      });
    } catch (err) {
      // Local intelligent simulation based on Herbert Gamarra's book
      const isEco = textToSimulate.toLowerCase().includes('empaque') || textToSimulate.toLowerCase().includes('verde') || textToSimulate.toLowerCase().includes('compost');
      const isHuman = textToSimulate.toLowerCase().includes('pausa') || textToSimulate.toLowerCase().includes('jornada') || textToSimulate.toLowerCase().includes('salud');
      
      setSimulationResult({
        id: `sim-${Date.now()}`,
        scenario: textToSimulate,
        impactoAdministrativo: isEco 
          ? "Ajuste temporal en costos de empaque (+8%), compensado con un 25% de ahorro en multas por residuos y mayor rotación de pedidos conscientes."
          : "Reorganización de turnos y procesos; automatización de tareas que ahorra 14 horas semanales de carga administrativa.",
        impactoHumano: isHuman
          ? "Incremento inmediato del 20% en concentración y moral del equipo; reducción del 35% en licencias por estrés o fatiga ergonómica."
          : "El personal asume con entusiasmo la iniciativa al percibir coherencia ética entre el discurso y la acción cotidiana.",
        impactoSostenible: "Fortalece directamente el Pilar Ambiental y Social de la Ley BIC; reduce la huella de carbono y crea un caso de estudio reproducible.",
        recomendacionVisir: `Como tu Visir Digital, recomiendo proceder con esta acción integrándola en la Etapa 1 o 2 de tu Ruta de Desarrollo. Su efecto multiplicador es positivo porque beneficia al ser humano y a la sostenibilidad sin comprometer la liquidez.`,
        viabilidad: 'alta'
      });
    } finally {
      setSimulating(false);
    }
  };

  const creativePrompts = [
    {
      title: 'Monetización Creativa',
      icon: DollarSign,
      prompt: '¿Qué 3 modelos de monetización con impacto socioambiental y margen saludable podemos implementar?',
    },
    {
      title: 'Hacks de Clientes sin Dinero',
      icon: Rocket,
      prompt: 'Propón 3 estrategias creativas para captar primeros clientes y alianzas sin presupuesto publicitario.',
    },
    {
      title: 'Bienestar y Desempeño',
      icon: Heart,
      prompt: '¿Cómo aplicar pausas activas y balance vital en el equipo para elevar la creatividad sin bajar el ritmo?',
    },
    {
      title: 'Economía Circular y Costos',
      icon: Leaf,
      prompt: '¿Cómo transformar residuos o empaques en una ventaja de ahorro y diferenciación de marca?',
    },
  ];

  function Leaf(props: any) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    );
  }

  function Heart(props: any) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    );
  }

  const presetScenarios = [
    'Simular: Reducción de jornada a 40 horas e introducción de 15 minutos diarios de pausas activas (Cap. 21)',
    'Simular: Sustitución de plásticos por bio-empaques compostables de almidón y merma cero (Cap. 22)',
    'Simular: Lanzamiento de una suscripción mensual con entrega circular retornable y descuento del 10%',
    'Simular: Alianza con cooperativas comunales locales para abastecimiento directo de insumos',
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase border border-amber-400/30">
                <BrainCircuit className="h-3.5 w-3.5 text-amber-300" />
                <span>Inteligencia Sintética · Método RAS³</span>
              </span>
              <span className="hidden sm:inline text-xs text-emerald-200">
                Herbert Gamarra
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold font-serif mt-2 tracking-tight">
              El Visir Digital: Tu Co-Piloto Estratégico
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-2xl font-sans leading-relaxed">
              Asesor creativo, versátil y pragmático para <strong className="text-white">{entity.name}</strong>. Aplica el Método RAS³ como acelerador de soluciones prácticas, no como limitante.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-emerald-950/60 p-1.5 rounded-2xl border border-emerald-700/50 self-start md:self-auto">
            <button
              onClick={() => setActiveMode('chat')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-all ${
                activeMode === 'chat'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Lightbulb className="h-4 w-4" />
              <span>Solucionador & Diálogo</span>
            </button>
            <button
              onClick={() => setActiveMode('simulador')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-all ${
                activeMode === 'simulador'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Sliders className="h-4 w-4" />
              <span>Simulador 3D</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Mode View */}
      {activeMode === 'chat' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Creative Action Prompts (Left Sidebar) */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase font-bold text-gray-500 tracking-wider">
                  Enfoque del Visir
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-mono font-bold">
                  Versátil
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 p-1 bg-gray-50 rounded-xl">
                <button
                  onClick={() => setVisirRole('solucionador')}
                  className={`py-1.5 text-[11px] font-mono font-bold rounded-lg transition-all ${
                    visirRole === 'solucionador'
                      ? 'bg-white text-emerald-900 shadow-xs border border-gray-100'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  💡 Solucionador
                </button>
                <button
                  onClick={() => setVisirRole('gobernanza')}
                  className={`py-1.5 text-[11px] font-mono font-bold rounded-lg transition-all ${
                    visirRole === 'gobernanza'
                      ? 'bg-white text-emerald-900 shadow-xs border border-gray-100'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  ⚖️ Ley BIC / 3D
                </button>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 font-sans leading-relaxed">
                  {visirRole === 'solucionador' 
                    ? 'Orientado a destrabar problemas prácticos, proponer nuevos ingresos, optimizar procesos y dar soluciones creativas inmediatas.'
                    : 'Orientado a calibrar el equilibrio de las 3 Dimensiones (Administrativa, Humana, Sostenible) y los 4 Pilares de la Ley BIC.'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm space-y-3">
              <span className="text-[11px] font-mono uppercase font-bold text-gray-500 tracking-wider block">
                Ideas Rápidas de Consulta
              </span>
              <div className="space-y-2">
                {creativePrompts.map((cp, idx) => {
                  const Icon = cp.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(undefined, cp.prompt)}
                      className="w-full text-left p-2.5 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all group flex items-start space-x-2.5"
                    >
                      <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-800 group-hover:text-emerald-900 font-sans">
                          {cp.title}
                        </div>
                        <div className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">
                          {cp.prompt}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Chat Window (Right / Main) */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col h-[650px] overflow-hidden">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((msg) => {
                const isVisir = msg.sender === 'visir';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-3 ${isVisir ? '' : 'flex-row-reverse space-x-reverse'}`}
                  >
                    <div
                      className={`h-9 w-9 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                        isVisir
                          ? 'bg-linear-to-br from-emerald-800 to-teal-900 text-amber-300'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {isVisir ? <Compass className="h-4 w-4" /> : <div className="text-xs font-bold font-mono">TÚ</div>}
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm shadow-xs ${
                        isVisir
                          ? 'bg-gray-50 border border-gray-100 text-gray-800 leading-relaxed font-sans'
                          : 'bg-emerald-800 text-white font-sans'
                      }`}
                    >
                      {isVisir ? (
                        <div className="space-y-2 whitespace-pre-wrap">
                          {msg.text.split('\n\n').map((paragraph, pIdx) => {
                            if (paragraph.startsWith('###')) {
                              return (
                                <h4 key={pIdx} className="font-bold text-emerald-900 text-sm sm:text-base border-b border-gray-200 pb-1 mt-2">
                                  {paragraph.replace('###', '').trim()}
                                </h4>
                              );
                            }
                            return <p key={pIdx}>{paragraph}</p>;
                          })}
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      )}
                      
                      <div
                        className={`text-[10px] font-mono mt-2 text-right ${
                          isVisir ? 'text-gray-400' : 'text-emerald-200'
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-center space-x-3 text-xs text-gray-500 font-mono italic p-2 bg-gray-50/50 rounded-xl w-fit">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-600" />
                  <span>El Visir está formulando soluciones creativas e interdisciplinarias...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => handleSendMessage(e)}
              className="p-4 bg-gray-50 border-t border-gray-100 flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu consulta o pide una solución creativa (ej. ¿Cómo monetizar sin perder impacto?...)"
                className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-emerald-600 shadow-2xs"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white px-5 py-3 rounded-xl font-mono text-xs font-bold flex items-center space-x-2 shadow-xs transition-colors"
              >
                <span>Enviar</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Scenario Simulator Mode */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="max-w-3xl">
            <span className="text-[10px] font-mono uppercase bg-amber-50 text-amber-900 border border-amber-200 font-bold px-2 py-0.5 rounded-md">
              Capítulo 17 y 23: Dinámica del Desarrollo y Efecto Multiplicador
            </span>
            <h3 className="text-xl font-bold font-serif text-gray-900 mt-2">
              Simulador Tridimensional de Escenarios RAS³
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-sans mt-1">
              Prueba una hipótesis o cambio estratégico antes de ejecutarlo. El Visir Digital proyectará el impacto en las 3 Dimensiones y sugerirá la mejor forma de implementarlo.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold font-mono text-gray-700 uppercase">
              Escenarios Preconfigurados de Prueba Rápida
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {presetScenarios.map((scen, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setScenarioInput(scen);
                    handleSimulateScenario(scen);
                  }}
                  className="text-left text-xs p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-emerald-50 hover:border-emerald-200 text-gray-700 font-sans transition-colors flex items-center justify-between"
                >
                  <span className="line-clamp-2">{scen}</span>
                  <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold font-mono text-gray-700 uppercase">
              O Plantea Tu Propio Escenario a Medir
            </label>
            <textarea
              rows={3}
              value={scenarioInput}
              onChange={(e) => setScenarioInput(e.target.value)}
              placeholder="Ejemplo: ¿Qué pasaría si automatizamos el onboarding de productores agrícolas y destinamos el 5% de las ganancias a un fondo comunal de reforestación?"
              className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 bg-gray-50/50 p-4 focus:bg-white focus:outline-none focus:border-emerald-600 font-sans"
            />
            <button
              onClick={() => handleSimulateScenario()}
              disabled={simulating || !scenarioInput.trim()}
              className="bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center space-x-2 transition-colors shadow-xs"
            >
              {simulating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-amber-400" />}
              <span>{simulating ? 'Simulando Proyecciones...' : 'Ejecutar Simulación 3D'}</span>
            </button>
          </div>

          {/* Simulation Output Card */}
          {simulationResult && (
            <div className="mt-8 bg-gray-50/80 rounded-2xl p-6 border border-emerald-100 shadow-sm space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-3 gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold bg-emerald-100/60 px-2.5 py-0.5 rounded-md">
                    Resultado de Simulación
                  </span>
                  <h4 className="text-base font-bold text-gray-900 font-serif mt-1">
                    "{simulationResult.scenario}"
                  </h4>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono text-gray-500">Viabilidad estimada:</span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {simulationResult.viabilidad}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-800">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs font-mono font-bold uppercase">Impacto Administrativo</span>
                  </div>
                  <p className="text-xs text-gray-600 font-sans leading-relaxed">
                    {simulationResult.impactoAdministrativo}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs space-y-2">
                  <div className="flex items-center space-x-2 text-rose-800">
                    <Heart className="h-4 w-4 text-rose-600" />
                    <span className="text-xs font-mono font-bold uppercase">Impacto Humano</span>
                  </div>
                  <p className="text-xs text-gray-600 font-sans leading-relaxed">
                    {simulationResult.impactoHumano}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs space-y-2">
                  <div className="flex items-center space-x-2 text-teal-800">
                    <Leaf className="h-4 w-4 text-teal-600" />
                    <span className="text-xs font-mono font-bold uppercase">Impacto Sostenible (BIC)</span>
                  </div>
                  <p className="text-xs text-gray-600 font-sans leading-relaxed">
                    {simulationResult.impactoSostenible}
                  </p>
                </div>
              </div>

              <div className="bg-linear-to-r from-emerald-900 to-teal-900 text-white p-5 rounded-xl space-y-2 shadow-xs">
                <div className="flex items-center space-x-2">
                  <Compass className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                    Dictamen Estratégico del Visir Digital
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-sans text-emerald-100 leading-relaxed">
                  {simulationResult.recomendacionVisir}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
