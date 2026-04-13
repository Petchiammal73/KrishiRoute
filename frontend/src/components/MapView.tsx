import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapView({ location }: any) {
  if (!location) return null;

  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={10}
      className="h-80 w-full rounded-xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[location.lat, location.lng]}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
  );
}