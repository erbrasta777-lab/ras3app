import React, { useState } from 'react';
import { Entity, KPIDimension, KPI } from '../types';
import { CheckCircle2, ChevronRight, Plus, Trash2, ArrowLeft, Target, Award, Zap, Compass, Info } from 'lucide-react';

interface MedirProps {
  entity: Entity;
  onSaveKpis: (kpis: KPIDimension) => void;
  onBack: () => void;
  onChangeTab: (tab: string) => void;
}

export default function Medir({ entity, onSaveKpis, onBack, onChangeTab }: MedirProps) {
  const currentIteration = entity.iterations[entity.iterations.length - 1];
  
  // Use current KPI state or initialize with empty template
  const [kpis, setKpis] = useState<KPIDimension>(
    currentIteration?.kpiDimension || {
      administrativa: [],
      humana: [],
      sostenible: [],
    }
  );

  const [newKpiName, setNewKpiName] = useState('');
  const [newKpiDimension, setNewKpiDimension] = useState<'administrativa' | 'humana' | 'sostenible'>('administrativa');

  const handleAddKpi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKpiName.trim()) return;

    const newKpi: KPI = {
      id: `kpi-custom-${Date.now()}`,
      name: newKpiName,
      baseline: 'No establecida',
      target: 'Por definir',
      status: 'pendiente',
    };

    setKpis((prev) => ({
      ...prev,
      [newKpiDimension]: [...prev[newKpiDimension], newKpi],
    }));

    setNewKpiName('');
  };

  const handleUpdateKpiField = (
    dimension: 'administrativa' | 'humana' | 'sostenible',
    id: string,
    field: keyof KPI,
    value: string
  ) => {
    setKpis((prev) => ({
      ...prev,
      [dimension]: prev[dimension].map((kpi) =>
        kpi.id === id ? { ...kpi, [field]: value } : kpi
      ),
    }));
  };

  const handleDeleteKpi = (dimension: 'administrativa' | 'humana' | 'sostenible', id: string) => {
    setKpis((prev) => ({
      ...prev,
      [dimension]: prev[dimension].filter((kpi) => kpi.id !== id),
    }));
  };

  const handleSaveAndContinue = () => {
    onSaveKpis(kpis);
    onChangeTab('priorizar');
  };

  const renderKpiSection = (dimension: 'administrativa' | 'humana' | 'sostenible', title: string, icon: React.ReactNode, bgColor: string, iconColor: string) => {
    const list = kpis[dimension];

    return (
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-3xs space-y-4">
        <div className="flex items-center space-x-2 border-b border-gray-50 pb-3">
          <div className={`p-2 rounded-lg ${bgColor} ${iconColor}`}>
            {icon}
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 font-serif">{title}</h4>
            <p className="text-[10px] text-gray-500 font-mono tracking-wider">DIMENSIÓN {dimension.toUpperCase()}</p>
          </div>
        </div>

        {list.length === 0 ? (
          <p className="text-xs text-gray-400 font-serif italic py-2">No se han registrado indicadores en esta dimensión.</p>
        ) : (
          <div className="space-y-4">
            {list.map((kpi) => (
              <div key={kpi.id} className="p-4 bg-gray-50/50 rounded-lg border border-gray-100 space-y-3 relative group">
                {/* Delete button */}
                <button
                  onClick={() => handleDeleteKpi(dimension, kpi.id)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-rose-600 transition-colors"
                  title="Eliminar KPI"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>

                <div className="pr-6 space-y-1">
                  <label className="text-[10px] text-gray-400 font-mono">INDICADOR / MÉTRICA</label>
                  <input
                    type="text"
                    value={kpi.name}
                    onChange={(e) => handleUpdateKpiField(dimension, kpi.id, 'name', e.target.value)}
                    className="block w-full bg-transparent border-0 border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:ring-0 text-xs font-semibold text-gray-800 py-0.5 px-0"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {/* Baseline */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-mono">LÍNEA BASE (SITUACIÓN ACTUAL)</label>
                    <input
                      type="text"
                      value={kpi.baseline}
                      onChange={(e) => handleUpdateKpiField(dimension, kpi.id, 'baseline', e.target.value)}
                      className="block w-full bg-white border border-gray-200 rounded-md py-1 px-2 text-xs text-gray-700 shadow-3xs focus:border-emerald-500 focus:ring-0"
                    />
                  </div>

                  {/* Target */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-mono">META (SITUACIÓN DESEADA)</label>
                    <input
                      type="text"
                      value={kpi.target}
                      onChange={(e) => handleUpdateKpiField(dimension, kpi.id, 'target', e.target.value)}
                      className="block w-full bg-white border border-gray-200 rounded-md py-1 px-2 text-xs text-gray-700 shadow-3xs focus:border-emerald-500 focus:ring-0"
                    />
                  </div>

                  {/* Status */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-mono">ESTADO ACTUAL</label>
                    <select
                      value={kpi.status}
                      onChange={(e) => handleUpdateKpiField(dimension, kpi.id, 'status', e.target.value as KPI['status'])}
                      className="block w-full bg-white border border-gray-200 rounded-md py-1 px-2 text-xs text-gray-700 shadow-3xs focus:border-emerald-500 focus:ring-0 font-medium"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en_progreso">En Progreso</option>
                      <option value="logrado">Logrado</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 py-6">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-serif">Módulo Medir: Indicadores Sostenibles</h3>
          <p className="text-xs text-gray-500 font-sans">
            Mide tu progreso. Define la situación actual y la meta esperada para cada indicador clave.
          </p>
        </div>
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-1 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-xs hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Volver al diagnóstico</span>
        </button>
      </div>

      {/* Philosophy Callout */}
      <div className="bg-emerald-50 border border-emerald-100/50 rounded-xl p-4 flex items-start space-x-3 text-emerald-950">
        <Info className="h-4 w-4 shrink-0 text-emerald-800 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong>"No medimos para obtener cifras. Medimos para comprender la realidad."</strong> En RAS³, no existen KPIs universales; 
          cada indicador depende del potencial específico que deseas desarrollar. Acepta o edita los indicadores sugeridos por tu Visir, o agrega los tuyos.
        </p>
      </div>

      {/* KPI Add Form */}
      <form onSubmit={handleAddKpi} className="bg-white border border-gray-100 rounded-xl p-5 shadow-3xs grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="md:col-span-2 space-y-1">
          <label htmlFor="kpi-name-input" className="text-[10px] text-gray-400 font-mono tracking-wider uppercase block">NUEVO INDICADOR PERSONALIZADO</label>
          <input
            id="kpi-name-input"
            type="text"
            placeholder="Ej. Tasa de conversión de leads digitales o Nivel de rotación laboral..."
            value={newKpiName}
            onChange={(e) => setNewKpiName(e.target.value)}
            className="block w-full bg-gray-50/50 border border-gray-200 rounded-md py-1.5 px-3 text-xs text-gray-800 shadow-inner focus:border-emerald-500 focus:bg-white focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="kpi-dim-input" className="text-[10px] text-gray-400 font-mono tracking-wider uppercase block">DIMENSIÓN</label>
          <select
            id="kpi-dim-input"
            value={newKpiDimension}
            onChange={(e) => setNewKpiDimension(e.target.value as any)}
            className="block w-full bg-gray-50/50 border border-gray-200 rounded-md py-1.5 px-3 text-xs text-gray-800 focus:border-emerald-500 focus:bg-white focus:outline-none font-medium"
          >
            <option value="administrativa">Administrativa</option>
            <option value="humana">Humana</option>
            <option value="sostenible">Sostenible</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-medium py-1.5 px-4 rounded-md text-xs transition-colors flex items-center justify-center space-x-1 h-9"
        >
          <Plus className="h-4 w-4" />
          <span>Añadir KPI</span>
        </button>
      </form>

      {/* KPI sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {renderKpiSection('administrativa', 'Dimensión Administrativa', <Zap className="h-4 w-4" />, 'bg-amber-50', 'text-amber-800')}
        {renderKpiSection('humana', 'Dimensión Humana', <Award className="h-4 w-4" />, 'bg-indigo-50', 'text-indigo-800')}
        {renderKpiSection('sostenible', 'Dimensión Sostenible', <Compass className="h-4 w-4" />, 'bg-emerald-50', 'text-emerald-800')}
      </div>

      {/* Actions */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          onClick={handleSaveAndContinue}
          className="inline-flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-900 text-white font-medium px-5 py-2 rounded-lg text-xs transition-colors shadow-xs"
        >
          <span>Guardar KPIs y Proceder a Priorizar</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
