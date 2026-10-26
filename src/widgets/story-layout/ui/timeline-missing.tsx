import { Button } from "@/shared/ui";

type TimelineMissingProps = {
  groupId: number;
};

/** 타임라인 id를 모를 때 (새로고침·다른 멤버 진입). 백엔드가 현재 타임라인 id를 주면 없어짐 */
export default function TimelineMissing({ groupId }: TimelineMissingProps) {
  return (
    <div className="mt-24 flex flex-col items-center gap-6 text-center">
      <p className="text-l text-text-primary">아직 만든 타임라인이 없어요</p>
      <Button href={`/groups/${groupId}/story/places`} size="md">
        장소 선택하러 가기
      </Button>
    </div>
  );
}
