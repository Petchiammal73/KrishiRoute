import { useEffect, useState } from "react";
import Map, { Source, Layer, Marker } from "react-map-gl";

type Point = { lat: number; lng: number };

type Props = {
  source: Point;
  mandis: any[];
  routes: any[];
};

const MANDI_COORDS: Record<string, Point> = {
  "Ashti(Karanja)": { lat: 20.45, lng: 77.25 },
  "Pulgaon": { lat: 21.08, lng: 78.97 },
  "Aarni": { lat: 20.99, lng: 78.22 },
  "Ashti": { lat: 18.65, lng: 75.15 },
  "Akola": { lat: 20.69, lng: 77.00 }
};

export default function RouteMap({ source, mandis }: Props) {
  const [routes, setRoutes] = useState<any[]>([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      console.log("Source:", source);
      
      const results: any[] = [];
      
      for (let i = 0; i < Math.min(5, mandis.length); i++) {
        const mandi = mandis[i];
        const mockCoords = MANDI_COORDS[mandi.mandi] || { lat: 20 + i, lng: 77 + i };
        
        console.log(`${mandi.mandi} using coords:`, mockCoords);

        try {
          const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${source.lng},${source.lat};${mockCoords.lng},${mockCoords.lat}?geometries=geojson&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`;
          
          const res = await fetch(url);
          const data = await res.json();
          
          console.log(`${mandi.mandi} API response:`, data.routes?.[0]?.distance);

          if (data.routes?.[0]?.geometry) {
            results.push({
              mandi: mandi.mandi,
              isBest: mandi.isBest || false,
              geometry: data.routes[0].geometry,
              distance: data.routes[0].distance,
              duration: data.routes[0].duration,
              coords: mockCoords,
              color: mandi.isBest ? "#10B981" : ["#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444"][i % 4]
            });
          }
        } catch (err) {
          console.error(`Route failed for ${mandi.mandi}:`, err);
        }
      }
      
      console.log("Routes created:", results.length);
      setRoutes(results);
    };

    if (source?.lat && source?.lng && mandis?.length) {
      fetchRoutes();
    }
  }, [mandis, source]);

  return (
    <div className="h-[500px] w-full rounded-3xl shadow-2xl overflow-hidden bg-white border-4 border-blue-200">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
        <h3 className="font-bold text-lg">🗺️ Routes: {routes.length}/5</h3>
      </div>
      
      <Map
        initialViewState={{
          latitude: source.lat || 19.0,
          longitude: source.lng || 78.0,
          zoom: 6,
        }}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ width: "100%", height: "100%" }}
      >
        {/* SOURCE - Blue Pin */}
        <Marker longitude={source.lng} latitude={source.lat} anchor="bottom">
          <svg width="36" height="44" viewBox="0 0 36 44">
            <path d="M18 0C10.28 0 4 6.28 4 14c0 8.1 13 26 14 26s14-17.9 14-26C32 6.28 25.72 0 18 0z" fill="#3B82F6"/>
            <circle cx="18" cy="14" r="7" fill="white"/>
            <circle cx="18" cy="14" r="4" fill="#3B82F6"/>
          </svg>
        </Marker>

        {/* ROUTES */}
        {routes.map((route, i) => (
          <Source key={i} type="geojson" data={route.geometry}>
            <Layer
              type="line"
              paint={{
                "line-color": route.color,
                "line-width": route.isBest ? 7 : 5,
                "line-opacity": 0.9,
              }}
            />
          </Source>
        ))}

        {/* DESTINATIONS */}
        {routes.map((route, i) => (
          <Marker key={i} longitude={route.coords.lng} latitude={route.coords.lat} anchor="bottom">
            <svg width="32" height="40" viewBox="0 0 32 40">
              <path d="M16 0C9.37 0 4 5.37 4 12c0 7.25 11 24 12 24s12-16.75 12-24c0-6.63-5.37-12-12-12z" fill={route.color}/>
              <circle cx="16" cy="12" r="6" fill="white"/>
              <circle cx="16" cy="12" r="3" fill={route.color}/>
            </svg>
          </Marker>
        ))}
      </Map>
    </div>
  );
}