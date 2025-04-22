import { PdfResult } from "@/lib/types";

const API_URL = 'http://localhost:8000';

export async function uploadPdf(file: File, name: string): Promise<PdfResult> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', name);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload PDF');
  }

  return response.json();
}

export async function getResults(): Promise<PdfResult[]> {
  const response = await fetch(`${API_URL}/results`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch results');
  }

  const responseData = await response.json();
  
  if (responseData.status !== 200) {
    throw new Error('Server returned an error');
  }
  
  return responseData.data.results;
}

export async function getResultById(id: string): Promise<PdfResult> {
  const response = await fetch(`${API_URL}/results/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Result not found');
    }
    throw new Error('Failed to fetch result');
  }

  const responseData = await response.json();
  
  if (responseData.status !== 200) {
    throw new Error('Server returned an error');
  }
  
  return responseData.data;
}