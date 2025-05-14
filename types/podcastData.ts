export type Chapter = {
  timestamp: string; // "MM:SS" or "HH:MM:SS" format
  title: string;
  startTime: number; // seconds
}

export type ShowNote = {
  title: string;
  url?: string;
}

export type PodcastData = {
  id: string;
  title: string;
  date: string;
  author: string;
  audioUrl: string;
  duration: number; // seconds
  showNotes: ShowNote[];
  chapters: Chapter[];
  transcriptUrl?: string;
}
