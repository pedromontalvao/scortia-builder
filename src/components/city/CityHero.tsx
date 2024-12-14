import React from 'react';

interface CityHeroProps {
  city: string;
  state: string;
  flagUrl: string;
  description: string;
  population: string;
  founded: string;
}

export const CityHero = ({ 
  city, 
  state, 
  flagUrl, 
  description,
  population,
  founded
}: CityHeroProps) => {
  return (
    <div className="relative bg-gradient-to-r from-purple-900 to-pink-900 py-16">
      <div className="absolute inset-0 bg-black/40" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/3">
            <img 
              src={flagUrl} 
              alt={`Bandeira de ${city}`} 
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
          <div className="w-full md:w-2/3 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{city}</h1>
            <p className="text-xl mb-2">{state}</p>
            <p className="text-gray-200 mb-6">{description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-300">População</p>
                <p className="text-xl font-semibold">{population}</p>
              </div>
              <div>
                <p className="text-gray-300">Fundação</p>
                <p className="text-xl font-semibold">{founded}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};