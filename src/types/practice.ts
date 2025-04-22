
export interface CardData {
  question: string;
  answer: string;
}

export interface DatabaseRow {
  q: string;
  a: string;
  id?: number;
}

export interface PracticePageProps {
  title: string;
  bookType: string;
  tableName: "essen" | "psifin" | "habatom" | "generalista";
  bookUrl: string;
  podcastUrl: string; // <-- Added to fix interface mismatch
}
