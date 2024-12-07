"use client"

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="mx-3">
      <h1>Welcome to the Dashboard</h1>
      
      {session ? (
        <div>
          <p>Hello</p>
        </div>
      ) : (
        <p>Please <a href="/login">log in</a> to access the dashboard.</p>
      )}
    </div>
  );
}
