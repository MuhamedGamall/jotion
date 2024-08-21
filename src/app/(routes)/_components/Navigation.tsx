"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import {
  ChevronsLeft,
  EditIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash
} from "lucide-react";
import { usePathname } from "next/navigation";

import { SearchModal } from "@/components/modals/search-modal";
import { SettingsModal } from "@/components/modals/settings-modal";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { DocumentList } from "./DocumentList";
import { Item } from "./Item";
import { Navbar } from "./Navbar";
import { TrashBox } from "./TrashBox";

export function Navigation() {
  const { user } = useUser();
  const pathname = usePathname();
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [searchOpen, setSearchOpen] = useState(false);
  const create = useMutation(api.documents.create);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      console.log(newWidth);
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Creating new note...",
      success: "New note created!",
      error: "Failed to create note.",
    });
  };

  return (
    <>
      <aside
        className={cn(
          `group/sidebar h-full bg-secondary overflow-y-auto relative hidden md:flex flex-col w-60 z-[999]`,
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
        ref={sidebarRef}
      >
        <div>
          <div
            className={cn(
              `w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute
        top-3 right-9 opacity-0 group-hover/sidebar:opacity-100 transition `,
              isMobile && "opacity-100"
            )}
            onClick={collapse}
            role="button"
          >
            <ChevronsLeft className="w-6 h-6" />
          </div>
          <div
            className={cn(
              `w-6 h-6 text-muted-foreground  absolute top-4 right-2  transition `,
              isMobile && "opacity-100"
            )}
            onClick={handleCreate}
            role="button"
          >
            <EditIcon className="w-4 h-4" />
          </div>
          <div>
            <SignedIn>
              <div className="flex items-center  mb-3 text-sm p-3 w-full hover:bg-primary/5 ">
                <div className="gap-x-2 flex items-center max-w-[150px] ">
                  {/* @ts-expect-error */}
                  <UserButton userProfileMode="navigation" />
                  <span className="text-start capitalize font-medium line-clamp-1">
                    {user?.fullName}
                  </span>
                </div>
              </div>
            </SignedIn>
            <Item
              label="Search"
              icon={Search}
              isSearch
              onClick={() => setSearchOpen((curr) => !curr)}
            />
            <SearchModal isOpen={searchOpen} setIsOpen={setSearchOpen} />
            <SettingsModal>
              <Item label="Settings" icon={Settings} onClick={() => {}} />
            </SettingsModal>
            <Item onClick={handleCreate} label="New page" icon={PlusCircle} />
          </div>
          <div className="mt-4">
            <Item onClick={handleCreate} icon={Plus} label="Add a page" />
            <DocumentList />
            <Popover>
              <PopoverTrigger className="w-full mt-4">
                <Item label="Trash" icon={Trash} />
              </PopoverTrigger>
              <PopoverContent
                className="p-0 w-72 "
                side={isMobile ? "bottom" : "right"}
              >
                <TrashBox />
              </PopoverContent>
            </Popover>
          </div>
          <div
            className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
            onMouseDown={handleMouseDown}
            onClick={resetWidth}
          />
        </div>
      </aside>
      <div
        className={cn(
          `absolute top-0 z-[40] md:left-60 w-full md:w-[calc(100%-240px)] left-0 `,
          { "transition-all ease-in-out duration-300 ": isResetting }
        )}
        ref={navbarRef}
      >
        <Navbar
          isCollapsed={isCollapsed}
          onResetWidth={resetWidth}
        />
      </div>
    </>
  );
}
