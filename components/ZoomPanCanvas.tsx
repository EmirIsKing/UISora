'use client'
import React, {
  useRef,
  useState,
  useImperativeHandle,
  useLayoutEffect,
  forwardRef,
  useEffect
} from 'react';

type ZoomPanCanvasProps = {
  children: React.ReactNode;
  /** When true, enable panning by drag. When false, pass pointer events to children. */
  panningEnabled?: boolean;
  minScale?: number;
  maxScale?: number;
  initialScale?: number;
  className?: string;
};

export type ZoomPanCanvasHandle = {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const PINCH_DETECT_DISTANCE = 0.001;

const ZoomPanCanvas = forwardRef<ZoomPanCanvasHandle, ZoomPanCanvasProps>(function ZoomPanCanvas(
    {
      children,
      panningEnabled = true,
      minScale = 0.1,
      maxScale = 10,
      initialScale = 0.3,
      className,
    },
    ref
) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [scale, setScale] = useState(initialScale);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);
  const queuedTransformRef = useRef<{
    nextScale: number;
    focalViewportX: number;
    focalViewportY: number;
  } | null>(null);

  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const lastPanRef = useRef<{ x: number; y: number } | null>(null);

  // Store the initial transform (translate + scale) to reset later
  const initialTransform = useRef({ x: 0, y: 0, scale: initialScale });

  useImperativeHandle(ref, () => ({
    zoomIn: () => smoothZoom(1.2),
    zoomOut: () => smoothZoom(1 / 1.2),
    reset: () => {
      setScale(initialTransform.current.scale);
      setTranslate({ x: initialTransform.current.x, y: initialTransform.current.y });
    },
  }));

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const { clientWidth, clientHeight } = viewport;

    // Compute initial centered position
    const initialX = clientWidth / 1.8 - 240;
    const initialY = clientHeight / 5;

    setTranslate({ x: initialX, y: initialY });

    // Save initial transform
    initialTransform.current = { x: initialX, y: initialY, scale: initialScale };
  }, []);

  useEffect(() => {
    // Prevent iOS Safari two-finger browser zoom
    const viewport = viewportRef.current;
    if (!viewport) return;
    const onGesture = (e: Event) => e.preventDefault();
    viewport.addEventListener('gesturestart', onGesture as EventListener, { passive: false });
    viewport.addEventListener('gesturechange', onGesture as EventListener, { passive: false });
    viewport.addEventListener('gestureend', onGesture as EventListener, { passive: false });
    return () => {
      viewport.removeEventListener('gesturestart', onGesture as EventListener);
      viewport.removeEventListener('gesturechange', onGesture as EventListener);
      viewport.removeEventListener('gestureend', onGesture as EventListener);
    };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      const multiplier = e.deltaY > 0 ? 1 / 1.1 : 1.1;
      applyTransform(scale * multiplier, e.clientX, e.clientY);
    };

    viewport.addEventListener("wheel", wheelHandler, { passive: false });

    return () => {
      viewport.removeEventListener("wheel", wheelHandler);
    };
  }, [scale]);

  function flushQueuedTransform() {
    const params = queuedTransformRef.current;
    if (!params) return;
    queuedTransformRef.current = null;
    const { nextScale, focalViewportX, focalViewportY } = params;
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return;
    const prevScale = scale;
    const newScale = clamp(nextScale, minScale, maxScale);
    const vx = focalViewportX;
    const vy = focalViewportY;
    const worldX = (vx - translate.x) / prevScale;
    const worldY = (vy - translate.y) / prevScale;
    const nextTranslateX = vx - worldX * newScale;
    const nextTranslateY = vy - worldY * newScale;
    setScale(newScale);
    setTranslate({ x: nextTranslateX, y: nextTranslateY });
  }

  function applyTransform(nextScale: number, focalViewportX: number, focalViewportY: number) {
    queuedTransformRef.current = { nextScale, focalViewportX, focalViewportY };
    if (rafIdRef.current == null) {
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        flushQueuedTransform();
      });
    }
  }

  function smoothZoom(multiplier: number) {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    applyTransform(scale * multiplier, rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  function onWheel(e: React.WheelEvent) {
    const multiplier = e.deltaY > 0 ? 1 / 1.1 : 1.1;
    applyTransform(scale * multiplier, e.clientX, e.clientY);
  }

  function onPointerDown(e: React.PointerEvent) {
    (e.target as Element).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    lastPanRef.current = { x: e.clientX, y: e.clientY };
  }

  function onPointerMove(e: React.PointerEvent) {
    const ptrs = pointers.current;
    if (!ptrs.has(e.pointerId)) return;

    const prev = ptrs.get(e.pointerId)!;
    const dx = e.clientX - prev.x;
    const dy = e.clientY - prev.y;
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (ptrs.size === 1) {
      if (panningEnabled) {
        const ddx = dx, ddy = dy;
        if (rafIdRef.current == null) {
          rafIdRef.current = requestAnimationFrame(() => {
            rafIdRef.current = null;
            setTranslate(t => ({ x: t.x + ddx, y: t.y + ddy }));
          });
        }
      }
      return;
    }

    if (ptrs.size >= 2) {
      const [aId, bId] = Array.from(ptrs.keys());
      const a = ptrs.get(aId)!;
      const b = ptrs.get(bId)!;
      const ax = a.x, ay = a.y, bx = b.x, by = b.y;
      const cx = (ax + bx) / 2;
      const cy = (ay + by) / 2;

      const prevA = aId === e.pointerId ? { x: ax - dx, y: ay - dy } : a;
      const prevB = bId === e.pointerId ? { x: bx - dx, y: by - dy } : b;
      const prevDist = Math.hypot(prevA.x - prevB.x, prevA.y - prevB.y);
      const nextDist = Math.hypot(ax - bx, ay - by);
      const distDelta = nextDist - prevDist;

      if (Math.abs(distDelta) > PINCH_DETECT_DISTANCE) {
        const multiplier = 1 + distDelta / 300; // pinch sensitivity
        applyTransform(scale * multiplier, cx, cy);
      }
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    pointers.current.delete(e.pointerId);
    lastPanRef.current = null;
  }

  return (
      <div
          ref={viewportRef}
          className={"relative w-full h-full overflow-hidden " + (className ?? '')}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onWheelCapture={onWheel}
      >
        <div
            ref={contentRef}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
              transformOrigin: '0 0',
            }}
        >
          <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
          >
            {children}
          </div>
        </div>
      </div>
  );
});

export default ZoomPanCanvas;
