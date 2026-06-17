import { create } from "zustand";
import { getStoryById, getStoryNode, StoryNode } from "@/data/mockStories";

interface SafetyState {
  currentStoryId: string | null;
  currentNodeId: string | null;
  isTyping: boolean;
  displayedText: string;
  history: string[];
  completedStories: string[];
  startStory: (storyId: string) => void;
  goToNode: (nodeId: string) => void;
  chooseOption: (nextNodeId: string) => void;
  restartStory: () => void;
  exitStory: () => void;
}

export const useSafetyStore = create<SafetyState>((set, get) => ({
  currentStoryId: null,
  currentNodeId: null,
  isTyping: false,
  displayedText: "",
  history: [],
  completedStories: [],

  startStory: (storyId) => {
    const story = getStoryById(storyId);
    if (!story) return;

    const startNode = story.nodes.find((n) => n.id === "start");
    if (!startNode) return;

    set({
      currentStoryId: storyId,
      currentNodeId: "start",
      history: ["start"],
      isTyping: true,
      displayedText: "",
    });

    typeText(startNode.text);
  },

  goToNode: (nodeId) => {
    const story = getStoryById(get().currentStoryId!);
    if (!story) return;

    const node = getStoryNode(story, nodeId);
    if (!node) return;

    set({
      currentNodeId: nodeId,
      history: [...get().history, nodeId],
      isTyping: true,
      displayedText: "",
    });

    typeText(node.text);
  },

  chooseOption: (nextNodeId) => {
    get().goToNode(nextNodeId);
  },

  restartStory: () => {
    const storyId = get().currentStoryId;
    if (!storyId) return;
    get().startStory(storyId);
  },

  exitStory: () => {
    set({
      currentStoryId: null,
      currentNodeId: null,
      isTyping: false,
      displayedText: "",
      history: [],
    });
  },
}));

function typeText(text: string) {
  let index = 0;
  const speed = 40;

  const timer = setInterval(() => {
    const state = useSafetyStore.getState();
    if (!state.isTyping) {
      clearInterval(timer);
      return;
    }

    index += 1;
    if (index >= text.length) {
      useSafetyStore.setState({ displayedText: text, isTyping: false });
      clearInterval(timer);
    } else {
      useSafetyStore.setState({ displayedText: text.substring(0, index) });
    }
  }, speed);
}

export function getCurrentNode(): StoryNode | null {
  const state = useSafetyStore.getState();
  if (!state.currentStoryId || !state.currentNodeId) return null;

  const story = getStoryById(state.currentStoryId);
  if (!story) return null;

  return getStoryNode(story, state.currentNodeId) || null;
}
