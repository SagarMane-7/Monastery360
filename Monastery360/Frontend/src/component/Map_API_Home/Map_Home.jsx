import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from './Map_Home.module.css';

const monasteryIcon = new L.Icon({
  iconUrl: "/assets/Home/monastery.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const defaultCenter = [27.5, 88.5];

function MapComponentHome({ monasteries = [] }) { 
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={9}
      scrollWheelZoom={false}
      style={{ width: "1100px", height: "500px", borderRadius: "15px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {monasteries.map((monastery) =>
        monastery.lat && monastery.lng ? (
          <Marker
            key={monastery.id}
            position={[Number(monastery.lat), Number(monastery.lng)]}
            icon={monasteryIcon} 
            eventHandlers={{ click: () => setSelectedMarker(monastery) }}
          />
        ) : null
      )}

      {selectedMarker && (
        <Popup
          position={[Number(selectedMarker.lat), Number(selectedMarker.lng)]}
          onClose={() => setSelectedMarker(null)}
        >
          <div>
            <h3 style={{ margin: 0 }}>{selectedMarker.name}</h3>
            {selectedMarker.description && <p>{selectedMarker.description}</p>}
          </div>
        </Popup>
      )}
    </MapContainer>
  );
}

export default MapComponentHome;
