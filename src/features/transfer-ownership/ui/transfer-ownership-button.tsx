"use client";

import { useState } from "react";
import type { Member } from "@/entities/user";
import { isApiError } from "@/shared/api";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import { Button, Modal, Toast } from "@/shared/ui";
import { useTransferOwnership } from "../api/transfer-ownership";

type TransferOwnershipButtonProps = {
  groupId: number;
  member: Pick<Member, "id" | "nickname">;
};

/** 멤버 옆의 "대표자로 지정" 버튼 + 확인 모달 */
export default function TransferOwnershipButton({ groupId, member }: TransferOwnershipButtonProps) {
  const [open, setOpen] = useState(false);
  const { mutate: transferOwnership, isPending } = useTransferOwnership(groupId);
  const { toastMessage, showToast } = useToast();
  const titleId = `transfer-ownership-title-${member.id}`;

  function handleOpenClick() {
    setOpen(true);
  }

  function handleModalClose() {
    setOpen(false);
  }

  function handleConfirmClick() {
    transferOwnership(member.id, {
      onSuccess: () => setOpen(false),
      onError: (error) =>
        showToast(
          isApiError(error, 403) ? ERROR_MESSAGES.leaderOnly : ERROR_MESSAGES.requestFailed,
        ),
    });
  }

  return (
    <>
      <Button size="xs" variant="tertiary" onClick={handleOpenClick}>
        대표자로 지정
      </Button>
      <Modal open={open} onClose={handleModalClose} labelledBy={titleId} className="gap-5">
        <div className="flex flex-col items-center gap-1">
          <h2 id={titleId} className="text-center text-xl text-text-primary">
            {member.nickname}님에게
            <br />
            대표자를 넘길까요?
          </h2>
          <p className="text-xs text-text-muted">넘기면 그룹 수정과 모드 선택을 할 수 없어요</p>
        </div>
        <div className="flex justify-center gap-4">
          <Button size="sm" variant="tertiary" onClick={handleModalClose}>
            취소하기
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleConfirmClick}
            disabled={isPending}
            aria-busy={isPending}
          >
            넘기기
          </Button>
        </div>
      </Modal>
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </>
  );
}
