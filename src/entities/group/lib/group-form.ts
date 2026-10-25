import type { Group, GroupFormValues } from "../model/types";

/** 그룹 생성·수정 API에 보낼 값 */
export type GroupPayload = {
  groupName: string;
  region: string;
  maxMembers: number;
  /** YYYY-MM-DD */
  startDate: string;
  /** YYYY-MM-DD */
  endDate: string;
};

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isIsoDate(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

/** 폼 입력을 API 값으로 바꿈. 날짜 형식이 틀렸거나 종료일이 시작일보다 빠르면 null */
export function toGroupPayload(values: GroupFormValues): GroupPayload | null {
  if (!isIsoDate(values.startDate) || !isIsoDate(values.endDate)) return null;
  if (values.startDate > values.endDate) return null;

  return {
    groupName: values.name,
    region: values.destination,
    maxMembers: Number(values.maxMembers),
    startDate: values.startDate,
    endDate: values.endDate,
  };
}

/** 그룹 수정 폼의 기본값 */
export function toGroupFormValues(
  group: Pick<Group, "name" | "region" | "maxMembers" | "startDate" | "endDate">,
): GroupFormValues {
  return {
    name: group.name,
    destination: group.region ?? "",
    maxMembers: String(group.maxMembers),
    startDate: group.startDate ?? "",
    endDate: group.endDate ?? "",
  };
}
