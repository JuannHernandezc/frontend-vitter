import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import "./styles/HeatMap.css";
export const HeatMap = (locations) => {
  const position = [4.6126, -74.0705];
  return (
    <>
      <Map center={position} zoom={5} scrollWheelZoom={false}>
        <HeatmapLayer
          points={locations.data}
          longitudeExtractor={(m) => m.lng}
          latitudeExtractor={(m) => m.lat}
          intensityExtractor={(m) => parseFloat(m.lat)}
          max={100}
          minOpacity={0.5}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
    </>
  );
};
