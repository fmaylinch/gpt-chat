"use client";

import ChatComponent from "@/components/chatComponent"
import { useSession } from "next-auth/react"

export default function Home() {

  // This works if I put the SessionProvider in layout.tsx
  // Anyway, the session has this value:
  // { data: undefined, status: 'loading', update: [Function: update] }
  const session = useSession();
  console.log("session-info", session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='bg-slate-800 p-3 w-[800px] rounded-md text-gray-300'>
        <h2 className='text-2xl'>GPT-4 Streaming Chat App</h2>
        <ChatComponent/>
      </div>
    </main>
  )
}
