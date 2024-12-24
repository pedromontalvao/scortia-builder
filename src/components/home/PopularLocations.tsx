import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const popularCities = [
  {
    name: "São Paulo",
    state: "SP",
    companions: 1234,
    image: "/cities/sao-paulo.jpg"
  },
  {
    name: "Rio de Janeiro",
    state: "RJ",
    companions: 987,
    image: "/cities/rio.jpg"
  },
  {
    name: "Curitiba",
    state: "PR",
    companions: 456,
    image: "/cities/curitiba.jpg"
  },
  {
    name: "Belo Horizonte",
    state: "MG",
    companions: 789,
    image: "/cities/bh.jpg"
  }
];

export const PopularLocations = () => {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Principais Cidades</h2>
        <p className="text-gray-600 mt-2">Encontre acompanhantes nas principais cidades do Brasil</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularCities.map((city) => (
          <Link 
            key={city.name} 
            to={`/${city.name.toLowerCase().replace(" ", "-")}`}
            className="group relative overflow-hidden rounded-lg aspect-[4/3]"
          >
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-4">
              <h3 className="text-white text-xl font-semibold">{city.name}</h3>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-4 h-4" />
                <span>{city.companions} acompanhantes</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};