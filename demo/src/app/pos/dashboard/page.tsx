"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function Page() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen">
      {session && <div>Hello {session.user?.name}</div>}
      <button
        className="py-2 px-4 bg-black text-white hover:cursor-pointer hover:bg-gray-600 rounded-full"
        onClick={() => signOut()}
      >
        Log Out
      </button>
    </main>
  );
}
