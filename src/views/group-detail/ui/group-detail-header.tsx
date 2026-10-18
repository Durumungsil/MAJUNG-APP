"use client";

import { useState } from "react";
import type { GroupRole } from "@/entities/group";
import { LeaveGroupModal } from "@/features/leave-group";
import { DotsVerticalIcon } from "@/shared/assets";
import { BackHeader, DropdownMenu, type DropdownMenuItem } from "@/shared/ui";

type GroupDetailHeaderProps = {
  groupId: string;
  role: GroupRole;
};

export default function GroupDetailHeader({ groupId, role }: GroupDetailHeaderProps) {
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);

  function handleLeaveSelect() {
    setLeaveModalOpen(true);
  }

  function handleLeaveModalClose() {
    setLeaveModalOpen(false);
  }

  const membersItem: DropdownMenuItem = {
    label: "그룹 멤버 보기",
    href: `/groups/${groupId}/members`,
  };
  const menuItems: DropdownMenuItem[] =
    role === "leader"
      ? [{ label: "그룹 수정", href: `/groups/${groupId}/edit` }, membersItem]
      : [{ label: "그룹 탈퇴", onSelect: handleLeaveSelect }, membersItem];

  return (
    <>
      <BackHeader
        backHref="/groups"
        right={
          <DropdownMenu
            triggerLabel="그룹 메뉴"
            trigger={<DotsVerticalIcon className="size-6" />}
            items={menuItems}
          />
        }
      />
      <LeaveGroupModal groupId={groupId} open={leaveModalOpen} onClose={handleLeaveModalClose} />
    </>
  );
}
