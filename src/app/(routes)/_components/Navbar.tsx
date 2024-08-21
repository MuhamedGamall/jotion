"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Banner } from "../documents/[documentId]/_components/Banner";
import { Publish } from "../documents/[documentId]/_components/Publish";
import { Menu } from "../documents/[documentId]/_components/Menu";
import { Title } from "../documents/[documentId]/_components/Title";
import { MobileSheet } from "./MobileSheet";
import { cn } from "@/lib/utils";
interface NavbarProps {
  isCollapsed?: boolean;
  onResetWidth?: () => void;
}
export function Navbar({ isCollapsed, onResetWidth }: NavbarProps) {
  const params = useParams();

  const document = params.documentId
    ? useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">,
      })
    : null;

  if (document === undefined) {
    return (
      <nav
        className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full
      flex justify-between gap-x-4"
      >
        <Title.Skeleton />
        <div className="flex gap-x-2 items-center">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex gap-x-4 items-center">
        {isCollapsed && (
          <MenuIcon
            className="w-6 h-6 text-muted-foreground md:block hidden"
            role="button"
            onClick={onResetWidth}
          />
        )}
        <MobileSheet>
          <MenuIcon
            className="w-6 h-6 text-muted-foreground  md:hidden block"
            role="button"
          />
        </MobileSheet>
        {document && (
          <div className="flex justify-between items-center w-full">
            <Title initialData={document} />
            {!document.isArchived && (
              <div className="flex md:gap-x-2 items-center">
                <Publish initialData={document} />
                <Menu document={document} />
              </div>
            )}
          </div>
        )}
      </nav>
      {document && document.isArchived && <Banner documentId={document._id} />}
    </>
  );
}
