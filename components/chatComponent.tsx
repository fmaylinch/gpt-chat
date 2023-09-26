"use client"
import { useChat, Message } from "ai/react"

export default function ChatComponent() {

    // Vercel AI SDK
    const { input, handleInputChange, handleSubmit, messages } = useChat();

    console.log(messages);

    return (
        <div>
            {messages.map(message => {
                return (
                    <div key={message.id}>
                        <h3 className="text-lg font-semibold mt-2">{message.role}</h3>
                        <p>{message.content}</p>
                    </div>
                )
            })}

            <form className="mt-12" onSubmit={handleSubmit}>
                <p>User message</p>
                <textarea
                    value={input}
                    onChange={handleInputChange}
                    className="mt-2 w-full bg-slate-600 p-2"
                    placeholder="Write your question"
                />
                <button className="rounded-md bg-blue-600 p-2 mt-2">
                    Send message
                </button>
            </form>

            <button
                className="rounded-md bg-red-600 p-2 mt-12"
                onClick={() => open("api/auth/signout")}>
                Sign out
            </button>
        </div>
    )
}