import React from 'react';
import { Entity } from '../types';
import { 
  FileText, 
  Printer, 
  Sparkles, 
  Award, 
  Zap, 
  Compass, 
  Heart, 
  Leaf, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Coins, 
  Cpu, 
  Layers,
  ArrowRight
} from 'lucide-react';
import RadarTelarana from './RadarTelarana';

interface ReporteEjecutivoProps {
  entity: Entity;
  onExportPDF: (entity: Entity) => void;
  onBack: () => void;
}

export default function ReporteEjecutivo({ entity, onExportPDF, onBack }: ReporteEjecutivoProps) {
  const lastIter = entity.iterations[entity.iterations.length - 1];
  const diagnosis = lastIter?.diagnosis;
  const kpis = lastIter?.kpiDimension;
  const priorities = lastIter?.priorities || [];
  const route = lastIter?.route;
  const radarScores = lastIter?.radarScores;
  const motorMeta = lastIter?.motorMeta;
  const bicGov = lastIter?.bicGovernance;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto printable-dossier">
      
      {/* Action Header (Hidden in Print) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4 print:hidden">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
            EXPEDIENTE ESTANDARIZADO DE IMPACTO
          </span>
          <h3 className="text-2xl font-serif font-bold text-gray-900 mt-1">
            Dossier de Inversión & Gobernanza Socioambiental
          </h3>
          <p className="text-xs text-gray-500 font-sans">
            Preparado para fondos de cooperación, bancos de desarrollo e inversionistas ángel bajo el <strong>Método RAS³</strong> y marco <strong>Ley BIC</strong>.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-1 border border-gray-200 text-gray-600 px-3.5 py-2 rounded-xl text-xs hover:bg-gray-50 transition-colors font-medium"
          >
            <span>Volver al Dashboard</span>
          </button>
          
          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-2 bg-emerald-800 text-white hover:bg-emerald-900 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm"
            title="Imprimir o guardar como PDF"
          >
            <Printer className="h-4 w-4" />
            <span>Imprimir / Guardar PDF</span>
          </button>
        </div>
      </div>

      {/* Main Document Body (Printable Paper Style) */}
      <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 print:border-0 print:shadow-none print:p-0">
        
        {/* Dossier Header */}
        <div className="border-b-2 border-emerald-950 pb-6 flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
                BANCO DE LAS IDEAS · SAAS DE INCUBACIÓN
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-xs font-mono text-gray-500">MÉTODO RAS³</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-950 tracking-tight">
              {entity.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 font-sans max-w-xl">
              {entity.description || 'Proyecto de triple impacto en proceso de incubación y desarrollo integral.'}
            </p>
          </div>

          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 text-right space-y-1">
            <span className="text-[10px] font-mono text-emerald-800 uppercase tracking-wider block font-bold">
              ESTADO DE INCUBACIÓN
            </span>
            <div className="flex items-center justify-end space-x-1.5">
              <span className="text-2xl font-bold font-mono text-emerald-950">{entity.level}%</span>
              <span className="text-xs font-mono text-emerald-700">MADUREZ</span>
            </div>
            <span className="text-[10px] text-gray-500 font-sans block">
              Iteración {lastIter?.version || 1} · {new Date(entity.updatedAt || entity.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Section 1: Ley BIC & Purpose Alignment */}
        <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-200/80 pb-2">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              <h3 className="text-xs font-mono font-bold text-gray-900 uppercase tracking-wider">
                1. Declaración de Propósito & Alineamiento Ley BIC
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-md font-semibold">
              Sociedades de Beneficio e Interés Colectivo
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Propósito de Impacto</span>
              <p className="text-gray-800 font-serif italic mt-0.5">
                {bicGov?.propositoSocioambiental || 'Generar soluciones de valor compartido que protejan los ecosistemas y promuevan el bienestar comunitario.'}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Comunidades Beneficiarias</span>
              <p className="text-gray-700 mt-0.5 font-sans">
                {bicGov?.beneficiarios || 'Trabajadores, clientes conscientes, productores locales y territorio ambiental.'}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Modelo de Triple Impacto</span>
              <p className="text-gray-700 mt-0.5 font-sans">
                {bicGov?.modeloImpacto || 'Gestión circular, merma cero, salarios justos y preservación del patrimonio biocultural.'}
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Visual Equilibrium - Telaraña RAS3 & 4 Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 border border-gray-100 rounded-2xl p-4 bg-white shadow-2xs">
            <div className="text-center mb-1">
              <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold tracking-wider">
                DIAGRAMA RADIAL DE EQUILIBRIO
              </span>
              <h4 className="text-xs font-serif font-bold text-gray-800">
                Telaraña RAS³ (Capítulo 14 y 19)
              </h4>
            </div>
            <RadarTelarana scores={radarScores} height={230} showDetails={false} />
          </div>

          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center space-x-2">
              <Compass className="h-4 w-4 text-emerald-800" />
              <h3 className="text-xs font-mono font-bold text-gray-900 uppercase tracking-wider">
                2. Los 4 Pilares Inseparables de Sostenibilidad (Capítulo 9 & 22)
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="border border-emerald-100 bg-emerald-50/40 p-3 rounded-xl space-y-1">
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase block">Pilar Ambiental</span>
                <p className="text-gray-700 leading-snug">
                  Ecoeficiencia en recursos, gestión del agua, merma cero y economía circular aplicada.
                </p>
              </div>
              <div className="border border-blue-100 bg-blue-50/40 p-3 rounded-xl space-y-1">
                <span className="text-[10px] font-mono font-bold text-blue-800 uppercase block">Pilar Social</span>
                <p className="text-gray-700 leading-snug">
                  Comercio justo con proveedores locales, inclusión social y valor compartido en el territorio.
                </p>
              </div>
              <div className="border border-amber-100 bg-amber-50/40 p-3 rounded-xl space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-800 uppercase block">Pilar Económico</span>
                <p className="text-gray-700 leading-snug">
                  Viabilidad financiera a largo plazo, liquidez y reinversión responsable.
                </p>
              </div>
              <div className="border border-purple-100 bg-purple-50/40 p-3 rounded-xl space-y-1">
                <span className="text-[10px] font-mono font-bold text-purple-800 uppercase block">Pilar Cultural</span>
                <p className="text-gray-700 leading-snug">
                  Identidad comunitaria, transmisión de saberes y desarrollo de valores éticos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Protocolo P-R-O (Potencial, Realidad, Objetivo) */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
            <Sparkles className="h-4 w-4 text-emerald-800" />
            <h3 className="text-xs font-mono font-bold text-gray-900 uppercase tracking-wider">
              3. Diagnóstico RAS³: Potencial, Realidad y Objetivo (No FODA)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/60 space-y-1.5">
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-800">POTENCIAL PRIMERO</span>
              <p className="text-xs text-gray-800 font-serif italic leading-relaxed">
                "{diagnosis?.potencial || 'Capacidades latentes en desarrollo.'}"
              </p>
            </div>
            <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/60 space-y-1.5">
              <span className="text-[10px] font-mono uppercase font-bold text-teal-800">REALIDAD OBSERVABLE</span>
              <p className="text-xs text-gray-700 font-sans leading-relaxed">
                {diagnosis?.realidad || 'Hechos objetivos observados en la operación.'}
              </p>
            </div>
            <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/60 space-y-1.5">
              <span className="text-[10px] font-mono uppercase font-bold text-blue-800">OBJETIVO & CAPACIDAD</span>
              <p className="text-xs text-gray-700 font-sans leading-relaxed">
                {diagnosis?.objetivo?.estadoSuperior || route?.realidadEsperada || 'Consolidar el desarrollo integral.'}
              </p>
            </div>
          </div>

          {/* Aciertos y Oportunidades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="border border-emerald-100 rounded-xl p-4 bg-emerald-50/30 space-y-2">
              <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase block">
                Aciertos (A Conservar y Fortalecer)
              </span>
              <ul className="space-y-1 text-xs text-gray-700 list-disc pl-4">
                {diagnosis?.aciertos?.map((a, i) => (
                  <li key={i}>{a}</li>
                )) || <li>Capacidades operativas existentes.</li>}
              </ul>
            </div>
            <div className="border border-amber-100 rounded-xl p-4 bg-amber-50/30 space-y-2">
              <span className="text-[10px] font-mono font-bold text-amber-800 uppercase block">
                Oportunidades de Mejora (A Desarrollar)
              </span>
              <ul className="space-y-1 text-xs text-gray-700 list-disc pl-4">
                {diagnosis?.oportunidades_mejora?.map((op, i) => (
                  <li key={i}>{op}</li>
                )) || <li>Oportunidades de innovación permanente.</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4: Motor & Meta o Precio & Premio (Capítulo 17) */}
        {motorMeta && (
          <div className="bg-emerald-950 text-white rounded-2xl p-5 space-y-3">
            <div className="flex items-center space-x-2 border-b border-emerald-800 pb-2">
              <Zap className="h-4 w-4 text-amber-300" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-200">
                4. Dinámica del Desarrollo: Motor, Meta, Precio y Premio (Capítulo 17)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-sans">
              <div>
                <span className="text-[10px] font-mono text-emerald-300 block uppercase font-bold">1. El Motor</span>
                <p className="text-emerald-100/90 mt-0.5 leading-snug">{motorMeta.motor}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-300 block uppercase font-bold">2. La Meta</span>
                <p className="text-emerald-100/90 mt-0.5 leading-snug">{motorMeta.meta}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-300 block uppercase font-bold">3. El Precio</span>
                <p className="text-emerald-100/90 mt-0.5 leading-snug">{motorMeta.precio}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-300 block uppercase font-bold">4. El Premio</span>
                <p className="text-emerald-100/90 mt-0.5 leading-snug">{motorMeta.premio}</p>
              </div>
            </div>
          </div>
        )}

        {/* Section 5: Prioridades por Impacto y Efecto Multiplicador */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
            <Layers className="h-4 w-4 text-emerald-800" />
            <h3 className="text-xs font-mono font-bold text-gray-900 uppercase tracking-wider">
              5. Matriz de Prioridades con Efecto Multiplicador (Capítulo 23)
            </h3>
          </div>

          <div className="space-y-2">
            {priorities.map((p, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs bg-gray-50/50">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">{p.oportunidad}</span>
                    <span className="bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Puntaje: {p.puntuacion}/10
                    </span>
                  </div>
                  <p className="text-gray-600 font-sans">{p.justificacion}</p>
                  {p.efectoMultiplicador && (
                    <p className="text-[11px] text-emerald-800 font-medium">
                      ⚡ <strong>Efecto multiplicador:</strong> {p.efectoMultiplicador}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-mono">
                  <span className="bg-white border px-2 py-1 rounded-md text-amber-800">Adm: {p.impactoAdministrativo}</span>
                  <span className="bg-white border px-2 py-1 rounded-md text-indigo-800">Hum: {p.impactoHumano}</span>
                  <span className="bg-white border px-2 py-1 rounded-md text-emerald-800">Sos: {p.impactoSostenible}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Ruta de Desarrollo (Cronograma de Ejecución y Recursos) */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
            <Calendar className="h-4 w-4 text-emerald-800" />
            <h3 className="text-xs font-mono font-bold text-gray-900 uppercase tracking-wider">
              6. Ruta de Desarrollo: Cronograma de Ejecución & Recursos
            </h3>
          </div>

          <div className="space-y-3">
            {route?.etapas.map((stage, idx) => (
              <div key={idx} className="border border-emerald-100 rounded-2xl p-4 bg-emerald-50/20 space-y-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100/60 pb-2">
                  <span className="font-serif font-bold text-emerald-950 text-sm">
                    {stage.nombre}
                  </span>
                  <span className="font-mono text-[11px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md font-semibold">
                    {stage.tiempo}
                  </span>
                </div>
                <p className="text-gray-800 font-medium leading-relaxed">{stage.accion}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-mono text-gray-600">
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <span className="text-[9px] uppercase text-gray-400 block font-bold">Responsable</span>
                    <span className="text-gray-800 font-semibold">{stage.responsable}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <span className="text-[9px] uppercase text-gray-400 block font-bold">Métrica Clave</span>
                    <span className="text-emerald-800 font-semibold">{stage.indicador}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <span className="text-[9px] uppercase text-gray-400 block font-bold">Recursos Humanos</span>
                    <span>{stage.recursos?.humanos || 'Personal'}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <span className="text-[9px] uppercase text-gray-400 block font-bold">Finanzas & Tech</span>
                    <span>{stage.recursos?.financieros || 'Presupuesto'} · {stage.recursos?.tecnologicos || 'Digital'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formal Signature & Method Seal */}
        <div className="border-t-2 border-gray-100 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-gray-500">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-serif font-bold text-gray-900">
              BANCO DE LAS IDEAS · GOBERNANZA DIGITAL
            </p>
            <p className="font-sans text-[11px] text-gray-500">
              Expediente avalado por la metodología de Reingeniería Administrativa Sostenible (RAS³).
            </p>
            <p className="font-mono text-[10px] text-emerald-800">
              Autor: Lic. Adm. Herbert Pablo Gamarra Gil
            </p>
          </div>

          <div className="border-t border-gray-300 pt-2 w-52 text-center">
            <span className="text-[10px] font-mono text-gray-400 block uppercase">Firma del Gestor Responsable</span>
            <span className="font-serif font-semibold text-gray-800 text-xs mt-1 block">
              {entity.name}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
