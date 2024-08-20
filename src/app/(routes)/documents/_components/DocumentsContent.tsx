"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";

export default function DocumentsContent() {
  const router = useRouter();

  const create = useMutation(api.documents.create);

  const { user } = useUser();

  if (user === undefined) {

    return (
      <div className="h-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }
  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Creating new note...",
      success: "New note created!",
      error: "Failed to create note.",
    });
  };

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
      <Button onClick={handleCreate}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Create note
      </Button>
    </div>
  );
}
