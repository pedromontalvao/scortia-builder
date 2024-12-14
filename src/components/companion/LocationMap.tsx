import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface LocationMapProps {
  neighborhood: string;
  city: string;
  state: string;
}

export const LocationMap = ({ neighborhood, city, state }: LocationMapProps) => {
  // Get approximate coordinates for the neighborhood (this would come from your database)
  const center = {
    lat: -23.550520, // Default to São Paulo
    lng: -46.633308,
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerClassName="w-full h-[300px] rounded-lg"
        center={center}
        zoom={14}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker
          position={center}
          title={`${neighborhood}, ${city}`}
        />
      </GoogleMap>
    </LoadScript>
  );
};