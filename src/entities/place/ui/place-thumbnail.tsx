"use client";

import Image from "next/image";
import { cn } from "@/shared/lib";
import { usePlacePhoto } from "../api/queries";

type PlaceThumbnailProps = {
  placeId: string;
  /** 대체 텍스트용. 아직 모르면 null */
  placeName: string | null;
  className?: string;
};

/**
 * 카드에 들어가는 작은 장소 사진. 받는 중이거나 사진이 없으면 회색 칸만 둠.
 * Google 정책상 사진 작성자를 사진과 함께 표시해야 하므로 사진 아래쪽에 겹쳐 씀
 * (Google Maps 출처는 카드 목록 아래에 따로 있음)
 */
export default function PlaceThumbnail({ placeId, placeName, className }: PlaceThumbnailProps) {
  const { data: photo } = usePlacePhoto(placeId);
  const authors = photo?.attributions.map((attribution) => attribution.name).join(", ");

  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-natural-400", className)}>
      {photo && (
        <>
          {/* Google 사진은 서버에 저장(최적화 캐시)하면 안 되므로 원본 URL을 그대로 씀 */}
          <Image
            src={photo.url}
            alt={placeName ? `${placeName} 사진` : "장소 사진"}
            fill
            sizes="160px"
            unoptimized
            className="object-cover"
          />
          {authors && (
            <p className="absolute inset-x-0 bottom-0 truncate bg-black/40 px-1.5 text-xxs text-white">
              {authors}
            </p>
          )}
        </>
      )}
    </div>
  );
}
