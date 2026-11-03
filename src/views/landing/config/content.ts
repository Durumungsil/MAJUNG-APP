export const MODES = [
  {
    name: "스토리모드",
    description:
      "그룹 취향에 맞는 장소를 추천받아 고르면, 하루 일정 타임라인과 지도 경로를 만들어 줘요.",
  },
  {
    name: "모험모드",
    description:
      "목적지를 숨긴 채 로드뷰 힌트만 보고 찾아가는 위치 기반 미션이에요. 목적지에 도착하면 미션이 완료돼요.",
  },
  {
    name: "극한모드",
    description:
      "룰렛을 돌려 여행지와 식당을 무작위로 뽑아요. 고민 없이 바로 떠나고 싶을 때 좋아요.",
  },
] as const;

export const STEPS = [
  { title: "그룹 만들기", description: "여행 이름과 기간을 정해 그룹을 만들어요." },
  { title: "초대 코드로 참여", description: "친구들은 초대 코드를 입력해 그룹에 들어와요." },
  {
    title: "취향 설문",
    description: "교통수단·음식·알레르기·예산 등 각자의 취향을 설문으로 남겨요.",
  },
  { title: "모드 선택", description: "스토리·모험·극한 중 원하는 방식으로 여행을 시작해요." },
] as const;
