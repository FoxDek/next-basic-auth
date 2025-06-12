"use server";
import { redirect } from "next/navigation";

export default async function handleSubmitLogin(formData: FormData) {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    {
      method: "POST",
      body: JSON.stringify(rawFormData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    }
  );

  const data = await response.json();


  if (!response.ok) {
    return { error: data.message || "Ошибка входа" };
  }

  // Если регистрация успешна - делаем редирект
  redirect("/");
}