export interface OptionalData {
  wordCount: number | null;
  facts: string | null;
  channelName: string | null;
  tone: string | null;
  niche: string | null;
  styleVideos: StyleVideo[] | null;
}

export interface GenerationData extends OptionalData {
  articles: Article[];
  prompt: string | null;
}

export interface Article {
  title: string;
  content: string;
}
export interface Chat {
  id: string;
  userId: string;
  title: string | null;
  createdAt: Date;
  generationData: GenerationData;
  pendingScript: string | null;
  script: string | null;
}

export interface StyleVideo {
  transcript: string;
  videoId: string;
  title: string;
}

export const MessageType = {
  CHUNK: 'chunk',
  METADATA: 'metadata',
  EVENT: 'event',
  ERROR: 'error',
} as const;

export const StreamStatus = {
  STARTED: 'started',
  STREAMING: 'streaming',
  COMPLETED: 'completed',
  ERROR: 'error',
} as const;

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  genres: string[];
  language: string;
  publicationDate: string;
  format: string[];
}
