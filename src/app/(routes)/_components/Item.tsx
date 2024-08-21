"use client";

import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import {
  ChevronDown,
  ChevronRight,
  Globe,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon | any;
  isPublished?: boolean;
}

export function Item({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
  isPublished = false,
}: ItemProps) {
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id }).then(() => router.push("/documents"));

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note",
    });
  };

  const handleExpand = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
      }
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note",
    });
  };

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      className={cn(
        `group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5
    flex items-center text-muted-foreground font-medium`,
        active && "bg-primary/5 text-primary"
      )}
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 8 + 8}px` : "8px" }}
    >
      {id && (
        <div
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handleExpand}
          role="button"
        >
          <ChevronIcon className="w-4 h-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 w-[18px] h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className=" flex items-center gap-2">
        <span className="truncate max-w-[100px]">{label}</span>
        {isPublished && <Globe className="text-sky-500 w-3 h-3" />}
      </span>
      {isSearch && (
        <kbd
          className="ml-auto pointer-events-none  gap-1  h-5 select-none rounded border
        bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 flex items-center"
        >
          <span className="text-xs">⌘</span>K
        </kbd>
      )}

      {id && (
        <div className="flex items-center gap-x-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              onClick={(e) => e.stopPropagation()}
              className="hidden md:block"
            >
              <div
                className="md:opacity-0 md:group-hover:opacity-100 h-full w-full rounded-sm
              hover:bg-neutral-300 dark:hover:bg-neutral-600 "
                role="button"
              >
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[100px] md:w-60"
              align="start"
              side="left"
              forceMount
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            className=" md:hidden block h-full w-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-2 "
            role="button"
            onClick={onArchive}
          >
            <Trash className="w-4 h-4 text-muted-foreground" />
          </div>
          <div
            className="md:opacity-0 md:group-hover:opacity-100 h-full w-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600  "
            role="button"
            onClick={onCreate}
          >
            <Plus className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      className="flex items-center  gap-x-2 py-[3px]"
      style={{ paddingLeft: level ? `${level * 8 + 20}px` : "8px" }}
    >
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-20 h-4" />
      <Skeleton className="w-4 h-[30%] " />
    </div>
  );
};
