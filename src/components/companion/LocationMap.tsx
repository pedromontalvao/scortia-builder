import { useEffect, useState } from 'react';

interface LocationMapProps {
  neighborhood: string;
  city: string;
  state: string;
}

export const LocationMap = ({ neighborhood, city, state }: LocationMapProps) => {
  const [coordinates, setCoordinates] = useState({
    lat: -23.550520,
    lng: -46.633308,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getApproximateCoordinates = async () => {
      try {
        console.log('Fetching coordinates for:', { neighborhood, city, state });
        const address = `${neighborhood}, ${city}, ${state}, Brazil`;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await response.json();
        console.log('Geocoding response:', data);
        
        if (data && data[0]) {
          const { lat, lon } = data[0];
          // Add some random offset to avoid exact location (for privacy)
          const offset = 0.01; // Roughly 1km
          const newCoordinates = {
            lat: Number(lat) + (Math.random() - 0.5) * offset,
            lng: Number(lon) + (Math.random() - 0.5) * offset,
          };
          console.log('Setting new coordinates:', newCoordinates);
          setCoordinates(newCoordinates);
        }
      } catch (error) {
        console.error('Error getting coordinates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (neighborhood && city && state) {
      getApproximateCoordinates();
    }
  }, [neighborhood, city, state]);

  if (isLoading) {
    return <div>Carregando mapa...</div>;
  }

  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng - 0.02}%2C${coordinates.lat - 0.02}%2C${coordinates.lng + 0.02}%2C${coordinates.lat + 0.02}&layer=mapnik&marker=${coordinates.lat}%2C${coordinates.lng}`}
      />
    </div>
  );
};