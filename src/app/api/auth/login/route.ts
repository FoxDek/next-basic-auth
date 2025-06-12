import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/User";
import { connectDB } from "../../../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Введите email и пароль" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Пользователь не найден" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Неправильный пароль" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "10m" }
    );

    const response = NextResponse.json(
      { message: "Успешный вход" },
      { status: 200 }
    );

    // const cookieStore = await cookies();
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "production",
      sameSite: "strict",
      path: "/",
      maxAge: 10 * 60,
    });

    return response;

  } catch (err) {
    console.error("Error in login route:", err);
    return NextResponse.json(
      { message: "Произошла ошибка при входе" },
      { status: 500 }
    );
  }
}
