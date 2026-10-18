import type { Group } from "../model/types";

type GroupTitleBarProps = {
  group: Pick<Group, "name" | "memberCount" | "maxMembers">;
};

export default function GroupTitleBar({ group }: GroupTitleBarProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-primary-200 px-3 py-2">
      <h1 className="text-xxl text-text-primary">{group.name}</h1>
      <p
        className="text-m text-text-secondary"
        aria-label={`현재 인원 ${group.memberCount}명, 최대 ${group.maxMembers}명`}
      >
        <span className="text-text-primary">{group.memberCount}</span>/{group.maxMembers}
      </p>
    </div>
  );
}
