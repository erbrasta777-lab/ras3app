import React, { useState, useEffect } from 'react';
import { Entity, Diagnosis, KPIDimension, PriorityAction, DevelopmentRoute, Iteration } from './types';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Analizar from './components/Analizar';
import Medir from './components/Medir';
import Priorizar from './components/Priorizar';
import Ruta from './components/Ruta';
import VisirChat from './components/VisirChat';
import Historial from './components/Historial';
import ReporteEjecutivo from './components/ReporteEjecutivo';
import OnboardingModal from './components/OnboardingModal';
import { Sparkles, MessageSquare, History, Compass, Briefcase, Plus, X, ListTodo, ClipboardCheck, FileText } from 'lucide-react';

export default function App() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [selectedEntityId, setSelectedEntityId] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSector, setNewSector] = useState('Comercio / Retail');
  const [newScale, setNewScale] = useState('Autoempleo / Microempresa (1-5 colaboradores)');
  const [newChallenge, setNewChallenge] = useState('Rentabilidad Financiera y Control Administrativo');

  // Load state from localStorage on init
  useEffect(() => {
    const saved = localStorage.getItem('ras3_entities');
    if (saved) {
      try {
        let parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          // Remove ERBS Maquinarias if it is saved in local storage
          parsed = parsed.filter((e: Entity) => e.name !== 'ERBS Maquinarias');
          if (parsed.length > 0) {
            setEntities(parsed);
            setSelectedEntityId(parsed[0].id);
            saveToStorage(parsed);
          } else {
            loadMockData();
          }
        } else {
          loadMockData();
        }
      } catch (e) {
        loadMockData();
      }
    } else {
      loadMockData();
    }

    // Auto open onboarding if it's the user's first time
    const onboardingShown = localStorage.getItem('ras3_onboarding_shown');
    if (!onboardingShown) {
      setIsOnboardingOpen(true);
    }
  }, []);

  const loadMockData = () => {
    const mockEntities: Entity[] = [
      {
        id: 'mock-1',
        name: 'Toyland',
        description: 'Tienda física de juguetes didácticos y ecológicos que busca expandirse digitalmente.',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        updatedAt: new Date().toISOString(),
        level: 30,
        currentStep: 'medicion',
        iterations: [
          {
            id: 'iter-1',
            version: 1,
            date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            diagnosis: {
              potencial: 'Toyland tiene el potencial de transformarse en el referente regional de juguetes de madera y didácticos con conciencia ecológica, impulsando una comunidad de padres educadores.',
              realidad: 'Disminución del 15% en ventas físicas. Gran stock de inventario ecológico inmóvil. Personal de ventas desmotivado debido a la falta de incentivos.',
              aciertos: [
                'Calidad superior y procedencia 100% certificada de los juguetes de madera.',
                'Atención muy cordial y personalizada por parte de los tres colaboradores.',
                'Excelente ubicación física en zona de alto tránsito de familias.'
              ],
              oportunidades_mejora: [
                'Establecer incentivos variables basados en objetivos de venta.',
                'Habilitar canal de comercio electrónico y redes sociales.',
                'Implementar un sistema de reciclaje / recompra de juguetes usados.'
              ]
            },
            kpiDimension: {
              administrativa: [
                { id: 'kpi-1', name: 'Nivel de rotación de inventarios', baseline: '180 días', target: '90 días', status: 'en_progreso' }
              ],
              humana: [
                { id: 'kpi-2', name: 'Porcentaje de comisiones recibidas por personal', baseline: '0%', target: '15%', status: 'pendiente' }
              ],
              sostenible: [
                { id: 'kpi-3', name: 'Juguetes ecológicos reciclados', baseline: '0 unidades', target: '200 unidades/año', status: 'pendiente' }
              ]
            }
          }
        ]
      }
    ];

    setEntities(mockEntities);
    setSelectedEntityId(mockEntities[0].id);
    saveToStorage(mockEntities);
  };

  const saveToStorage = (updatedEntities: Entity[]) => {
    localStorage.setItem('ras3_entities', JSON.stringify(updatedEntities));
  };

  const handleSelectEntity = (id: string) => {
    setSelectedEntityId(id);
    const ent = entities.find(e => e.id === id);
    if (ent) {
      // Auto switch tabs depending on current step if already in dashboard
      if (currentTab !== 'dashboard' && currentTab !== 'chat' && currentTab !== 'historial') {
        if (ent.currentStep === 'diagnostico') setCurrentTab('analizar');
        else if (ent.currentStep === 'medicion') setCurrentTab('medir');
        else if (ent.currentStep === 'priorizacion') setCurrentTab('priorizar');
        else setCurrentTab('ruta');
      }
    }
  };

  // 1. Create Entity Modal Action
  const handleCreateEntity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newEntity: Entity = {
      id: `entity-${Date.now()}`,
      name: newName,
      description: newDesc || `${newName} es una iniciativa del sector ${newSector}, enfocada en ${newScale} y con el desafío principal de ${newChallenge}.`,
      sector: newSector,
      scale: newScale,
      challenge: newChallenge,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      level: 10,
      currentStep: 'diagnostico',
      iterations: [
        {
          id: `iter-${Date.now()}`,
          version: 1,
          date: new Date().toISOString(),
        }
      ]
    };

    const updated = [newEntity, ...entities];
    setEntities(updated);
    setSelectedEntityId(newEntity.id);
    saveToStorage(updated);

    // Reset fields & transition
    setNewName('');
    setNewDesc('');
    setNewSector('Comercio / Retail');
    setNewScale('Autoempleo / Microempresa (1-5 colaboradores)');
    setNewChallenge('Rentabilidad Financiera y Control Administrativo');
    setIsModalOpen(false);
    setCurrentTab('analizar');
  };

  const handleDeleteEntity = (id: string) => {
    const updated = entities.filter((e) => e.id !== id);
    setEntities(updated);
    if (selectedEntityId === id && updated.length > 0) {
      setSelectedEntityId(updated[0].id);
    } else if (updated.length === 0) {
      setSelectedEntityId('');
    }
    saveToStorage(updated);
  };

  // 2. Save step results to update active iteration
  const handleSaveDiagnosis = (
    diagnosis: Diagnosis, 
    suggestedKpis: KPIDimension, 
    suggestedPriorities: PriorityAction[],
    initialRoute: DevelopmentRoute
  ) => {
    const updated = entities.map((ent) => {
      if (ent.id === selectedEntityId) {
        const lastIter = ent.iterations[ent.iterations.length - 1];
        const updatedIter: Iteration = {
          ...lastIter,
          diagnosis,
          kpiDimension: suggestedKpis,
          priorities: suggestedPriorities,
          route: initialRoute
        };
        const updatedIters = [...ent.iterations.slice(0, -1), updatedIter];

        return {
          ...ent,
          currentStep: 'medicion' as const,
          level: 25,
          updatedAt: new Date().toISOString(),
          iterations: updatedIters
        };
      }
      return ent;
    });

    setEntities(updated);
    saveToStorage(updated);
  };

  const handleSaveKpis = (kpis: KPIDimension) => {
    const updated = entities.map((ent) => {
      if (ent.id === selectedEntityId) {
        const lastIter = ent.iterations[ent.iterations.length - 1];
        const updatedIter: Iteration = {
          ...lastIter,
          kpiDimension: kpis
        };
        const updatedIters = [...ent.iterations.slice(0, -1), updatedIter];

        return {
          ...ent,
          currentStep: 'priorizacion' as const,
          level: 50,
          updatedAt: new Date().toISOString(),
          iterations: updatedIters
        };
      }
      return ent;
    });

    setEntities(updated);
    saveToStorage(updated);
  };

  const handleSavePriorities = (priorities: PriorityAction[]) => {
    const updated = entities.map((ent) => {
      if (ent.id === selectedEntityId) {
        const lastIter = ent.iterations[ent.iterations.length - 1];
        const updatedIter: Iteration = {
          ...lastIter,
          priorities
        };
        const updatedIters = [...ent.iterations.slice(0, -1), updatedIter];

        return {
          ...ent,
          currentStep: 'ruta' as const,
          level: 75,
          updatedAt: new Date().toISOString(),
          iterations: updatedIters
        };
      }
      return ent;
    });

    setEntities(updated);
    saveToStorage(updated);
  };

  const handleSaveRoute = (route: DevelopmentRoute) => {
    const updated = entities.map((ent) => {
      if (ent.id === selectedEntityId) {
        const lastIter = ent.iterations[ent.iterations.length - 1];
        const updatedIter: Iteration = {
          ...lastIter,
          route
        };
        const updatedIters = [...ent.iterations.slice(0, -1), updatedIter];

        return {
          ...ent,
          iterations: updatedIters
        };
      }
      return ent;
    });

    setEntities(updated);
    saveToStorage(updated);
  };

  const handleFinishCycle = () => {
    // Finish current cycle, increment version level, and create a brand new version template to keep iterating
    const updated = entities.map((ent) => {
      if (ent.id === selectedEntityId) {
        const lastIter = ent.iterations[ent.iterations.length - 1];
        const nextVersion = ent.iterations.length + 1;
        
        // Setup empty template for next iteration cycle
        const newIter: Iteration = {
          id: `iter-${Date.now()}-${nextVersion}`,
          version: nextVersion,
          date: new Date().toISOString(),
          // start with past values prefilled so they don't have to re-enter
          diagnosis: lastIter.diagnosis,
          kpiDimension: lastIter.kpiDimension,
          priorities: lastIter.priorities,
          route: lastIter.route
        };

        return {
          ...ent,
          level: 100,
          currentStep: 'completo' as const,
          updatedAt: new Date().toISOString(),
          iterations: [...ent.iterations, newIter]
        };
      }
      return ent;
    });

    setEntities(updated);
    saveToStorage(updated);
    setCurrentTab('dashboard');
    alert('¡Felicitaciones! Has culminado el ciclo de Reingeniería Sostenible. Se ha registrado esta versión en tu historial y se creó una nueva iteración para seguir perfeccionando.');
  };

  const handleExportPDF = (entity: Entity) => {
    const lastIter = entity.iterations[entity.iterations.length - 1];
    const version = lastIter?.version || 1;
    const diagnosis = lastIter?.diagnosis;
    const kpis = lastIter?.kpiDimension;
    const priorities = lastIter?.priorities || [];
    const route = lastIter?.route;

    // Create a new print window
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Por favor, permite las ventanas emergentes (popups) para exportar el reporte a PDF.');
      return;
    }

    // Compose custom, clean, executive print HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Reporte RAS³ - ${entity.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=JetBrains+Mono&display=swap');
          
          body {
            font-family: 'Inter', sans-serif;
            color: #1f2937;
            line-height: 1.5;
            margin: 40px;
            background-color: #ffffff;
            font-size: 13px;
          }
          
          h1, h2, h3, h4, h5 {
            font-family: 'Playfair Display', serif;
            color: #064e3b; /* emerald-900 */
            margin-top: 0;
          }

          .header-container {
            border-bottom: 2px solid #064e3b;
            padding-bottom: 15px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }

          .header-logo {
            font-size: 24px;
            font-weight: bold;
            color: #064e3b;
            font-family: 'Playfair Display', serif;
          }

          .header-logo sup {
            font-size: 12px;
            color: #047857;
          }

          .header-subtitle {
            text-align: right;
            font-size: 11px;
            font-family: 'JetBrains Mono', monospace;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .section-title {
            font-size: 16px;
            font-weight: bold;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 6px;
            margin-top: 30px;
            margin-bottom: 15px;
            text-transform: uppercase;
            font-family: 'JetBrains Mono', monospace;
            color: #065f46;
            letter-spacing: 0.5px;
          }

          .meta-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            background-color: #f9fafb;
            border: 1px solid #f3f4f6;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 25px;
          }

          .meta-item {
            font-size: 12px;
          }

          .meta-label {
            font-weight: bold;
            color: #374151;
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            text-transform: uppercase;
            display: block;
            margin-bottom: 3px;
          }

          .highlight-box {
            background-color: #ecfdf5; /* emerald-50 */
            border-left: 4px solid #047857;
            padding: 15px;
            border-radius: 0 8px 8px 0;
            margin-bottom: 20px;
            font-family: 'Playfair Display', serif;
            font-style: italic;
            font-size: 14px;
            color: #064e3b;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
          }

          th {
            background-color: #f3f4f6;
            color: #374151;
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            text-transform: uppercase;
            font-weight: 600;
            text-align: left;
            padding: 10px 12px;
            border-bottom: 1px solid #d1d5db;
          }

          td {
            padding: 10px 12px;
            border-bottom: 1px solid #f3f4f6;
            font-size: 12px;
          }

          .tag {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 10px;
            font-family: 'JetBrains Mono', monospace;
            font-weight: bold;
            text-transform: uppercase;
          }

          .tag-logrado {
            background-color: #d1fae5;
            color: #065f46;
          }

          .tag-en-progreso {
            background-color: #fef3c7;
            color: #92400e;
          }

          .tag-pendiente {
            background-color: #f3f4f6;
            color: #4b5563;
          }

          .page-break {
            page-break-before: always;
          }

          .no-break {
            page-break-inside: avoid;
          }

          .footer-signature {
            margin-top: 60px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            text-align: center;
          }

          .signature-line {
            border-top: 1px solid #9ca3af;
            margin-top: 50px;
            padding-top: 8px;
            font-size: 11px;
            color: #4b5563;
          }

          .method-details {
            font-size: 10px;
            text-align: center;
            color: #9ca3af;
            margin-top: 80px;
            font-family: 'JetBrains Mono', monospace;
            border-top: 1px solid #f3f4f6;
            padding-top: 15px;
          }

          @media print {
            body {
              margin: 20px;
            }
            button {
              display: none;
            }
          }

          .print-btn-container {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 20px;
          }

          .print-btn {
            background-color: #064e3b;
            color: #ffffff;
            border: none;
            padding: 10px 20px;
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            font-weight: 600;
            border-radius: 6px;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .print-btn:hover {
            background-color: #065f46;
          }
        </style>
      </head>
      <body>
        <div class="print-btn-container">
          <button class="print-btn" onclick="window.print()">Imprimir / Guardar como PDF</button>
        </div>

        <div class="header-container">
          <div>
            <div class="header-logo">RAS<sup>3</sup></div>
            <div style="font-size: 12px; font-weight: 500; color: #374151;">Metodología de Reingeniería Sostenible</div>
          </div>
          <div class="header-subtitle">
            Informe Ejecutivo de Desarrollo Integral<br>
            Herbert Pablo Gamarra Gil · Lic. Adm.
          </div>
        </div>

        <h2 style="font-size: 22px; font-weight: bold; margin-bottom: 20px;">Plan de Desarrollo Integral Sostenible</h2>

        <div class="meta-grid">
          <div class="meta-item">
            <span class="meta-label">Organización / Entidad</span>
            <strong style="font-size: 14px;">${entity.name}</strong>
          </div>
          <div class="meta-item">
            <span class="meta-label">Nivel de Desarrollo Sostenible</span>
            <strong style="font-size: 14px; color: #047857;">${entity.level}% (Iteración ${version})</strong>
          </div>
          <div class="meta-item" style="grid-column: span 2;">
            <span class="meta-label">Descripción de Contexto</span>
            <div>${entity.description || 'Sin descripción ingresada.'}</div>
          </div>
          <div class="meta-item">
            <span class="meta-label">Fecha de Generación</span>
            <div>${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
          </div>
          <div class="meta-item">
            <span class="meta-label">Consultor y Creador del Método</span>
            <div>Herbert Pablo Gamarra Gil</div>
          </div>
        </div>

        <!-- 1. DIAGNOSTICO -->
        <div class="section-title">1. Diagnóstico de Capacidades (Potencial y Realidad)</div>
        
        <span class="meta-label">Potencial Primero</span>
        <div class="highlight-box">
          "${diagnosis?.potencial || 'No se ha configurado la visión de potencial de la organización todavía.'}"
        </div>

        <div style="margin-bottom: 20px;">
          <span class="meta-label">Realidad de Partida</span>
          <p style="font-size: 12.5px; line-height: 1.6; color: #374151; margin-top: 4px;">
            ${diagnosis?.realidad || 'No se ha definido el estado de realidad de la organización.'}
          </p>
        </div>

        <div class="no-break" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
          <div>
            <span class="meta-label">Aciertos y Fortalezas</span>
            <ul style="padding-left: 18px; margin-top: 6px; font-size: 12px; color: #4b5563;">
              ${diagnosis?.aciertos && diagnosis.aciertos.length > 0
                ? diagnosis.aciertos.map(a => `<li style="margin-bottom: 6px;">${a}</li>`).join('')
                : '<li>No se han especificado aciertos.</li>'}
            </ul>
          </div>
          <div>
            <span class="meta-label">Oportunidades de Mejora</span>
            <ul style="padding-left: 18px; margin-top: 6px; font-size: 12px; color: #4b5563;">
              ${diagnosis?.oportunidades_mejora && diagnosis.oportunidades_mejora.length > 0
                ? diagnosis.oportunidades_mejora.map(o => `<li style="margin-bottom: 6px;">${o}</li>`).join('')
                : '<li>No se han especificado oportunidades de mejora.</li>'}
            </ul>
          </div>
        </div>

        <!-- 2. MEDICION -->
        <div class="page-break"></div>
        <div class="section-title">2. Medición Continua (Dimensiones RAS³)</div>
        <p style="font-size: 11px; color: #6b7280; margin-bottom: 15px;">
          Indicadores clave estructurados para asegurar un crecimiento balanceado en el ámbito administrativo, humano y ecológico-sostenible.
        </p>

        <table>
          <thead>
            <tr>
              <th style="width: 20%;">Dimensión</th>
              <th style="width: 45%;">Indicador Clave (KPI)</th>
              <th style="width: 15%;">Línea Base</th>
              <th style="width: 15%;">Meta Esperada</th>
              <th style="width: 15%;">Estado</th>
            </tr>
          </thead>
          <tbody>
            ${['administrativa', 'humana', 'sostenible'].map(dim => {
              const kpiList = kpis?.[dim as keyof typeof kpis] || [];
              if (kpiList.length === 0) {
                return `
                  <tr>
                    <td><strong style="text-transform: uppercase; font-size: 11px;">${dim}</strong></td>
                    <td colspan="4" style="color: #9ca3af; font-style: italic;">No se definieron indicadores para esta dimensión.</td>
                  </tr>
                `;
              }
              return kpiList.map((k, idx) => `
                <tr>
                  ${idx === 0 ? `<td rowspan="${kpiList.length}" style="vertical-align: top; font-weight: bold; text-transform: uppercase; color: #047857; font-size: 11px;">${dim}</td>` : ''}
                  <td><strong>${k.name}</strong></td>
                  <td>${k.baseline}</td>
                  <td>${k.target}</td>
                  <td><span class="tag tag-${k.status}">${k.status.replace('_', ' ')}</span></td>
                </tr>
              `).join('');
            }).join('')}
          </tbody>
        </table>

        <!-- 3. PRIORIZACION -->
        <div class="no-break">
          <div class="section-title">3. Prioridades por Efecto de Impacto</div>
          <p style="font-size: 11px; color: #6b7280; margin-bottom: 15px;">
            Las oportunidades de mejora prioritarias seleccionadas por su efecto multiplicador en las tres dimensiones organizacionales.
          </p>

          ${priorities.length > 0 ? `
            <table>
              <thead>
                <tr>
                  <th style="width: 35%;">Oportunidad / Acción</th>
                  <th style="width: 45%;">Justificación Técnica</th>
                  <th style="width: 10%; text-align: center;">Impacto Promedio</th>
                  <th style="width: 10%; text-align: center;">Prioridad</th>
                </tr>
              </thead>
              <tbody>
                ${priorities.map(p => `
                  <tr>
                    <td><strong>${p.oportunidad}</strong></td>
                    <td style="color: #4b5563; font-size: 11.5px;">${p.justificacion}</td>
                    <td style="text-align: center;">
                      <div style="font-size: 9px; font-family: monospace;">
                        ADM: ${p.impactoAdministrativo}<br>
                        HUM: ${p.impactoHumano}<br>
                        SOS: ${p.impactoSostenible}
                      </div>
                    </td>
                    <td style="text-align: center; font-size: 14px; font-weight: bold; color: #047857;">${p.puntuacion} / 10</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : `
            <p style="font-style: italic; color: #9ca3af;">No se han priorizado acciones en esta iteración.</p>
          `}
        </div>

        <!-- 4. RUTA DE DESARROLLO -->
        <div class="page-break"></div>
        <div class="section-title">4. Ruta de Desarrollo Integral Sostenible</div>
        <p style="font-size: 11px; color: #6b7280; margin-bottom: 15px;">
          La secuencia ordenada, lógica y flexible de etapas de implementación junto con los recursos asociados.
        </p>

        ${route?.etapas && route.etapas.length > 0 ? `
          ${route.etapas.map((stage, sIdx) => `
            <div class="no-break" style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-bottom: 15px; background-color: #ffffff;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px; margin-bottom: 10px;">
                <strong style="color: #064e3b; font-family: 'JetBrains Mono', monospace; text-transform: uppercase;">Etapa ${sIdx + 1}: ${stage.nombre}</strong>
                <span style="font-size: 11px; background-color: #f3f4f6; padding: 2px 8px; border-radius: 4px; font-weight: 500;">Plazo: ${stage.tiempo}</span>
              </div>
              <div style="margin-bottom: 10px;">
                <span style="font-size: 9px; font-family: monospace; color: #9ca3af; text-transform: uppercase; display: block;">Acción Estratégica</span>
                <p style="font-size: 12px; font-weight: 500; margin: 2px 0 0 0;">${stage.accion}</p>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                <div>
                  <span style="font-size: 9px; font-family: monospace; color: #9ca3af; text-transform: uppercase; display: block;">Responsable Asignado</span>
                  <span style="font-size: 11.5px; font-weight: 500;">${stage.responsable}</span>
                </div>
                <div>
                  <span style="font-size: 9px; font-family: monospace; color: #9ca3af; text-transform: uppercase; display: block;">Métrica / Indicador de Éxito</span>
                  <span style="font-size: 11.5px; font-weight: 500; color: #047857;">${stage.indicador}</span>
                </div>
              </div>
              <div style="background-color: #f9fafb; padding: 10px; border-radius: 6px;">
                <span style="font-size: 9px; font-family: monospace; color: #9ca3af; text-transform: uppercase; display: block; margin-bottom: 6px;">Recursos Asignados</span>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; font-size: 10.5px;">
                  <div><strong>Humanos:</strong><br><span style="color: #4b5563;">${stage.recursos?.humanos || 'N/A'}</span></div>
                  <div><strong>Materiales:</strong><br><span style="color: #4b5563;">${stage.recursos?.materiales || 'N/A'}</span></div>
                  <div><strong>Financieros:</strong><br><span style="color: #4b5563;">${stage.recursos?.financieros || 'N/A'}</span></div>
                  <div><strong>Tecnológicos:</strong><br><span style="color: #4b5563;">${stage.recursos?.tecnologicos || 'N/A'}</span></div>
                </div>
              </div>
            </div>
          `).join('')}
        ` : `
          <p style="font-style: italic; color: #9ca3af;">No se han definido etapas de ruta para esta iteración.</p>
        `}

        <div class="no-break" style="margin-top: 30px; margin-bottom: 30px;">
          <span class="meta-label">Nueva Realidad Esperada</span>
          <div class="highlight-box" style="font-family: inherit; font-style: normal; font-size: 12.5px; line-height: 1.6; color: #111827; background-color: #f0fdf4; border-left-color: #059669;">
            ${route?.realidadEsperada || 'Definición pendiente.'}
          </div>
        </div>

        <!-- AUTOR / FIRMAS -->
        <div class="no-break">
          <div class="footer-signature">
            <div>
              <div class="signature-line">
                <strong>Gerencia / Representante Legal</strong><br>
                ${entity.name}
              </div>
            </div>
            <div>
              <div class="signature-line">
                <strong>Herbert Pablo Gamarra Gil</strong><br>
                Lic. Adm. · Autor del Método RAS³
              </div>
            </div>
          </div>
        </div>

        <div class="method-details">
          MÉTODO RAS³: REINGENIERÍA PARA LA ADMON. HUMANA Y SOSTENIBLE &copy; 2026<br>
          "Sintética, Integral y Sostenible para el Liderazgo Sólido"
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const activeEntity = entities.find((e) => e.id === selectedEntityId);

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans text-gray-800">
      
      <Navbar
        entities={entities}
        selectedEntityId={selectedEntityId}
        onSelectEntity={handleSelectEntity}
        onOpenCreateModal={() => setIsModalOpen(true)}
        onOpenIntro={() => setIsOnboardingOpen(true)}
        onExportPDF={handleExportPDF}
      />

      {/* Dynamic Sub-tab Bento Navigation */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-1 overflow-x-auto">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all flex items-center space-x-1.5 ${
              currentTab === 'dashboard'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" />
            <span>MIS NEGOCIOS</span>
          </button>

          {activeEntity && (
            <>
              <div className="h-4 w-px bg-gray-200" />

              <button
                onClick={() => setCurrentTab('analizar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all flex items-center space-x-1.5 ${
                  currentTab === 'analizar'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <ClipboardCheck className="h-3.5 w-3.5" />
                <span>1. ANALIZAR</span>
              </button>

              <button
                onClick={() => setCurrentTab('medir')}
                disabled={activeEntity.level < 25}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all flex items-center space-x-1.5 disabled:opacity-40 disabled:hover:bg-transparent ${
                  currentTab === 'medir'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <ListTodo className="h-3.5 w-3.5" />
                <span>2. MEDIR</span>
              </button>

              <button
                onClick={() => setCurrentTab('priorizar')}
                disabled={activeEntity.level < 50}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all flex items-center space-x-1.5 disabled:opacity-40 disabled:hover:bg-transparent ${
                  currentTab === 'priorizar'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Compass className="h-3.5 w-3.5" />
                <span>3. PRIORIZAR</span>
              </button>

              <button
                onClick={() => setCurrentTab('ruta')}
                disabled={activeEntity.level < 75}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all flex items-center space-x-1.5 disabled:opacity-40 disabled:hover:bg-transparent ${
                  currentTab === 'ruta'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>4. RUTA</span>
              </button>

              <button
                onClick={() => setCurrentTab('reporte')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all flex items-center space-x-1.5 ${
                  currentTab === 'reporte'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>5. REPORTE</span>
              </button>

              <div className="h-4 w-px bg-gray-200" />

              <button
                onClick={() => setCurrentTab('chat')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all flex items-center space-x-1.5 ${
                  currentTab === 'chat'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>CHAT VISIR</span>
              </button>

              <button
                onClick={() => setCurrentTab('historial')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all flex items-center space-x-1.5 ${
                  currentTab === 'historial'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <History className="h-3.5 w-3.5" />
                <span>HISTORIAL</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Workspace Frame */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {currentTab === 'dashboard' && (
          <Dashboard
            entities={entities}
            selectedEntityId={selectedEntityId}
            onSelectEntity={handleSelectEntity}
            onDeleteEntity={handleDeleteEntity}
            onOpenCreateModal={() => setIsModalOpen(true)}
            onChangeTab={setCurrentTab}
          />
        )}

        {activeEntity && (
          <>
            {currentTab === 'analizar' && (
              <Analizar
                entity={activeEntity}
                onSaveDiagnosis={handleSaveDiagnosis}
                onChangeTab={setCurrentTab}
              />
            )}

            {currentTab === 'medir' && (
              <Medir
                entity={activeEntity}
                onSaveKpis={handleSaveKpis}
                onBack={() => setCurrentTab('analizar')}
                onChangeTab={setCurrentTab}
              />
            )}

            {currentTab === 'priorizar' && (
              <Priorizar
                entity={activeEntity}
                onSavePriorities={handleSavePriorities}
                onBack={() => setCurrentTab('medir')}
                onChangeTab={setCurrentTab}
              />
            )}

            {currentTab === 'ruta' && (
              <Ruta
                entity={activeEntity}
                onSaveRoute={handleSaveRoute}
                onBack={() => setCurrentTab('priorizar')}
                onFinishCycle={handleFinishCycle}
              />
            )}

            {currentTab === 'reporte' && (
              <ReporteEjecutivo
                entity={activeEntity}
                onExportPDF={handleExportPDF}
                onBack={() => setCurrentTab('dashboard')}
              />
            )}

            {currentTab === 'chat' && (
              <VisirChat entity={activeEntity} />
            )}

            {currentTab === 'historial' && (
              <Historial
                entity={activeEntity}
                onBack={() => setCurrentTab('dashboard')}
              />
            )}
          </>
        )}
      </main>

      {/* Modal Popup: New Entity Creation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
            <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-emerald-300" />
                <h4 className="text-sm font-bold font-serif">Registrar Nueva Entidad (Negocio / Proyecto)</h4>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEntity} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="space-y-1">
                <label htmlFor="modal-name-input" className="text-[10px] text-gray-500 font-mono tracking-wider block">NOMBRE DE LA ENTIDAD / NEGOCIO</label>
                <input
                  id="modal-name-input"
                  type="text"
                  required
                  placeholder="Ej. ERBS Maquinarias, Toyland..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="block w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs text-gray-800 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="modal-sector-select" className="text-[10px] text-gray-500 font-mono tracking-wider block">RUBRO O SECTOR ECONÓMICO</label>
                <select
                  id="modal-sector-select"
                  value={newSector}
                  onChange={(e) => setNewSector(e.target.value)}
                  className="block w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                >
                  <option value="Comercio / Retail">Comercio / Tienda / Retail</option>
                  <option value="Servicios Profesionales">Servicios Profesionales / Consultoría</option>
                  <option value="Manufactura / Producción">Manufactura / Producción Industrial</option>
                  <option value="Alimentos / Gastronomía / Agrícola">Alimentos / Gastronomía / Sector Agrícola</option>
                  <option value="Tecnología / Software">Tecnología / Software / Startup</option>
                  <option value="Salud / Bienestar">Salud / Bienestar / Medicina</option>
                  <option value="Turismo / Hotelería">Turismo / Hotelería / Ocio</option>
                  <option value="Construcción / Logística">Construcción / Transporte / Logística</option>
                  <option value="Educación / Cultura">Educación / Cultura / Arte</option>
                  <option value="Otro Sector">Otro Sector / Negocio General</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="modal-scale-select" className="text-[10px] text-gray-500 font-mono tracking-wider block">ESCALA O TAMAÑO INICIAL</label>
                <select
                  id="modal-scale-select"
                  value={newScale}
                  onChange={(e) => setNewScale(e.target.value)}
                  className="block w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                >
                  <option value="Idea / Etapa de Diseño">Idea / Etapa de Diseño Inicial</option>
                  <option value="Autoempleo / Microempresa (1-5 colaboradores)">Autoempleo / Microempresa (1-5 colaboradores)</option>
                  <option value="Pequeña Empresa / PYME (6-50 colaboradores)">Pequeña Empresa / PYME (6-50 colaboradores)</option>
                  <option value="Mediana o Grande Empresa (+50 colaboradores)">Mediana o Grande Empresa (+50 colaboradores)</option>
                  <option value="Proyecto Comunitario o Asociación Sin Fines de Lucro">Proyecto Comunitario o de Impacto Social</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="modal-challenge-select" className="text-[10px] text-gray-500 font-mono tracking-wider block">ENFOQUE O DESAFÍO PRINCIPAL</label>
                <select
                  id="modal-challenge-select"
                  value={newChallenge}
                  onChange={(e) => setNewChallenge(e.target.value)}
                  className="block w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                >
                  <option value="Rentabilidad Financiera y Control Administrativo">Rentabilidad Financiera y Control Administrativo (Eficacia)</option>
                  <option value="Digitalización y Comercio Electrónico">Digitalización y Comercio Electrónico (Tecnológico)</option>
                  <option value="Motivación, Liderazgo y Clima Laboral (Humano)">Motivación, Liderazgo y Clima Laboral (Dimensión Humana)</option>
                  <option value="Eficiencia Ecológica y Economía Circular (Sostenible)">Eficiencia Ecológica y Economía Circular (Sostenible)</option>
                  <option value="Acelerar Tiempos de Respuesta y Procesos Operativos">Acelerar Tiempos de Respuesta y Procesos Operativos</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="modal-desc-input" className="text-[10px] text-gray-500 font-mono tracking-wider block">DETALLES O CARACTERÍSTICAS ADICIONALES (OPCIONAL)</label>
                <textarea
                  id="modal-desc-input"
                  rows={2}
                  placeholder="Ej. Comercializamos ropa de algodón orgánico. Buscamos lanzar e-commerce pronto..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="block w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs text-gray-800 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-medium px-4 py-2 rounded-lg text-xs transition-colors shadow-xs"
                >
                  Crear e Iniciar Ciclo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Onboarding Welcome Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => {
          setIsOnboardingOpen(false);
          localStorage.setItem('ras3_onboarding_shown', 'true');
        }}
      />

      {/* Small editorial footer */}
      <footer className="bg-white border-t border-gray-100 py-4 text-center">
        <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">
          Método RAS³ &copy; 2026 Herbert Gamarra &bull; Lic. Adm.
        </p>
      </footer>
    </div>
  );
}
