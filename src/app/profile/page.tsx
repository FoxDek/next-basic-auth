'use client';

import { useEffect, useState } from "react";

interface UserData {
  user: {
    email: string;
    // добавьте другие поля, которые ожидаете получить
  };
}

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const data = await fetch('http://localhost:3000/api/profile')
      const user = await data.json()
      setUserData(user);
    }

    checkAuth();
  }, []);
  
  // const data = await fetch('http://localhost:3000/api/profile')
  // const user = await data.json()
  // console.log(user)

  return (
    <div>
      <h1>Profile</h1>

      {userData && (
        <div>
          <p>Email: {userData.user.email}</p>
        </div>
      )}
    </div>
  );
}