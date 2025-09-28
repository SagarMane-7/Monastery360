import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import styles from "./Mini_Map.module.css"

// Custom icons
const monasteryIcon = new L.Icon({
  iconUrl: "/assets/Home/monastery.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const hotelIcon = new L.Icon({
  iconUrl: "/assets/Home/quarantine.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const trekkingIcon = new L.Icon({
  iconUrl: "/assets/Home/trekking.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Fit bounds helper component
function FitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 17 });
    }
  }, [bounds, map]);
  return null;
}

// Small helper component for showing icon in popup
const MarkerIcon = ({ type }) => (
  <img
    src={
      type === "Hotel"
        ? "/assets/Home/quarantine.png"
        : type === "Trekking"
        ? "/assets/Home/trekking.png"
        : "/assets/Home/monastery.png"
    }
    alt={type}
    style={{ width: 20, height: 20, marginRight: 5 }}
  />
);

export default function MiniMap() {
  const mapRef = useRef(null);

  const [monastery, setMonastery] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);
  const [bounds, setBounds] = useState(null);

  // Fetch only the first monastery
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/monasteries")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setMonastery(res.data[0]); // first monastery only
          setBounds(L.latLngBounds([[Number(res.data[0].lat), Number(res.data[0].lng)]]));
        }
      })
      .catch((err) => console.error("Error fetching monastery:", err));
  }, []);

  // Fetch nearby places for the first monastery
  useEffect(() => {
    if (!monastery) return;

    axios
      .get(`http://localhost:5000/api/places?monasteryId=${monastery.id}`)
      .then((res) => setNearbyPlaces(res.data))
      .catch((err) => console.error("Error fetching nearby places:", err));
  }, [monastery]);

  const calculateDistance = (start, end) => {
    const R = 6371; // km
    const dLat = ((end[0] - start[0]) * Math.PI) / 180;
    const dLon = ((end[1] - start[1]) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((start[0] * Math.PI) / 180) *
        Math.cos((end[0] * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const showDirections = (place) => {
    if (!monastery) return;
    const start = [Number(monastery.lat), Number(monastery.lng)];
    const end = [Number(place.lat), Number(place.lng)];
    setRoute([start, end]);
    setDistance(calculateDistance(start, end).toFixed(2));

    if (mapRef.current) {
      mapRef.current.fitBounds([start, end], { padding: [50, 50], maxZoom: 17 });
    }
  };

  if (!monastery) return <div>Loading map...</div>;

  return (
    <div style={{ width: "60%", height: "400px" }}>
      <MapContainer
        center={[Number(monastery.lat), Number(monastery.lng)]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* First monastery marker */}
        <Marker
          position={[Number(monastery.lat), Number(monastery.lng)]}
          icon={monasteryIcon}
        >
          <Popup>
            <h3>{monastery.name}</h3>
            {nearbyPlaces.length > 0 && (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {nearbyPlaces.map((p) => (
                  <li key={p.id} style={{ marginBottom: 5 }}>
                    <MarkerIcon type={p.type} />
                    {p.name} ({p.type}){" "}
                    <button onClick={() => showDirections(p)} style={{ marginLeft: 5 }}>
                      Show Directions
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {distance && <p>Distance: {distance} km</p>}
          </Popup>
        </Marker>

        {/* Nearby places markers */}
        {nearbyPlaces.map((p) => (
          <Marker
            key={p.id}
            position={[Number(p.lat), Number(p.lng)]}
            icon={p.type === "Hotel" ? hotelIcon : trekkingIcon}
          >
            <Popup>{p.name}</Popup>
          </Marker>
        ))}

        {/* Draw route */}
        {route.length === 2 && <Polyline positions={route} color="blue" />}

        {/* Fit map bounds */}
        {bounds && <FitBounds bounds={bounds} />}
      </MapContainer>
    </div>
  );
}
