import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authCookie = request.cookies.get('auth-token')?.value;
  const isProtected = pathname.startsWith('/agent') || pathname.startsWith('/admin');

  if (isProtected && !authCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/agent/:path*', '/admin/:path*'],
};
