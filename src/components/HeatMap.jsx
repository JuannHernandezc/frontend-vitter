import React from "react";
import { Map, TileLayer } from "react-leaflet";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import "./styles/HeatMap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export const HeatMap = (locations) => {
  const position = [4.6126, -74.0705];
  const closedPopUp = () => {
    const popUp = document.getElementsByClassName("pop-up__heatmap");
    popUp[0].style.bottom = "125%";
  };
  return (
    <>
      <div className="container-close">
        <FontAwesomeIcon
          className="icon-close"
          icon={faClose}
          onClick={closedPopUp}
        />
      </div>
      <Map center={position} zoom={5} scrollWheelZoom={false}>
        <HeatmapLayer
          points={locations.data}
          longitudeExtractor={(m) => m.lng}
          latitudeExtractor={(m) => m.lat}
          intensityExtractor={(m) => parseFloat(m.lat)}
          max={100}
          minOpacity={0.6}
          blur={30}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
    </>
  );
};
