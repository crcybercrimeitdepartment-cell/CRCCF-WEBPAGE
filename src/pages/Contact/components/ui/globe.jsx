import React, { useEffect, useRef, useState } from "react";
import GlobeGl from "react-globe.gl";
import { cn } from "../../lib/utils";

export function Globe({
  className,
  config = {},
  markers = [],
  isPaused = false,
  autoRotate = true,
  rotationSpeed = 0.005, // Restored original slow rotation speed
  focusLocation,
  focusRequest = 0,
}) {
  const globeRef = useRef();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  // Handle Resize
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(containerRef.current);
    
    // Initial size
    if (containerRef.current.offsetWidth) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight, // Use actual height
      });
    }

    return () => observer.disconnect();
  }, []);

  // Handle Auto-Rotate
  useEffect(() => {
    if (!globeRef.current) return;
    
    // Set initial zoom level so the globe fits inside the container
    globeRef.current.pointOfView({ altitude: 2.2 });
    
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = autoRotate && !isPaused;
      controls.autoRotateSpeed = rotationSpeed * 200; // 0.005 * 200 = 1.0 (smooth, slow orbit)
      controls.enableZoom = false; // Disable zoom to keep it fixed in the card
    }
  }, [autoRotate, isPaused, rotationSpeed]);

  // Handle Focus
  useEffect(() => {
    if (!globeRef.current || !focusLocation || focusLocation.length < 2) return;
    
    // Animate to coordinates slowly and smoothly
    globeRef.current.pointOfView(
      { lat: focusLocation[0], lng: focusLocation[1], altitude: 2.2 },
      2500 // 2500ms (2.5 seconds) for a majestic, smooth sweep
    );
  }, [focusLocation, focusRequest]);

  // Helper to ensure color is a string
  const getMarkerColor = () => {
    if (Array.isArray(config.markerColor)) {
      const [r, g, b] = config.markerColor;
      return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
    }
    return config.markerColor || "#009EF7";
  };

  // Convert markers [lat, lng] to react-globe.gl point format
  const pointsData = markers.map((m) => ({
    lat: m.location[0],
    lng: m.location[1],
    size: m.size * 5, // Scale size up for react-globe.gl
    color: getMarkerColor(),
  }));

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute left-1/2 top-1/2 h-full w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing",
        className,
      )}
    >
      <GlobeGl
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        pointsData={pointsData}
        pointAltitude={0.05}
        pointColor="color"
        pointRadius="size"
        pointsMerge={false}
        showAtmosphere={true}
        atmosphereColor="#009EF7"
        atmosphereAltitude={0.15}
      />
    </div>
  );
}
