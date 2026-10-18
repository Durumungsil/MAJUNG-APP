import type { Member } from "../model/types";

// TODO: 그룹 멤버 API 연동 전까지 사용하는 퍼블리싱용 목 데이터
const MOCK_MEMBERS: Member[] = [
  { id: "somonox", nickname: "somonox", avatarUrl: "/mock/avatars/avatar-2.jpg", isLeader: true },
  { id: "yajaya", nickname: "yajaya", avatarUrl: "/mock/avatars/avatar-1.jpg", isLeader: false },
  { id: "soriii1", nickname: "soriii1", avatarUrl: "/mock/avatars/avatar-3.jpg", isLeader: false },
];

/** 리더가 맨 앞에 오도록 정렬된 그룹 멤버 목록 */
export function getMembers(groupId: string): Member[] {
  void groupId;
  return [...MOCK_MEMBERS].sort((a, b) => Number(b.isLeader) - Number(a.isLeader));
}
