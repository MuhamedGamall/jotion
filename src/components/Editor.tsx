"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useMutation } from "convex/react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

function Editor({ onChange, initialContent, editable }: EditorProps) {
  const { documentId } = useParams();
  const uploadFile = useMutation(api.documents.uploadFile);
  const { resolvedTheme } = useTheme();
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);

  const handleUpload = async (file: File) => {
    const postUrl = await generateUploadUrl();

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file!.type },
      body: file,
    });

    const { storageId } = await result.json();
    const response = await uploadFile({
      id: documentId as Id<"documents">,
      fileStorageId: storageId,
    });
    console.log(response);

    return response.url;
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload as any,
  });

  const handleEditorChange = () => {
    onChange(JSON.stringify(editor.document, null, 2));
  };

  return (
    <BlockNoteView 
      editable={editable}
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={handleEditorChange}
    />
  );
}

export default Editor;
