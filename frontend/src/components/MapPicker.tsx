import { useEffect, useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type LocationType = {
  lat: number;
  lng: number;
};

type Props = {
  selectedLocation: LocationType | null;
  setLocation: (coords: LocationType) => void;
};

export default function MapPicker({ selectedLocation, setLocation }: Props) {
  const [marker, setMarker] = useState<LocationType | null>(null);
  const [viewState, setViewState] = useState({
    latitude: 17.385,
    longitude: 78.4867,
    zoom: 10,
  });

  useEffect(() => {
    if (selectedLocation) {
      setMarker(selectedLocation);
      setViewState({
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        zoom: 13,
      });
    }
  }, [selectedLocation]);

  return (
    <div className="h-64 w-full rounded-xl overflow-hidden">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={(e) => {
          const { lng, lat } = e.lngLat;
          const coords = { lat, lng };
          setMarker(coords);
          setLocation(coords);
          setViewState({
            latitude: lat,
            longitude: lng,
            zoom: 13,
          });
        }}
      >
        <NavigationControl position="top-right" />

        {marker &&
          Number.isFinite(marker.lat) &&
          Number.isFinite(marker.lng) && (
            <Marker
              longitude={marker.lng}
              latitude={marker.lat}
              anchor="bottom"
            >
              <div className="location-pin">
                <svg
                  width="32"
                  height="40"
                  viewBox="0 0 32 40"
                  fill="none"
                  className="location-svg"
                >
                  
                  <path
                    d="M16 0C9.37 0 4 5.37 4 12c0 7.25 11 24 12 24s12-16.75 12-24c0-6.63-5.37-12-12-12z"
                    fill="#2196F3"
                  />
                 
                  <circle cx="16" cy="12" r="6" fill="white" />
                  
                  <circle cx="16" cy="12" r="3" fill="#2196F3" />
                  
                  <path
                    d="M16 1C9.5 1 5 5.5 5 12c0 7.25 11 24 12 24s12-16.75 12-24c0-6.5-4.5-11-11-11z"
                    fill="rgba(0,0,0,0.3)"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </Marker>
          )}
      </Map>
    </div>
  );
}
