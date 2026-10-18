import { cn } from "@/shared/lib";
import { BUSINESS_STATUS_LABEL, BUSINESS_STATUS_TEXT_CLASS } from "../config/business-status";
import type { BusinessStatus } from "../model/types";

type BusinessStatusTextProps = {
  status: BusinessStatus;
  className?: string;
};

export default function BusinessStatusText({ status, className }: BusinessStatusTextProps) {
  return (
    <span className={cn(BUSINESS_STATUS_TEXT_CLASS[status], className)}>
      {BUSINESS_STATUS_LABEL[status]}
    </span>
  );
}
