import { Spinner } from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="h-full flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
}
