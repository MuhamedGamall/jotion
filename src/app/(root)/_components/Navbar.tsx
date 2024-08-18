"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Logo } from "./Logo";

export function Navbar() {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        `z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6`,
        scrolled && "border-b shadow-md"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end flex gap-x-2 justify-between items-center w-full">
        <SignedOut>
          <SignInButton forceRedirectUrl={"/documents"}>
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          {/* @ts-expect-error */}
          <UserButton  userProfileMode="navigation" afterSwitchSessionUrl="/" />
        </SignedIn>
        <ModeToggle />
      </div>
    </div>
  );
}
