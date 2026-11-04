import Image from "next/image";
import majungCharacter from "./majung-character.png";

type MajungCharacterImageProps = {
  className?: string;
};

/** 지도를 든 마중 캐릭터 */
export default function MajungCharacterImage({ className }: MajungCharacterImageProps) {
  return (
    <Image
      src={majungCharacter}
      alt="지도를 들고 있는 마중 캐릭터"
      priority
      className={className}
    />
  );
}
