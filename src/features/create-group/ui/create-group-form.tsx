"use client";

import { useRouter } from "next/navigation";
import { GroupForm, toGroupPayload, type GroupFormValues } from "@/entities/group";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import { Toast } from "@/shared/ui";
import { useCreateGroup } from "../api/create-group";
import { useCreatedGroupStore } from "../model/created-group-store";

export default function CreateGroupForm() {
  const router = useRouter();
  const setInviteCode = useCreatedGroupStore((state) => state.setInviteCode);
  const { mutate: createGroup, isPending } = useCreateGroup();
  const { toastMessage, showToast } = useToast();

  function handleGroupSubmit(values: GroupFormValues) {
    const payload = toGroupPayload(values);
    if (!payload) {
      showToast(ERROR_MESSAGES.groupFormInvalid);
      return;
    }

    createGroup(payload, {
      onSuccess: (data) => {
        // 완료 모달은 그룹 목록 화면 위에 띄움 (Figma: 그룹 생성 성공)
        setInviteCode(data.invite_code);
        router.push("/groups");
      },
      onError: () => showToast(ERROR_MESSAGES.requestFailed),
    });
  }

  return (
    <>
      <GroupForm
        layout="create"
        dateLabels={{ start: "시작 날짜", end: "종료 날짜" }}
        submitLabel="그룹 생성하기"
        submitting={isPending}
        onSubmit={handleGroupSubmit}
      />
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </>
  );
}
