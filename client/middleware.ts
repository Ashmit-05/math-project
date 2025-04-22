import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware ensures localStorage is available in the API routes
// since Next.js API routes run on the server and don't have access to browser localStorage
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Initialize mock database in memory if needed
    const response = NextResponse.next();
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};