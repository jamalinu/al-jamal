import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini SDK with telemetry header
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

const router = express.Router();

// API Route for Spanish Chat Tutor
router.post("/chat", async (req, res) => {
  try {
    const { messages, tutorInfo } = req.body;
    
    if (!ai) {
      return res.status(500).json({
        error: "API key missing",
        message: "Para chatear con los tutores de IA se requiere la clave de API de Gemini. Por favor, añádela en la sección correspondiente."
      });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    const tutorDescription = tutorInfo || {
      name: "Sofía",
      style: "De Madrid, paciente y explicativa, utiliza comparaciones gramaticales con el árabe.",
      level: "Todos los niveles"
    };

    const systemInstruction = `
Eres un tutor de español certificado de Al-Jamal Academia llamado ${tutorDescription.name}.
Tu enfoque es: ${tutorDescription.style}.
Estás enseñando español como segunda lengua a un estudiante nativo árabe.
Instrucciones críticas de comportamiento:
1. Habla principalmente en español de nivel adaptativo (simple pero natural), pero usa el árabe de forma clara para explicar conceptos gramaticales difíciles, dar traducciones de auxilio y felicitar al alumno.
2. Compara activamente el español y el árabe para ayudar al estudiante en su transición lingüística:
   - Señala falsos amigos o diferencias críticas (ej. género de sol/luna: sol en árabe es femenino [شمس] pero en español es masculino [el sol]; luna es masculino en árabe [قمر] pero en español es femenino [la luna]).
   - Explica el uso de los verbos Ser y Estar comparándolo con la oración nominal árabe sin cópula (جملة اسمية).
   - Recomienda palabras con raíz compartida árabe-española (como almohada/المخدة [al-mukhada], azúcar/السكر [as-sukkar], etc.).
3. Siempre corrige de manera constructiva cualquier error del alumno. Explícale su fallo gramatical en árabe de forma comprensible y dale una versión corregida en español.
4. Mantén la motivación viva con palabras de aliento (¡Excelente! / ممتاز !, ¡Así se hace! / أحสنت !).
5. Las respuestas deben ser breves, cómodas de leer en móviles y empáticas.
`;

    const contents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "Lo siento, tuve dificultades para procesar eso. ¿Podrías repetirlo?";
    res.json({ text: replyText });
  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "No se pudo conectar con el servidor de la inteligencia artificial."
    });
  }
});

// API Route for AI Avatar image generation using Gemini 2.5 Flash Image
router.post("/generate-avatar", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!ai) {
      return res.status(500).json({
        error: "API key missing",
        message: "Para generar imágenes con IA se requiere la clave de API de Gemini. Por favor, asegúrate de tenerla configurada en Settings > Secrets."
      });
    }

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "El prompt descriptivo es requerido." });
    }

    // Call Gemini 2.5 Flash Image with 1:1 avatar aspect ratio
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    let imageUrl = null;
    const candidates = response.candidates;
    if (candidates && candidates.length > 0 && candidates[0].content && candidates[0].content.parts) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const base64EncodeString = part.inlineData.data;
          imageUrl = `data:image/png;base64,${base64EncodeString}`;
          break;
        }
      }
    }

    if (imageUrl) {
      res.json({ imageUrl });
    } else {
      res.status(500).json({
        error: "Generation failed",
        message: "El modelo de IA procesó la solicitud pero no generó el canal de datos de imagen. Prueba con otro prompt."
      });
    }
  } catch (error: any) {
    console.error("Gemini Image Generation Error in backend:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Dificultades al generar la foto de perfil con Inteligencia Artificial."
    });
  }
});

router.get("/health", (req, res) => {
  res.json({ status: "ok", apiConfigured: !!ai });
});

export default router;
