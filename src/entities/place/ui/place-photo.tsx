"use client";

import Image from "next/image";
import { Skeleton } from "@/shared/ui";
import { usePlacePhoto } from "../api/queries";

type PlacePhotoProps = {
  placeId: string;
  placeName: string;
};

/**
 * 상세 화면의 Google 사진 1장과 출처. 사진이 없거나 못 불러오면 Figma처럼 회색 칸만 둠.
 * Google 정책상 사진 작성자와 Google Maps 출처를 사진과 함께 표시해야 함
 */
export default function PlacePhoto({ placeId, placeName }: PlacePhotoProps) {
  const { data: photo, isPending } = usePlacePhoto(placeId);

  if (isPending) return <Skeleton className="h-30 w-45" />;

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
      {photo && (
        <figcaption className="text-xs text-text-muted">
          {photo.attributions.map((attribution, index) => (
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
          {photo.attributions.length > 0 && " · "}
          Google Maps
        </figcaption>
      )}
    </figure>
  );
}
