import React, { useState, useEffect } from 'react';
import { Entity } from '../types';
import { 
  Lightbulb, 
  Plus, 
  HelpCircle, 
  FileText, 
  Layers, 
  Compass,
  Sparkles,
  Download
} from 'lucide-react';

interface NavbarProps {
  entities: Entity[];
  selectedEntityId: string;
  onSelectEntity: (id: string) => void;
  onOpenCreateModal: () => void;
  onOpenIntro: () => void;
  onExportPDF: (entity: Entity) => void;
  onOpenHerramientas: () => void;
}

export default function Navbar({
  entities,
  selectedEntityId,
  onSelectEntity,
  onOpenCreateModal,
  onOpenIntro,
  onExportPDF,
  onOpenHerramientas,
}: NavbarProps) {
  const currentEntity = entities.find((e) => e.id === selectedEntityId);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand: Banco de las Ideas / RAS³ */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-tr from-emerald-900 to-emerald-700 rounded-xl text-white shadow-2xs">
            <Lightbulb className="h-5 w-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-gray-900 font-serif">
                BANCO DE LAS IDEAS
              </h1>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-100 px-1.5 py-0.2 rounded font-bold">
                RAS³
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">
              Gobernanza Digital & Incubación Ley BIC
            </p>
          </div>
        </div>

        {/* Action Controls & Selectors */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {isInstallable && (
            <button
              onClick={handleInstallClick}
              className="inline-flex items-center space-x-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-2.5 py-1.5 rounded-xl text-xs transition-colors shadow-2xs animate-pulse"
              title="Instalar Banco de las Ideas como PWA en tu dispositivo"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Instalar</span>
              <span>App</span>
            </button>
          )}

          <button
            onClick={onOpenHerramientas}
            className="inline-flex items-center space-x-1.5 text-gray-700 hover:text-emerald-950 border border-gray-200 hover:bg-emerald-50/40 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors"
            title="Checklists y herramientas de la metodología RAS³"
          >
            <Layers className="h-3.5 w-3.5 text-emerald-700" />
            <span className="hidden md:inline">Herramientas & Checklists</span>
          </button>

          <button
            onClick={onOpenIntro}
            className="inline-flex items-center space-x-1.5 text-gray-600 hover:text-emerald-950 border border-gray-200 hover:bg-gray-50 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors"
            title="Ver introducción al método RAS³ y libro de Herbert Gamarra"
          >
            <HelpCircle className="h-3.5 w-3.5 text-emerald-800" />
            <span className="hidden sm:inline">El Método</span>
          </button>

          {currentEntity && (
            <button
              onClick={() => onExportPDF(currentEntity)}
              className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors"
              title="Ver o imprimir Dossier de Inversión y Gobernanza"
            >
              <FileText className="h-3.5 w-3.5 text-emerald-800" />
              <span className="hidden sm:inline">Dossier</span>
              <span>PDF</span>
            </button>
          )}

          {entities.length > 0 && (
            <div className="flex items-center space-x-1.5">
              <select
                id="entity-select"
                value={selectedEntityId}
                onChange={(e) => onSelectEntity(e.target.value)}
                className="block max-w-[140px] sm:max-w-[180px] rounded-xl border border-gray-200 bg-gray-50 py-1.5 px-2.5 text-xs text-gray-700 shadow-2xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium truncate"
              >
                {entities.map((ent) => (
                  <option key={ent.id} value={ent.id}>
                    {ent.name} ({ent.level}%)
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            id="btn-new-entity"
            onClick={onOpenCreateModal}
            className="inline-flex items-center space-x-1 bg-emerald-800 hover:bg-emerald-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Nueva</span>
            <span>Idea</span>
          </button>
        </div>
      </div>
    </header>
  );
}
