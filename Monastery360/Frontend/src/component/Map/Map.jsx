import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styles from './Map.module.css';

const containerStyle = {
  width: "1000px",
  height: "500px",
};

function MapComponent({ monasteries }) {
  const defaultCenter = {
    lat: 27.532972,
    lng: 88.512215,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyD01neVzDy1aXulQ_p1wgEENMpdjZyj-Ck">
      <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={15}  mapTypeId="roadmap" mapContainerClassName={styles.map}>
        {monasteries &&
          monasteries.map((monastery) => (
            <Marker
              key={monastery.id}
              position={{ lat: monastery.lat, lng: monastery.lng }}
              title={monastery.name}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
