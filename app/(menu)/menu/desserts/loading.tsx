import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4 p-4 max-w-5xl mx-auto">
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex gap-3 items-center border-b border-stone-100 pb-3">
          <Skeleton className="h-20 w-20 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}