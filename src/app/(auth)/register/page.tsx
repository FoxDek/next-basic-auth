'use client';

import { useState } from "react";
import handleSubmitRegistration from "./action";

export default function Page() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleFormSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await handleSubmitRegistration(formData);

      if (result?.error) {
        setErrorMessage(result.error);
      } else if (result?.message) {
        setErrorMessage(result.message);
      }

    } catch (error) {
      setErrorMessage("An error occurred while registering.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 gap-5">
      <h1 className="text-2xl">Registration</h1>
      <form action={handleFormSubmit} className="flex flex-col gap-5 ">
        <input type="text" name="email" placeholder="email" className="p-1 border rounded" required/>
        <input type="password" name="password" placeholder="password" className="p-1 border rounded" required/>

        {errorMessage && <div className="text-red-500 text-sm p-2 bg-red-50 rounded">{errorMessage}</div>}

        <button type="submit" className={`p-2 rounded ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-700 text-white'}`}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}