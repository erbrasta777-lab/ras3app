import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { RadarScores } from '../types';

interface RadarTelaranaProps {
  scores?: RadarScores;
  height?: number;
  showDetails?: boolean;
}

export default function RadarTelarana({ scores, height = 300, showDetails = false }: RadarTelaranaProps) {
  const currentScores: RadarScores = scores || {
    administrativa: 68,
    humana: 62,
    economica: 70,
    social: 65,
    ambiental: 75,
    cultural: 60,
  };

  const data = [
    {
      subject: '1. Administrativa',
      pilar: 'Gestión y Procesos',
      valor: currentScores.administrativa,
      fullMark: 100,
    },
    {
      subject: '2. Humana',
      pilar: 'Bienestar y Talento',
      valor: currentScores.humana,
      fullMark: 100,
    },
    {
      subject: '3. Económica',
      pilar: 'Viabilidad y Finanzas',
      valor: currentScores.economica,
      fullMark: 100,
    },
    {
      subject: '4. Social',
      pilar: 'Comunidad y Redes',
      valor: currentScores.social,
      fullMark: 100,
    },
    {
      subject: '5. Ambiental',
      pilar: 'Ecoeficiencia y Ciclo',
      valor: currentScores.ambiental,
      fullMark: 100,
    },
    {
      subject: '6. Cultural',
      pilar: 'Identidad y Patrimonio',
      valor: currentScores.cultural,
      fullMark: 100,
    },
  ];

  // Calculate average balance score
  const avgScore = Math.round(
    (currentScores.administrativa +
      currentScores.humana +
      currentScores.economica +
      currentScores.social +
      currentScores.ambiental +
      currentScores.cultural) /
      6
  );

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full relative" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#374151', fontSize: 11, fontFamily: 'serif', fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: '#9ca3af', fontSize: 9 }}
              stroke="#e5e7eb"
            />
            <Radar
              name="Equilibrio RAS³"
              dataKey="valor"
              stroke="#065f46"
              fill="#059669"
              fillOpacity={0.35}
              strokeWidth={2}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-emerald-950 text-white text-xs px-3 py-2 rounded-lg shadow-lg border border-emerald-800">
                      <p className="font-serif font-bold text-emerald-200">{item.subject}</p>
                      <p className="text-[11px] text-gray-300">{item.pilar}</p>
                      <p className="text-sm font-mono font-semibold text-emerald-300 mt-1">
                        Desarrollo: {item.valor} / 100
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </RadarChart>
        </ResponsiveContainer>

        {/* Center overlay score badge */}
        <div className="absolute top-2 right-2 bg-emerald-50 border border-emerald-200/80 rounded-xl px-2.5 py-1 text-center shadow-xs">
          <span className="text-[9px] font-mono uppercase text-emerald-700 tracking-wider block">Equilibrio</span>
          <span className="text-sm font-bold font-mono text-emerald-900">{avgScore}%</span>
        </div>
      </div>

      {showDetails && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full mt-3 pt-3 border-t border-gray-100 text-xs">
          {data.map((item) => (
            <div key={item.subject} className="bg-gray-50/70 p-2 rounded-lg border border-gray-100">
              <span className="text-[10px] text-gray-500 font-mono block leading-tight">{item.subject}</span>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-[11px] font-medium text-gray-800 truncate">{item.pilar}</span>
                <span className="font-mono font-bold text-emerald-800">{item.valor}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
