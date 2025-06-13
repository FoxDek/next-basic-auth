import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
import { jwtVerify, SignJWT } from "jose";

export interface RefreshPayload {
  userId: string;
  email: string;
}

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access-token")?.value;
  const refreshToken = req.cookies.get("refresh-token")?.value;

  const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
  const refreshSecret = new TextEncoder().encode(
    process.env.JWT_REFRESH_SECRET
  );

  const response = NextResponse.next();

  if (accessToken) {
    try {
      await jwtVerify(accessToken, secret);
      return response;
    } catch (err) {
      console.log("ошибка верификации токена доступа: ", err);
    }
  }

  if (refreshToken) {
    try {
      const { payload } = (await jwtVerify(refreshToken, refreshSecret)) as {
        payload: RefreshPayload;
      };

      const newAccessToken = await new SignJWT({
        userId: payload.userId,
        email: payload.email,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("15m")
        .sign(secret);

      response.cookies.set("access-token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60,
      });

      return response;
    } catch (err) {
      console.log("ошибка верификации refresh-токена: ", err);
    }
  }

  // const url = req.nextUrl.clone();
  // url.pathname = "/login";
  // return NextResponse.redirect(url);

  // const url = req.nextUrl.clone();

  // if (!accessToken && url.pathname === "/profile") {
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }

  // return NextResponse.next();

  // const url = req.nextUrl.clone();
  // url.pathname = "/login";
  // return NextResponse.redirect(url);
}

// export const config = {
//   matcher: ["/profile"],
// };
