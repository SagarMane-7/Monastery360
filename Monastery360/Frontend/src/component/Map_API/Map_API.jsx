import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import styles from "./Map_API.module.css"

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


function FitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 17 });
    }
  }, [bounds, map]);
  return null;
}


const MarkerIcon = ({ type }) => {
  return (
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
};

export default function MapComponent() {
  const mapRef = useRef(null);

  const [monasteries, setMonasteries] = useState([]);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selectedMonastery, setSelectedMonastery] = useState(null);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/monasteries")
      .then((res) => setMonasteries(res.data))
      .catch((err) => console.error("Error fetching monasteries:", err));
  }, []);

  useEffect(() => {
    if (!selectedMonastery) return;

    axios
      .get(`http://localhost:5000/api/places?monasteryId=${selectedMonastery.id}`)
      .then((res) => setNearbyPlaces(res.data))
      .catch((err) => console.error("Error fetching nearby places:", err));
  }, [selectedMonastery]);

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
    if (!selectedMonastery) return;
    const start = [Number(selectedMonastery.lat), Number(selectedMonastery.lng)];
    const end = [Number(place.lat), Number(place.lng)];
    setRoute([start, end]);
    setDistance(calculateDistance(start, end).toFixed(2));

    if (mapRef.current) {
      mapRef.current.fitBounds([start, end], { padding: [50, 50], maxZoom: 17 }); 
    }
  };

  return (
    <div style={{ width: "80%", height: "600px" }}>
      <MapContainer
        center={[27.5, 88.5]}
        zoom={10}
        style={{ width: "100%", height: "100%" }}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {Array.isArray(monasteries) &&
          monasteries.map((m) => (
            <Marker
              key={m.id}
              position={[Number(m.lat), Number(m.lng)]}
              icon={monasteryIcon}
              eventHandlers={{
                click: () => {
                  setSelectedMonastery(m);
                  setRoute([]);
                  setDistance(null);
                  if (mapRef.current) {
                    mapRef.current.setView([Number(m.lat), Number(m.lng)], 15); // zoom 15
                  }
                  setBounds(L.latLngBounds([[Number(m.lat), Number(m.lng)]]));
                },
              }}
            >
              {selectedMonastery?.id === m.id && nearbyPlaces?.length > 0 && (
                <Popup>
                  <div>
                    <h3>{m.name}</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {nearbyPlaces.map((p) => (
                        <li key={p.id} style={{ marginBottom: 5 }}>
                          <MarkerIcon type={p.type} />
                          {p.name} ({p.type}){" "}
                          <button
                            onClick={() => showDirections(p)}
                            style={{ marginLeft: 5 }}
                          >
                            Show Directions
                          </button>
                        </li>
                      ))}
                    </ul>
                    {distance && <p>Distance: {distance} km</p>}
                  </div>
                </Popup>
              )}
            </Marker>
          ))}

        {Array.isArray(nearbyPlaces) &&
          nearbyPlaces.map((p) => (
            <Marker
              key={p.id}
              position={[Number(p.lat), Number(p.lng)]}
              icon={p.type === "Hotel" ? hotelIcon : trekkingIcon}
            >
              <Popup>{p.name}</Popup>
            </Marker>
          ))}

        {route.length === 2 && <Polyline positions={route} color="blue" />}

        {bounds && <FitBounds bounds={bounds} />}
      </MapContainer>
    </div>
  );
}
