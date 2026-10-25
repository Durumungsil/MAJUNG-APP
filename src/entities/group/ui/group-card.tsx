import Link from "next/link";
import { CalendarIcon, LocationIcon } from "@/shared/assets";
import { formatCardDate } from "../lib/format-card-date";
import type { GroupSummary } from "../model/types";

type GroupCardProps = {
  group: Pick<GroupSummary, "id" | "name" | "region" | "startDate">;
};

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <Link
      href={`/groups/${group.id}`}
      className="flex flex-col gap-2 rounded-lg bg-primary-100 px-5 py-4"
    >
      <p className="text-m text-black">{group.name}</p>
      <div className="flex flex-col">
        {group.region && (
          <p className="flex items-center gap-1 text-xxs text-primary-800">
            <LocationIcon className="size-3" />
            {group.region}
          </p>
        )}
        {group.startDate && (
          <p className="flex items-center gap-1 text-xxs text-text-muted">
            <CalendarIcon className="size-3" />
            {formatCardDate(group.startDate)}
          </p>
        )}
      </div>
    </Link>
  );
}
