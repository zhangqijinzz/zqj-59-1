import { create } from "zustand";
import { getStorage, setStorage, generateId } from "@/utils/storage";
import { getRandomReply, ParentReply } from "@/data/mockMessages";

export type MessageType = "voice" | "drawing";

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: number;
  isFromParent: boolean;
  parentName?: string;
  replyText?: string;
  replyVoice?: string;
  mood?: "happy" | "touched" | "encouraging" | "missing";
}

interface MessengerState {
  messages: Message[];
  isSending: boolean;
  isReceiving: boolean;
  currentReply: ParentReply | null;
  sendMessage: (type: MessageType, content: string) => void;
  simulateReceive: () => void;
  clearCurrentReply: () => void;
}

function loadMessages(): Message[] {
  return getStorage<Message[]>("messenger_messages", []);
}

function saveMessages(messages: Message[]) {
  setStorage("messenger_messages", messages);
}

export const useMessengerStore = create<MessengerState>((set, get) => {
  const messages = loadMessages();

  return {
    messages,
    isSending: false,
    isReceiving: false,
    currentReply: null,

    sendMessage: (type, content) => {
      const newMessage: Message = {
        id: generateId(),
        type,
        content,
        timestamp: Date.now(),
        isFromParent: false,
      };

      const newMessages = [newMessage, ...get().messages];
      set({ messages: newMessages, isSending: true });
      saveMessages(newMessages);

      setTimeout(() => {
        set({ isSending: false, isReceiving: true });

        setTimeout(() => {
          const reply = getRandomReply();
          const parentMessage: Message = {
            id: generateId(),
            type: "voice",
            content: reply.voiceText,
            timestamp: Date.now(),
            isFromParent: true,
            parentName: "妈妈",
            replyText: reply.text,
            replyVoice: reply.voiceText,
            mood: reply.mood,
          };

          const updated = [parentMessage, ...get().messages];
          set({
            messages: updated,
            isReceiving: false,
            currentReply: reply,
          });
          saveMessages(updated);
        }, 2500);
      }, 2000);
    },

    simulateReceive: () => {
      set({ isReceiving: true });
      setTimeout(() => {
        const reply = getRandomReply();
        set({ currentReply: reply, isReceiving: false });
      }, 2000);
    },

    clearCurrentReply: () => {
      set({ currentReply: null });
    },
  };
});
