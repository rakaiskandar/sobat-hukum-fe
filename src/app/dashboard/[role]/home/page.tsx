"use client"

import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="mx-3">
      <h1>Welcome to the Dashboard</h1>
      
      {session ? (
        <div>
          <p>Hello, {session.user?.username}</p>
        </div>
      ) : (
        <p>Please <a href="/login">log in</a> to access the dashboard.</p>
      )}
    </div>
  );
}
