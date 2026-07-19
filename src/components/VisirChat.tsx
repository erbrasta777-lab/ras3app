import React, { useState, useRef, useEffect } from 'react';
import { Entity, ChatMessage } from '../types';
import { Send, Sparkles, Compass, AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';

interface VisirChatProps {
  entity: Entity;
}

export default function VisirChat({ entity }: VisirChatProps) {
  const currentIteration = entity.iterations[entity.iterations.length - 1];
  const diagnosis = currentIteration?.diagnosis;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'visir',
      text: `Saludos, líder. Soy tu Visir Digital. He analizado el estado de "${entity.name}". ¿Qué aspecto de nuestra ruta o de las dimensiones Administrativa, Humana y Sostenible deseas debatir hoy para afinar nuestras decisiones?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          entityName: entity.name,
          currentContext: entity.description,
          diagnosis: diagnosis,
          route: currentIteration?.route,
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo establecer comunicación con el Visir Digital.');
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
      console.error(err);
      setError('Error al obtener la respuesta del Visir. Revisa la conexión.');
    } finally {
      setLoading(false);
    }
  };

  const presetQuestions = [
    '¿Cómo equilibramos la dimensión Humana en nuestra Ruta?',
    '¿Qué indicadores sostenibles podemos reforzar?',
    '¿Cuál es el efecto multiplicador de nuestras prioridades?',
    'Aconséjame sobre los próximos pasos del plan',
  ];

  return (
    <div className="space-y-6 py-6 h-[calc(100vh-140px)] flex flex-col justify-between">
      {/* Title */}
      <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-serif flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-emerald-800" />
            <span>Asistente Conversacional: El Visir Digital</span>
          </h3>
          <p className="text-xs text-gray-500 font-sans">
            Conversa directamente con el Visir estratégico de <strong>{entity.name}</strong> para afinar ideas de reingeniería.
          </p>
        </div>
        <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
          FILOSOFÍA RAS³
        </span>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 py-2 border-b border-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-2xl rounded-2xl p-4 shadow-3xs space-y-1 ${
                msg.sender === 'user'
                  ? 'bg-emerald-800 text-white rounded-br-none'
                  : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none font-serif leading-relaxed'
              }`}
            >
              {/* Sender Name */}
              <span className={`block text-[9px] font-mono tracking-widest uppercase ${
                msg.sender === 'user' ? 'text-emerald-200' : 'text-emerald-800'
              }`}>
                {msg.sender === 'user' ? 'GESTOR' : 'EL VISIR DIGITAL'}
              </span>

              {/* Text */}
              <p className="text-xs font-sans whitespace-pre-wrap leading-relaxed">{msg.text}</p>

              {/* Timestamp */}
              <span className={`block text-[8px] text-right font-mono ${
                msg.sender === 'user' ? 'text-emerald-300/80' : 'text-gray-400'
              }`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-4 shadow-3xs flex items-center space-x-3 text-xs text-gray-500 font-serif italic">
              <RefreshCw className="h-4 w-4 animate-spin text-emerald-800" />
              <span>El Visir está redactando su respuesta con sabiduría...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <div className="flex items-center space-x-2 bg-rose-50 border border-rose-100 text-rose-800 rounded-lg p-3 text-xs">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Questions and Input bar */}
      <div className="space-y-4">
        {/* Preset Questions pills */}
        <div className="flex flex-wrap gap-2">
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              disabled={loading}
              onClick={() => setInput(q)}
              className="text-[10px] bg-gray-50 hover:bg-emerald-50 hover:text-emerald-800 text-gray-600 border border-gray-200 rounded-full px-2.5 py-1 transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Escribe tu consulta o pide una recomendación basada en el Método RAS³..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="block flex-1 rounded-lg border border-gray-200 bg-gray-50/50 py-2.5 px-4 text-xs text-gray-800 focus:border-emerald-500 focus:bg-white focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-emerald-800 hover:bg-emerald-900 disabled:bg-emerald-800/40 text-white p-2.5 rounded-lg transition-colors shadow-xs"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
