import { cn } from "@/shared/lib";

type GoogleMapsAttributionProps = {
  className?: string;
};

/**
 * Google Places 데이터(장소 이름·사진 등)를 Google 지도 없이 보여줄 때 붙이는 출처 표기.
 * Google Maps Platform 정책상 "Google Maps" 문구는 번역·변형하지 않음
 */
export default function GoogleMapsAttribution({ className }: GoogleMapsAttributionProps) {
  return (
    <p translate="no" className={cn("font-google text-xxs text-text-muted", className)}>
      Google Maps
    </p>
  );
}
