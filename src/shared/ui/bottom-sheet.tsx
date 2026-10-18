"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/shared/lib";

export type BottomSheetSnap = "peek" | "expanded" | "full";

const SNAP_ORDER: BottomSheetSnap[] = ["peek", "expanded", "full"];

const SNAP_HEIGHT_CLASS: Record<BottomSheetSnap, string> = {
  peek: "h-50",
  expanded: "h-157.5",
  full: "h-200.5",
};

/** 손을 뗐을 때 다음 단계로 넘어가는 최소 이동 거리 */
const DRAG_THRESHOLD_PX = 30;
/** 이 거리보다 적게 움직이면 끌기가 아니라 탭으로 봄 */
const TAP_SLOP_PX = 5;

type DragState = {
  pointerId: number;
  startY: number;
  startHeight: number;
  moved: boolean;
};

type BottomSheetProps = {
  open: boolean;
  snap: BottomSheetSnap;
  onSnapChange: (snap: BottomSheetSnap) => void;
  onClose: () => void;
  labelledBy: string;
  /** 시트 맨 아래 버튼 영역 */
  footer?: ReactNode;
  children: ReactNode;
};

export default function BottomSheet({
  open,
  snap,
  onSnapChange,
  onClose,
  labelledBy,
  footer,
  children,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const drag = useRef<DragState | null>(null);
  /** 핸들을 끈 직후 따라오는 click으로 다시 접히지 않게 막음 */
  const suppressHandleClick = useRef(false);
  const [dragHeight, setDragHeight] = useState<number | null>(null);

  if (!open) return null;

  const snapIndex = SNAP_ORDER.indexOf(snap);

  function moveSnap(step: 1 | -1) {
    const nextIndex = snapIndex + step;
    if (nextIndex < 0) {
      onClose();
      return;
    }
    // 끌어서는 expanded까지만 올림. full은 "리뷰 더보기"처럼 내용이 늘어날 때만 사용
    const maxIndex = Math.max(snapIndex, SNAP_ORDER.indexOf("expanded"));
    onSnapChange(SNAP_ORDER[Math.min(nextIndex, maxIndex)]);
  }

  function handleSheetPointerDown(event: PointerEvent<HTMLElement>) {
    suppressHandleClick.current = false;
    const sheet = sheetRef.current;
    if (!sheet || (event.pointerType === "mouse" && event.button !== 0)) return;

    // 접힌 상태에서는 시트 어디를 잡아도 끌 수 있고, 펼친 상태에서는 내용 스크롤을 위해 핸들만 끌 수 있음
    const onHandle = handleRef.current?.contains(event.target as Node) ?? false;
    if (snap !== "peek" && !onHandle) return;

    drag.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startHeight: sheet.getBoundingClientRect().height,
      moved: false,
    };
  }

  function handleSheetPointerMove(event: PointerEvent<HTMLElement>) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;

    const deltaY = event.clientY - current.startY;
    if (!current.moved) {
      if (Math.abs(deltaY) < TAP_SLOP_PX) return;
      // 움직이기 시작한 뒤에 캡처해야 안쪽 버튼의 탭(클릭)이 그대로 동작함
      current.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    setDragHeight(Math.max(0, current.startHeight - deltaY));
  }

  function handleSheetPointerUp(event: PointerEvent<HTMLElement>) {
    const current = drag.current;
    drag.current = null;
    setDragHeight(null);
    if (!current?.moved) return;

    suppressHandleClick.current = true;
    const deltaY = event.clientY - current.startY;
    if (deltaY < -DRAG_THRESHOLD_PX) moveSnap(1);
    else if (deltaY > DRAG_THRESHOLD_PX) moveSnap(-1);
  }

  function handleSheetPointerCancel() {
    drag.current = null;
    setDragHeight(null);
  }

  function handleHandleClick() {
    if (suppressHandleClick.current) {
      suppressHandleClick.current = false;
      return;
    }
    onSnapChange(snap === "peek" ? "expanded" : "peek");
  }

  const isDragging = dragHeight !== null;

  return (
    <>
      {snap === "full" && (
        <div
          aria-hidden
          className="fixed inset-y-0 left-1/2 z-40 w-full max-w-mobile -translate-x-1/2 bg-black"
        />
      )}
      <section
        ref={sheetRef}
        role="dialog"
        aria-labelledby={labelledBy}
        onPointerDown={handleSheetPointerDown}
        onPointerMove={handleSheetPointerMove}
        onPointerUp={handleSheetPointerUp}
        onPointerCancel={handleSheetPointerCancel}
        // 끄는 동안에는 손가락 위치를 따라 높이가 매 프레임 바뀌어 클래스로 표현할 수 없음
        style={isDragging ? { height: dragHeight } : undefined}
        className={cn(
          "fixed bottom-0 left-1/2 z-50 flex max-h-[calc(100dvh-var(--safe-top))] w-full max-w-mobile -translate-x-1/2 flex-col gap-10 rounded-t-lg bg-white px-page pb-[calc(var(--safe-bottom)+--spacing(11))]",
          SNAP_HEIGHT_CLASS[snap],
          !isDragging && "transition-[height] duration-300 ease-out",
          snap === "peek" || isDragging ? "touch-none overflow-hidden" : "overflow-y-auto",
        )}
      >
        <div className="flex flex-col gap-6">
          <button
            ref={handleRef}
            type="button"
            aria-label={snap === "peek" ? "자세히 보기" : "접기"}
            aria-expanded={snap !== "peek"}
            onClick={handleHandleClick}
            className="flex w-full touch-none items-center justify-center py-2.5"
          >
            <span className="h-1 w-15 rounded-[2.5px] bg-text-muted" />
          </button>
          {children}
        </div>
        {footer}
      </section>
    </>
  );
}
