import React, { useState } from "react";
import { setStoredConfig, applyTheme, getStoredConfig } from "shared-core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function WebsiteSetup() {
  const config = getStoredConfig();
  
  // Local state for the form
  const [formData, setFormData] = useState({
    companyName: config?.companyName || "CMS System",
    primaryColor: config?.primaryColor || "#3b82f6",
    apiUrl: config?.apiUrl || "http://localhost:8000/api",
    projectLocked: config?.projectLocked || false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({ ...prev, projectLocked: checked }));
  };

  const handleSave = () => {
    // Save to local storage mock API for now and re-apply theme
    setStoredConfig(formData);
    applyTheme(formData);
    alert("CMS Settings saved successfully! The layout and theme should update immediately.");
    // In a real scenario, we'd trigger a context reload or window.location.reload() 
    window.location.reload();
  };

  return (
    <div className="container max-w-4xl py-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Website Setup</h2>
        <p className="text-muted-foreground">
          Manage global project settings, themes, and licensing status.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Branding & Theme</CardTitle>
            <CardDescription>Update the company name and primary color for the platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Sunrise Public School"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="primaryColor"
                  name="primaryColor"
                  type="color"
                  className="w-16 h-10 p-1"
                  value={formData.primaryColor}
                  onChange={handleChange}
                />
                <span className="text-sm text-muted-foreground uppercase">{formData.primaryColor}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
            <CardDescription>Manage backend API connections and module locks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="apiUrl">Base API URL</Label>
              <Input
                id="apiUrl"
                name="apiUrl"
                value={formData.apiUrl}
                onChange={handleChange}
                placeholder="https://api.example.com"
              />
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-4 bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
              <div className="space-y-0.5">
                <Label className="text-base flex items-center gap-2 text-red-600 dark:text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                  Payment Due / Lock Project
                </Label>
                <p className="text-sm text-muted-foreground">
                  Lock access for clients and show a persistent payment alert to Admins.
                </p>
              </div>
              <Switch 
                checked={formData.projectLocked} 
                onCheckedChange={handleSwitchChange}
                className="data-[state=checked]:bg-red-600"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg" className="w-full md:w-auto">
          Save Global Configurations
        </Button>
      </div>
    </div>
  );
}
