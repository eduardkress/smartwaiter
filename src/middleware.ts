import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //Check pathname /pos/dashboard and jwt
  // const token = await getToken({
  //   req: request,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });

  if (request.nextUrl.pathname == '/pos/dashboard') {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      console.log('Dashboard need JWT Token! Redirect to login.');
      return NextResponse.redirect(new URL('/pos/login', request.url));
    }
  }

  //return NextResponse.redirect(new URL("/pos/login", request.url));

  // console.log(request.nextUrl.pathname);
  // console.log(request.nextUrl.searchParams.get("t"));

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/order', '/pos/dashboard'],
};
