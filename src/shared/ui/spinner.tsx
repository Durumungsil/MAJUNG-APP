import Image from "next/image";
import { SpinnerDotIcon, spinnerRingImage } from "@/shared/assets";

/** Figma '취향 통합 대기' 화면의 로딩 링 */
export default function Spinner() {
  return (
    <div role="status" aria-label="로딩 중" className="relative size-20 animate-spin">
      <Image src={spinnerRingImage} alt="" fill sizes="80px" />
      <SpinnerDotIcon className="absolute top-[85%] left-[43%] size-3 text-primary-500" />
    </div>
  );
}
