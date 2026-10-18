import { MAX_GROUP_MEMBERS } from "../config/constants";

/** 최대 인원은 1 ~ MAX_GROUP_MEMBERS 사이의 정수여야 함 */
export function isValidMaxMembers(value: string): boolean {
  if (!/^\d+$/.test(value)) return false;
  const count = Number(value);
  return count >= 1 && count <= MAX_GROUP_MEMBERS;
}
