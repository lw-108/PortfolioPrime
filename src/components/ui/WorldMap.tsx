import React, { useState, useEffect, useRef } from "react";

// Simple Mercator-like map projection
function project(lon: number, lat: number, width: number, height: number): [number, number] {
  const x = ((lon + 180) * width) / 360;
  const clippedLat = Math.max(-85, Math.min(85, lat));
  const y = (height / 2) - (width * Math.log(Math.tan(Math.PI / 4 + (clippedLat * Math.PI) / 360)) / (2 * Math.PI));
  return [x, y + 40];
}

export const WorldMap: React.FC = () => {
  const [geoData, setGeoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const width = 800;
  const height = 450;

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((res) => res.json())
      .then((topojsonData) => {
        const countriesTopology = topojsonData.objects.countries;
        const arcs = topojsonData.arcs;
        
        const decodedFeatures = countriesTopology.geometries.map((geom: any) => {
          let coordinates: any[] = [];
          if (geom.type === "Polygon") {
            coordinates = geom.arcs.map((ring: number[]) => 
              ring.map((arcIdx) => {
                const isReversed = arcIdx < 0;
                const idx = isReversed ? ~arcIdx : arcIdx;
                let arc = arcs[idx];
                let current = [0, 0];
                const points = arc.map((point: number[]) => {
                  current = [current[0] + point[0], current[1] + point[1]];
                  const lon = current[0] * topojsonData.transform.scale[0] + topojsonData.transform.translate[0];
                  const lat = current[1] * topojsonData.transform.scale[1] + topojsonData.transform.translate[1];
                  return [lon, lat];
                });
                return isReversed ? points.reverse() : points;
              }).flat()
            );
          } else if (geom.type === "MultiPolygon") {
            coordinates = geom.arcs.map((polygon: number[][]) =>
              polygon.map((ring) => 
                ring.map((arcIdx) => {
                  const isReversed = arcIdx < 0;
                  const idx = isReversed ? ~arcIdx : arcIdx;
                  let arc = arcs[idx];
                  let current = [0, 0];
                  const points = arc.map((point: number[]) => {
                    current = [current[0] + point[0], current[1] + point[1]];
                    const lon = current[0] * topojsonData.transform.scale[0] + topojsonData.transform.translate[0];
                    const lat = current[1] * topojsonData.transform.scale[1] + topojsonData.transform.translate[1];
                    return [lon, lat];
                  });
                  return isReversed ? points.reverse() : points;
                }).flat()
              )
            );
          }
          return {
            type: "Feature",
            properties: { name: geom.properties.name },
            geometry: { type: geom.type, coordinates }
          };
        });
        
        setGeoData(decodedFeatures);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load world map data:", err);
        setLoading(false);
      });
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getPath = (feature: any) => {
    const geom = feature.geometry;
    
    const projectRing = (ring: any[]) => {
      let path = "";
      let prevLon = 0;
      
      ring.forEach((coord, i) => {
        const lon = coord[0];
        const lat = coord[1];
        const [x, y] = project(lon, lat, width, height);
        
        if (i === 0) {
          path += `M${x.toFixed(1)},${y.toFixed(1)}`;
        } else {
          // If we detect a meridian crossing jump (like East Russia to West Alaska), 
          // start a new sub-path (M) instead of continuing the line (L)
          const isAntiMeridianCrossing = Math.abs(lon - prevLon) > 180;
          path += ` ${isAntiMeridianCrossing ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
        }
        prevLon = lon;
      });
      return path + " Z";
    };

    if (geom.type === "Polygon") {
      return geom.coordinates.map(projectRing).join(" ");
    } else if (geom.type === "MultiPolygon") {
      return geom.coordinates
        .map((polygon: any[]) => polygon.map(projectRing).join(" "))
        .join(" ");
    }
    return "";
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full mt-12 overflow-hidden select-none flex flex-col items-center justify-center min-h-[220px] sm:min-h-[360px] md:min-h-[450px] relative"
    >
      {loading ? (
        <div className="flex items-center justify-center h-full text-[10px] text-muted-foreground animate-pulse font-clash">
          LOADING WANDERING MAP...
        </div>
      ) : (
        <div className="relative w-full flex flex-col items-center aspect-video">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full text-foreground/40"
            style={{
              maskImage: "url('/stripe.svg')",
              WebkitMaskImage: "url('/stripe.svg')",
              maskRepeat: "repeat",
              WebkitMaskRepeat: "repeat",
              maskSize: "14px 14px",
              WebkitMaskSize: "14px 14px",
            }}
          >
            <g>
              {geoData?.map((feature: any, idx: number) => {
                const name = feature.properties.name;
                const isHovered = hoveredCountry === name;
                return (
                  <path
                    key={`${name}-${idx}`}
                    d={getPath(feature)}
                    fill={isHovered ? "var(--map-hovered)" : "var(--map-unvisited)"}
                    stroke="var(--map-border)"
                    strokeWidth={isHovered ? "1.2" : "0.6"}
                    className="transition-colors duration-200 cursor-pointer pointer-events-auto"
                    onMouseEnter={() => setHoveredCountry(name)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    style={{
                      opacity: 1.0,
                    }}
                  />
                );
              })}
            </g>
          </svg>

          {/* Mouse Follow Tooltip */}
          {hoveredCountry && (
            <div
              className="absolute pointer-events-none bg-[#ffffe3] dark:bg-black/95 text-[#f54900] border border-neutral-300 dark:border-neutral-800 text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 z-50 rounded-md shadow-2xl font-clash animate-in fade-in zoom-in-95 duration-100"
              style={{
                top: mousePos.y + 15,
                left: mousePos.x + 15,
              }}
            >
              {hoveredCountry}
            </div>
          )}
          
          {/* Bottom Tooltip Label */}
          <div className="h-6 mt-4 flex items-center justify-center">
            {hoveredCountry ? (
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#f54900] animate-in fade-in slide-in-from-bottom-1 duration-200">
                WANDERING IN: {hoveredCountry}
              </span>
            ) : (
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/80 transition-opacity">
                HOVER OVER TO WANDER
              </span>
            )}
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{ __html: `
        .dark {
          --map-border: rgba(16, 16, 14, 0.8);
          --map-hovered: #ff6a22;
          --map-unvisited: rgba(255, 255, 255, 0.75);
        }
        .light {
          --map-border: rgba(255, 255, 227, 0.8);
          --map-hovered: #f54900;
          --map-unvisited: rgba(16, 16, 14, 0.75);
        }
      `}} />
    </div>
  );
};

export default WorldMap;
