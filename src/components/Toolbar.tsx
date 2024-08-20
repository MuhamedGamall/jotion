"use client";

import React, { ElementRef, useRef, useState } from "react";
import { ImageIcon, Smile, X } from "lucide-react";
import { useMutation } from "convex/react";
import TextAreaAutoSize from "react-textarea-autosize";

import { Button } from "@/components/ui/button";

import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";
import { IconPicker } from "../app/(routes)/documents/[documentId]/_components/icon-picker";
import { CoverImageModal } from "@/components/modals/cover-image-modal";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}
export function Toolbar({ initialData, preview }: ToolbarProps) {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    });
  };

  return (
    <div className="pl-[54px] group relative mt-16">
      {!!initialData.icon && !preview && (
        <div className="flex gap-x-2 items-center group/icon pt-6 absolute left-[5%] -top-[125px]">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition ">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition
          text-muted-foreground text-xs"
            variant="outline"
            size="icon"
            onClick={onRemoveIcon}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6 absolute left-[5%] -top-[125px]">
          {initialData.icon}
        </p>
      )}
      <div className="opacity-0  group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="w-4 h-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <CoverImageModal type="add">
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Add cover
            </Button>
          </CoverImageModal>
        )}
      </div>
      {isEditing && !preview ? (
        <TextAreaAutoSize
          className="text-5xl  bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]
        resize-none"
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
        />
      ) : (
        <div
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
          onClick={enableInput}
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
}
