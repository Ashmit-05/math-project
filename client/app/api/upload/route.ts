import { NextRequest, NextResponse } from 'next/server';

// Mock function to simulate PDF processing
// In a real application, this would send the PDF to your backend for processing
async function processPdf(file: File, name: string) {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock result with the sample response
  return {
    id: Math.random().toString(36).substring(2, 15),
    name,
    score: 85, // Calculate average score from the responses
    createdAt: new Date().toISOString(),
    details: {
      questions: [
        { id: "1a", score: 1, maxScore: 1 },
        { id: "1b", score: 2, maxScore: 2 },
        { id: "1c", score: 2, maxScore: 2 },
        { id: "2", score: 3, maxScore: 3 },
        { id: "3a", score: 2, maxScore: 2 },
        { id: "3b", score: 2, maxScore: 2 },
        { id: "3c", score: 3, maxScore: 3 },
        { id: "4a", score: 2, maxScore: 2 },
        { id: "4b", score: 2, maxScore: 2 },
        { id: "5", score: 3, maxScore: 3 },
        { id: "6a", score: 2, maxScore: 2 },
        { id: "6b", score: 2, maxScore: 2 },
        { id: "6c", score: 3, maxScore: 3 },
        { id: "7", score: 2, maxScore: 2 },
        { id: "8a", score: 2, maxScore: 2 },
        { id: "8b", score: 2, maxScore: 2 },
        { id: "9", score: 2, maxScore: 2 },
        { id: "10", score: 3, maxScore: 3 },
        { id: "11a", score: 2, maxScore: 2 },
        { id: "11b", score: 2, maxScore: 2 },
        { id: "12a", score: 2, maxScore: 2 },
        { id: "12b", score: 3, maxScore: 3 },
        { id: "12c", score: 3, maxScore: 3 },
        { id: "13a", score: 2, maxScore: 2 },
        { id: "13b", score: 4, maxScore: 4 },
        { id: "14", score: 4, maxScore: 4 },
        { id: "15", score: 3, maxScore: 3 },
        { id: "16", score: 2, maxScore: 2 },
        { id: "17", score: 4, maxScore: 4 },
        { id: "18", score: 3, maxScore: 3 },
        { id: "19", score: 3, maxScore: 3 },
        { id: "20a", score: 1, maxScore: 1 },
        { id: "20b", score: 3, maxScore: 3 },
        { id: "21", score: 3, maxScore: 3 },
        { id: "22", score: 2, maxScore: 2 },
        { id: "23", score: 3, maxScore: 3 },
        { id: "24", score: 3, maxScore: 3 },
        { id: "25", score: 4, maxScore: 4 }
      ],
      feedback: "All answers have been evaluated successfully. The student demonstrated good understanding of the concepts with correct solutions for most questions.",
      processingTime: "2.3 seconds"
    }
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: 'No name provided' }, { status: 400 });
    }

    // Process the PDF
    const result = await processPdf(file, name);

    // Save the result to our mock database
    const results = JSON.parse(localStorage.getItem('pdfResults') || '[]');
    results.push(result);
    localStorage.setItem('pdfResults', JSON.stringify(results));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error uploading PDF:', error);
    return NextResponse.json({ error: 'Failed to upload PDF' }, { status: 500 });
  }
}