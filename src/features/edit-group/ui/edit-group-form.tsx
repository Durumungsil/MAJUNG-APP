"use client";

import { useRouter } from "next/navigation";
import {
  GroupForm,
  toGroupFormValues,
  toGroupPayload,
  type Group,
  type GroupFormValues,
} from "@/entities/group";
import { isApiError } from "@/shared/api";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import { Toast } from "@/shared/ui";
import { useUpdateGroup } from "../api/update-group";

type EditGroupFormProps = {
  group: Pick<
    Group,
    "id" | "name" | "region" | "memberCount" | "maxMembers" | "startDate" | "endDate"
  >;
};

/** 수정 실패 응답 → 안내 문구 */
function getUpdateErrorMessage(error: unknown): string {
  if (isApiError(error, 400)) return ERROR_MESSAGES.groupFormInvalid;
  if (isApiError(error, 403)) return ERROR_MESSAGES.leaderOnly;
  if (isApiError(error, 409)) return ERROR_MESSAGES.noActiveTrip;
  return ERROR_MESSAGES.requestFailed;
}

export default function EditGroupForm({ group }: EditGroupFormProps) {
  const router = useRouter();
  const { mutate: updateGroup, isPending } = useUpdateGroup(group.id);
  const { toastMessage, showToast } = useToast();

  function handleGroupSubmit(values: GroupFormValues) {
    const payload = toGroupPayload(values);
    if (!payload) {
      showToast(ERROR_MESSAGES.groupFormInvalid);
      return;
    }
    // 백엔드도 막지만, 이유를 정확히 알려주려고 먼저 확인함
    if (payload.maxMembers < group.memberCount) {
      showToast(ERROR_MESSAGES.maxMembersBelowCurrent);
      return;
    }

    updateGroup(payload, {
      onSuccess: () => router.push(`/groups/${group.id}`),
      onError: (error) => showToast(getUpdateErrorMessage(error)),
    });
  }

  return (
    <>
      <GroupForm
        defaultValues={toGroupFormValues(group)}
        layout="edit"
        dateLabels={{ start: "시작 날짜", end: "종료 날짜" }}
        submitLabel="수정 완료"
        submitting={isPending}
        onSubmit={handleGroupSubmit}
      />
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </>
  );
}
