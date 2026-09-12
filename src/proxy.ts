import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    //lấy token
    const token = request.cookies.get('admin_token')?.value;
    const { pathname } = request.nextUrl;

    const isLoginPage = pathname === '/login';
    const isAdminRoute = pathname.startsWith('/admin');

    // 2. Auth Guard
    if (isAdminRoute && !isLoginPage && !token) {
        const loginUrl = new URL('/login', request.url);

        // Lưu lại vị trí trang người dùng định vào để redirect lại sau khi login (tùy chọn)
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
    }
    //có token
    if (isLoginPage && token) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};