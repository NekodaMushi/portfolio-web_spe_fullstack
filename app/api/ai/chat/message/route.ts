import { chatbotPrompt } from "@/lib/utils/chat/chatbot-prompt";
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/lib/utils/chat/openai-stream";
import { MessageArraySchema } from "@/lib/validators/message"

export async function POST(request: Request) {
  const { messages, max_tokens } = await request.json()
  

  const parsedMessages = MessageArraySchema.parse(messages);


  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
    role: message.isUserMessage ? 'user' : 'system',
    content: message.text,
  }))

  console.log(max_tokens)

  outboundMessages.unshift({
    role: 'system',
    content: chatbotPrompt
  })

  const payload : OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: outboundMessages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: max_tokens,
    stream: true,
    n: 1

  }

  const stream = await OpenAIStream(payload)

  return new Response(stream)
  // console.log("TEST PARSE -----",parsedMessages)
}
