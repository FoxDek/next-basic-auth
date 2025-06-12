// 'use client';
import Link from "next/link";
import { getUserFromToken } from "../../lib/auth";
import LogoutButton from "@/components/LogoutButton";
// import { useEffect, useState } from "react";

export default async function Page() {
  const user = await getUserFromToken();
  const isAuth = user ? true : false;

  // const [isAuth, setIsAuth] = useState(false);

  // useEffect(() => {
  //   async function checkAuth() {
  //     console.log(isAuth)
  //     const auth = await getUserFromToken();
  //     console.log(auth)

  //     if (!auth) return;
  //     setIsAuth(true);
  //   }
  //   checkAuth();
  // }, []);

  return (
    <section className='flex flex-col justify-center items-center py-10 gap-5'>
      <div className='border p-5 rounded-xl flex flex-col gap-5'>
        <p className=''>
          auth status:{" "}
          <span
            className={`font-bold ${
              isAuth ? "text-green-500" : "text-red-500"
            }`}
          >
            {isAuth ? "authorized" : "unauthorized"}
          </span>
        </p>
      </div>

      <div className='border p-5 rounded-xl flex flex-col gap-5'>
        <Link
          href='/register'
          className='bg-gray-700 text-white py-2 px-4 rounded-xl flex items-center justify-center'
        >
          registration
        </Link>
        <Link
          href='/login'
          className='bg-gray-700 text-white py-2 px-4 rounded-xl flex items-center justify-center'
        >
          log in
        </Link>
      </div>

      <div className='border p-5 rounded-xl flex flex-col gap-5'>
        <Link
          href='/profile'
          className={`bg-gray-700 text-white py-2 px-4 rounded-xl flex items-center justify-center ${
            isAuth ? "" : "pointer-events-none opacity-50"
          }`}
        >
          profile
        </Link>
      </div>

      {isAuth && <LogoutButton />}
    </section>
  );
}
