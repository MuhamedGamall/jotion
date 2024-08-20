"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { ImageIcon, X } from "lucide-react";
import { useMutation } from "convex/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components//ui/skeleton";
import { api } from "../../convex/_generated/api";
import { CoverImageModal } from "@/components/modals/cover-image-modal";
import { Id } from "../../convex/_generated/dataModel";

interface CoverProps {
  url?: string;
  preview?: boolean;
}

export function Cover({ url, preview }: CoverProps) {
  const params = useParams();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
  };

  return (
    <div
      className={cn(
        `relative w-full h-[35vh] group `,
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image className="object-cover" src={url} alt="Cover" fill />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex gap-x-2 items-center">
          <CoverImageModal type="replace">
            <Button
              className="text-muted-foreground text-xs "
              variant="outline"
              size="sm"
            >
              <ImageIcon className="w-4 h-4 md:mr-2" />
              <span className="md:block hidden">Change Cover</span>
            </Button>
          </CoverImageModal>
          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
            onClick={onRemove}
          >
            <X className="w-4 h-4 md:mr-2" />
            <span className="md:block hidden">Remove</span>
          </Button>
        </div>
      )}
    </div>
  );
}

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
