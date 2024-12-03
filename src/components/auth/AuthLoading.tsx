"use client";
import { useSession } from "next-auth/react";
import * as React from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const HOME_ROUTE = "/";

const AuthLoading = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      push(HOME_ROUTE);
    },
  });

  const isUser = !!session?.user;

  return (
    <>
      {isUser ? (
        children
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
          <span className="text-lg font-bold">Loading...</span>
          <Loader2 className="animate-spin text-2xl" />
        </div>
      )}
    </>
  );
};

export default AuthLoading;