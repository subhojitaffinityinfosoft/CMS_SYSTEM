"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Error44Page() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      
      <div className="relative max-w-xl w-full text-center">
        
        {/* Glow background */}
        <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-r from-primary via-blue-400 to-purple-400 rounded-full" />

        {/* Card */}
        <div className="relative bg-background/80 backdrop-blur-xl border rounded-2xl p-8 shadow-xl">
          
          {/* Error Code */}
          <h1 className="text-7xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            44
          </h1>

          {/* Title */}
          <h2 className="mt-4 text-2xl font-semibold text-foreground">
            Bad Request
          </h2>

          {/* Description */}
          <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
            The request could not be processed due to invalid input or missing parameters.
            Please check your request and try again.
          </p>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
            
            <Button
              variant="default"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft size={16} />
              Go Home
            </Button>

            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="gap-2"
            >
              <RefreshCw size={16} />
              Retry
            </Button>

          </div>

          {/* Footer hint */}
          <p className="mt-6 text-xs text-muted-foreground">
            Error Code: 44_BAD_REQUEST
          </p>
        </div>
      </div>
    </div>
  );
}