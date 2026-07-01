import { createContext, useContext, useState } from "react";

const ChatbotContext = createContext(null);

export function ChatbotProvider({ children }) {
  const [pageContext, setPageContext] = useState(null);

  return (
    <ChatbotContext.Provider value={{ pageContext, setPageContext }}>
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbotContext() {
  const context = useContext(ChatbotContext);

  if (!context) {
    throw new Error("useChatbotContext debe usarse dentro de ChatbotProvider");
  }

  return context;
}