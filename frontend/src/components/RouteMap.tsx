import { useEffect, useState } from "react";
import Map, { Source, Layer, Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";

type Point = { lat: number; lng: number };

type Props = {
  source: Point;
  mandis: any[];
};

const MANDI_COORDS: Record<string, Point> = {
  "Ashti(Karanja)": { lat: 20.45, lng: 77.25 },
  "Pulgaon": { lat: 21.08, lng: 78.97 },
  "Aarni": { lat: 20.99, lng: 78.22 },
  "Ashti": { lat: 18.65, lng: 75.15 },
  "Akola": { lat: 20.69, lng: 77.0 },
};

const formatTime = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h} hr ${m} min` : `${m} min`;
};

export default function RouteMap({ source, mandis }: Props) {
  const [routes, setRoutes] = useState<any[]>([]);
  const [mapRef, setMapRef] = useState<any>(null);
  const [activeRoute, setActiveRoute] = useState<number | null>(null);
  const [hoveredRoute, setHoveredRoute] = useState<number | null>(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      const promises = mandis.map(async (mandi: any, i: number) => {
        const coords =
          MANDI_COORDS[mandi.mandi] || { lat: 20 + i, lng: 77 + i };

        try {
          const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${source.lng},${source.lat};${coords.lng},${coords.lat}?geometries=geojson&overview=full&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`;

          const res = await fetch(url);
          const data = await res.json();
          const route = data.routes?.[0];

          if (route?.geometry) {
            return {
              mandi: mandi.mandi,
              isBest: mandi.isBest || false,
              geometry: route.geometry,
              coords,
              distance: (route.distance / 1000).toFixed(1),
              duration: Math.round(route.duration / 60),
            };
          }
        } catch (err) {
          console.error(err);
        }
      });

      const results = (await Promise.all(promises)).filter(
        (r): r is NonNullable<typeof r> => r !== undefined
      );

      setRoutes(results);

      
      if (mapRef && results.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        bounds.extend([source.lng, source.lat]);
        results.forEach((r) =>
          bounds.extend([r.coords.lng, r.coords.lat])
        );

        mapRef.fitBounds(bounds, { padding: 80, duration: 1000 });
      }
    };

    if (source && mandis?.length) fetchRoutes();
  }, [source, mandis, mapRef]);

  return (
    <Map
      ref={(ref) => setMapRef(ref)}
      initialViewState={{
        latitude: source.lat,
        longitude: source.lng,
        zoom: 6,
      }}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      style={{ width: "100%", height: "100%" }}

     
      onClick={(e) => {
        const features = mapRef?.queryRenderedFeatures(e.point, {
          layers: routes.map((_, i) => `route-${i}`),
        });

        if (features?.length > 0) {
          const index = Number(features[0].layer.id.split("-")[1]);
          setActiveRoute(index);
        }
      }}

      onMouseMove={(e) => {
        const features = mapRef?.queryRenderedFeatures(e.point, {
          layers: routes.map((_, i) => `route-${i}`),
        });

        mapRef.getCanvas().style.cursor =
          features?.length > 0 ? "pointer" : "";

        if (features?.length > 0) {
          const index = Number(features[0].layer.id.split("-")[1]);
          setHoveredRoute(index);
        } else {
          setHoveredRoute(null);
        }
      }}
    >
      {/* 🔵 SOURCE */}
      <Marker longitude={source.lng} latitude={source.lat} anchor="bottom">
        <svg width="36" height="44" viewBox="0 0 36 44">
          <path
            d="M18 0C10.28 0 4 6.28 4 14c0 8.1 14 26 14 26s14-17.9 14-26C32 6.28 25.72 0 18 0z"
            fill="#2563eb"
            stroke="#fff"
            strokeWidth="2"
          />
          <circle cx="18" cy="14" r="6" fill="#fff" />
        </svg>
      </Marker>

      {/* ROUTES */}
      {routes.map((route, i) => {
        const isActive = activeRoute === i;

        return (
          <Source key={i} type="geojson" data={route.geometry}>
            <Layer
              id={`route-${i}`}
              type="line"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color":
                  activeRoute === i
                    ? "#2563eb" // 🔵 active
                    : route.isBest
                    ? "#16a34a" // 🟢 best
                    : "#9ca3af", // ⚪ others
                "line-width": isActive ? 10 : route.isBest ? 8 : 5,
                "line-opacity": isActive ? 1 : 0.4,
              }}
            />
          </Source>
        );
      })}

      {/* DESTINATIONS */}
      {routes.map((route, i) => (
        <Marker
          key={i}
          longitude={route.coords.lng}
          latitude={route.coords.lat}
          anchor="bottom"
        >
          <div
            onClick={() => setActiveRoute(i)}
            className="cursor-pointer flex flex-col items-center"
          >
            {/* ✅ SHOW ONLY ON HOVER / CLICK */}
            {(hoveredRoute === i || activeRoute === i) && (
              <div className="bg-white text-xs px-2 py-1 rounded shadow mb-1">
                📍 {route.mandi} <br />
                {route.distance} km • {formatTime(route.duration)}
              </div>
            )}

            {/* PIN */}
            <svg
              width={activeRoute === i ? 40 : 32}
              height={activeRoute === i ? 48 : 40}
              viewBox="0 0 36 44"
              style={{
                transform:
                  activeRoute === i
                    ? "scale(1.15) translateY(-5px)"
                    : "translateY(-5px)",
                transition: "0.2s",
              }}
            >
              <path
                d="M18 0C10.28 0 4 6.28 4 14c0 8.1 14 26 14 26s14-17.9 14-26C32 6.28 25.72 0 18 0z"
                fill={
                  activeRoute === i
                    ? "#2563eb"
                    : route.isBest
                    ? "#16a34a"
                    : "#ef4444"
                }
                stroke="#fff"
                strokeWidth="2"
              />
              <circle cx="18" cy="14" r="6" fill="#fff" />
            </svg>
          </div>
        </Marker>
      ))}
    </Map>
  );
}
