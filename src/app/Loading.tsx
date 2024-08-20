import { Spinner } from "@/components/LoasdingSpinner";

export default function Loading() {
  return (
    <div className="h-full flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
}
