import { checkEnvironment } from "./utils.js"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
  dangerouslyAllowBrowser: true
})

checkEnvironment();
const messages = {
      role: "user",
        content: `Suggest some gifts for someone who loves hiphop music. 
                Make these suggestions thoughtful and practical. Your response must be under 100 words. 
                Skip intros and conclusions. Only output gift suggestions.`
    }
const firstResponse = await openai.chat.completions.create({
  model: process.env.AI_MODEL,
  messages: [ messages ],
})
// push response to messages array to refine the prompt and make a second request to the AI model
messages.push(firstResponse.choices[0].message)
// the second request to the AI model is to refine the prompt and make the suggestions more budget friendly and under $40. The response must be under 100 words and skip intros and conclusions. Only output gift suggestions.
messages.push(
   {
      role: "user",
        content: `suggestions to be more budget friendly and under $40.
                  Your response must be under 100 words. Skip intros and conclusions. 
                  Only output gift suggestions.`
    }
)

// make a second request to the AI model with the refined prompt
// The second request to the AI model is to refine the prompt and make the suggestions more budget friendly and under $40. The response must be under 100 words and skip intros and conclusions. Only output gift suggestions.
// messages is an array that contains the messages to be sent to the AI model. The first message is the original prompt, and the second message is the refined prompt that asks for budget-friendly suggestions under $40. The AI model will generate a response based on these messages, and the response will be logged to the console.
const secondResponse = await openai.chat.completions.create({
  model: process.env.AI_MODEL,
  messages: [ messages ],
})

console.log(secondResponse.choices[0].message.content)