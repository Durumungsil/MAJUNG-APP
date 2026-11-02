// 서버가 "오늘"을 Asia/Seoul 기준으로 판단하므로 같은 기준으로 날짜를 만듦
const SEOUL_DATE_FORMAT = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** 오늘 날짜(Asia/Seoul)를 YYYY-MM-DD로 */
export function getTodayInSeoul(now: Date = new Date()): string {
  return SEOUL_DATE_FORMAT.format(now);
}
