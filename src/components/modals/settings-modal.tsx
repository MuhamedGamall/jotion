"use client";

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui//label";
import { ModeToggle } from "@/components/ModeToggle";

export function SettingsModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog >
        <DialogTrigger className="w-full">
          {children}
        </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Apperance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Jotion looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
}
