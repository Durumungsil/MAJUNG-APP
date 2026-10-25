import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import Button from "./button";

type ErrorStateProps = {
  message?: string;
  onRetry: () => void;
};

/** 조회 실패 시 보여주는 재시도 가능한 상태 */
export default function ErrorState({
  message = ERROR_MESSAGES.loadFailed,
  onRetry,
}: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-1 flex-col items-center justify-center gap-6">
      <p className="text-m text-black">{message}</p>
      <Button size="md" onClick={onRetry}>
        다시 시도하기
      </Button>
    </div>
  );
}
