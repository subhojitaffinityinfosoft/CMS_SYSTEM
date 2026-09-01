import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SetStorage, EncryptText } from "shared-ui";

export default function CMSLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy authentication for provider access
    if (password === "admin123") {
      // Set dummy user details mimicking standard auth for the shell
      const dummyUser = {
        name: "Software Provider",
        role: "PROVIDER",
        subRole: "SUPER_ADMIN",
        userType: "cms_admin"
      };
      
      SetStorage(import.meta.env.VITE_LOGIN_STATUS, EncryptText("true"));
      SetStorage(import.meta.env.VITE_ROLE, EncryptText(dummyUser.role));
      SetStorage(import.meta.env.VITE_SUBROLE, EncryptText(dummyUser.subRole));
      SetStorage(import.meta.env.VITE_AU_TK, EncryptText("tok_cms_provider_xyz"));
      
      // Navigate to the CMS dashboard
      navigate("/cms/dashboard");
    } else {
      setError("Invalid provider credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-zinc-100">
        <CardHeader className="space-y-3 pb-6 text-center">
          <div className="mx-auto bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Provider Access</CardTitle>
          <CardDescription className="text-zinc-400">
            Secure login for software administrators only.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">Access Key</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter provider key"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-primary"
              />
              {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
            </div>
            
            <Button type="submit" className="w-full font-semibold">
              Authenticate
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
