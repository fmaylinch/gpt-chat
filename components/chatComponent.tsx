"use client"
import { useChat, Message } from "ai/react"
import { ReactNode } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';

export default function ChatComponent() {

    // Vercel AI SDK
    const { input, handleInputChange, handleSubmit, messages } = useChat();

    //console.log("messages", messages);

    return (
        <div>
            {messages.map(message => {
                return (
                    <div key={message.id}>
                        <h3 className="text-lg font-semibold mt-2">{message.role}</h3>
                        <div>{parseContent(message.content)}</div>
                    </div>
                )
            })}

            <form className="mt-10" onSubmit={handleSubmit}>
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

function parseContent(text: string) : Array<ReactNode> {
    const lines = text.split('\n');
    return stringsToDomElems(lines);
}

function stringsToDomElems(strings: Array<string>) {
    //console.log(strings);
    let result : Array<ReactNode> = [];
    let code : string | undefined = undefined;
    let lang : string | undefined = undefined;
    const orderedListRegex = /^([0-9]+)\./;
    strings.forEach(str => {
      if (str.startsWith('```')) {
        if (code == undefined) {
          //console.log("Starting code");
          code = ""; // start code block
          lang = str.substring(3);
        } else {
          //console.log("Finishing code:\n" + code);
          result.push(<SyntaxHighlighter language={lang}>{code}</SyntaxHighlighter>)
          code = undefined; // finish code block
          lang = undefined;
        }
      } else {
        if (code == undefined) {
          // TODO - use some Markdown to HTML utility
          if (str.startsWith('- ')) {
            result.push(<li>{str.substring(2)}</li>);
          } else {
            result.push(<p>{str}</p>);
          }
        } else {
          code += str + "\n"; // building code block
        }
      }
    })
    if (code != undefined) { // code pending to be closed
        result.push(<SyntaxHighlighter language={lang}>{code}</SyntaxHighlighter>)
    }
    return result.map((x, i) => (<div key={i}>{x}</div>));
  }
