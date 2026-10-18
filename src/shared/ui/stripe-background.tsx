/** 스토리 모드 화면 뒤에 깔리는 노란 사선 장식 (Figma 기준 402px 프레임 좌표) */
export default function StripeBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-32 left-[181.76px] flex h-[235.51px] w-[351.24px] items-center justify-center">
        <div className="h-[112.37px] w-[321.58px] flex-none scale-y-99 rotate-[153.71deg] skew-x-[7.77deg] rounded-full bg-secondary-300" />
      </div>
      <div className="absolute top-[376.83px] left-[13px] flex h-[389px] w-[453.1px] items-center justify-center">
        <div className="h-[117.06px] w-[480.12px] flex-none scale-y-99 rotate-[139.28deg] skew-x-[8.95deg] rounded-full bg-secondary-300" />
      </div>
      <div className="absolute top-[227.33px] left-[188.94px] flex h-[261.82px] w-[338.56px] items-center justify-center">
        <div className="h-[114.99px] w-[315px] flex-none scale-y-99 rotate-[34.38deg] -skew-x-[8.73deg] rounded-full bg-secondary-300" />
      </div>
      <div className="absolute top-[623.61px] left-[24.85px] flex h-[343.39px] w-[457.77px] items-center justify-center">
        <div className="h-[114.99px] w-[459.44px] flex-none scale-y-99 rotate-[34.38deg] -skew-x-[8.73deg] rounded-full bg-secondary-300" />
      </div>
    </div>
  );
}
