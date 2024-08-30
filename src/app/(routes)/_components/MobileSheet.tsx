"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import {
  EditIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash
} from "lucide-react";

import { SearchModal } from "@/components/modals/search-modal";
import { SettingsModal } from "@/components/modals/settings-modal";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { DocumentList } from "./DocumentList";
import { Item } from "./Item";
import { TrashBox } from "./TrashBox";

export const MobileSheet = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  const create = useMutation(api.documents.create);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleCreate = () => {
    const promise = create({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Creating new note...",
      success: "New note created!",
      error: "Failed to create note.",
    });
  };

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>

      <SheetContent side={"left"} className="p-0 z-[9999]">
        <aside
          className={cn(
            `group/sidebar h-full bg-secondary overflow-y-auto relative flex flex-col w-full z-[999]`
          )}
        >
          <div>
            <div
              className={cn(
                `w-6 h-6 text-muted-foreground  absolute top-4 right-2  transition `
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
                    <UserButton
                      userProfileMode="navigation"
                      appearance={{
                        elements: {
                          userButtonPopoverCard: { pointerEvents: "initial" },
                        },
                      }}
                      
                    />

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
                <PopoverContent className="p-0 w-72 " side={"bottom"}>
                  <TrashBox />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </aside>
      </SheetContent>
    </Sheet>
  );
};
