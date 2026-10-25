"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { isApiError } from "@/shared/api";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import { Button, Modal, TextField, Toast } from "@/shared/ui";
import { useJoinGroup } from "../api/join-group";

type JoinGroupModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function JoinGroupModal({ open, onClose }: JoinGroupModalProps) {
  const router = useRouter();
  const [invalid, setInvalid] = useState(false);
  const { mutate: joinGroup, isPending } = useJoinGroup();
  const { toastMessage, showToast } = useToast();

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // 초대 코드는 대소문자를 구분하므로 입력한 그대로 보냄
    const inviteCode = String(new FormData(event.currentTarget).get("inviteCode") ?? "").trim();
    if (!inviteCode) return;

    joinGroup(inviteCode, {
      onSuccess: (groupId) => router.push(`/groups/${groupId}`),
      onError: (error) => {
        setInvalid(true);
        // 검증 단계의 정원 초과는 403, 참여 단계의 정원 초과·중복 참여는 409
        if (isApiError(error, 403, 409)) showToast(ERROR_MESSAGES.groupFull);
        else if (isApiError(error, 400, 404)) showToast(ERROR_MESSAGES.inviteCodeInvalid);
        else showToast(ERROR_MESSAGES.requestFailed);
      },
    });
  }

  function handleInputChange() {
    if (invalid) setInvalid(false);
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="join-group-title" className="gap-3">
      <h2 id="join-group-title" className="text-l text-text-primary">
        초대 코드로 입장하기
      </h2>
      <form onSubmit={handleFormSubmit} className="flex w-full items-center gap-2">
        <TextField
          size="sm"
          name="inviteCode"
          required
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="초대 코드를 입력하세요"
          aria-label="초대 코드"
          aria-invalid={invalid}
          onChange={handleInputChange}
          className="w-45.75 min-w-0 flex-1"
        />
        <Button
          type="submit"
          size="xs"
          className="h-7.75"
          disabled={isPending}
          aria-busy={isPending}
        >
          확인
        </Button>
      </form>
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </Modal>
  );
}
