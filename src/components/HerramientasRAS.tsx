import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Layers, 
  Heart, 
  Leaf, 
  Briefcase, 
  BookOpen, 
  Sparkles, 
  HelpCircle,
  FileCheck2,
  Cpu,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Entity } from '../types';

interface HerramientasRASProps {
  entity?: Entity;
}

export default function HerramientasRAS({ entity }: HerramientasRASProps) {
  const [activeTab, setActiveTab] = useState<'admin' | 'humano' | 'sostenible' | 'manifiesto' | 'preguntas'>('admin');

  // Checklists states (saved locally in component or synced)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'adm-planear': true,
    'adm-finanzas': true,
    'adm-talento': true,
    'hum-descanso': true,
    'hum-pausas': true,
    'hum-proposito': true,
    'sos-circularidad': true,
    'sos-comunidad': true,
    'sos-patrimonio': true,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const adminFunctions = [
    { id: 'gerencia', name: 'Gerencia y Dirección', desc: 'Propósito, visión compartida y decisiones de fondo' },
    { id: 'finanzas', name: 'Finanzas y Tesorería', desc: 'Liquidez, rentabilidad responsable, flujo de caja y reinversión' },
    { id: 'talento', name: 'Talento Humano', desc: 'Desarrollo de capacidades, clima, bienestar y liderazgo consciente' },
    { id: 'logistica', name: 'Logística y Abastecimiento', desc: 'Compras éticas, inventarios en tiempo real y cadena de suministro' },
    { id: 'produccion', name: 'Producción / Operaciones', desc: 'Ecoeficiencia de procesos, calidad continua y minimización de mermas' },
    { id: 'mercado', name: 'Mercado y Comunidad', desc: 'Experiencia de usuarios, comunicación transparente y ventas de valor' },
    { id: 'asesoria', name: 'Asesoría y Legal', desc: 'Cumplimiento tributario, formalización y alineamiento con Ley BIC' },
    { id: 'apoyo', name: 'Apoyo y Tecnología (IA)', desc: 'Digitalización, automatización de tareas y visir sintético' },
  ];

  const humanPillars = [
    {
      category: 'Salud Física & Hábitos (Cap. 21)',
      items: [
        { id: 'hum-alimentacion', label: 'Alimentación equilibrada y disponibilidad de hidratación limpia' },
        { id: 'hum-descanso', label: 'Descanso suficiente y respeto de jornadas laborales saludables' },
        { id: 'hum-pausas', label: 'Pausas activas y ejercicios breves durante el día (respiración / yoga ejecutivo)' },
        { id: 'hum-ergonomia', label: 'Ergonomía en puestos de trabajo e iluminación natural' },
      ]
    },
    {
      category: 'Salud Mental, Emocional & Propósito',
      items: [
        { id: 'hum-proposito', label: 'Claridad en el propósito del rol y sentido de trascendencia' },
        { id: 'hum-estres', label: 'Espacios de escucha activa y regulación del estrés operativo' },
        { id: 'hum-resiliencia', label: 'Capacidad de aprender del error sin juicios punitivos' },
      ]
    },
    {
      category: 'Relaciones Humanas & Cultura',
      items: [
        { id: 'hum-comunicacion', label: 'Comunicación horizontal y respeto mutuo entre todos los niveles' },
        { id: 'hum-colaboracion', label: 'Trabajo colaborativo y fraternidad institucional' },
        { id: 'hum-tiempo', label: 'El tiempo como recurso humano: no consumir la vida de las personas' },
      ]
    }
  ];

  const sustainablePillars = [
    {
      category: 'Pilar Ambiental (Cap. 22)',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      items: [
        { id: 'sos-recursos', label: 'Uso responsable del agua, energía limpia y reducción de huella de carbono' },
        { id: 'sos-circularidad', label: 'Economía circular: gestión de residuos, merma cero y compostaje/reciclaje' },
        { id: 'sos-empaque', label: 'Sustitución de plásticos por empaques biodegradables o compostables' },
      ]
    },
    {
      category: 'Pilar Social & Comunitario (Ley BIC)',
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      items: [
        { id: 'sos-comunidad', label: 'Relaciones de confianza y compras justas a productores locales' },
        { id: 'sos-inclusion', label: 'Inclusión activa, equidad de oportunidades y bienestar colectivo' },
        { id: 'sos-seguridad', label: 'Seguridad en el trabajo y generación de valor compartido' },
      ]
    },
    {
      category: 'Pilar Económico Responsable',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      items: [
        { id: 'sos-viabilidad', label: 'Viabilidad financiera a largo plazo y diversificación de ingresos' },
        { id: 'sos-inversion', label: 'Inversión responsable orientada al desarrollo permanente' },
        { id: 'sos-resiliencia', label: 'Resiliencia ante crisis sin despedir talento abruptamente' },
      ]
    },
    {
      category: 'Pilar Cultural & Patrimonio',
      color: 'text-purple-700 bg-purple-50 border-purple-200',
      items: [
        { id: 'sos-patrimonio', label: 'Preservación de identidad cultural, tradiciones y memoria histórica' },
        { id: 'sos-conocimiento', label: 'Transmisión libre del conocimiento y desarrollo de valores' },
        { id: 'sos-innovacion', label: 'Innovación responsable que honra las raíces de la comunidad' },
      ]
    }
  ];

  const rasQuestions = [
    {
      area: 'Sobre la Realidad (Cap. 11 & 24)',
      q1: '¿Qué está ocurriendo realmente en los hechos observables?',
      q2: '¿Qué es evidencia demostrable y qué es solo un supuesto o prejuicio?',
      quote: '"La realidad precede al desarrollo. Observa los hechos antes de intervenir."'
    },
    {
      area: 'Sobre el Potencial (Cap. 11 & 24)',
      q1: '¿Qué capacidades aún no están siendo aprovechadas en esta entidad?',
      q2: '¿Qué podría llegar a desarrollarse si le brindamos las condiciones adecuadas?',
      quote: '"Nadie desarrolla aquello que considera incapaz de desarrollarse. Comienza por el potencial."'
    },
    {
      area: 'Sobre la Medición (Cap. 14)',
      q1: '¿Qué podemos medir objetivamente para comprender la evolución?',
      q2: '¿Qué decisión tomaremos con este dato antes de que sea solo un número estéril?',
      quote: '"Mido, luego existo. Medir no es calificar o juzgar; medir es distinguir para decidir."'
    },
    {
      area: 'Sobre las Prioridades (Cap. 23)',
      q1: '¿Qué acción genera el mayor efecto multiplicador en las 3 dimensiones simultáneamente?',
      q2: '¿Qué decisión tomada hoy apalanca y desbloquea el resto del camino?',
      quote: '"Cuando todo es prioridad, nada lo es. Priorizar antes que abarcar."'
    },
  ];

  return (
    <div className="space-y-6 py-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Base Teórica & Práctica del Libro RAS³</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Herramientas de Gobernanza y Metodología
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 font-sans max-w-2xl">
              Instrumentos oficiales extraídos del libro <em>"Método RAS³: Reingeniería Administrativa Sostenible"</em> de Herbert Gamarra.
            </p>
          </div>
          {entity && (
            <div className="bg-emerald-800/60 border border-emerald-700/60 rounded-xl px-4 py-2 text-right">
              <span className="text-[10px] text-emerald-200 font-mono block">ENTIDAD ACTIVA</span>
              <span className="text-sm font-serif font-bold text-white">{entity.name}</span>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-emerald-800/60">
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wide transition-all flex items-center space-x-1.5 ${
              activeTab === 'admin'
                ? 'bg-white text-emerald-950 shadow-sm'
                : 'text-emerald-100/70 hover:text-white hover:bg-emerald-800/40'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" />
            <span>Checklist Administrativo</span>
          </button>

          <button
            onClick={() => setActiveTab('humano')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wide transition-all flex items-center space-x-1.5 ${
              activeTab === 'humano'
                ? 'bg-white text-emerald-950 shadow-sm'
                : 'text-emerald-100/70 hover:text-white hover:bg-emerald-800/40'
            }`}
          >
            <Heart className="h-3.5 w-3.5" />
            <span>Checklist Humano</span>
          </button>

          <button
            onClick={() => setActiveTab('sostenible')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wide transition-all flex items-center space-x-1.5 ${
              activeTab === 'sostenible'
                ? 'bg-white text-emerald-950 shadow-sm'
                : 'text-emerald-100/70 hover:text-white hover:bg-emerald-800/40'
            }`}
          >
            <Leaf className="h-3.5 w-3.5" />
            <span>Checklist Sostenible (Ley BIC)</span>
          </button>

          <button
            onClick={() => setActiveTab('preguntas')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wide transition-all flex items-center space-x-1.5 ${
              activeTab === 'preguntas'
                ? 'bg-white text-emerald-950 shadow-sm'
                : 'text-emerald-100/70 hover:text-white hover:bg-emerald-800/40'
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Preguntas de Enfoque</span>
          </button>

          <button
            onClick={() => setActiveTab('manifiesto')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wide transition-all flex items-center space-x-1.5 ${
              activeTab === 'manifiesto'
                ? 'bg-white text-emerald-950 shadow-sm'
                : 'text-emerald-100/70 hover:text-white hover:bg-emerald-800/40'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Manifiesto RAS³</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Checklist Administrativo */}
      {activeTab === 'admin' && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-serif font-bold text-gray-900">
              Matriz Administrativa: Funciones × Proceso (Capítulo 20)
            </h3>
            <p className="text-xs text-gray-500 font-sans mt-1">
              "Administrar bien ya no consiste únicamente en reducir costos o controlar actividades, sino en crear sistemas cada vez más inteligentes, ágiles y capaces de adaptarse al cambio."
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 font-mono text-gray-700">
                  <th className="py-2.5 px-3">Función Administrativa</th>
                  <th className="py-2.5 px-3 text-center">Planear</th>
                  <th className="py-2.5 px-3 text-center">Organizar</th>
                  <th className="py-2.5 px-3 text-center">Dirigir</th>
                  <th className="py-2.5 px-3 text-center">Controlar</th>
                  <th className="py-2.5 px-3">Estado de Desarrollo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {adminFunctions.map((fn, idx) => (
                  <tr key={fn.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-semibold text-gray-900">{fn.name}</p>
                      <p className="text-[11px] text-gray-500 font-sans">{fn.desc}</p>
                    </td>
                    {['planear', 'organizar', 'dirigir', 'controlar'].map(step => {
                      const checkKey = `adm-${fn.id}-${step}`;
                      const isChecked = checkedItems[checkKey] ?? (idx % 2 === 0);
                      return (
                        <td key={step} className="py-3 px-3 text-center">
                          <button
                            onClick={() => toggleCheck(checkKey)}
                            className="p-1 text-emerald-800 hover:text-emerald-950 transition-colors inline-block"
                            title={`Alternar ${step} en ${fn.name}`}
                          >
                            {isChecked ? (
                              <CheckSquare className="h-4 w-4 text-emerald-700" />
                            ) : (
                              <Square className="h-4 w-4 text-gray-300" />
                            )}
                          </button>
                        </td>
                      );
                    })}
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-100">
                        Optimizado
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Checklist Humano */}
      {activeTab === 'humano' && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-serif font-bold text-gray-900">
              Checklist Humano: La Ciencia del Bienestar (Capítulo 21)
            </h3>
            <p className="text-xs text-gray-500 font-sans mt-1">
              "Ninguna organización puede desarrollarse más allá del desarrollo de las personas que la hacen posible. Cuidar al ser humano no es un beneficio adicional; es una condición para el Desarrollo Integral."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {humanPillars.map(group => (
              <div key={group.category} className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 space-y-3">
                <h4 className="text-xs font-mono font-bold text-gray-800 uppercase tracking-wide border-b border-gray-200/80 pb-2">
                  {group.category}
                </h4>
                <div className="space-y-2.5">
                  {group.items.map(item => {
                    const isChecked = checkedItems[item.id] ?? false;
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className="flex items-start space-x-2.5 cursor-pointer select-none p-1.5 rounded-lg hover:bg-white transition-colors"
                      >
                        <div className="mt-0.5">
                          {isChecked ? (
                            <CheckSquare className="h-4 w-4 text-emerald-700" />
                          ) : (
                            <Square className="h-4 w-4 text-gray-300" />
                          )}
                        </div>
                        <span className={`text-xs leading-snug ${isChecked ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start space-x-3">
            <Zap className="h-4 w-4 text-amber-700 mt-0.5 shrink-0" />
            <p>
              <strong>El tiempo como recurso humano:</strong> La cultura del exceso premia estar ocupado permanentemente. En RAS³, el tiempo invertido en descansar, aprender, compartir con el equipo y respirar conscientemente es una inversión directa en la capacidad futura de innovar.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Checklist Sostenible (Ley BIC) */}
      {activeTab === 'sostenible' && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-serif font-bold text-gray-900">
              Checklist Sostenible: 4 Pilares Inseparables (Capítulo 22 & Ley BIC)
            </h3>
            <p className="text-xs text-gray-500 font-sans mt-1">
              "Una organización financieramente quebrada no es sostenible. Una sociedad emocionalmente enferma tampoco. Un ecosistema destruido mucho menos. La sostenibilidad integra lo Económico, Social, Ambiental y Cultural."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sustainablePillars.map(pillar => (
              <div key={pillar.category} className={`border rounded-xl p-4 space-y-3 ${pillar.color}`}>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wide pb-1 border-b border-current/20">
                  {pillar.category}
                </h4>
                <div className="space-y-2">
                  {pillar.items.map(item => {
                    const isChecked = checkedItems[item.id] ?? false;
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className="flex items-start space-x-2 cursor-pointer select-none bg-white/70 p-2 rounded-lg hover:bg-white transition-colors"
                      >
                        <div className="mt-0.5">
                          {isChecked ? (
                            <CheckSquare className="h-4 w-4 text-current" />
                          ) : (
                            <Square className="h-4 w-4 text-gray-300" />
                          )}
                        </div>
                        <span className="text-xs text-gray-800 leading-snug">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 flex items-start space-x-3">
            <ShieldCheck className="h-4 w-4 text-emerald-700 mt-0.5 shrink-0" />
            <p>
              <strong>Alineamiento Ley BIC (Beneficio e Interés Colectivo):</strong> El marco legal BIC acredita formalmente ante bancos de desarrollo y fondos internacionales que la organización genera impactos positivos verificables en su comunidad, sus trabajadores y el medio ambiente.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Preguntas RAS3 */}
      {activeTab === 'preguntas' && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-serif font-bold text-gray-900">
              Preguntas de Enfoque Metodológico (Capítulo 24 & Glosario)
            </h3>
            <p className="text-xs text-gray-500 font-sans mt-1">
              "Las preguntas promueven el conocimiento, las respuestas moldean el enfoque. En RAS³, el desarrollo comienza formulando mejores preguntas antes de intervenir."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rasQuestions.map((q, idx) => (
              <div key={idx} className="bg-gray-50/70 border border-gray-100 rounded-xl p-4 space-y-2.5">
                <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold tracking-wider">
                  {q.area}
                </span>
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-gray-900">• {q.q1}</p>
                  <p className="text-xs font-semibold text-gray-900">• {q.q2}</p>
                </div>
                <p className="text-[11px] font-serif italic text-gray-500 pt-2 border-t border-gray-200/60">
                  {q.quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Manifiesto RAS3 */}
      {activeTab === 'manifiesto' && (
        <div className="bg-emerald-950 text-white rounded-2xl p-8 shadow-sm space-y-6 font-serif">
          <div className="text-center max-w-xl mx-auto space-y-2 border-b border-emerald-800 pb-6">
            <h3 className="text-2xl font-bold tracking-tight text-emerald-200">
              Manifiesto RAS³
            </h3>
            <p className="text-sm italic text-emerald-100 font-sans">
              "No administramos cosas. Desarrollamos potenciales."
            </p>
            <p className="text-xs font-mono text-emerald-300">
              Lic. Adm. Herbert Pablo Gamarra Gil
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4 text-xs sm:text-sm text-emerald-50/90 leading-relaxed font-sans">
            <p>
              • <strong>Creemos</strong> que toda persona, organización, comunidad o sociedad posee un potencial mayor que su realidad presente.
            </p>
            <p>
              • <strong>Creemos</strong> que el desarrollo no ocurre por azar, ni por inspiración momentánea, sino por la capacidad de observar con objetividad, comprender profundamente y actuar con propósito.
            </p>
            <p>
              • <strong>Creemos</strong> que la administración no debe limitarse a controlar recursos, sino convertirse en la ciencia que organiza el desarrollo integral.
            </p>
            <p>
              • <strong>Creemos</strong> que una organización sana no se mide únicamente por sus utilidades, sino por las personas que desarrolla, la cultura que construye y el futuro que hace posible.
            </p>
            <p>
              • <strong>Creemos</strong> que la sostenibilidad no comienza cuando aparecen indicadores, sino cuando las decisiones consideran sus consecuencias sobre las generaciones futuras.
            </p>
            <p>
              • <strong>Creemos</strong> que ninguna inteligencia artificial debe sustituir el criterio humano. Por eso transformamos la IA en una Inteligencia Sintética: un <em>Visir</em> que asesora, integra y fundamenta, mientras la decisión continúa perteneciendo al ser humano.
            </p>
            <p>
              • <strong>El desarrollo integral no es una meta.</strong> Es una manera de pensar. Una manera de decidir. Una manera de vivir.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
