// "use client";
// import { useState } from "react";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// import { getCompletion } from "../server-actions/getCompletion";

// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// export default function Chat() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [message, setMessage] = useState("");

//   const onClick = async () => {
//     const completions = await getCompletion([
//       ...messages,
//       {
//         role: "user",
//         content: message,
//       },
//     ]);
//     setMessage("");
//     setMessages(completions.messages);
//   };

//   return (
//     <div className="flex flex-col">
//       {messages.map((message, i) => (
//         <div
//           key={i}
//           className={`mb-5 flex flex-col ${
//             message.role === "user" ? "items-end" : "items-start"
//           }`}
//         >
//           <div
//             className={`${
//               message.role === "user" ? "bg-blue-500" : "bg-gray-500 text-black"
//             } rounded-md py-2 px-8`}
//           >
//             {message.content}
//           </div>
//         </div>
//       ))}
//       <div className="flex border-t-2 border-t-gray-500 pt-3 mt-3">
//         <Input
//           className="flex-grow text-xl"
//           placeholder="Question"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyUp={(e) => {
//             if (e.key === "Enter") {
//               onClick();
//             }
//           }}
//         />
//         <Button onClick={onClick} className="ml-3 text-xl">
//           Send
//         </Button>
//       </div>
//     </div>
//   );
// }

// "use server";
// import { HfInference } from "@huggingface/inference";

// // Define the Message type to match your interface
// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

// // Initialize Hugging Face Inference
// const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// export default async function getCompletion(
//   messageHistory: Message[]
// ) {
//   try {
//     // Ensure messageHistory is an array
//     const safeMessageHistory = Array.isArray(messageHistory) 
//       ? messageHistory 
//       : [];

//     // Defensive method to get the last user message
//     let lastUserMessage = '';
//     for (let i = safeMessageHistory.length - 1; i >= 0; i--) {
//       if (safeMessageHistory[i]?.role === "user") {
//         lastUserMessage = safeMessageHistory[i].content;
//         break;
//       }
//     }

//     // Convert message history to a conversation-like prompt
//     const conversationPrompt = safeMessageHistory
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

//     // Construct the response with the exact type
//     const newMessage: Message = {
//       role: "assistant",
//       content: response.generated_text?.trim() || ''
//     };

//     const messages: Message[] = [
//       ...safeMessageHistory,
//       newMessage
//     ];

//     return { messages };
//   } catch (error) {
//     console.error('Hugging Face API Error:', error);
//     throw new Error(`Completion error: ${error instanceof Error ? error.message : 'Unknown error'}`);
//   }
// }
"use client";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { getCompletion } from "../server-actions/getCompletion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const onClick = async () => {
    // Create a new user message
    const userMessage: Message = {
      role: "user",
      content: message
    };

    // Create a new messages array with the user message
    const updatedMessages = [...messages, userMessage];

    try {
      // Call getCompletion and destructure the messages directly
      const { messages: completionMessages } = await getCompletion(updatedMessages);
      
      // Update messages with the returned messages
      setMessages(completionMessages);
      
      // Clear the input
      setMessage("");
    } catch (error) {
      console.error("Completion error:", error);
      // Optionally handle the error (e.g., show an error message)
    }
  };

  return (
    <div className="flex flex-col">
      {messages.map((message, i) => (
        <div
          key={i}
          className={`mb-5 flex flex-col ${
            message.role === "user" ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`${
              message.role === "user" ? "bg-blue-500" : "bg-gray-500 text-black"
            } rounded-md py-2 px-8`}
          >
            {message.content}
          </div>
        </div>
      ))}
      <div className="flex border-t-2 border-t-gray-500 pt-3 mt-3">
        <Input
          className="flex-grow text-xl"
          placeholder="Question"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onClick();
            }
          }}
        />
        <Button onClick={onClick} className="ml-3 text-xl">
          Send
        </Button>
      </div>
    </div>
  );
}