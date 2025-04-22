import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real application, this would fetch from your backend
    // Using localStorage as a mock database for demo purposes
    const results = JSON.parse(localStorage.getItem('pdfResults') || '[]');
    
    // Sort by most recent first
    results.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }
}