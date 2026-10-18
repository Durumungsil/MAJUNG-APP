import Image from "next/image";
import searchIcon from "./search.svg";

export default function SearchIcon() {
  return <Image src={searchIcon} alt="" aria-hidden />;
}
