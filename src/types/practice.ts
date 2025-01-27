export interface CardData {
  question: string;
  answer: string;
}

export interface DatabaseRow {
  q: string;
  a: string;
  n?: number;
  id?: number;
}

export interface PracticePageProps {
  title: string;
  bookType: string;
  tableName: "essen" | "psifin" | "habatom" | "generalista";
  bookUrl: string;
}