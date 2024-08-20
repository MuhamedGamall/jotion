"use client";

import { useQuery } from "convex/react";

import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Toolbar } from "./Toolbar";
import { Cover } from "./Cover";

export default function DocumentContent() {
  const params = useParams() as { documentId: Id<"documents"> };
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return (
      <div>
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
      <Cover url={document.coverImage} />

      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto ">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
}
