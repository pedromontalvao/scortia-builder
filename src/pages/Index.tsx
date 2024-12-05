import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const Index = () => {
  const [modelData, setModelData] = useState({
    name: "",
    description: "",
    measurements: "",
    experience: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setModelData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("Model data updated:", { ...modelData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting model data:", modelData);
    // Here you would typically send the data to a backend
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Model Registration</CardTitle>
            <CardDescription>
              Enter the model's information below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={modelData.name}
                  onChange={handleInputChange}
                  placeholder="Enter model's name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={modelData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the model"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="measurements">Measurements</Label>
                <Input
                  id="measurements"
                  name="measurements"
                  value={modelData.measurements}
                  onChange={handleInputChange}
                  placeholder="Height, weight, etc."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  value={modelData.experience}
                  onChange={handleInputChange}
                  placeholder="Previous modeling experience"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Register Model
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;