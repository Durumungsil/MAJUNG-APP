"use client";

import { useRouter } from "next/navigation";
import { GroupForm, type Group, type GroupFormValues } from "@/entities/group";

type EditGroupFormProps = {
  group: Pick<Group, "id" | "name" | "destination" | "maxMembers" | "startDate" | "endDate">;
};

export default function EditGroupForm({ group }: EditGroupFormProps) {
  const router = useRouter();

  function handleGroupSubmit(values: GroupFormValues) {
    void values;
    router.push(`/groups/${group.id}`);
  }

  return (
    <GroupForm
      defaultValues={{
        name: group.name,
        destination: group.destination,
        maxMembers: String(group.maxMembers),
        startDate: group.startDate,
        endDate: group.endDate,
      }}
      dateLabels={{ start: "시작 일시", end: "종료 일시" }}
      submitLabel="수정 완료"
      onSubmit={handleGroupSubmit}
    />
  );
}
