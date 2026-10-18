import { cn } from "@/shared/lib";
import type { Group } from "../model/types";

type GroupTitleBarProps = {
  group: Pick<Group, "name" | "memberCount" | "maxMembers">;
  className?: string;
};

export default function GroupTitleBar({ group, className }: GroupTitleBarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg bg-primary-200 px-5 py-2",
        className,
      )}
    >
      <h1 className="text-xl text-text-primary">{group.name}</h1>
      <p
        className="text-m text-text-secondary"
        aria-label={`현재 인원 ${group.memberCount}명, 최대 ${group.maxMembers}명`}
      >
        <span className="text-text-primary">{group.memberCount}</span>/{group.maxMembers}
      </p>
    </div>
  );
}
