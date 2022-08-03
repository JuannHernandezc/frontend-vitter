import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./styles/HeatMap.css";
export const HeatMap = () => {
  const position = [4.6126, -74.0705];
  return (
    <>
      <MapContainer center={position} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};
