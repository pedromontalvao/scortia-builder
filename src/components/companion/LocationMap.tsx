import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface LocationMapProps {
  neighborhood: string;
  city: string;
  state: string;
}

export const LocationMap = ({ neighborhood, city, state }: LocationMapProps) => {
  const [coordinates, setCoordinates] = useState({
    lat: -23.550520, // Default to São Paulo
    lng: -46.633308,
  });

  useEffect(() => {
    const getApproximateCoordinates = async () => {
      try {
        const address = `${neighborhood}, ${city}, ${state}, Brazil`;
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        
        if (data.results && data.results[0]) {
          const { lat, lng } = data.results[0].geometry.location;
          // Add some random offset to avoid exact location (for privacy)
          const offset = 0.01; // Roughly 1km
          setCoordinates({
            lat: lat + (Math.random() - 0.5) * offset,
            lng: lng + (Math.random() - 0.5) * offset,
          });
        }
      } catch (error) {
        console.error('Error getting coordinates:', error);
      }
    };

    getApproximateCoordinates();
  }, [neighborhood, city, state]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerClassName="w-full h-[300px] rounded-lg"
        center={coordinates}
        zoom={14}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        }}
      >
        <Marker
          position={coordinates}
          title={`${neighborhood}, ${city}`}
        />
      </GoogleMap>
    </LoadScript>
  );
};