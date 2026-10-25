import type { ReactNode } from "react";
import { CrownIcon } from "@/shared/assets";
import { Avatar } from "@/shared/ui";
import type { Member } from "../model/types";

type MemberItemProps = {
  member: Member;
  /** 오른쪽 끝에 놓을 버튼 (예: 대표자로 지정) */
  action?: ReactNode;
};

export default function MemberItem({ member, action }: MemberItemProps) {
  return (
    <li className="flex items-center gap-5.25 p-2.5">
      <Avatar src={member.avatarUrl} alt="" size="md" />
      <div className="flex flex-1 flex-col">
        {member.isLeader && <CrownIcon className="h-5 w-5 text-secondary-500" />}
        <p className="text-m text-black">
          {member.nickname}
          {member.isLeader && <span className="sr-only"> (그룹 리더)</span>}
        </p>
      </div>
      {action}
    </li>
  );
}
