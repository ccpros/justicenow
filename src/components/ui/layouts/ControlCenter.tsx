"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Home,
  FilePlus2,
  LayoutDashboard,
} from "lucide-react";

export default function ControlCenter() {
  return (
    <div className="relative w-60 h-40 flex items-center justify-center">
      {/* User button center */}
      <div className="absolute z-20 scale-125">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button variant="secondary">Sign In</Button>
          </SignInButton>
        </SignedOut>
      </div>

      {/* Icon Buttons Around the Center */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2">
        <Link href="/">
          <Button variant="ghost" size="icon" title="Home">
            <Home className="w-5 h-5 text-white" />
          </Button>
        </Link>
      </div>

      <div className="absolute top-1/2 left-10 -translate-y-1/2">
        <Link href="/case-builder">
          <Button variant="ghost" size="icon" title="Start Case">
            <FilePlus2 className="w-5 h-5 text-white" />
          </Button>
        </Link>
      </div>

      <div className="absolute top-1/2 right-10 -translate-y-1/2">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" title="Dashboard">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
