/** 알러지 목록을 경고 문구용으로 이어 붙임 (예: "땅콩/우유/새우") */
export function formatAllergyList(allergies: readonly string[]): string {
  return allergies.join("/");
}
