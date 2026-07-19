import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Endpoint: Analyze Entity Reality based on RAS³ Methodology
app.post("/api/analyze", async (req, res) => {
  const { name, context, description } = req.body;

  if (!description) {
    return res.status(400).json({ error: "La descripción es requerida" });
  }

  try {
    const systemInstruction = `Eres un "Visir Digital", un experto consejero estratégico especializado en el Método RAS³ (Reingeniería Administrativa Sostenible). Tu función es analizar entidades (personas, organizaciones, proyectos) y guiar su Desarrollo Integral.
Sigue estrictamente el Protocolo RAS³:
1. Potencial: Identifica las capacidades latentes de la entidad (¿Qué podría llegar a ser? ¿Qué posibilidades existen?).
2. Realidad: Describe objetivamente la situación actual basándote únicamente en hechos (no opiniones ni suposiciones).
3. Objetivo: Infiere un estado superior y deseable de desarrollo para la entidad.
4. Medición: Sugiere de 2 a 3 indicadores clave de rendimiento (KPIs) para cada una de las tres dimensiones: Administrativa, Humana y Sostenible.
5. Prioridades: Identifica las oportunidades de mejora prioritarias que generarán el mayor impacto en el Desarrollo Integral y efecto multiplicador, con su respectiva puntuación y justificación.
6. Toma de decisiones (Ruta): Propone un plan de acción inicial (Ruta de Desarrollo) estructurado en etapas lógicas con recursos y responsables.

NO uses el análisis FODA tradicional. Basa tu diagnóstico únicamente en Aciertos (lo que se hace bien y debe conservarse) y Oportunidades de Mejora (lo que se puede desarrollar).
Debes responder estrictamente en formato JSON que coincida con el esquema solicitado.`;

    const promptText = `
Entidad: "${name || 'Negocio/Proyecto'}"
Contexto o Tipo de Entidad: "${context || 'No especificado'}"
Realidad proporcionada por el usuario:
"""
${description}
"""

Genera el diagnóstico RAS³ completo siguiendo el esquema JSON proporcionado.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diagnostico: {
              type: Type.OBJECT,
              properties: {
                potencial: { type: Type.STRING, description: "Describir el potencial latente" },
                realidad: { type: Type.STRING, description: "Describir la realidad objetiva basada en hechos" },
                aciertos: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Aciertos que deben conservarse y fortalecerse"
                },
                oportunidades_mejora: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Oportunidades de mejora para desarrollar"
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
                  description: "2-3 indicadores clave para la dimensión Administrativa (estructura, procesos)"
                },
                humana: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "2-3 indicadores clave para la dimensión Humana (bienestar, talento, cultura)"
                },
                sostenible: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "2-3 indicadores clave para la dimensión Sostenible (economía, social, ambiental, cultural)"
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
                  puntuacion: { type: Type.INTEGER }
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
            }
          },
          required: ["diagnostico", "medicion", "prioridades", "ruta_inicial"]
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

// Endpoint: Chat with Visir Digital (Asistente Conversacional)
app.post("/api/chat", async (req, res) => {
  const { messages, entityName, currentContext, diagnosis, route } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Falta el historial de mensajes" });
  }

  try {
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: `Eres el "Visir Digital" de la metodología RAS³ (Reingeniería Administrativa Sostenible). Tu rol es aconsejar y guiar con sabiduría y profundidad científica práctica al gestor o líder del proyecto.
Principios RAS³ que rigen tu pensamiento:
- La realidad precede al desarrollo. Observa los hechos antes de opinar.
- El desarrollo es multidimensional: Administrativo, Humano y Sostenible. Deben ir en equilibrio.
- No reemplazas al líder; solo asesoras para que él tome la decisión final (sabiduría del visir).
- Habla en español, de manera clara, respetuosa, sabia y profesional.

Información de la Entidad que estás aconsejando actualmente:
- Nombre: "${entityName || 'No especificado'}"
- Tipo de Entidad: "${currentContext || 'No especificado'}"
${diagnosis ? `- Diagnóstico actual: Potencial="${diagnosis.potencial}". Realidad="${diagnosis.realidad}". Aciertos=[${diagnosis.aciertos?.join(', ')}]. Oportunidades=[${diagnosis.oportunidades_mejora?.join(', ')}].` : ''}
${route ? `- Ruta actual con ${route.etapas?.length || 0} etapas.` : ''}

Responde a la pregunta del usuario con respuestas concisas, inspiradoras y orientadas a la acción bajo la filosofía RAS³.`,
      }
    });

    // Feed chat history except the last message, then send the last message
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const lastMessage = messages[messages.length - 1];
    
    // We can use standard chat, but wait, the GoogleGenAI TypeScript SDK chat interface
    // doesn't have a direct history loader in ai.chats.create, let's look at the correct chat usage:
    // const chat = ai.chats.create({ model: "gemini-3.5-flash", history: [...] }) or similar,
    // let's check the gemini-api skill text on chats:
    // ```ts
    // const chat = ai.chats.create({
    //   model: "gemini-3.5-flash",
    //   config: { systemInstruction: "..." },
    // });
    // let response = await chat.sendMessage({ message: "Hello" });
    // ```
    // For simplicity, we can also reconstruct the full dialogue context or send the message with history.
    // Let's pass the message history as part of the query text or let the chat session handle it.
    // A robust way to pass history in a stateless HTTP endpoint is sending a combined prompt with the conversation history!
    // This is incredibly reliable and prevents any SDK mismatch on session states. Let's do that!
    
    let dialoguePrompt = "Historial de conversación:\n";
    messages.forEach((msg: any) => {
      const roleName = msg.sender === 'user' ? 'Gestor' : 'Visir';
      dialoguePrompt += `${roleName}: ${msg.text}\n`;
    });
    dialoguePrompt += "\nVisir: (Genera tu respuesta sabia y concisa aquí)";

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: dialoguePrompt,
      config: {
        systemInstruction: `Eres el "Visir Digital" de la metodología RAS³ (Reingeniería Administrativa Sostenible). Tu rol es aconsejar y guiar con sabiduría y profundidad científica práctica al gestor o líder del proyecto.
Principios RAS³ que rigen tu pensamiento:
- La realidad precede al desarrollo. Observa los hechos antes de opinar.
- El desarrollo es multidimensional: Administrativo, Humano y Sostenible. Deben ir en equilibrio.
- No reemplazas al líder; solo asesoras para que él tome la decisión final (sabiduría del visir).
- Habla en español, de manera clara, respetuosa, sabia y profesional.

Información de la Entidad que estás aconsejando actualmente:
- Nombre: "${entityName || 'No especificado'}"
- Tipo de Entidad: "${currentContext || 'No especificado'}"
${diagnosis ? `- Diagnóstico actual: Potencial="${diagnosis.potencial}". Realidad="${diagnosis.realidad}". Aciertos=[${diagnosis.aciertos?.join(', ')}]. Oportunidades=[${diagnosis.oportunidades_mejora?.join(', ')}].` : ''}

Responde a la última pregunta del Gestor basándote en la conversación y la filosofía RAS³.`,
      }
    });

    const reply = response.text;
    res.json({ text: reply || "Entendido. Sigue observando y midiendo tu realidad." });
  } catch (error: any) {
    console.error("Error en /api/chat:", error);
    res.status(500).json({ error: error.message || "Error al conversar con el Visir Digital." });
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
