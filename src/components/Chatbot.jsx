import { useState } from "react";
import { useChatbotContext } from "../context/ChatbotContext";
import { useEffect } from "react";

const GEMINI_API_KEY = "PON_AQUI_TU_NUEVA_API_KEY";

export default function Chatbot() {
const { pageContext } = useChatbotContext();

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hola, soy tu asistente de salud. ¿En qué puedo ayudarte?",
    },
  ]);

  useEffect(() => {
    console.log("Contexto actualizado del chatbot:", pageContext);
  }, [pageContext]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();

    const screenContext = pageContext
        ? JSON.stringify(pageContext, null, 2)  
        : "No hay contexto específico de pantalla disponible.";

    const text = input.trim();
    if (!text || loading) return;

    const userMessage = {
      role: "user",
      content: text,
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const transcript = nextMessages
        .map((msg) => {
          if (msg.role === "user") {
            return `Usuario: ${msg.content}`;
          }

          return `Asistente: ${msg.content}`;
        })
        .join("\n");

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": "AQ.Ab8RN6KJ_0Z-OL2tsskSIj6NQygFZhZnu_LdtqLk2tnTZjlReA",
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [
                {
                  text: `
Eres un asistente de salud dentro de una app para ver historial médico. Proporciona orientación general y clara, pero no hagas diagnósticos definitivos ni reemplaces a un médico. Responde en español.

Reglas:
- Responde en español.
- Da orientación general, clara y breve.
- No diagnostiques de forma definitiva.
- No reemplaces a un médico.
                  `.trim(),
                },
              ],
            },
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `
Información visible en la pantalla actual:
${screenContext}

                    Esta es la conversación hasta ahora:

${transcript}

Responde el último mensaje del usuario como asistente, considera la información de la pantalla si es necesaria o ayuda a responder.
                    `.trim(),
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      console.log("Respuesta cruda de Gemini:", data);

      if (!response.ok) {
        throw new Error(data.error?.message || "Error en Gemini");
      }

      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No recibí una respuesta válida de Gemini.";

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (error) {
      console.error("Error conectando con Gemini:", error);

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: `Error: ${error.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>
            <div>
              <h3 style={styles.title}>Asistente de Salud</h3>
              <p style={styles.subtitle}>
                Respuesta rápida y orientación general
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={styles.closeButton}
              aria-label="Cerrar chatbot"
            >
              ×
            </button>
          </div>

          <div style={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  ...(msg.role === "user"
                    ? styles.userMessage
                    : styles.assistantMessage),
                }}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div style={{ ...styles.message, ...styles.assistantMessage }}>
                Escribiendo...
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} style={styles.form}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta..."
              style={styles.input}
            />

            <button type="submit" disabled={loading} style={styles.sendButton}>
              Enviar
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.floatingButton}
        aria-label="Abrir chatbot"
      >
        {isOpen ? (
          <span style={styles.floatingIcon}>×</span>
        ) : (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 5.5C4 4.12 5.12 3 6.5 3H17.5C18.88 3 20 4.12 20 5.5V13.5C20 14.88 18.88 16 17.5 16H9L4 20V5.5Z"
              fill="white"
            />
          </svg>
        )}
      </button>
    </>
  );
}

const styles = {
  floatingButton: {
    position: "fixed",
    right: "24px",
    bottom: "24px",
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    border: "none",
    background: "linear-gradient(135deg, #14b8a6, #0f766e)",
    boxShadow: "0 12px 30px rgba(15, 118, 110, 0.35)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },

  floatingIcon: {
    color: "white",
    fontSize: "34px",
    lineHeight: "1",
  },

  chatWindow: {
    position: "fixed",
    right: "24px",
    bottom: "100px",
    width: "380px",
    maxWidth: "calc(100vw - 32px)",
    height: "560px",
    maxHeight: "calc(100vh - 130px)",
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.18)",
    border: "1px solid #e2e8f0",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    zIndex: 9999,
  },

  header: {
    padding: "18px 20px",
    background: "linear-gradient(135deg, #0f766e, #14b8a6)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    margin: 0,
    fontSize: "17px",
    fontWeight: 700,
  },

  subtitle: {
    margin: "4px 0 0 0",
    fontSize: "12px",
    opacity: 0.9,
  },

  closeButton: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "rgba(255,255,255,0.18)",
    color: "white",
    fontSize: "24px",
    lineHeight: "1",
    cursor: "pointer",
  },

  messages: {
    flex: 1,
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
    backgroundColor: "#f8fafc",
  },

  message: {
    maxWidth: "82%",
    padding: "11px 14px",
    borderRadius: "16px",
    fontSize: "14px",
    lineHeight: "1.45",
    whiteSpace: "pre-wrap",
  },

  assistantMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    border: "1px solid #e2e8f0",
    borderBottomLeftRadius: "6px",
  },

  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#ccfbf1",
    color: "#134e4a",
    borderBottomRightRadius: "6px",
  },

  form: {
    display: "flex",
    gap: "8px",
    padding: "14px",
    borderTop: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
  },

  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: "999px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "14px",
    backgroundColor: "#f8fafc",
  },

  sendButton: {
    padding: "0 18px",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#0f766e",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
  },
};