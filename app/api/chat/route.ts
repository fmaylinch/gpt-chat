import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";

export const runtime = 'edge'; // see https://edge-runtime.vercelapp

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(config);

export async function POST(request: Request) {

    const { messages } = await request.json();

    // Doesn't work, says: Module not found: Can't resolve 'crypto'
    //const session = await getServerSession(authOptions);
    //console.log("session", session);

    const response = await openai.createChatCompletion({
        model: 'gpt-4',
        stream: true,
        messages
    });

    const stream = await OpenAIStream(response);

    return new StreamingTextResponse(stream);
}