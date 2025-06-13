"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
// import handleSubmitLogin from "./action";

export default function Page() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  async function handleFormSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const rawFormData = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(rawFormData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Ошибка входа");
        return;
      }

      console.log(data.message);
      // redirect("/");
      router.push("/");
    } catch (err) {
      console.log("ошибка входа: ", err);
      setErrorMessage("An error occurred while logining.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center py-10 gap-5'>
      <h1 className='text-2xl'>Login</h1>
      <form action={handleFormSubmit} className='flex flex-col gap-5 '>
        <input
          type='text'
          name='email'
          placeholder='email'
          className='p-1 border rounded'
          required
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          className='p-1 border rounded'
          required
        />

        {errorMessage && (
          <div className='text-red-500 text-sm p-2 bg-red-50 rounded'>
            {errorMessage}
          </div>
        )}

        <button
          type='submit'
          className={`p-2 rounded ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-700 text-white"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
