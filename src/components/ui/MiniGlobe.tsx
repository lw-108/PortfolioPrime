import React, { useEffect, useRef, useState } from "react";
import * as d3Geo from "d3-geo";

interface MiniGlobeProps {
  width?: number;
  height?: number;
  className?: string;
}

// Module-level caches to avoid repeating expensive fetching/parsing and point-in-polygon calculations
let cachedLandFeatures: any = null;
let cachedDots: { lng: number; lat: number }[] = [];
let isFetching = false;
const fetchCallbacks: ((data: any) => void)[] = [];

// Helper functions for point-in-polygon checks
const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
  const [x, y] = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }

  return inside;
};

const pointInFeature = (point: [number, number], feature: any): boolean => {
  const geometry = feature.geometry;

  if (geometry.type === "Polygon") {
    const coordinates = geometry.coordinates;
    if (!pointInPolygon(point, coordinates[0])) {
      return false;
    }
    for (let i = 1; i < coordinates.length; i++) {
      if (pointInPolygon(point, coordinates[i])) {
        return false;
      }
    }
    return true;
  } else if (geometry.type === "MultiPolygon") {
    for (const polygon of geometry.coordinates) {
      if (pointInPolygon(point, polygon[0])) {
        let inHole = false;
        for (let i = 1; i < polygon.length; i++) {
          if (pointInPolygon(point, polygon[i])) {
            inHole = true;
            break;
          }
        }
        if (!inHole) {
          return true;
        }
      }
    }
    return false;
  }

  return false;
};

const generateDotsInPolygon = (feature: any, dotSpacing = 24) => {
  const dots: [number, number][] = [];
  const bounds = d3Geo.geoBounds(feature);
  const [[minLng, minLat], [maxLng, maxLat]] = bounds;

  // Optimize spacing for the mini version (less dots = faster render and cleaner look)
  const stepSize = dotSpacing * 0.08;

  for (let lng = minLng; lng <= maxLng; lng += stepSize) {
    for (let lat = minLat; lat <= maxLat; lat += stepSize) {
      const point: [number, number] = [lng, lat];
      if (pointInFeature(point, feature)) {
        dots.push(point);
      }
    }
  }
  return dots;
};

export const MiniGlobe: React.FC<MiniGlobeProps> = ({
  width = 60,
  height = 60,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataLoaded, setDataLoaded] = useState(cachedDots.length > 0);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      if (cachedDots.length > 0) {
        if (active) setDataLoaded(true);
        return;
      }

      if (isFetching) {
        fetchCallbacks.push(() => {
          if (active) setDataLoaded(true);
        });
        return;
      }

      isFetching = true;
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
        );
        if (!response.ok) throw new Error("Failed to load map");
        const land = await response.json();
        cachedLandFeatures = land;

        const dotsTemp: { lng: number; lat: number }[] = [];
        land.features.forEach((feature: any) => {
          // Use slightly larger spacing for mini version to optimize performance and look
          const dots = generateDotsInPolygon(feature, 28);
          dots.forEach(([lng, lat]) => {
            dotsTemp.push({ lng, lat });
          });
        });
        cachedDots = dotsTemp;

        if (active) setDataLoaded(true);
        fetchCallbacks.forEach((cb) => cb(null));
        fetchCallbacks.length = 0;
      } catch (err) {
        console.error("Error loading globe data:", err);
      } finally {
        isFetching = false;
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !dataLoaded) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.scale(dpr, dpr);

    const radius = Math.min(width, height) / 2.1;
    const projection = d3Geo
      .geoOrthographic()
      .scale(radius)
      .translate([width / 2, height / 2])
      .clipAngle(90);

    const path = d3Geo.geoPath().projection(projection).context(context);

    let rotationAngle = 0;
    let animationId: number;

    const render = () => {
      if (!context) return;

      context.clearRect(0, 0, width, height);

      // 1. Draw glowing space/ocean background circle
      context.beginPath();
      context.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
      context.fillStyle = "rgba(255, 255, 255, 0.03)";
      context.fill();
      context.strokeStyle = "rgba(255, 255, 255, 0.2)";
      context.lineWidth = 1;
      context.stroke();

      // 2. Draw graticule
      const graticule = d3Geo.geoGraticule()();
      context.beginPath();
      path(graticule);
      context.strokeStyle = "rgba(255, 255, 255, 0.1)";
      context.lineWidth = 0.5;
      context.stroke();

      // 3. Draw land outlines
      if (cachedLandFeatures) {
        context.beginPath();
        cachedLandFeatures.features.forEach((feature: any) => {
          path(feature);
        });
        context.strokeStyle = "rgba(255, 255, 255, 0.35)";
        context.lineWidth = 0.75;
        context.stroke();
      }

      // 4. Draw land dots
      context.fillStyle = "#f54900"; // Primary accent theme color
      cachedDots.forEach((dot) => {
        const projected = projection([dot.lng, dot.lat]);
        // Only draw dots that are on the visible hemisphere
        if (projected) {
          // Verify visibility by calculating angular distance from central point of projection
          const rot = projection.rotate();
          const distance = d3Geo.geoDistance([dot.lng, dot.lat], [-rot[0], -rot[1]]);
          if (distance < Math.PI / 2) {
            context.beginPath();
            context.arc(projected[0], projected[1], 1.0, 0, 2 * Math.PI);
            context.fill();
          }
        }
      });

      // Smooth auto-rotation increment
      rotationAngle += 0.45;
      projection.rotate([rotationAngle, -12]); // slight tilt of 12 degrees
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [dataLoaded, width, height]);

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width, height }}>
      {!dataLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white/20 border-t-[#f54900] rounded-full animate-spin" />
        </div>
      )}
      <canvas ref={canvasRef} className="block pointer-events-none" />
    </div>
  );
};

export default MiniGlobe;
