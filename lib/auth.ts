'use server';
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export interface AuthPayload {
  userId: string;
  email: string;
}

export async function getUserFromToken(): Promise<AuthPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.log('Токена нет')
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
    return decoded;
  } catch (err) {
    console.error("Ошибка верификации JWT: ", err);
    return null;
  }
}


