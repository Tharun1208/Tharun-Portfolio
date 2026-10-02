import { useRef } from "react";

/**
 * Subtle cursor-driven 3D tilt for cards.
 * Pure CSS transform driven from mouse events — no re-renders,
 * no WebGL, works everywhere and does nothing on touch devices.
 */
function TiltCard({
  children,
  className = "",
  max = 7,
  perspective = 1000,
  lift = 6,
  ...rest
}) {
  const ref = useRef(null);
  const frame = useRef(0);

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
  };

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const px = (e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5;
      const py = (e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5;
      const rotY = px * max * 2;
      const rotX = -py * max * 2;
      node.style.transform = `perspective(${perspective}px) rotateX(${rotX.toFixed(
        2
      )}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(${lift}px)`;
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ transformStyle: "preserve-3d" }}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default TiltCard;
