"use client";

import { useUser } from "@clerk/nextjs";
import { Spinner } from "../LoasdingSpinner";

export default function LoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}
