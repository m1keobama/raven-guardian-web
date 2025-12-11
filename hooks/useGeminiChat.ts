import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message, Sender } from '../types';
import { SYSTEM_INSTRUCTION, INITIAL_MESSAGE_TEXT } from '../constants';

// WICHTIG: Damit TypeScript beim Build auf Netlify weiß, dass process.env existiert.
declare const process: {
  env: {
    API_KEY: string;
  }
};

export const useGeminiChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      text: INITIAL_MESSAGE_TEXT,
      sender: Sender.BOT,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Use a ref to store the Chat session to persist across renders without re-initializing unnecessarily
  const chatSessionRef = useRef<Chat | null>(null);

  // Initialize the chat session once
  useEffect(() => {
    // Safety check for API Key
    if (!process.env.API_KEY) {
      console.error("API Key is missing. Chat functionality will not work.");
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatSessionRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7, // Balance between creativity and accuracy
        },
      });
    } catch (error) {
      console.error("Failed to initialize Gemini chat:", error);
    }
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: Sender.USER,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
        throw new Error("Chat session not initialized. Missing API Key?");
      }

      // We use streaming for a better UX, handling chunks as they arrive
      const result = await chatSessionRef.current.sendMessageStream({ message: text });
      
      const botMessageId = (Date.now() + 1).toString();
      let fullResponseText = "";

      // Create a placeholder bot message
      setMessages((prev) => [
        ...prev,
        {
          id: botMessageId,
          text: "", // Start empty
          sender: Sender.BOT,
          timestamp: new Date(),
        },
      ]);

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        const chunkText = c.text;
        
        if (chunkText) {
          fullResponseText += chunkText;
          
          // Update the specific bot message with accumulated text
          setMessages((prev) => 
            prev.map((msg) => 
              msg.id === botMessageId 
                ? { ...msg, text: fullResponseText } 
                : msg
            )
          );
        }
      }

    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Entschuldigung, es gab ein technisches Problem. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.",
          sender: Sender.BOT,
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
  };
};