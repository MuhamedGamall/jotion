"use client";

import { useUser } from "@clerk/nextjs";
import { Spinner } from "../spinner";

export default function LoaderProvider() {
  const { user } = useUser();

  if (user === undefined) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return <></>;
}
