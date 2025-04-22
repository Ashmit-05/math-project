import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // In a real application, this would fetch from your backend
    // Using localStorage as a mock database for demo purposes
    const results = JSON.parse(localStorage.getItem('pdfResults') || '[]');
    const result = results.find((r: any) => r.id === id);
    
    if (!result) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching result:', error);
    return NextResponse.json({ error: 'Failed to fetch result' }, { status: 500 });
  }
}