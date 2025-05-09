import {GenerationData} from './zodSchemas';

export interface FormData {
  articles: Article[];
  wordCount: number;
  userOpinion: string;
  facts: string;
  channelName: string;
  tone: string;
  niche: string;
}
export interface Article {
  title: string;
  content: string;
}
// Structure for the queued job
export interface ScriptGenerationJob {
  userId: string;
  generationData: GenerationData;
  chatId: string;

  requestId: string; //  the client socket id to stream back the response
}
