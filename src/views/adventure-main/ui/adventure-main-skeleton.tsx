import { Skeleton } from "@/shared/ui";

/** 라우트 loading.tsx용. 지도와 하단 버튼 자리를 AdventureMainView와 같은 배치로 채움 */
export default function AdventureMainSkeleton() {
  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-background">
      <Skeleton className="min-h-0 flex-1 rounded-none" />
      <div className="flex shrink-0 flex-col gap-4 px-8 pt-5 pb-[max(--spacing(7.5),var(--safe-bottom))]">
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
      </div>
    </main>
  );
}
