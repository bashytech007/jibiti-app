// import { redirect, notFound } from "next/navigation";
// import { auth as getServerSession } from "@/auth";

// import Chat from "@/app/components/Chat";

// import { getChat } from "@/app/db";

// export const dynamic = "force-dynamic";

// export default async function ChatDetail({
//   params: { chatId },
// }: {
//   params: { chatId: string };
// }) {
//   const chat = await getChat(+chatId);
//   if (!chat) {
//     return notFound();
//   }

//   const session = await getServerSession();
//   if (!session || chat?.user_email !== session?.user?.email) {
//     return redirect("/");
//   }

//   return (
//     <main className="pt-5">
//       <Chat id={+chatId} messages={chat?.messages || []} key={chatId} />
//     </main>
//   );
// }
import { Metadata } from 'next';
import { redirect, notFound } from "next/navigation";
import { auth as getServerSession } from "@/auth";

// Define params as a Promise
type ChatParams = Promise<{
  chatId: string;
}>

// Page props now use Promise params
type PageProps = {
  params: ChatParams;
}

async function getChat(chatId: number) {
  // Replace with your actual implementation
  return {
    id: chatId,
    user_email: 'example@email.com',
    messages: ['Hello', 'World']
  };
}

// Metadata generation
export async function generateMetadata({ 
  params 
}: { 
  params: ChatParams 
}): Promise<Metadata> {
  // Await the params
  const resolvedParams = await params;
  const chat = await getChat(Number(resolvedParams.chatId));
  
  return {
    title: chat ? `Chat ${resolvedParams.chatId}` : 'Chat Not Found'
  };
}

// Main page component
export default async function ChatDetail({ 
  params 
}: PageProps) {
  // Await the params
  const resolvedParams = await params;

  // Explicit type conversion and error handling
  const chatId = Number(resolvedParams.chatId);

  // Fetch chat
  const chat = await getChat(chatId);

  // Not found handling
  if (!chat) {
    return notFound();
  }

  // Authentication
  const session = await getServerSession();
  if (!session || chat?.user_email !== session?.user?.email) {
    return redirect("/");
  }

  // Render chat
  return (
    <main className="pt-5">
      <div>
        <h1>Chat ID: {chatId}</h1>
        <ul>
          {(chat?.messages || []).map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

// Ensure dynamic rendering
export const dynamic = "force-dynamic";