"use client";

import { useRef, useState, type PointerEvent } from "react";

const DRAG_SLOP_PX = 5;

type DragScrollState = {
  pointerId: number;
  startX: number;
  startScrollLeft: number;
  moved: boolean;
};

export function useDragScroll<T extends HTMLElement>() {
  const drag = useRef<DragScrollState | null>(null);
  const [dragging, setDragging] = useState(false);

  function handlePointerDown(event: PointerEvent<T>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      moved: false,
    };
  }

  function handlePointerMove(event: PointerEvent<T>) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - current.startX;
    if (!current.moved) {
      if (Math.abs(deltaX) < DRAG_SLOP_PX) return;
      current.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
    }
    event.currentTarget.scrollLeft = current.startScrollLeft - deltaX;
  }

  function handlePointerEnd() {
    drag.current = null;
    setDragging(false);
  }

  return {
    dragging,
    dragScrollProps: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerCancel: handlePointerEnd,
    },
  };
}
