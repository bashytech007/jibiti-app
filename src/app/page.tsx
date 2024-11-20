// import Image from "next/image";
import { auth as getServerSession } from "@/auth";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Chat from "./components/Chat"
export default async function Home() {
  const session=await getServerSession();
  return (
   <main className="p-5">
    <h1 className="text-4xl font-bold">Welcome to jibiti chat</h1>
    {!session?.user?.email&&<div>You nedd to log in to use this chatbot</div>}
      {session?.user?.email&&(
        <>
        <Separator className="my-5"/>
      <Chat/>
        </>
      )
      
    }
   </main>
  );
}
