import { NextResponse } from 'next/server';

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin"',
    },
  });
}

export function middleware(request) {
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return unauthorized();
  }

  const decoded = atob(authHeader.slice(6));
  const [user, pass] = decoded.split(':');
  const expectedUser = process.env.ADMIN_USER || 'cchu';
  const expectedPass = process.env.ADMIN_PASS || 'cnyerliu';

  if (user !== expectedUser || pass !== expectedPass) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
