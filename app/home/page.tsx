import { redirect } from "next/navigation";
import { HOME_PATH } from "@/shared/config/routes";

/** 예전 앱 홈 주소. 저장된 링크·설치된 앱에서 들어와도 그룹 목록으로 보냄 */
export default function Page() {
  redirect(HOME_PATH);
}
