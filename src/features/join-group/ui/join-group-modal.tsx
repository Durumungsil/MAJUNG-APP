"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { findGroupByInviteCode } from "@/entities/group";
import { Button, Modal, TextField } from "@/shared/ui";

type JoinGroupModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function JoinGroupModal({ open, onClose }: JoinGroupModalProps) {
  const router = useRouter();
  const [notFound, setNotFound] = useState(false);

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const inviteCode = String(new FormData(event.currentTarget).get("inviteCode") ?? "");
    const group = findGroupByInviteCode(inviteCode);
    if (!group) {
      setNotFound(true);
      return;
    }
    router.push(`/groups/${group.id}`);
  }

  function handleInputChange() {
    if (notFound) setNotFound(false);
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="join-group-title" className="gap-3">
      <h2 id="join-group-title" className="text-xl text-text-primary">
        초대 코드로 입장하기
      </h2>
      <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
        <TextField
          size="sm"
          name="inviteCode"
          required
          autoComplete="off"
          autoCapitalize="characters"
          placeholder="초대 코드를 입력하세요"
          aria-label="초대 코드"
          aria-invalid={notFound}
          onChange={handleInputChange}
          className="w-45.75"
        />
        <Button type="submit" size="sm" className="w-auto">
          확인
        </Button>
      </form>
    </Modal>
  );
}
