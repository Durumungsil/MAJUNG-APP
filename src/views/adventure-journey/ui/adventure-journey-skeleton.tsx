import { Button, Skeleton } from "@/shared/ui";

const SKELETON_COUNT = 4;

type AdventureJourneySkeletonProps = {
  groupId: string;
};

/** 라우트 loading.tsx용. 여정을 불러오기 전 AdventureJourneyView의 첫 화면과 같은 모양으로 맞춤 */
export default function AdventureJourneySkeleton({ groupId }: AdventureJourneySkeletonProps) {
  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-background">
      <header className="flex shrink-0 justify-center px-page pt-[max(--spacing(16),calc(--spacing(5)+var(--safe-top)))] pb-8">
        <h1 className="text-point text-primary-400">ADVENTURE MODE</h1>
      </header>
      <div className="flex flex-col gap-5 px-page">
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <Skeleton key={index} className="h-20" />
        ))}
      </div>
      <nav className="mt-auto flex shrink-0 flex-col px-page pt-20 pb-[max(--spacing(14),calc(--spacing(5.5)+var(--safe-bottom)))]">
        <Button href={`/groups/${groupId}/adventure/map`} size="xl">
          지도로 가기
        </Button>
      </nav>
    </main>
  );
}
