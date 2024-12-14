import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from "@/components/admin/UserManagement";
import { CompanionManagement } from "@/components/admin/CompanionManagement";
import { Analytics } from "@/components/admin/Analytics";
import { Support } from "@/components/admin/Support";

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("companions");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="companions">Acompanhantes</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="support">Suporte</TabsTrigger>
          </TabsList>

          <TabsContent value="companions">
            <CompanionManagement />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>

          <TabsContent value="support">
            <Support />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};