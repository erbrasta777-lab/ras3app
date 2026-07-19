import React from 'react';
import { X, Triangle, Circle, Square, Play, ArrowRight, Diamond } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 overflow-y-auto bg-gray-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl p-8 md:p-12 border border-gray-100 flex flex-col items-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-300 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-gray-50"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-2xl mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-tight mb-2">
            Bienvenido a RAS³
          </h2>
          <p className="text-xs md:text-sm font-sans text-gray-500 tracking-wide font-medium">
            Inteligencia Sintética para el Desarrollo Integral · Herbert Pablo Gamarra Gil
          </p>
        </div>

        {/* 6 Grid Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-10">
          
          {/* 1. Potencial Primero */}
          <div className="flex items-start space-x-4 p-5 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
            <div className="mt-1 flex items-center justify-center shrink-0 w-8 h-8 rounded-lg text-gray-400">
              <Triangle className="h-5 w-5 stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-gray-900 font-sans">Potencial primero</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Comienza por lo que puedes llegar a ser. Nadie desarrolla aquello que considera incapaz de desarrollarse.
              </p>
            </div>
          </div>

          {/* 2. Realidad como punto de partida */}
          <div className="flex items-start space-x-4 p-5 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
            <div className="mt-1 flex items-center justify-center shrink-0 w-8 h-8 rounded-lg text-gray-400">
              <Circle className="h-5 w-5 stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-gray-900 font-sans">Realidad como punto de partida</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Hechos, datos, evidencia. La realidad no limita el potencial; solo establece dónde estás hoy.
              </p>
            </div>
          </div>

          {/* 3. Objetivo: la nueva realidad */}
          <div className="flex items-start space-x-4 p-5 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
            <div className="mt-1 flex items-center justify-center shrink-0 w-8 h-8 rounded-lg text-gray-400">
              <Diamond className="h-5 w-5 stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-gray-900 font-sans">Objetivo: la nueva realidad</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Define el estado superior al que quieres llegar — concreto, alcanzable y medible.
              </p>
            </div>
          </div>

          {/* 4. Medición continua */}
          <div className="flex items-start space-x-4 p-5 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
            <div className="mt-1 flex items-center justify-center shrink-0 w-8 h-8 rounded-lg text-gray-400">
              <Square className="h-5 w-5 stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-gray-900 font-sans">Medición continua</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Indicadores en tres dimensiones: administrativa, humana y sostenible.
              </p>
            </div>
          </div>

          {/* 5. Prioridades por impacto */}
          <div className="flex items-start space-x-4 p-5 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
            <div className="mt-1 flex items-center justify-center shrink-0 w-8 h-8 rounded-lg text-gray-400">
              <Play className="h-4 w-4 stroke-[1.5] fill-transparent shrink-0" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-gray-900 font-sans">Prioridades por impacto</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                No nacen de la urgencia, nacen del análisis. ¿Qué genera mayor desarrollo integral?
              </p>
            </div>
          </div>

          {/* 6. Ruta de desarrollo */}
          <div className="flex items-start space-x-4 p-5 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
            <div className="mt-1 flex items-center justify-center shrink-0 w-8 h-8 rounded-lg text-gray-400">
              <ArrowRight className="h-5 w-5 stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-gray-900 font-sans">Ruta de desarrollo</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Una secuencia de acciones para incrementar capacidades de forma continua e integral. La IA analiza — tú decides.
              </p>
            </div>
          </div>

        </div>

        {/* Start Button */}
        <button
          onClick={onClose}
          className="inline-flex items-center space-x-2 bg-neutral-900 text-white hover:bg-neutral-950 font-medium px-8 py-3.5 rounded-xl text-xs tracking-wider transition-colors shadow-lg active:scale-98"
        >
          <span>Comenzar</span>
          <ArrowRight className="h-4 w-4" />
        </button>

      </div>
    </div>
  );
}
