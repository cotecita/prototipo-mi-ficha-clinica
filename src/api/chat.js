// import { GoogleGenAI } from "@google/genai";



// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Método no permitido" });
//   }

//   try {
//     const { messages } = req.body;

//     if (!Array.isArray(messages)) {
//       return res.status(400).json({ error: "Formato inválido" });
//     }

//     const transcript = messages
//       .map((msg) => {
//         const role = msg.role === "user" ? "Usuario" : "Asistente";
//         return `${role}: ${msg.content}`;
//       })
//       .join("\n");

//     const interaction = await ai.interactions.create({
//       model: "gemini-3.5-flash",
//       system_instruction:
//         "Eres un chatbot útil dentro de una app web. Responde de forma clara, breve y en español.",
//       input: `
// Esta es la conversación hasta ahora:

// ${transcript}

// Responde solo como Asistente.
//       `,
//     });

//     return res.status(200).json({
//       reply: interaction.output_text,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       error: "Error generando respuesta con Gemini",
//     });
//   }
// }