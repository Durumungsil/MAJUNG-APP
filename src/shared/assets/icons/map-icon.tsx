import Image from "next/image";
import mapIcon from "./map.svg";

export default function MapIcon() {
  return <Image src={mapIcon} alt="" aria-hidden />;
}
