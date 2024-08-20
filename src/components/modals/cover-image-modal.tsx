"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "../../../convex/_generated/api";
import { SingleImageDropzone } from "../single-image-dropzone";
import { Id } from "../../../convex/_generated/dataModel";

export function CoverImageModal({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "add" | "replace";
}) {
  const params = useParams();
  const update = useMutation(api.documents.update);
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);
      if (type === "replace") {
        await removeCoverImage({
          id: params.documentId as Id<"documents">,
        });
      }
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file!.type },
        body: file,
      });

      const { storageId } = await result.json();

      await update({
        id: params.documentId as Id<"documents">,
        coverImageStorageId: storageId,
      });

      onClose();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
}
