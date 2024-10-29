import {
    GoogleGenerativeAI,
  } from "@google/generative-ai";
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API key for Google Generative AI is missing.");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
      ],
    });

    export async function sendMessageToGemini(query: string) {
      try {
          const result = await chatSession.sendMessage(query);
          console.log(result)
          return result.response?.candidates?.[0].content.parts[0].text || "Respuesta de Gemini";
      } catch (error) {
          console.error("Error al enviar mensaje a Gemini:", error);
          throw new Error("Error al procesar la consulta en Gemini");
      }
  }

  