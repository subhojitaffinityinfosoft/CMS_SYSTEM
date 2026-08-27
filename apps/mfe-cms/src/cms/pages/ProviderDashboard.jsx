import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Server, Clock } from "lucide-react";

export default function ProviderDashboard() {
  return (
    <div className="container max-w-5xl py-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Software Provider Dashboard</h2>
        <p className="text-muted-foreground">
          Information about the software provider and system health.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldCheck className="text-primary w-5 h-5" />
              Provider
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">Affinity Infosoft</p>
            <p className="text-sm text-muted-foreground mt-1">Enterprise CMS Solutions</p>
            <a href="mailto:support@affinityinfosoft.com" className="text-sm text-primary hover:underline mt-4 block">
              support@affinityinfosoft.com
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Server className="text-blue-500 w-5 h-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-green-600">Online</p>
            <p className="text-sm text-muted-foreground mt-1">All micro-frontends operational</p>
            <p className="text-xs text-muted-foreground mt-4">Last checked: Just now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="text-orange-500 w-5 h-5" />
              License Validity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">Active</p>
            <p className="text-sm text-muted-foreground mt-1">Subscription in good standing</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
