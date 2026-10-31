import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy initialization helper for Gemini API
function getAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

const VISIR_SYSTEM_INSTRUCTION = `Eres "El Visir Digital", el asesor estratégico sénior, solucionador creativo y co-piloto de innovación para "BANCO DE LAS IDEAS" (SaaS de Gobernanza Digital e Incubación de Proyectos de Impacto Socioambiental).
Tu marco conceptual y metodológico se inspira en el libro "Método RAS³: Reingeniería Administrativa Sostenible" de Herbert Gamarra.

DIRECTIVA FUNDAMENTAL DE PERSONALIDAD Y ENFOQUE:
- Eres ALTAMENTE VERSÁTIL, CREATIVO, PRAGMÁTICO Y SOLUCIONADOR.
- NUNCA te encasilles ni te limites a recitar teoría, fórmulas rígidas o dogmas.
- Usa el Método RAS³ como una METODOLOGÍA PROPULSORA para expandir la visión y desbloquear caminos, NUNCA como una limitación, freno o camisa de fuerza.
- Cuando el emprendedor plantee dudas, cuellos de botella o retos, propón soluciones concretas, audaces, viables e innovadoras (nuevas líneas de negocio con causa, modelos de ingresos híbridos, alianzas de economía circular, herramientas digitales de bajo costo, dinámicas de equipo motivadoras, financiamiento colectivo o Ley BIC).
- Da respuestas estructuradas, con ideas frescas que resuelvan el problema sin rodeos burocráticos.

LOS 3 EJES DE ANÁLISIS INTEGRAL (como palancas de crecimiento, no como trabas):
1. Dimensión Administrativa: Eficiencia operativa, digitalización ágil, procesos fluidos, liquidez y control sin burocracia paralizante.
2. Dimensión Humana: El bienestar, la motivación y la salud del líder y su equipo son la verdadera fuente de innovación. Proponer pausas activas, comunicación sin fricción y balance vital para multiplicar el rendimiento.
3. Dimensión Sostenible (Ley BIC): Generar valor compartido en 4 pilares inseparables (Económico, Social, Ambiental, Cultural). Ayuda a convertir la sostenibilidad en una ventaja competitiva rentable y atractiva para fondos e inversionistas.

EL PROTOCOLO RAS³ (P-R-O-M-P-T) COMO GUÍA DE ACCIÓN:
- P (Potencial): Enfócate primero en el valor latente, activos desaprovechados y fortalezas singulares.
- R (Realidad): Observa los hechos sin juzgar; clasifica en Aciertos (conservar) y Oportunidades de Mejora (desarrollar).
- O (Objetivo): Diseña metas ambiciosas pero alcanzables que dejen capacidades instaladas.
- M (Medición): Indicadores claros y visuales (Telaraña RAS³) para orientar, no para castigar.
- P (Prioridades): Encuentra acciones con EFECTO MULTIPLICADOR (que al solucionar un aspecto administrativo beneficien al ser humano y al planeta).
- T (Toma de Decisiones / Ruta): Cronograma dinámico de ejecución con responsables, plazos e hitos tangibles.

Comunícate en un tono inspirador, respetuoso, lúcido y proactivo. Sé un socio estratégico que destraba problemas y despierta la creatividad del emprendedor.`;

// Endpoint: Analyze Entity Reality based on RAS³ Methodology
app.post("/api/analyze", async (req, res) => {
  const { name, context, description, potencialInput, objetivoInput } = req.body;

  if (!description && !potencialInput) {
    return res.status(400).json({ error: "La descripción de la realidad o potencial es requerida" });
  }

  try {
    const promptText = `
ENTIDAD A INCUBAR EN EL BANCO DE LAS IDEAS:
- Nombre: "${name || 'Iniciativa / Negocio'}"
- Contexto / Sector: "${context || 'Impacto Socioambiental'}"
${potencialInput ? `- Potencial inicial planteado: "${potencialInput}"` : ''}
${objetivoInput ? `- Objetivo deseado: "${objetivoInput}"` : ''}
- Hechos de la Realidad Observable:
"""
${description || potencialInput}
"""

Actúa con máxima creatividad, versatilidad y visión estratégica bajo el Método RAS³:
1. Potencial latente superior: Identifica su valor oculto y capacidad transformadora.
2. Realidad observable: Hechos concretos y sinceros.
3. Objetivo de desarrollo: Estado superior retador y capacidades que quedarán instaladas.
4. Diagnóstico RAS³: 3-5 Aciertos clave a conservar y 3-5 Oportunidades de Mejora innovadoras a desarrollar.
5. Medición 3D: Indicadores prácticos y accionables para dimensión Administrativa, Humana y Sostenible (con enfoque Ley BIC).
6. Prioridades RAS³: Acciones creativas de alto impacto con efecto multiplicador tangible.
7. Ruta de Desarrollo inicial con etapas dinámicas, responsables, tiempos y recursos.
8. Puntuaciones estimadas para la Telaraña RAS³ (0 a 100 en 6 ejes: Administrativa, Humana, Económica, Social, Ambiental, Cultural).
9. Dinámica de Desarrollo: Motor motivador, Meta tangible, Precio (esfuerzo consciente) y Premio (impacto alcanzado).`;

    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
      config: {
        systemInstruction: VISIR_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diagnostico: {
              type: Type.OBJECT,
              properties: {
                potencial: { type: Type.STRING, description: "Potencial latente de la entidad" },
                realidad: { type: Type.STRING, description: "Realidad observable basada en hechos" },
                aciertos: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Aciertos que deben conservarse y fortalecerse"
                },
                oportunidades_mejora: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Oportunidades de mejora para desarrollar"
                },
                objetivo: {
                  type: Type.OBJECT,
                  properties: {
                    estadoSuperior: { type: Type.STRING },
                    capacidadesADesarrollar: { type: Type.STRING }
                  },
                  required: ["estadoSuperior", "capacidadesADesarrollar"]
                }
              },
              required: ["potencial", "realidad", "aciertos", "oportunidades_mejora"]
            },
            medicion: {
              type: Type.OBJECT,
              properties: {
                administrativa: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "2-3 indicadores clave para la dimensión Administrativa"
                },
                humana: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "2-3 indicadores clave para la dimensión Humana"
                },
                sostenible: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "2-3 indicadores clave para los 4 pilares de sostenibilidad"
                }
              },
              required: ["administrativa", "humana", "sostenible"]
            },
            prioridades: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  oportunidad: { type: Type.STRING },
                  impactoAdministrativo: { type: Type.STRING, enum: ["bajo", "medio", "alto"] },
                  impactoHumano: { type: Type.STRING, enum: ["bajo", "medio", "alto"] },
                  impactoSostenible: { type: Type.STRING, enum: ["bajo", "medio", "alto"] },
                  justificacion: { type: Type.STRING },
                  puntuacion: { type: Type.NUMBER },
                  efectoMultiplicador: { type: Type.STRING }
                },
                required: ["oportunidad", "impactoAdministrativo", "impactoHumano", "impactoSostenible", "justificacion", "puntuacion"]
              }
            },
            ruta_inicial: {
              type: Type.OBJECT,
              properties: {
                etapas: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      nombre: { type: Type.STRING },
                      accion: { type: Type.STRING },
                      responsable: { type: Type.STRING },
                      tiempo: { type: Type.STRING },
                      indicador: { type: Type.STRING },
                      recursos: {
                        type: Type.OBJECT,
                        properties: {
                          humanos: { type: Type.STRING },
                          materiales: { type: Type.STRING },
                          financieros: { type: Type.STRING },
                          tecnologicos: { type: Type.STRING }
                        }
                      }
                    },
                    required: ["nombre", "accion", "responsable", "tiempo", "indicador"]
                  }
                },
                realidadEsperada: { type: Type.STRING }
              },
              required: ["etapas", "realidadEsperada"]
            },
            radarScores: {
              type: Type.OBJECT,
              properties: {
                administrativa: { type: Type.INTEGER },
                humana: { type: Type.INTEGER },
                economica: { type: Type.INTEGER },
                social: { type: Type.INTEGER },
                ambiental: { type: Type.INTEGER },
                cultural: { type: Type.INTEGER }
              },
              required: ["administrativa", "humana", "economica", "social", "ambiental", "cultural"]
            },
            motorMeta: {
              type: Type.OBJECT,
              properties: {
                motor: { type: Type.STRING },
                meta: { type: Type.STRING },
                precio: { type: Type.STRING },
                premio: { type: Type.STRING }
              },
              required: ["motor", "meta", "precio", "premio"]
            }
          },
          required: ["diagnostico", "medicion", "prioridades", "ruta_inicial", "radarScores", "motorMeta"]
        }
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No se recibió respuesta del Visir Digital.");
    }

    const data = JSON.parse(textOutput);
    res.json(data);
  } catch (error: any) {
    console.error("Error en /api/analyze:", error);
    res.status(500).json({ error: error.message || "Error al procesar el análisis de la entidad." });
  }
});

// Endpoint: Chat with Visir Digital
app.post("/api/chat", async (req, res) => {
  const { messages, entityName, currentContext, diagnosis, route, mode } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Falta el historial de mensajes" });
  }

  try {
    let dialoguePrompt = "Historial de conversación:\n";
    messages.forEach((msg: any) => {
      const roleName = msg.sender === 'user' ? 'Gestor' : 'Visir';
      dialoguePrompt += `${roleName}: ${msg.text}\n`;
    });
    dialoguePrompt += "\nVisir: (Responde con versatilidad, creatividad, proponiendo soluciones prácticas y alternativas viables bajo la metodología RAS³):";

    const contextAddition = `
INFORMACIÓN DEL PROYECTO INCUBADO:
- Nombre: "${entityName || 'No especificado'}"
- Sector/Contexto: "${currentContext || 'No especificado'}"
- Modo seleccionado por el gestor: "${mode || 'Solucionador Creativo'}"
${diagnosis ? `- Diagnóstico actual: Potencial="${diagnosis.potencial}". Realidad="${diagnosis.realidad}". Aciertos=[${diagnosis.aciertos?.join(', ')}]. Oportunidades=[${diagnosis.oportunidades_mejora?.join(', ')}].` : ''}
${route ? `- Ruta actual con ${route.etapas?.length || 0} etapas.` : ''}

RECORDATORIO:
Sé un solucionador real. Si el gestor te pide ideas o soluciones a problemas comerciales, de financiamiento, de equipo o de sostenibilidad, ofrécele propuestas frescas, ingeniosas y aplicables de inmediato. No seas dogmático.`;

    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: dialoguePrompt,
      config: {
        systemInstruction: `${VISIR_SYSTEM_INSTRUCTION}\n${contextAddition}`,
      }
    });

    const reply = response.text;
    res.json({ text: reply || "Entendido. Avancemos con soluciones creativas y prácticas para potenciar tu iniciativa." });
  } catch (error: any) {
    console.error("Error en /api/chat:", error);
    res.status(500).json({ error: error.message || "Error al conversar con el Visir Digital." });
  }
});

// Endpoint: Simulate Scenario (Simulador de Escenarios Estratégicos)
app.post("/api/simulate-scenario", async (req, res) => {
  const { scenario, entityName, sector } = req.body;

  if (!scenario) {
    return res.status(400).json({ error: "Se requiere la descripción del escenario" });
  }

  try {
    const prompt = `
Entidad: "${entityName || 'Proyecto de impacto'}"
Sector: "${sector || 'General'}"
Escenario a Simular:
"""
${scenario}
"""

Evalúa la simulación con enfoque creativo y analítico aplicando el Método RAS³:
1. Impacto estimado en Dimensión Administrativa (procesos, costos, tracción, viabilidad operativa).
2. Impacto estimado en Dimensión Humana (bienestar del equipo, entusiasmo, reducción de estrés, retención de talento).
3. Impacto estimado en Dimensión Sostenible (los 4 pilares: ambiental, social, económico, cultural - Ley BIC).
4. Recomendación estratégica y creativa del Visir Digital (propuestas concretas para maximizar el éxito del escenario).
5. Viabilidad de implementación ("alta", "media" o "prudente").`;

    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: VISIR_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            impactoAdministrativo: { type: Type.STRING },
            impactoHumano: { type: Type.STRING },
            impactoSostenible: { type: Type.STRING },
            recomendacionVisir: { type: Type.STRING },
            viabilidad: { type: Type.STRING, enum: ["alta", "media", "prudente"] }
          },
          required: ["impactoAdministrativo", "impactoHumano", "impactoSostenible", "recomendacionVisir", "viabilidad"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("Error en /api/simulate-scenario:", error);
    res.status(500).json({ error: error.message || "Error al simular el escenario." });
  }
});

// Setup Vite or serve static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
