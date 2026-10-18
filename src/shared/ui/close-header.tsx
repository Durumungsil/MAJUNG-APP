import Link from "next/link";
import { CloseIcon } from "@/shared/assets";

type CloseHeaderProps = {
  closeHref: string;
};

export default function CloseHeader({ closeHref }: CloseHeaderProps) {
  return (
    <header className="flex justify-end">
      <Link href={closeHref} aria-label="닫기" className="text-black">
        <CloseIcon className="size-4" />
      </Link>
    </header>
  );
}
