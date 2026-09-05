import { create } from "zustand";

export interface Take {
  id: string;
  text: string;
  duration: string;
}

export interface ScriptVariation {
  id: string;
  title: string;
  content: string;
  takes: Take[];
}

export interface ClipState {
  currentStep: number;
  briefing: {
    productName: string;
    productUrl?: string;
    productDetails?: string;
    objective?: string;
    tone?: string;
    format: string;
    visualStyle?: string;
    voice?: string;
    videoLength?: number;
    generatedAudioUrl?: string;
    platform: "tiktok" | "reels" | "shorts" | "shopee" | "mercadolivre";
    images: string[];
  };
  scripts: ScriptVariation[];
  selectedScript: number;
  voiceover: {
    voiceId: string;
    voiceName: string;
    audioUrl: string | null;
  };
  visual: {
    type: "ai-generated" | "avatar" | "upload";
    takes: {
      id: string;
      videoUrl: string | null;
      status: "pending" | "generating" | "done";
      thumbnailUrl: string | null;
    }[];
  };
  assembly: {
    music: string | null;
    subtitles: boolean;
    logo: string | null;
    finalVideoUrl: string | null;
  };
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateBriefing: (data: Partial<ClipState["briefing"]>) => void;
  setScripts: (scripts: ScriptVariation[]) => void;
  selectScript: (index: number) => void;
  updateVoiceover: (data: Partial<ClipState["voiceover"]>) => void;
  updateVisual: (data: Partial<ClipState["visual"]>) => void;
  updateAssembly: (data: Partial<ClipState["assembly"]>) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 1,
  briefing: {
    productName: "",
    productUrl: "",
    targetAudience: "",
    tone: "casual" as const,
    platform: "tiktok" as const,
    format: "9:16" as const,
    videoLength: 15,
    images: [],
  },
  scripts: [],
  selectedScript: 0,
  voiceover: {
    voiceId: "",
    voiceName: "",
    audioUrl: null,
  },
  visual: {
    type: "ai-generated" as const,
    takes: [],
  },
  assembly: {
    music: null,
    subtitles: true,
    logo: null,
    finalVideoUrl: null,
  },
};

export const useClipStore = create<ClipState>((set) => ({
  ...initialState,
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 6) })),
  prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),
  updateBriefing: (data) =>
    set((s) => ({ briefing: { ...s.briefing, ...data } })),
  setScripts: (scripts) => set({ scripts }),
  selectScript: (index) => set({ selectedScript: index }),
  updateVoiceover: (data) =>
    set((s) => ({ voiceover: { ...s.voiceover, ...data } })),
  updateVisual: (data) =>
    set((s) => ({ visual: { ...s.visual, ...data } })),
  updateAssembly: (data) =>
    set((s) => ({ assembly: { ...s.assembly, ...data } })),
  reset: () => set(initialState),
}));
