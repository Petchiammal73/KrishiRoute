import MapView from "../components/MapView";

export default function MapPage() {
  const location = JSON.parse(
    localStorage.getItem("selectedLocation") || "null"
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        📍 Route Visualization
      </h1>

      <MapView location={location} />
    </div>
  );
}