'use client';

import { signOut } from 'next-auth/react';

export default function Page() {
  return (
    <>
      <section className='bg-ct-blue-600 min-h-screen pt-20'>
        <div>Dashboard</div>
        <button
          onClick={async () => {
            await signOut();
          }}
        >
          LogOut
        </button>
      </section>
    </>
  );
}
