import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define custom marker icon
const customMarkerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Helper component to adjust the map bounds
const MapBounds = ({ pickup, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (pickup && destination) {
      const bounds = L.latLngBounds([pickup, destination]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [pickup, destination, map]);

  return null;
};

const LiveTracking = ({ pickup, destination }) => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 23.0225, // Default to Ahmedabad, India
    lng: 72.5714,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MapContainer center={currentPosition} zoom={15} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Current location marker */}
        <Marker position={currentPosition} icon={customMarkerIcon}>
          <Popup>Your current location</Popup>
        </Marker>

        {/* Pickup marker */}
        {pickup && (
          <Marker position={pickup} icon={customMarkerIcon}>
            <Popup>Pickup Location</Popup>
          </Marker>
        )}

        {/* Destination marker */}
        {destination && (
          <Marker position={destination} icon={customMarkerIcon}>
            <Popup>Destination</Popup>
          </Marker>
        )}

        {/* Adjust map bounds */}
        {pickup && destination && <MapBounds pickup={pickup} destination={destination} />}
      </MapContainer>
    </div>
  );
};

export default LiveTracking;
