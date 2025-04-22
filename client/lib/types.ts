export interface QuestionResult {
  id: string;
  score: number;
  maxScore: number;
}

export interface PdfResultDetails {
  questions: QuestionResult[];
  feedback: string;
  processingTime: string;
}

export interface PdfResult {
  id: string;
  name: string;
  pdf_url: string;
  actual_score: number;
  evaluations: Record<string, any>;
  createdAt: string;
}