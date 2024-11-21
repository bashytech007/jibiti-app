// "use client";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { useSession } from "next-auth/react";

// function getFirstTwoCapitalLetters(str?: string | null) {
//   const match = (str || "").match(/[A-Z]/g);
//   return match ? match.slice(0, 2).join("") : "GT";
// }

// export default function UserButton({
//   onSignIn,
//   onSignOut,
// }: {
//   onSignIn: () => Promise<void>;
//   onSignOut: () => Promise<void>;
// }) {
//   const { data: session, status } = useSession();

//   return (
//     <div>
//       {status === "authenticated" && (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Avatar>
//               <AvatarImage src={session?.user?.image!} />
//               <AvatarFallback>
//                 {getFirstTwoCapitalLetters(session?.user?.name)}
//               </AvatarFallback>
//             </Avatar>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             <DropdownMenuItem
//               onClick={() => {
//                 onSignOut();
//               }}
//             >
//               Sign Out
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )}
//       {status === "unauthenticated" && (
//         <Button onClick={() => onSignIn()}>Sign in</Button>
//       )}
//     </div>
//   );
// }

"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSession } from "next-auth/react";

function getFirstTwoCapitalLetters(str?: string | null) {
  const match = (str || "").match(/[A-Z]/g);
  return match ? match.slice(0, 2).join("") : "GT";
}

export default function UserButton({
  onSignIn,
  onSignOut,
}: {
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
}) {
  const { data: session, status } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {session?.user?.image ? (
              <AvatarImage 
                src={session.user.image} 
                alt={session.user.name || "User profile"} 
              />
            ) : (
              <AvatarFallback>
                {getFirstTwoCapitalLetters(session?.user?.name)}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {status === "authenticated" && (
          <DropdownMenuItem onSelect={(e) => {
            e.preventDefault();
            onSignOut();
          }}>
            Sign Out
          </DropdownMenuItem>
        )}
        {status === "unauthenticated" && (
          <DropdownMenuItem onSelect={(e) => {
            e.preventDefault();
            onSignIn();
          }}>
            Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}