import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import type { LatLngExpression } from "leaflet";

type LocationMarkerProps = {
  setPosition: (pos: LatLngExpression) => void;
};

function LocationMarker({ setPosition }: LocationMarkerProps) {
  const [position, setPos] = useState<LatLngExpression | null>(null);

  useMapEvents({
    click(e) {
      setPos(e.latlng);
      setPosition(e.latlng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

type MapPickerProps = {
  setLocation: (pos: LatLngExpression) => void;
};

export default function MapPicker({ setLocation }: MapPickerProps) {
  const center: LatLngExpression = [17.385, 78.4867];

  return (
    <div className="h-64 w-full rounded-xl overflow-hidden">
      <MapContainer
        center={center}
        zoom={10}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setPosition={setLocation} />
      </MapContainer>
    </div>
  );
}
// "w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl"