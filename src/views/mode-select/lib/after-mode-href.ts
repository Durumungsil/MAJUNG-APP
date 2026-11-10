/**
 * 모드를 고른 뒤 갈 화면.
 * 그룹 목록의 설문 배너로 설문을 먼저 낸 대표자는 다시 설문을 쓰지 않고 다른 멤버를 기다림.
 */
export function getAfterModeHref(groupId: number, myPreferencesCompleted: boolean) {
  return myPreferencesCompleted ? `/groups/${groupId}/survey/waiting` : `/groups/${groupId}/survey`;
}
