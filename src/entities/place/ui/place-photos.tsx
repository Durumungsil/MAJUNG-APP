"use client";

import Image from "next/image";
import { cn, useDragScroll } from "@/shared/lib";
import { PHOTO_SLOT_COUNT } from "../config/constants";

type PlacePhotosProps = {
  imageUrls: string[];
  placeName: string;
};

/** 옆으로 스와이프하는 사진 목록. 사진이 없으면 Figma처럼 회색 칸으로 채움 */
export default function PlacePhotos({ imageUrls, placeName }: PlacePhotosProps) {
  const slotCount = Math.max(imageUrls.length, PHOTO_SLOT_COUNT);
  const { dragging, dragScrollProps } = useDragScroll<HTMLUListElement>();

  return (
    <ul
      aria-label={`${placeName} 사진`}
      {...dragScrollProps}
      className={cn(
        "-mr-page flex touch-pan-x gap-3 overflow-x-auto overscroll-x-contain pr-page scrollbar-none select-none",
        dragging ? "cursor-grabbing" : "cursor-grab snap-x snap-mandatory",
      )}
    >
      {Array.from({ length: slotCount }, (_, index) => {
        const url = imageUrls[index];
        return (
          <li
            key={url ?? index}
            className={cn(
              "relative h-30 shrink-0 snap-start overflow-hidden rounded-lg bg-natural-400",
              index === 0 ? "w-45" : "w-30",
            )}
          >
            {url && (
              <Image
                src={url}
                alt={`${placeName} 사진 ${index + 1}`}
                fill
                sizes="180px"
                draggable={false}
                className="pointer-events-none object-cover"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
