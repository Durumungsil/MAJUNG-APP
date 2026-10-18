"use client";

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";

const LONG_PRESS_MS = 400;
const MOVE_CANCEL_PX = 8;

type UseLongPressReorderOptions = {
  onMove: (from: number, to: number) => void;
};

/**
 * 항목을 꾹 누르면 집어 들고, 손가락이 지나가는 항목 위치로 옮김.
 * getItemProps가 항목 요소에 data-reorder-index를 달아 위치를 찾음
 */
export function useLongPressReorder({ onMove }: UseLongPressReorderOptions) {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // 집어 든 동안에는 터치 스크롤을 막음 (touch-action은 제스처 도중 바꿀 수 없음)
  useEffect(() => {
    if (draggingIndex === null) return;

    function handleWindowTouchMove(event: TouchEvent) {
      event.preventDefault();
    }

    window.addEventListener("touchmove", handleWindowTouchMove, { passive: false });
    return () => window.removeEventListener("touchmove", handleWindowTouchMove);
  }, [draggingIndex]);

  function clearTimer() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }

  function handleItemContextMenu(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
  }

  function getItemProps(index: number) {
    function handlePointerDown(event: PointerEvent<HTMLElement>) {
      pressStart.current = { x: event.clientX, y: event.clientY };
      const target = event.currentTarget;
      const pointerId = event.pointerId;
      clearTimer();
      timer.current = setTimeout(() => {
        target.setPointerCapture(pointerId);
        setDraggingIndex(index);
      }, LONG_PRESS_MS);
    }

    function handlePointerMove(event: PointerEvent<HTMLElement>) {
      if (draggingIndex === null) {
        const start = pressStart.current;
        if (
          start &&
          Math.hypot(event.clientX - start.x, event.clientY - start.y) > MOVE_CANCEL_PX
        ) {
          clearTimer();
        }
        return;
      }

      const hovered = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest<HTMLElement>("[data-reorder-index]");
      const hoveredIndex = Number(hovered?.dataset.reorderIndex);
      if (Number.isInteger(hoveredIndex) && hoveredIndex !== draggingIndex) {
        onMove(draggingIndex, hoveredIndex);
        setDraggingIndex(hoveredIndex);
      }
    }

    function handlePointerEnd() {
      clearTimer();
      pressStart.current = null;
      setDraggingIndex(null);
    }

    return {
      "data-reorder-index": index,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerCancel: handlePointerEnd,
      onContextMenu: handleItemContextMenu,
    };
  }

  return { draggingIndex, getItemProps };
}
