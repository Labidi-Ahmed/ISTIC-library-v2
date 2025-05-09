import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {GenerationData} from '@/types';

interface GenerationDataStore {
  generationData: GenerationData;
  setGenerationData: (partialData: Partial<GenerationData>) => void;
  setValue: <K extends keyof GenerationData>(
    key: K,
    value: GenerationData[K]
  ) => void;
  setPrompt: (prompt: string) => void;
}

export const useGenerationDataStore = create<GenerationDataStore>()(
  persist(
    (set) => ({
      generationData: {
        articles: [],
        wordCount: null,
        facts: null,
        channelName: null,
        tone: null,
        niche: null,
        prompt: null,
        styleVideos: null,
      },

      setGenerationData: (partialData) =>
        set((state) => ({
          generationData: {
            ...state.generationData,
            ...partialData,
          },
        })),

      setValue: (key, value) =>
        set((state) => ({
          generationData: {
            ...state.generationData,
            [key]: value,
          },
        })),

      setPrompt: (prompt: string) =>
        set((state) => ({
          generationData: {
            ...state.generationData,
            prompt: prompt,
          },
        })),
    }),
    {
      name: 'generation-data-storage', // unique name for the storage
      storage: createJSONStorage(() => localStorage), // use localStorage by default
      // Optional: Specify which parts of the state to persist
      // partialize: (state) => ({ generationData: state.generationData }),
    }
  )
);
