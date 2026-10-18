import type { BusinessStatus } from "../model/types";

export const BUSINESS_STATUS_LABEL: Record<BusinessStatus, string> = {
  open: "영업중",
  closed: "영업종료",
  preparing: "영업준비",
};

export const BUSINESS_STATUS_TEXT_CLASS: Record<BusinessStatus, string> = {
  open: "text-green",
  closed: "text-red",
  preparing: "text-text-muted",
};
