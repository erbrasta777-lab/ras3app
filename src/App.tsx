import React, { useState, useEffect } from 'react';
import { 
  Entity, 
  Diagnosis, 
  KPIDimension, 
  PriorityAction, 
  DevelopmentRoute, 
  Iteration, 
  RadarScores, 
  MotorMeta 
} from './types';
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
import HerramientasRAS from './components/HerramientasRAS';
import { 
  Sparkles, 
  MessageSquare, 
  History, 
  Compass, 
  Briefcase, 
  Plus, 
  X, 
  ListTodo, 
  ClipboardCheck, 
  FileText, 
  Layers,
  Lightbulb,
  CheckCircle,
  HelpCircle,
  Share2
} from 'lucide-react';
import { generateFullProcess } from './utils/processGenerator';

export default function App() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [selectedEntityId, setSelectedEntityId] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  
  // Notification toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSector, setNewSector] = useState('Alimentos / Gastronomía / Agrícola');
  const [newScale, setNewScale] = useState('Autoempleo / Microempresa (1-5 colaboradores)');
  const [newChallenge, setNewChallenge] = useState('Eficiencia Ecológica y Economía Circular (Sostenible)');
  const [newCategory, setNewCategory] = useState<Entity['category']>('microempresa');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Load state from localStorage on init
  useEffect(() => {
    const saved = localStorage.getItem('ras3_entities');
    if (saved) {
      try {
        let parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          // Remove outdated mocks if present
          parsed = parsed.filter((e: Entity) => e.name !== 'ERBS Maquinarias');
          
          // Auto-upgrade any incomplete entity in local storage to be 100% complete
          parsed = parsed.map((e: Entity) => {
            const lastIter = e.iterations?.[e.iterations?.length - 1];
            if (e.level < 100 || !lastIter || !lastIter.diagnosis || !lastIter.diagnosis.potencial || !lastIter.radarScores) {
              const sector = e.sector || 'Comercio / Retail';
              const challenge = e.challenge || 'Digitalización y Comercio Electrónico';
              const scale = e.scale || 'Autoempleo / Microempresa (1-5 colaboradores)';
              const fullIter = generateFullProcess(e.name, sector, scale, challenge, e.description);
              return {
                ...e,
                level: 100,
                currentStep: 'completo',
                iterations: [fullIter]
              };
            }
            return e;
          });

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
      localStorage.setItem('ras3_onboarding_shown', 'true');
    }
  }, []);

  const loadMockData = () => {
    const laRicaIter = generateFullProcess(
      'La Rica', 
      'Alimentos / Gastronomía / Agrícola', 
      'Autoempleo / Microempresa (1-5 colaboradores)', 
      'Eficiencia Ecológica y Economía Circular (Sostenible)',
      'Restaurante y mercado de productos orgánicos locales, enfocado en comercio justo e ingredientes de la granja a la mesa.'
    );

    const toylandIter = generateFullProcess(
      'Toyland', 
      'Comercio / Retail', 
      'Autoempleo / Microempresa (1-5 colaboradores)', 
      'Digitalización y Comercio Electrónico',
      'Tienda física de juguetes didácticos y ecológicos que busca expandirse digitalmente.'
    );

    const mockEntities: Entity[] = [
      {
        id: 'mock-rica',
        name: 'La Rica',
        description: 'Restaurante y mercado de productos orgánicos y sostenibles local, enfocado en comercio justo e ingredientes de la granja a la mesa.',
        sector: 'Alimentos / Gastronomía / Agrícola',
        scale: 'Autoempleo / Microempresa (1-5 colaboradores)',
        challenge: 'Eficiencia Ecológica y Economía Circular (Sostenible)',
        category: 'microempresa',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        level: 100,
        currentStep: 'completo',
        iterations: [laRicaIter]
      },
      {
        id: 'mock-toyland',
        name: 'Toyland',
        description: 'Tienda física de juguetes didácticos y ecológicos que busca expandirse digitalmente.',
        sector: 'Comercio / Retail',
        scale: 'Autoempleo / Microempresa (1-5 colaboradores)',
        challenge: 'Digitalización y Comercio Electrónico',
        category: 'microempresa',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        level: 100,
        currentStep: 'completo',
        iterations: [toylandIter]
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
      if (currentTab !== 'dashboard' && currentTab !== 'chat' && currentTab !== 'historial' && currentTab !== 'herramientas') {
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

    // Automatically generate initial complete process for newly created entity
    const generatedIteration = generateFullProcess(newName, newSector, newScale, newChallenge, newDesc);

    const newEntity: Entity = {
      id: `entity-${Date.now()}`,
      name: newName,
      description: newDesc || `${newName} es una iniciativa del sector ${newSector}, enfocada en ${newScale} y con el desafío de ${newChallenge}.`,
      sector: newSector,
      scale: newScale,
      challenge: newChallenge,
      category: newCategory,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      level: 100,
      currentStep: 'completo',
      iterations: [generatedIteration]
    };

    const updated = [newEntity, ...entities];
    setEntities(updated);
    setSelectedEntityId(newEntity.id);
    saveToStorage(updated);

    // Reset fields & transition
    setNewName('');
    setNewDesc('');
    setNewSector('Alimentos / Gastronomía / Agrícola');
    setNewScale('Autoempleo / Microempresa (1-5 colaboradores)');
    setNewChallenge('Eficiencia Ecológica y Economía Circular (Sostenible)');
    setIsModalOpen(false);
    setCurrentTab('analizar');
    showToast(`¡Iniciativa "${newEntity.name}" registrada exitosamente en el Banco de las Ideas!`);
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
    showToast('Iniciativa eliminada correctamente.');
  };

  // 2. Save step results to update active iteration
  const handleSaveDiagnosis = (
    diagnosis: Diagnosis, 
    suggestedKpis: KPIDimension, 
    suggestedPriorities: PriorityAction[],
    initialRoute: DevelopmentRoute,
    radarScores?: RadarScores,
    motorMeta?: MotorMeta
  ) => {
    const updated = entities.map((ent) => {
      if (ent.id === selectedEntityId) {
        const lastIter = ent.iterations[ent.iterations.length - 1];
        const updatedIter: Iteration = {
          ...lastIter,
          diagnosis,
          kpiDimension: suggestedKpis,
          priorities: suggestedPriorities,
          route: initialRoute,
          radarScores: radarScores || lastIter.radarScores,
          motorMeta: motorMeta || lastIter.motorMeta
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
    showToast('Diagnóstico guardado. Avanzando a Medición (KPIs 3D).');
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
    showToast('Indicadores 3D actualizados.');
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
    showToast('Matriz de Prioridades guardada.');
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
    showToast('Ruta de Desarrollo actualizada.');
  };

  const handleFinishCycle = () => {
    const updated = entities.map((ent) => {
      if (ent.id === selectedEntityId) {
        const lastIter = ent.iterations[ent.iterations.length - 1];
        const nextVersion = ent.iterations.length + 1;
        
        const newIter: Iteration = {
          id: `iter-${Date.now()}-${nextVersion}`,
          version: nextVersion,
          date: new Date().toISOString(),
          diagnosis: lastIter.diagnosis,
          kpiDimension: lastIter.kpiDimension,
          priorities: lastIter.priorities,
          route: lastIter.route,
          radarScores: lastIter.radarScores,
          motorMeta: lastIter.motorMeta,
          bicGovernance: lastIter.bicGovernance
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
    setCurrentTab('reporte');
    showToast('¡Ciclo culminado! Tu Dossier de Inversión y Gobernanza está listo para presentación.');
  };

  const handleExportPDF = (entity: Entity) => {
    setSelectedEntityId(entity.id);
    setCurrentTab('reporte');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const activeEntity = entities.find((e) => e.id === selectedEntityId);

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans text-gray-800 pb-16 sm:pb-0">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-100 bg-emerald-950 text-white border border-emerald-800 rounded-xl px-4 py-3 shadow-lg flex items-center space-x-2 text-xs font-medium animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <Navbar
        entities={entities}
        selectedEntityId={selectedEntityId}
        onSelectEntity={handleSelectEntity}
        onOpenCreateModal={() => setIsModalOpen(true)}
        onOpenIntro={() => setIsOnboardingOpen(true)}
        onExportPDF={handleExportPDF}
        onOpenHerramientas={() => setCurrentTab('herramientas')}
      />

      {/* Desktop & Tablet Sub-tab Navigation */}
      <div className="bg-white border-b border-gray-100 py-2.5 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-1.5 overflow-x-auto">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all flex items-center space-x-1.5 ${
              currentTab === 'dashboard'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            <Lightbulb className="h-3.5 w-3.5" />
            <span>BANCO DE IDEAS</span>
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
                <span>1. FORMULAR (P-R-O)</span>
              </button>

              <button
                onClick={() => setCurrentTab('medir')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all flex items-center space-x-1.5 ${
                  currentTab === 'medir'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <ListTodo className="h-3.5 w-3.5" />
                <span>2. MEDIR (3D)</span>
              </button>

              <button
                onClick={() => setCurrentTab('priorizar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all flex items-center space-x-1.5 ${
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
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all flex items-center space-x-1.5 ${
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
                <span>5. DOSSIER BIC</span>
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
                <span>VISIR & SIMULADOR</span>
              </button>

              <button
                onClick={() => setCurrentTab('herramientas')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all flex items-center space-x-1.5 ${
                  currentTab === 'herramientas'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>HERRAMIENTAS RAS³</span>
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
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 w-full">
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

        {currentTab === 'herramientas' && (
          <HerramientasRAS entity={activeEntity} />
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

      {/* Mobile-First Bottom Navigation Bar for Smartphone PWA */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 sm:hidden flex items-center justify-around py-2 px-1 text-[10px] font-mono shadow-lg">
        <button
          onClick={() => setCurrentTab('dashboard')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            currentTab === 'dashboard' ? 'text-emerald-800 font-bold' : 'text-gray-400'
          }`}
        >
          <Lightbulb className="h-4 w-4" />
          <span>Banco</span>
        </button>

        <button
          onClick={() => setCurrentTab('analizar')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            currentTab === 'analizar' ? 'text-emerald-800 font-bold' : 'text-gray-400'
          }`}
        >
          <ClipboardCheck className="h-4 w-4" />
          <span>Formular</span>
        </button>

        <button
          onClick={() => setCurrentTab('ruta')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            currentTab === 'ruta' ? 'text-emerald-800 font-bold' : 'text-gray-400'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>Ruta</span>
        </button>

        <button
          onClick={() => setCurrentTab('chat')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            currentTab === 'chat' ? 'text-emerald-800 font-bold' : 'text-gray-400'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Visir</span>
        </button>

        <button
          onClick={() => setCurrentTab('reporte')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            currentTab === 'reporte' ? 'text-emerald-800 font-bold' : 'text-gray-400'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Dossier</span>
        </button>

        <button
          onClick={() => setCurrentTab('herramientas')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            currentTab === 'herramientas' ? 'text-emerald-800 font-bold' : 'text-gray-400'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Checklists</span>
        </button>
      </nav>

      {/* Onboarding Dialog */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />

      {/* Modal: New Entity / Project */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl p-6 sm:p-8 border border-gray-100 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-800 border border-emerald-100 font-bold px-2 py-0.5 rounded-md">
                  BANCO DE LAS IDEAS
                </span>
                <h3 className="text-xl font-bold font-serif text-gray-900 mt-1">
                  Registrar Proyecto de Impacto
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEntity} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 font-mono uppercase">
                  Nombre del Proyecto o Empresa *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ejemplo: BioTextil Andino, EcoLimpio, Granja Solar..."
                  className="w-full text-xs rounded-xl border border-gray-200 bg-gray-50/50 p-3 focus:bg-white focus:outline-none focus:border-emerald-600 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 font-mono uppercase">
                    Sector de Impacto
                  </label>
                  <select
                    value={newSector}
                    onChange={(e) => setNewSector(e.target.value)}
                    className="w-full text-xs rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 focus:bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Alimentos / Gastronomía / Agrícola">Alimentos / Gastronomía / Agrícola</option>
                    <option value="Comercio / Retail">Comercio / Retail</option>
                    <option value="Tecnología / Software / Startup">Tecnología / Software / Startup</option>
                    <option value="Comunitario / ONG / Municipalidad">Comunitario / ONG / Municipalidad</option>
                    <option value="Manufactura Sostenible / Moda">Manufactura Sostenible / Moda</option>
                    <option value="Educación / Universidad / Cultura">Educación / Universidad / Cultura</option>
                    <option value="Desarrollo Personal / Vida Diaria">Desarrollo Personal / Vida Diaria</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 font-mono uppercase">
                    Tipo de Entidad (Cap. VI)
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full text-xs rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 focus:bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="microempresa">Microempresa (1-5 colaboradores)</option>
                    <option value="startup">Startup de Impacto</option>
                    <option value="empresa_familiar">Empresa Familiar</option>
                    <option value="cooperativa">Cooperativa</option>
                    <option value="ong">ONG / Social</option>
                    <option value="municipalidad">Municipalidad / Territorio</option>
                    <option value="universidad">Universidad / Centro Educativo</option>
                    <option value="proyecto_personal">Proyecto Personal (Vida Diaria)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 font-mono uppercase">
                  Desafío Estratégico Principal
                </label>
                <select
                  value={newChallenge}
                  onChange={(e) => setNewChallenge(e.target.value)}
                  className="w-full text-xs rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 focus:bg-white focus:outline-none focus:border-emerald-600"
                >
                  <option value="Eficiencia Ecológica y Economía Circular (Sostenible)">
                    Eficiencia Ecológica y Economía Circular (Sostenible)
                  </option>
                  <option value="Digitalización y Comercio Electrónico">
                    Digitalización y Comercio Electrónico
                  </option>
                  <option value="Bienestar del Equipo y Liderazgo Consciente">
                    Bienestar del Equipo y Liderazgo Consciente
                  </option>
                  <option value="Gobernanza y Acreditación Ley BIC">
                    Gobernanza y Acreditación Ley BIC
                  </option>
                  <option value="Rentabilidad Financiera y Control Administrativo">
                    Rentabilidad Financiera y Control Administrativo
                  </option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 font-mono uppercase">
                  Descripción o Hechos Iniciales (Opcional)
                </label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe brevemente la idea, qué hace y qué resultados busca generar..."
                  className="w-full text-xs rounded-xl border border-gray-200 bg-gray-50/50 p-3 focus:bg-white focus:outline-none focus:border-emerald-600 font-sans"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-xs font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  Registrar e Iniciar Incubación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
