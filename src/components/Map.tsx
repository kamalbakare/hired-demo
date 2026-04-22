"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'; // Added useMap
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for markers
const icon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// --- NEW HELPER COMPONENT ---
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}
// ----------------------------

export default function Map({ users }: { users: any[] }) {
  // Logic: If there is only one user left in the filter, center on them.
  // Otherwise, stay at a broad view.
  const center: [number, number] = users.length === 1 
    ? [parseFloat(users[0].address.geo.lat), parseFloat(users[0].address.geo.lng)]
    : [40, -100];

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-inner border border-gray-200">
      <MapContainer 
        center={center} 
        zoom={3} 
        style={{ height: '100%', width: '100%' }}
      >
        {/* We call our helper here to force the map to move */}
        <ChangeView center={center} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />
        
        {users.map((user) => (
          <Marker 
            key={user.id} 
            position={[parseFloat(user.address.geo.lat), parseFloat(user.address.geo.lng)]} 
            icon={icon}
          >
            <Popup>
              <div className="text-black text-sm">
                <strong>{user.name}</strong> <br />
                {user.address.city}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}