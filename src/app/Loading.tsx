import { Spinner } from "@/components/spinner";

export default function Loading() {
  return (
    <div className="h-full flex justify-center items-center">
      <Spinner size="lg"  />
    </div>
  );
}
