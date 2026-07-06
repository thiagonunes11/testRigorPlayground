import { useState, useEffect, useRef, useCallback } from "react";
import Layout from "../components/Layout";
import "../styles/zoomLevel.css";

const MIN_PINCH_SCALE = 0.25;
const MAX_PINCH_SCALE = 4;

function getTouchDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.hypot(dx, dy);
}

function clampScale(scale) {
  return Math.min(MAX_PINCH_SCALE, Math.max(MIN_PINCH_SCALE, scale));
}

function getZoomMetrics(baselineDpr, manualScale) {
  const viewportScale = window.visualViewport?.scale ?? 1;
  const devicePixelRatio = window.devicePixelRatio;
  const dprScale = devicePixelRatio / baselineDpr;
  const pinchScale =
    viewportScale > 1.01 ? viewportScale : manualScale;

  return {
    zoomPercent: Math.round(pinchScale * dprScale * 100),
    viewportScale,
    devicePixelRatio,
    pinchScale,
  };
}

const ZoomLevel = () => {
  const containerRef = useRef(null);
  const baselineDpr = useRef(
    typeof window !== "undefined" ? window.devicePixelRatio : 1
  );
  const manualScaleRef = useRef(1);
  const pinchStartDistanceRef = useRef(null);
  const pinchStartScaleRef = useRef(1);
  const gestureStartScaleRef = useRef(1);

  const [metrics, setMetrics] = useState(() =>
    typeof window !== "undefined"
      ? getZoomMetrics(baselineDpr.current, 1)
      : { zoomPercent: 100, viewportScale: 1, devicePixelRatio: 1, pinchScale: 1 }
  );

  const updateZoom = useCallback(() => {
    setMetrics(getZoomMetrics(baselineDpr.current, manualScaleRef.current));
  }, []);

  const handleTouchStart = useCallback((event) => {
    if (event.touches.length === 2) {
      pinchStartDistanceRef.current = getTouchDistance(event.touches);
      pinchStartScaleRef.current = manualScaleRef.current;
    }
  }, []);

  const handleTouchMove = useCallback(
    (event) => {
      if (event.touches.length !== 2 || !pinchStartDistanceRef.current) {
        return;
      }

      const distance = getTouchDistance(event.touches);
      manualScaleRef.current = clampScale(
        pinchStartScaleRef.current *
          (distance / pinchStartDistanceRef.current)
      );
      updateZoom();
    },
    [updateZoom]
  );

  const handleTouchEnd = useCallback((event) => {
    if (event.touches.length < 2) {
      pinchStartDistanceRef.current = null;
    }
  }, []);

  useEffect(() => {
    const visualViewport = window.visualViewport;
    const container = containerRef.current;

    const handleViewportChange = () => {
      if (visualViewport && visualViewport.scale > 1.01) {
        manualScaleRef.current = 1;
      }
      updateZoom();
    };

    handleViewportChange();

    visualViewport?.addEventListener("resize", handleViewportChange);
    visualViewport?.addEventListener("scroll", handleViewportChange);
    window.addEventListener("resize", handleViewportChange);

    const handleGestureStart = (event) => {
      event.preventDefault();
      gestureStartScaleRef.current = manualScaleRef.current;
    };

    const handleGestureChange = (event) => {
      event.preventDefault();
      manualScaleRef.current = clampScale(
        gestureStartScaleRef.current * event.scale
      );
      updateZoom();
    };

    container?.addEventListener("gesturestart", handleGestureStart, {
      passive: false,
    });
    container?.addEventListener("gesturechange", handleGestureChange, {
      passive: false,
    });

    return () => {
      visualViewport?.removeEventListener("resize", handleViewportChange);
      visualViewport?.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
      container?.removeEventListener("gesturestart", handleGestureStart);
      container?.removeEventListener("gesturechange", handleGestureChange);
    };
  }, [updateZoom]);

  const scale = metrics.zoomPercent / 100;

  return (
    <Layout
      title="Zoom Level"
      description="Pinch on mobile or zoom in the desktop browser to see the current zoom percentage."
    >
      <div
        ref={containerRef}
        className="zoom-level-container"
        style={{ "--zoom-scale": scale }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div className="zoom-display" data-testid="zoom-display">
          <span className="zoom-value" data-testid="zoom-percent">
            {metrics.zoomPercent}%
          </span>
          <span className="zoom-label">Current zoom</span>
        </div>

        <div className="zoom-preview" aria-hidden="true">
          <div className="zoom-preview-ring" />
          <div className="zoom-preview-core" />
        </div>

        <div className="zoom-details">
          <p>
            <strong>Pinch scale:</strong> {metrics.pinchScale.toFixed(2)}×
          </p>
          <p>
            <strong>Viewport scale:</strong>{" "}
            {metrics.viewportScale.toFixed(2)}×
          </p>
          <p>
            <strong>Device pixel ratio:</strong>{" "}
            {metrics.devicePixelRatio.toFixed(2)}
          </p>
        </div>

        <small className="text-muted zoom-hint">
          On mobile, pinch anywhere on this area to zoom in or out. On desktop,
          use <kbd>Ctrl</kbd> + <kbd>+</kbd> / <kbd>-</kbd>, or pinch on a
          trackpad.
        </small>
      </div>
    </Layout>
  );
};

export default ZoomLevel;
