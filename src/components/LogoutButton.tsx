'use client';

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <button className='bg-orange-600 text-white py-2 px-4 rounded-xl flex items-center justify-center' onClick={handleLogout}>
      Logout
    </button>
  );
}