import Image from "next/image";
import { cn } from "@/shared/lib";
import { PHOTO_SLOT_COUNT } from "../config/constants";

type PlacePhotosProps = {
  imageUrls: string[];
  placeName: string;
};

/** 가로 스크롤 사진 목록. 사진이 없으면 Figma처럼 회색 칸으로 채움 */
export default function PlacePhotos({ imageUrls, placeName }: PlacePhotosProps) {
  const slotCount = Math.max(imageUrls.length, PHOTO_SLOT_COUNT);

  return (
    <ul className="-mr-page flex gap-3 overflow-x-auto pr-page">
      {Array.from({ length: slotCount }, (_, index) => {
        const url = imageUrls[index];
        return (
          <li
            key={url ?? index}
            className={cn(
              "relative h-30 shrink-0 overflow-hidden rounded-lg bg-natural-400",
              index === 0 ? "w-45" : "w-30",
            )}
          >
            {url && (
              <Image
                src={url}
                alt={`${placeName} 사진 ${index + 1}`}
                fill
                sizes="180px"
                className="object-cover"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
