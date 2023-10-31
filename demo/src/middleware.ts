import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

async function getOrderData(orderId: string) {
  if (orderId == "1234") {
    return {
      isActive: false,
    };
  } else if (orderId == "5678") {
    return {
      isActive: true,
    };
  }
  return null;
}
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //Check pathname /pos/dashboard and jwt
  if (request.nextUrl.pathname == "/pos/dashboard") {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      return NextResponse.redirect(new URL("/pos/login", request.url));
    }
  }
  //Check if pathname /order
  else if (request.nextUrl.pathname == "/order") {
    //Check if query param t exists and if it is valid, otherwise redirect to error page
    const orderId = request.nextUrl.searchParams.get("t");
    if (!orderId) {
      return NextResponse.redirect(new URL("/order/error", request.url));
    }

    const orderData = await getOrderData(orderId);
    if (orderData) {
      if (!orderData.isActive) {
        return NextResponse.redirect(new URL("/order/invoice", request.url));
      }
    } else {
      // OrderData is null
      return NextResponse.redirect(new URL("/order/error", request.url));
    }
  }

  //return NextResponse.redirect(new URL("/pos/login", request.url));

  // console.log(request.nextUrl.pathname);
  // console.log(request.nextUrl.searchParams.get("t"));

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/api/:path*", "/order/:path*", "/pos/:path*"],
// };
