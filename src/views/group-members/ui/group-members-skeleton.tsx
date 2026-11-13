import { BackHeader, Screen, Skeleton } from "@/shared/ui";

const SKELETON_MEMBER_COUNT = 3;

type GroupMembersSkeletonProps = {
  groupId: string;
};

/** 라우트 loading.tsx용. 그룹·멤버를 불러오기 전 GroupMembersPage의 첫 화면과 같은 모양으로 맞춤 */
export default function GroupMembersSkeleton({ groupId }: GroupMembersSkeletonProps) {
  return (
    <Screen className="gap-11">
      <div className="flex flex-col gap-8">
        <BackHeader backHref={`/groups/${groupId}`} size="sm" title="그룹 멤버 보기" />
        <Skeleton className="h-14.5" />
      </div>
      <ul className="flex flex-col gap-3">
        {Array.from({ length: SKELETON_MEMBER_COUNT }, (_, index) => (
          <li key={index}>
            <Skeleton className="h-19.5" />
          </li>
        ))}
      </ul>
    </Screen>
  );
}
