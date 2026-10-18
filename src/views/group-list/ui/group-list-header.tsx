"use client";

import { useState } from "react";
import { JoinGroupModal } from "@/features/join-group";
import { PlusIcon } from "@/shared/assets";
import { DropdownMenu, type DropdownMenuItem } from "@/shared/ui";

export default function GroupListHeader() {
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  function handleJoinSelect() {
    setJoinModalOpen(true);
  }

  function handleJoinModalClose() {
    setJoinModalOpen(false);
  }

  const menuItems: DropdownMenuItem[] = [
    { label: "그룹 생성", href: "/groups/new" },
    { label: "초대코드로 입장", onSelect: handleJoinSelect },
  ];

  return (
    <header className="flex items-center justify-between">
      <h1 className="text-xl text-black">그룹 목록</h1>
      <DropdownMenu
        triggerLabel="그룹 추가"
        trigger={<PlusIcon className="size-3.5" />}
        items={menuItems}
      />
      <JoinGroupModal open={joinModalOpen} onClose={handleJoinModalClose} />
    </header>
  );
}
