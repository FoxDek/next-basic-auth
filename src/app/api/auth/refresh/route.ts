import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export interface RefreshPayload {
  userId: string;
  email: string;
}

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get("refresh-token")?.value;

  if (!refreshToken) {
    console.log("Нет refresh-токена");
    return NextResponse.json(
      { message: "Нет refresh-токена" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    ) as RefreshPayload;

    const newAccessToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" }
    );

    const response = NextResponse.json({ message: "Access-токен обновлён"}, {status: 200} );

    response.cookies.set("access-token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "production",
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60,
    });

    return response;


  } catch (err) {
    console.error("Ошибка верификации refresh-токена", err);
    return NextResponse.json(
      { message: "Невалидный refresh-токен" },
      { status: 403 }
    );
  }
}
