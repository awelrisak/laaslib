"use client"

import { signOut } from "next-auth/react";
import SignOutIcon from "@/components/icons/SignOut";

const defaultCallbackUrl = "/signin";

interface IProps {
  className?: string;
  callbackUrl?: string;
}

export default function SignOut({ className = "p-3 text-white border rounded-3xl tracking-tight flex gap-2 uppercase", callbackUrl = defaultCallbackUrl }: IProps) {
  return (
    <button
      onClick={() => signOut({ callbackUrl })}
      className={className}
    >
      <SignOutIcon />
      Sign out
    </button>
  );
}

