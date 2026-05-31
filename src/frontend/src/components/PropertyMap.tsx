import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { PropertyStatus } from "../types";
import type { Property } from "../types";

// Fix Leaflet default marker icons
const DefaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface PropertyMapProps {
  properties?: Property[];
  mode?: "view" | "picker";
  selectedLat?: number;
  selectedLng?: number;
  onLocationSelect?: (lat: number, lng: number) => void;
  className?: string;
}

export default function PropertyMap({
  properties = [],
  mode = "view",
  selectedLat,
  selectedLng,
  onLocationSelect,
  className = "",
}: PropertyMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const pickerMarkerRef = useRef<L.Marker | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const osmLayerRef = useRef<L.TileLayer | null>(null);
  const satelliteLayerRef = useRef<L.TileLayer | null>(null);
  const [isSatellite, setIsSatellite] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: map initialized once on mount
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Default center: India
    const defaultCenter: L.LatLngTuple = [20.5937, 78.9629];
    const defaultZoom = mode === "picker" ? 5 : 10;

    let initialCenter: L.LatLngTuple = defaultCenter;
    let initialZoom = defaultZoom;

    if (mode === "picker" && selectedLat && selectedLng) {
      initialCenter = [selectedLat, selectedLng];
      initialZoom = 15;
    } else if (mode === "view" && properties.length > 0) {
      const validProps = properties.filter((p) => p.latitude && p.longitude);
      if (validProps.length > 0) {
        initialCenter = [validProps[0].latitude, validProps[0].longitude];
        initialZoom = validProps.length === 1 ? 15 : 10;
      }
    }

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: true,
    });

    const osmLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      },
    );

    const satelliteLayer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { attribution: "Tiles &copy; Esri", maxZoom: 19 },
    );

    osmLayer.addTo(map);
    osmLayerRef.current = osmLayer;
    satelliteLayerRef.current = satelliteLayer;
    mapRef.current = map;

    if (mode === "view") {
      for (const property of properties) {
        if (!property.latitude || !property.longitude) continue;
        const isAvailable = property.status === PropertyStatus.available;
        const color = isAvailable ? "#22c55e" : "#f97316";
        const icon = L.divIcon({
          className: "",
          html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        const marker = L.marker([property.latitude, property.longitude], {
          icon,
        });
        const price = property.price
          ? `\u20B9${Number(property.price).toLocaleString("en-IN")}`
          : "N/A";
        marker.bindPopup(`
          <div style="color:white;padding:4px;min-width:140px">
            <div style="font-weight:600;font-size:13px;margin-bottom:4px">${property.title}</div>
            <div style="font-size:11px;opacity:0.8">${property.areaSizeSqFt ?? ""} sq ft</div>
            <div style="font-size:12px;color:#a5f3fc;font-weight:500">${price}</div>
            <div style="margin-top:4px;font-size:11px;padding:2px 6px;border-radius:999px;background:${color};display:inline-block">${isAvailable ? "Available" : "Sold"}</div>
          </div>
        `);
        marker.addTo(map);
        markersRef.current.push(marker);
      }

      if (properties.length > 1) {
        const validProps = properties.filter((p) => p.latitude && p.longitude);
        if (validProps.length > 1) {
          const bounds = L.latLngBounds(
            validProps.map((p) => [p.latitude, p.longitude] as L.LatLngTuple),
          );
          map.fitBounds(bounds, { padding: [40, 40] });
        }
      }
    }

    if (mode === "picker") {
      if (selectedLat && selectedLng) {
        pickerMarkerRef.current = L.marker([selectedLat, selectedLng], {
          draggable: true,
        }).addTo(map);
        pickerMarkerRef.current.on("dragend", (e) => {
          const pos = (e.target as L.Marker).getLatLng();
          onLocationSelect?.(
            Number.parseFloat(pos.lat.toFixed(6)),
            Number.parseFloat(pos.lng.toFixed(6)),
          );
        });
      }
      map.on("click", (e: L.LeafletMouseEvent) => {
        const lat = Number.parseFloat(e.latlng.lat.toFixed(6));
        const lng = Number.parseFloat(e.latlng.lng.toFixed(6));
        if (pickerMarkerRef.current) {
          pickerMarkerRef.current.setLatLng([lat, lng]);
        } else {
          pickerMarkerRef.current = L.marker([lat, lng], {
            draggable: true,
          }).addTo(map);
          pickerMarkerRef.current.on("dragend", (ev) => {
            const pos = (ev.target as L.Marker).getLatLng();
            onLocationSelect?.(
              Number.parseFloat(pos.lat.toFixed(6)),
              Number.parseFloat(pos.lng.toFixed(6)),
            );
          });
        }
        onLocationSelect?.(lat, lng);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markersRef.current = [];
      pickerMarkerRef.current = null;
      userMarkerRef.current = null;
    };
  }, []);

  const handleLiveLocation = () => {
    if (!navigator.geolocation || !mapRef.current) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setUserLocation({ lat, lng });
        const pulseIcon = L.divIcon({
          className: "",
          html: '<div class="user-location-pulse"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });
        if (userMarkerRef.current) {
          userMarkerRef.current.setLatLng([lat, lng]);
        } else {
          userMarkerRef.current = L.marker([lat, lng], { icon: pulseIcon })
            .bindPopup(
              '<div style="color:white;padding:4px">Your Location</div>',
            )
            .addTo(mapRef.current!);
        }
        mapRef.current!.flyTo([lat, lng], 15, { animate: true, duration: 1.5 });
      },
      (err) => console.warn("Geolocation error:", err),
    );
  };

  const handleSatelliteToggle = () => {
    if (!mapRef.current || !osmLayerRef.current || !satelliteLayerRef.current)
      return;
    if (isSatellite) {
      mapRef.current.removeLayer(satelliteLayerRef.current);
      osmLayerRef.current.addTo(mapRef.current);
    } else {
      mapRef.current.removeLayer(osmLayerRef.current);
      satelliteLayerRef.current.addTo(mapRef.current);
    }
    setIsSatellite(!isSatellite);
  };

  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-lg ${className}`}
    >
      <div ref={mapContainerRef} style={{ height: "320px", width: "100%" }} />
      {/* Map Controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-[1000]">
        <button
          type="button"
          onClick={handleLiveLocation}
          title="My Location"
          aria-label="My Location"
          data-ocid="map.live_location_button"
          className="w-9 h-9 rounded-full bg-slate-900/90 border border-indigo-500/40 text-white flex items-center justify-center shadow-lg hover:bg-indigo-600/80 transition-colors backdrop-blur-sm"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <title>My Location</title>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleSatelliteToggle}
          title={isSatellite ? "Street View" : "Satellite View"}
          aria-label={
            isSatellite ? "Switch to Street View" : "Switch to Satellite View"
          }
          data-ocid="map.satellite_toggle"
          className="w-9 h-9 rounded-full bg-slate-900/90 border border-indigo-500/40 text-white flex items-center justify-center shadow-lg hover:bg-indigo-600/80 transition-colors backdrop-blur-sm"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <title>Toggle satellite view</title>
            <path d="M3 12a9 9 0 1 0 18 0A9 9 0 0 0 3 12z" />
            <path d="M3 12h18M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" />
          </svg>
        </button>
      </div>
      {mode === "picker" && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[1000] bg-slate-900/90 text-white text-xs px-3 py-1 rounded-full border border-indigo-500/40 backdrop-blur-sm">
          Click on map to set location
        </div>
      )}
      {userLocation && mode === "view" && (
        <div className="absolute bottom-3 left-3 z-[1000] bg-slate-900/90 text-white text-xs px-3 py-1 rounded-lg border border-blue-500/40 backdrop-blur-sm">
          Location found
        </div>
      )}
    </div>
  );
}
