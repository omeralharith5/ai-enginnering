import { checkEnvironment } from "./utils.js"
import OpenAI from "openai"

// Initialize the OpenAI client using environment variables
const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
//   dangerouslyAllowBrowser: true means that the OpenAI client can be used in a browser environment, which is not recommended for production due to security concerns. It allows the API key to be exposed in the client-side code, which could lead to unauthorized access and misuse of the API. In a production environment, it's better to keep the API key on the server side and make requests from there to protect sensitive information.
  dangerouslyAllowBrowser: true
})

checkEnvironment();

// Define the prompt for the AI request
// The prompt is a string that contains the instructions or questions you want to ask the AI model.
// completions.create is a method provided by the OpenAI client that allows you to generate text completions based on the given prompt. It takes an object with parameters such as the model to use and the messages to send to the AI model.
const response = await openai.chat.completions.create({
  model: process.env.AI_MODEL,
  messages: [ 
    {
      role: "user",
        //   notes under content: The content of the message is the actual prompt that you want to send to the AI model. In this case, it is a request for gift suggestions for someone who loves hiphop music. The prompt also includes specific instructions to make the suggestions thoughtful and practical, limit the response to under 100 words, and skip any introductions or conclusions.
        // to reduce the token count, you can remove unnecessary words or phrases from the prompt. For example, instead of saying "Suggest some gifts for someone who loves hiphop music. Make these suggestions thoughtful and practical. Your response must be under 100 words. Skip intros and conclusions. Only output gift suggestions.", you could say "Suggest thoughtful and practical gifts for a hiphop music lover in under 100 words. Skip intros and conclusions."
        content: `Suggest some gifts for someone who loves hiphop music. 
  Make these suggestions thoughtful and practical. Your response must be under 100 words. 
  Skip intros and conclusions. Only output gift suggestions.`
    },
    // The max_completion_tokens parameter specifies the maximum number of tokens (words or word pieces) that the AI model can generate in its response. In this case, it is set to 256, which means the model will generate a response that is no longer than 256 tokens. This helps to control the length of the output and ensures that it stays within a reasonable limit.
    // max_completion_tokens: 256, 
  ],
})

// Extract the model's generated text from the response
console.log(response.choices[0].message.content)