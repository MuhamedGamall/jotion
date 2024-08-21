"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { Spinner } from "@/components/LoasdingSpinner";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "../../../components/modals/confirm-modal";

export function TrashBox() {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLocaleLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();

    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note",
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note",
    });
    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="w-4 h-4" />
        <Input
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1  max-h-[300px] overflow-y-auto ">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found
        </p>
        {filteredDocuments?.map((document) => (
          <div
          className="text-sm rounded-sm w-full hover:bg-primary/5 flex justify-between items-center text-primary"
          key={document._id}
          role="button"
          onClick={() => onClick(document._id)}
        >
          <span className="truncate pl-2 max-w-[250px] ">{document.title}</span>
          <div className="flex items-center">
            <div
              className="rounded-sm p-2 hover:bg-neutral-200 
            dark:hover:bg-neutral-600"
              onClick={(e) => onRestore(e, document._id)}
            >
              <Undo className="w-4 h-4 text-muted-foreground" />
            </div>
            <ConfirmModal onConfirm={() => onRemove(document._id)}>
              <div
                className="rounded-sm p-2 hover:bg-neutral-200
              dark:hover:bg-neutral-600"
                role="button"
              >
                <Trash className="w-4 h-4 text-muted-foreground" />
              </div>
            </ConfirmModal>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}
