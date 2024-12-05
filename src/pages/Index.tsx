import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Grid, List } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const jobTypes = [
    "Fashion",
    "Commercial",
    "Events",
    "Editorial",
    "Runway"
  ];

  const experienceLevels = [
    "Iniciante (0-2 anos)",
    "Intermediário (2-5 anos)",
    "Experiente (5+ anos)"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-[#15171E] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">VivAcompanhantes</div>
          <div className="space-x-6">
            <a href="#" className="hover:text-gray-300">Home</a>
            <a href="#" className="hover:text-gray-300">Sobre Nós</a>
            <a href="#" className="hover:text-gray-300">Modelos</a>
            <a href="#" className="hover:text-gray-300">Contato</a>
          </div>
        </div>
      </nav>

      {/* Search Section */}
      <div className="bg-white py-6 px-4 shadow-sm">
        <div className="container mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar por nome, cidade ou especialidade..."
              className="pl-10 h-12 w-full"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filtros</h2>
                <button className="text-blue-600 text-sm">Limpar Filtros</button>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Localização</h3>
                <Input placeholder="Digite sua cidade" className="w-full" />
              </div>

              {/* Job Types */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Tipo de Trabalho</h3>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Experiência</h3>
                <div className="space-y-2">
                  {experienceLevels.map((level) => (
                    <label key={level} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Faixa de Preço (R$/hora)</h3>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                    placeholder="0"
                  />
                  <span className="self-center">até</span>
                  <Input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                    placeholder="1000"
                  />
                </div>
              </div>

              <Button className="w-full bg-[#15171E]">
                Aplicar Filtros
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Section Headers */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Acompanhantes Premium</h1>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#15171E] text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Seja uma Modelo</h2>
        <p className="text-xl mb-8 text-yellow-500">Cadastre-se Agora!</p>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
          Começar
        </Button>
      </div>

      {/* Footer */}
      <footer className="bg-[#15171E] text-white py-4 text-center">
        <p>© 2024 VivAcompanhantes. Todos os direitos reservados. 
          <a href="#" className="text-yellow-500 ml-2">Fale Conosco</a>
        </p>
      </footer>
    </div>
  );
};

export default Index;