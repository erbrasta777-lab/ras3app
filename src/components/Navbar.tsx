import React from 'react';
import { Entity } from '../types';
import { Briefcase, Plus, TrendingUp, HelpCircle, FileText } from 'lucide-react';

interface NavbarProps {
  entities: Entity[];
  selectedEntityId: string;
  onSelectEntity: (id: string) => void;
  onOpenCreateModal: () => void;
  onOpenIntro: () => void;
  onExportPDF: (entity: Entity) => void;
}

export default function Navbar({
  entities,
  selectedEntityId,
  onSelectEntity,
  onOpenCreateModal,
  onOpenIntro,
  onExportPDF,
}: NavbarProps) {
  const currentEntity = entities.find((e) => e.id === selectedEntityId);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-800">
            <TrendingUp id="brand-icon" className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 flex items-center">
              <span>RAS</span>
              <sup className="text-emerald-800 text-xs font-semibold -top-2">3</sup>
            </h1>
            <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
              Desarrollo Integral
            </p>
          </div>
        </div>

        {/* Action Controls & Selectors */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenIntro}
            className="inline-flex items-center space-x-1.5 text-gray-600 hover:text-emerald-950 border border-gray-200 hover:bg-gray-50 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
            title="Ver introducción al método RAS³"
          >
            <HelpCircle className="h-3.5 w-3.5 text-emerald-800" />
            <span className="hidden sm:inline">El Método</span>
          </button>

          {currentEntity && (
            <button
              onClick={() => onExportPDF(currentEntity)}
              className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-100 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              title="Exportar Reporte Ejecutivo de Desarrollo Integral a PDF"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Exportar PDF</span>
            </button>
          )}

          {entities.length > 0 ? (
            <div className="flex items-center space-x-2">
              <label htmlFor="entity-select" className="text-xs text-gray-500 font-mono hidden md:inline">
                ENTIDAD:
              </label>
              <select
                id="entity-select"
                value={selectedEntityId}
                onChange={(e) => onSelectEntity(e.target.value)}
                className="block w-48 rounded-md border border-gray-200 bg-gray-50 py-1.5 px-3 text-xs text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
              >
                {entities.map((ent) => (
                  <option key={ent.id} value={ent.id}>
                    {ent.name} (Nivel: {ent.level}%)
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <span className="text-xs text-gray-400 font-serif italic">Crea un negocio para iniciar</span>
          )}

          <button
            id="btn-new-entity"
            onClick={onOpenCreateModal}
            className="inline-flex items-center space-x-1 bg-emerald-800 hover:bg-emerald-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Nuevo Negocio</span>
          </button>
        </div>
      </div>
    </header>
  );
}
