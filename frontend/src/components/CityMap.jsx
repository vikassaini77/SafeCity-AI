import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet icon not showing in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Dummy Camera Data
const cameras = [
    { id: 1, name: "Main Gate", lat: 28.7041, lng: 77.1025, status: "Active" }, // Delhi coordinates
    { id: 2, name: "Cafeteria", lat: 28.7050, lng: 77.1035, status: "Active" },
    { id: 3, name: "Parking Lot", lat: 28.7035, lng: 77.1015, status: "Offline" },
];

export function CityMap() {
    return (
        <div style={{ height: '350px', width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 0 }}>
            <MapContainer center={[28.7041, 77.1025]} zoom={16} style={{ height: '100%', width: '100%' }}>
                {/* Dark Mode Map Tile */}
                {/* SATELLITE VIEW TILE LAYER */}
<TileLayer
    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
/>
                
                {cameras.map(cam => (
                    <Marker key={cam.id} position={[cam.lat, cam.lng]}>
                        <Popup>
                            <strong>📷 {cam.name}</strong><br />
                            Status: <span style={{ color: cam.status === 'Active' ? 'green' : 'red' }}>{cam.status}</span>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}