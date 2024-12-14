import { useState } from "react";
import { Card } from "@/components/ui/card";
import { DashboardNav } from "@/components/companion/dashboard/DashboardNav";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const CompanionDashboard = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === '/painel') {
      navigate('/painel/configuracoes');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex relative">
        {/* Mobile menu overlay */}
        {showMobileMenu && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setShowMobileMenu(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed md:static top-0 left-0 z-50 h-screen w-[280px] transform transition-transform duration-300 ease-in-out
          bg-white border-r border-gray-200 p-4
          md:translate-x-0
          ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Painel</h2>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowMobileMenu(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <DashboardNav />
        </aside>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setShowMobileMenu(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 ml-0 md:ml-[280px] w-full">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="p-6">
                <h3 className="font-medium text-gray-500 mb-1">Visualizações</h3>
                <p className="text-3xl font-bold">1,234</p>
                <span className="text-sm text-green-500">+12% essa semana</span>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-medium text-gray-500 mb-1">Mensagens</h3>
                <p className="text-3xl font-bold">56</p>
                <span className="text-sm text-green-500">+8% essa semana</span>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-medium text-gray-500 mb-1">Contatos</h3>
                <p className="text-3xl font-bold">23</p>
                <span className="text-sm text-green-500">+15% essa semana</span>
              </Card>
            </div>

            <div className="space-y-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};