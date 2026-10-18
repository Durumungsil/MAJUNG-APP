import Image from "next/image";
import stampComplete from "./stamp-complete.png";
import stampIncomplete from "./stamp-incomplete.png";

interface StampImageProps {
  isCompleted: boolean;
}

export default function StampImage({ isCompleted }: StampImageProps) {
  return (
    <Image
      src={isCompleted ? stampComplete : stampIncomplete}
      alt={isCompleted ? "완료" : "미완료"}
      className="h-15.25 w-18.5 shrink-0 object-cover"
    />
  );
}
