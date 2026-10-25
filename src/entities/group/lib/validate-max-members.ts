import { MAX_GROUP_MEMBERS, MIN_GROUP_MEMBERS } from "../config/constants";

/** 최대 인원은 MIN_GROUP_MEMBERS ~ MAX_GROUP_MEMBERS 사이의 정수여야 함 */
export function isValidMaxMembers(value: string): boolean {
  if (!/^\d+$/.test(value)) return false;
  const count = Number(value);
  return count >= MIN_GROUP_MEMBERS && count <= MAX_GROUP_MEMBERS;
}

/** 입력값이 MAX_GROUP_MEMBERS를 초과하는지 (경고 문구 노출 기준) */
export function exceedsMaxMembers(value: string): boolean {
  return /^\d+$/.test(value) && Number(value) > MAX_GROUP_MEMBERS;
}

/** 숫자 이외의 문자를 제거함 */
export function sanitizeMaxMembersInput(value: string): string {
  return value.replace(/\D/g, "");
}
