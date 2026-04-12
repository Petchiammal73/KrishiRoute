import { useEffect, useRef, useState } from "react";

type LocationType = {
  lat: number;
  lng: number;
  label: string;
};

type Suggestion = {
  id: string;
  place_name: string;
  center: [number, number];
};

type Props = {
  onSelect: (loc: LocationType) => void;
};

export default function LocationSearch({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}&autocomplete=true&limit=5&country=IN`;

        const res = await fetch(url);
        const data = await res.json();
        setSuggestions(data.features || []);
        setOpen(true);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const selectSuggestion = (item: Suggestion) => {
    onSelect({
      lat: item.center[1],
      lng: item.center[0],
      label: item.place_name,
    });
    setQuery(item.place_name);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions.length > 0) {
        selectSuggestion(suggestions[0]);
      }
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        placeholder="Search village, town, district..."
        className="w-full border p-3 rounded-lg"
      />

      {open && suggestions.length > 0 && (
        <div className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-64 overflow-auto">
          {suggestions.map((item) => (
            <button
              key={item.id}
              type="button"
              className="w-full text-left p-3 hover:bg-green-50 border-b last:border-b-0"
              onClick={() => selectSuggestion(item)}
            >
              {item.place_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}