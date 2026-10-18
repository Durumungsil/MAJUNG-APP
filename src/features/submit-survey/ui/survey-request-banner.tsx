import Link from "next/link";
import { ChevronSmallIcon } from "@/shared/assets";

type SurveyRequestBannerProps = {
  groupName: string;
  href: string;
};

export default function SurveyRequestBanner({ groupName, href }: SurveyRequestBannerProps) {
  return (
    <Link href={href} className="flex items-center justify-between rounded-lg bg-secondary-400 p-5">
      <div className="flex flex-col">
        <p className="text-xs text-text-secondary">{groupName}의 취향 설문지가 도착했어요!</p>
        <p className="text-l text-black">취향 설문지 작성</p>
      </div>
      <ChevronSmallIcon className="size-4.5 rotate-180 text-text-muted" />
    </Link>
  );
}
