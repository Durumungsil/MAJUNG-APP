"use client";

import { GroupCard, useMyGroups } from "@/entities/group";
import { CreateGroupSuccessModal } from "@/features/create-group";
import { SurveyRequestBanner } from "@/features/submit-survey";
import { Button, ErrorState, Screen, Skeleton } from "@/shared/ui";
import { findPendingSurveyGroup } from "../lib/pending-survey";
import GroupListHeader from "./group-list-header";

const SKELETON_CARD_COUNT = 3;

export default function GroupListPage() {
  const { data: groups, isPending, isError, refetch } = useMyGroups();
  const pendingSurveyGroup = groups && findPendingSurveyGroup(groups);

  function handleRetry() {
    void refetch();
  }

  return (
    <Screen className="gap-7">
      <GroupListHeader />
      {isPending ? (
        <ul className="flex flex-col gap-5" aria-busy>
          {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
            <li key={index}>
              <Skeleton className="h-21" />
            </li>
          ))}
        </ul>
      ) : isError ? (
        <ErrorState onRetry={handleRetry} />
      ) : (
        <>
          {pendingSurveyGroup && (
            <SurveyRequestBanner
              groupName={pendingSurveyGroup.name}
              href={`/groups/${pendingSurveyGroup.id}/survey`}
            />
          )}
          {groups.length === 0 ? (
            <div className="mt-24 flex flex-col items-center gap-6 text-center">
              <div className="flex flex-col gap-1.25">
                <p className="text-l text-text-primary">아직 참여한 그룹이 없어요</p>
                <p className="text-xs text-text-muted">
                  초대 코드가 있다면 오른쪽 위 + 버튼으로 입장할 수 있어요
                </p>
              </div>
              <Button href="/groups/new" size="md">
                그룹 만들기
              </Button>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {groups.map((group) => (
                <li key={group.id}>
                  <GroupCard group={group} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      <CreateGroupSuccessModal />
    </Screen>
  );
}
