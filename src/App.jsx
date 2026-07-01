import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import Chatbot from './components/Chatbot';
import { ChatbotProvider } from './context/ChatbotContext';

function App() {
  return (
  <>
    <ChatbotProvider>
      <RouterProvider router={router} />
      <Chatbot />
    </ChatbotProvider> 
  </>
  )
}

export default App;