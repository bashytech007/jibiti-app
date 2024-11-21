// "use server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// export async function getCompletion(
//   messageHistory: {
//     role: "user" | "assistant";
//     content: string;
//   }[]
// ) {
//   const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: messageHistory,
//   });

//   const messages = [
//     ...messageHistory,
//     response.choices[0].message as unknown as {
//       role: "user" | "assistant";
//       content: string;
//     },
//   ];

//   return {
//     messages,
//   };
// }

// "use server";
// import { HfInference } from "@huggingface/inference";

// // Initialize Hugging Face Inference
// const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// export async function getCompletion(
//   messageHistory: {
//     role: "user" | "assistant";
//     content: string;
//   }[]
// ) {
//   try {
//     // Combine message history into a single prompt
//     const lastUserMessage = messageHistory
//       .filter(msg => msg.role === "user")
//       .pop()?.content || '';

//     // Convert message history to a conversation-like prompt
//     const conversationPrompt = messageHistory
//       .map(msg => `${msg.role === 'user' ? 'Human:' : 'Assistant:'} ${msg.content}`)
//       .join('\n') + `\nAssistant:`;

//     // Use text generation inference
//     const response = await hf.textGeneration({
//       model: 'mistralai/Mistral-7B-Instruct-v0.2',
//       inputs: conversationPrompt,
//       parameters: {
//         max_new_tokens: 250,
//         temperature: 0.7,
//         return_full_text: false
//       }
//     });

//     // Construct the response in a similar format to OpenAI
//     const newMessage = {
//       role: "assistant",
//       content: response.generated_text?.trim() || ''
//     };

//     const messages = [
//       ...messageHistory,
//       newMessage
//     ];

//     return { messages };
//   } catch (error) {
//     console.error('Hugging Face API Error:', error);
//     throw error;
//   }
// }
"use server";
import { HfInference } from "@huggingface/inference";

// Initialize Hugging Face Inference
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY!);

// Define types for better type safety
type Message = {
  role: "user" | "assistant";
  content: string;
};

export async function getCompletion(
  messageHistory: Message[]
): Promise<{ messages: Message[] }> {
  try {
    // Convert message history to a conversation-like prompt
    const conversationPrompt = messageHistory
      .map(msg => `${msg.role === 'user' ? 'Human:' : 'Assistant:'} ${msg.content}`)
      .join('\n') + `\nAssistant:`;

    // Use text generation inference
    const response = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: conversationPrompt,
      parameters: {
        max_new_tokens: 250,
        temperature: 0.7,
        return_full_text: false
      }
    });

    // Validate response
    if (!response.generated_text) {
      throw new Error('No response generated from Hugging Face API');
    }

    // Construct the response in a similar format to OpenAI
    const newMessage: Message = {
      role: "assistant",
      content: response.generated_text.trim()
    };

    const messages = [
      ...messageHistory,
      newMessage
    ];

    return { messages };
  } catch (error) {
    console.error('Hugging Face API Error:', error);
    
    // Optionally, you can customize error handling
    throw new Error(
      error instanceof Error 
        ? `API Error: ${error.message}` 
        : 'An unknown error occurred during text generation'
    );
  }
}