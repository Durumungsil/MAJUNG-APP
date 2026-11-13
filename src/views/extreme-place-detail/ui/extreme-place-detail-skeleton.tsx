import { Skeleton } from "@/shared/ui";

/** 룰렛 결과 장소를 불러오는 동안 보여주는 자리 (라우트 loading.tsx에서도 같이 씀) */
export default function ExtremePlaceDetailSkeleton() {
  return (
    <main className="flex h-dvh flex-col overflow-hidden">
      <Skeleton className="min-h-0 w-full flex-1 rounded-none" />
      <div className="flex flex-col gap-3 px-8 pt-6 pb-[calc(var(--safe-bottom)+--spacing(11))]">
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="h-5 w-full" />
      </div>
    </main>
  );
}
