import { NextResponse } from "next/server";
import { getUserFromToken } from "../../../../lib/auth";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";

export async function GET() {
  const userData = await getUserFromToken();

  if (!userData) {
    return NextResponse.json({ message: "Неавторизован" }, { status: 401 });
  }

  await connectDB();

  const user = await User.findById(userData.userId).select("-password"); 

  if (!user) {
    return NextResponse.json(
      { message: "Пользователь не найден" },
      { status: 404 }
    );
  }

  return NextResponse.json({ user });
}
