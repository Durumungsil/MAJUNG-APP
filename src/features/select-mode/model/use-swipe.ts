"use client";

import { useRef, useState, type MouseEvent, type PointerEvent } from "react";

/** 이 거리 이상 움직여야 탭이 아니라 드래그로 판단 */
const DRAG_START_DISTANCE_PX = 5;

type UseSwipeOptions = {
  onSwipeEnd: (dragX: number) => void;
};

export function useSwipe({ onSwipeEnd }: UseSwipeOptions) {
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startXRef = useRef<number | null>(null);
  const dragXRef = useRef(0);
  const draggingRef = useRef(false);
  const suppressClickRef = useRef(false);

  function reset() {
    startXRef.current = null;
    dragXRef.current = 0;
    draggingRef.current = false;
    setDragging(false);
    setDragX(0);
  }

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    startXRef.current = event.clientX;
    suppressClickRef.current = false;
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (startXRef.current === null) return;
    const deltaX = event.clientX - startXRef.current;

    if (!draggingRef.current) {
      if (Math.abs(deltaX) < DRAG_START_DISTANCE_PX) return;
      draggingRef.current = true;
      suppressClickRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
    }

    dragXRef.current = deltaX;
    setDragX(deltaX);
  }

  function handlePointerUp() {
    if (startXRef.current === null) return;
    const wasDragging = draggingRef.current;
    const finalDragX = dragXRef.current;
    reset();
    if (wasDragging) onSwipeEnd(finalDragX);
  }

  function handlePointerCancel() {
    reset();
  }

  function handleClickCapture(event: MouseEvent<HTMLElement>) {
    if (!suppressClickRef.current) return;
    suppressClickRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  }

  return {
    dragX,
    dragging,
    swipeHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
      onClickCapture: handleClickCapture,
    },
  };
}
