"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getModeStartHref, useGroupByParam } from "@/entities/group";
import { usePreferenceSummary } from "@/entities/preference";
import { Button, Screen, Spinner } from "@/shared/ui";
import { isEveryoneDone } from "../lib/next-step";

type SurveyWaitingPageProps = {
  groupId: string;
};

/** 다른 멤버의 입력 진행 상황을 확인하는 주기 */
const SUMMARY_POLL_INTERVAL_MS = 5000;

export default function SurveyWaitingPage({ groupId }: SurveyWaitingPageProps) {
  const router = useRouter();
  // 그룹에 접근할 수 없으면 404로 보냄. 이 화면은 원래 대기 스피너라 로딩·실패 중에도 같은 화면을 유지함
  const { data: group } = useGroupByParam(groupId);
  const { data: summary } = usePreferenceSummary(group?.id ?? null, SUMMARY_POLL_INTERVAL_MS);
  const nextHref = group ? getModeStartHref(group) : `/groups/${groupId}`;
  const everyoneDone = summary !== undefined && isEveryoneDone(summary);

  // 전원이 입력을 마치면 다음 단계로 자동 이동
  useEffect(() => {
    if (everyoneDone) router.replace(nextHref);
  }, [everyoneDone, nextHref, router]);

  return (
    <Screen className="items-center">
      <div className="mt-9.75 flex flex-col items-center gap-16">
        <Spinner />
        <p className="text-center text-xl text-text-primary">
          친구들이 취향 설문지를
          <br />
          입력하고 있어요!
        </p>
      </div>
      {/* 기다리지 않고 지금까지 모인 취향으로 바로 다음 단계를 진행함 */}
      <Button href={nextHref} replace size="xl" className="mt-101 h-11.25">
        그만두기
      </Button>
    </Screen>
  );
}
