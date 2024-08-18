"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

export default function DocumentsContent() {
  const { user } = useUser();
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4">
      <Image
        className="dark:hidden"
        src="/empty.png"
        alt="Empty"
        width="300"
        height="300"
      />
      <Image
        className="hidden dark:block"
        src="/empty-dark.png"
        alt="Empty"
        width="300"
        height="300"
      />
      <h2 className="text-[20px] md:text-[25px] font-medium ">
        Good evening,{" "}
        <strong >{user?.firstName}</strong>
      </h2>
      <Button>
        <PlusCircle className="w-4 h-4 mr-2" />
        Create note
      </Button>
    </div>
  );
}
