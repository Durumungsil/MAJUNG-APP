// 진행도 조회에 필요한 processId는 커리큘럼 생성 응답에서만 받을 수 있어서 브라우저에 기억해 둠
// TODO: 백엔드에 오늘 커리큘럼 조회 API가 생기면 이 저장소를 없애고 API로 교체

function getStorageKey(groupId: number, travelDate: string): string {
  return `majung-adventure-process:${groupId}:${travelDate}`;
}

export function saveProcessId(groupId: number, travelDate: string, processId: number): void {
  try {
    localStorage.setItem(getStorageKey(groupId, travelDate), String(processId));
  } catch {
    // 저장소를 쓸 수 없는 환경(사파리 비공개 모드 등)이면 진행도 화면만 비어 보임
  }
}

export function loadProcessId(groupId: number, travelDate: string): number | null {
  try {
    const value = localStorage.getItem(getStorageKey(groupId, travelDate));
    const id = Number(value);
    return value !== null && Number.isSafeInteger(id) && id > 0 ? id : null;
  } catch {
    return null;
  }
}
