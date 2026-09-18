import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "25mb" }));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "darsify-backend", time: new Date().toISOString() });
  });

  // AI Lesson Generation endpoint using Gemini
  app.post("/api/generate-lesson", async (req, res) => {
    try {
      const { topic, subject, language = "kaa", rawContent, gradeLevel } = req.body;

      if (!topic && !rawContent) {
        return res.status(400).json({ error: "Mavzu yoki matn kiritilishi shart." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(200).json({
          fallback: true,
          message: "API key not configured; using smart built-in curriculum generator.",
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const langInstruction =
        language === "kaa"
          ? "Qaraqalpaq tilinde (Karakalpak latin alfavitinde)"
          : language === "uz"
          ? "O'zbek tilida (Lotin alifbosida)"
          : language === "ru"
          ? "На русском языке"
          : "In English";

      const prompt = `You are the lead AI education specialist for "Darsify", an educational app in Uzbekistan.
Transform the following lesson topic/content into a rich, engaging educational package for teachers and students.
Language: ${langInstruction}.
Grade level: ${gradeLevel || "7-klas"}.
Subject: ${subject || "Biologiya"}.
Topic: ${topic || "Dars mavzusi"}.
Uploaded or pasted notes: ${rawContent || "Mavzuga doir asosiy ma'lumotlar"}.

Return a strictly valid JSON object matching the requested schema.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction:
            "You are an expert pedagogical AI in Uzbekistan. Generate high quality, accurate educational content in Latin script. Output ONLY valid JSON according to schema.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Lesson title in requested language" },
              subject: { type: Type.STRING, description: "Subject category" },
              gradeLevel: { type: Type.STRING, description: "Target grade" },
              summary: { type: Type.STRING, description: "One paragraph executive summary for teacher" },
              learningGoals: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3 key learning objectives",
              },
              lessonPlan: {
                type: Type.OBJECT,
                properties: {
                  durationMinutes: { type: Type.NUMBER },
                  stages: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        stageName: { type: Type.STRING },
                        duration: { type: Type.STRING },
                        teacherScript: { type: Type.STRING, description: "Word-by-word script teacher can say aloud" },
                        studentActivity: { type: Type.STRING },
                        keyTips: { type: Type.STRING },
                      },
                      required: ["stageName", "duration", "teacherScript", "studentActivity"],
                    },
                  },
                },
                required: ["durationMinutes", "stages"],
              },
              matchingGame: {
                type: Type.OBJECT,
                properties: {
                  gameTitle: { type: Type.STRING },
                  instructions: { type: Type.STRING },
                  pairs: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        term: { type: Type.STRING, description: "Scientific term or item" },
                        definition: { type: Type.STRING, description: "Correct matching definition" },
                        category: { type: Type.STRING },
                      },
                      required: ["id", "term", "definition"],
                    },
                  },
                },
                required: ["gameTitle", "pairs"],
              },
              quiz: {
                type: Type.OBJECT,
                properties: {
                  quizTitle: { type: Type.STRING },
                  questions: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.NUMBER },
                        question: { type: Type.STRING },
                        options: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING },
                        },
                        correctIndex: { type: Type.NUMBER },
                        explanation: { type: Type.STRING },
                      },
                      required: ["id", "question", "options", "correctIndex", "explanation"],
                    },
                  },
                },
                required: ["quizTitle", "questions"],
              },
              visualModel: {
                type: Type.OBJECT,
                properties: {
                  modelType: { type: Type.STRING, description: "cell, solar_system, ecosystem, molecule, geometry" },
                  modelTitle: { type: Type.STRING },
                  description: { type: Type.STRING },
                  parts: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        color: { type: Type.STRING },
                        role: { type: Type.STRING },
                        interestingFact: { type: Type.STRING },
                      },
                      required: ["name", "color", "role"],
                    },
                  },
                },
                required: ["modelType", "modelTitle", "parts"],
              },
              slides: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    slideNumber: { type: Type.NUMBER },
                    slideTitle: { type: Type.STRING },
                    bullets: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    teacherNotes: { type: Type.STRING },
                  },
                  required: ["slideNumber", "slideTitle", "bullets"],
                },
              },
            },
            required: ["title", "subject", "learningGoals", "lessonPlan", "matchingGame", "quiz", "visualModel", "slides"],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response generated from Gemini");
      }

      const parsed = JSON.parse(responseText);
      return res.json({ success: true, data: parsed });
    } catch (err: any) {
      console.error("Gemini generation error:", err);
      return res.status(200).json({
        fallback: true,
        error: err.message || "Generation error",
      });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Darsify server running on http://localhost:${PORT}`);
  });
}

startServer();
