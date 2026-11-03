import Image from "next/image";
import type { PlacePhoto as PlacePhotoData } from "../model/types";

type PlacePhotoProps = {
  photo: PlacePhotoData | null;
  placeName: string;
};

/**
 * 상세 화면의 Google 사진 1장과 출처. 사진이 없으면 Figma처럼 회색 칸만 둠.
 * Google 정책상 사진 작성자와 Google Maps 출처를 사진과 함께 표시해야 함.
 * 사진이 없어도 장소 이름이 Google 데이터이므로 Google Maps 출처는 항상 표시함
 */
export default function PlacePhoto({ photo, placeName }: PlacePhotoProps) {
  return (
    <figure className="flex flex-col gap-1">
      <div className="relative h-30 w-45 overflow-hidden rounded-lg bg-natural-400">
        {photo && (
          // Google 사진은 서버에 저장(최적화 캐시)하면 안 되므로 원본 URL을 그대로 씀
          <Image
            src={photo.url}
            alt={`${placeName} 사진`}
            fill
            sizes="180px"
            unoptimized
            className="object-cover"
          />
        )}
      </div>
      <figcaption className="text-xs text-text-muted">
        {photo?.attributions.map((attribution, index) => (
          <span key={`${attribution.name}-${index}`}>
            {index > 0 && ", "}
            {attribution.uri ? (
              <a href={attribution.uri} target="_blank" rel="noopener noreferrer">
                {attribution.name}
              </a>
            ) : (
              attribution.name
            )}
          </span>
        ))}
        {photo && photo.attributions.length > 0 && " · "}
        <span translate="no" className="font-google">
          Google Maps
        </span>
      </figcaption>
    </figure>
  );
}
