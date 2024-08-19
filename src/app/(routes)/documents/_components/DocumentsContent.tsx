"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

export default function DocumentsContent() {
  const { user, isLoaded } = useUser();
  if (user === undefined) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4">
      <Image
        loading="lazy"
        className="dark:hidden"
        src="/empty.png"
        alt="Empty"
        width="300"
        height="300"
      />
      <Image
        loading="lazy"
        className="hidden dark:block"
        src="/empty-dark.png"
        alt="Empty"
        width="300"
        height="300"
      />
      <h2 className="text-[20px] md:text-[25px] font-medium ">
        Good evening, <strong>{user?.firstName}</strong>
      </h2>
      <Button>
        <PlusCircle className="w-4 h-4 mr-2" />
        Create note
      </Button>
    </div>
  );
}
