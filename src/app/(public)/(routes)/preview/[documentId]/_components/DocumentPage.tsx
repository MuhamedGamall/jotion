"use client";

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "../../../../../../../convex/_generated/api";
import { Cover } from "@/components/Cover";
import { Toolbar } from "@/components/Toolbar";
import { Id } from "../../../../../../../convex/_generated/dataModel";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

export default function DocumentContent({ params }: DocumentIdPageProps) {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/Editor"), { ssr: false }),
    []
  );

  const document = useQuery(api.documents.getReview, {
    documentId: params.documentId,
  });



  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-14 w-[80%]" />
            <Skeleton className="h-14 w-[40%]" />
            <Skeleton className="h-14 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return (
      <div className="flex items-center justify-center font-bol text-2xl h-screen">
        <span>Document Not Exesist</span>
      </div>
    );
  }

  return (
    <div className="pb-40">
      <Cover preview url={document.coverImage} />
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
        <Toolbar preview initialData={document} />
        <Editor
          editable={false}
          onChange={()=>{}}
          initialContent={document.content}
        />
      </div>
    </div>
  );
}
