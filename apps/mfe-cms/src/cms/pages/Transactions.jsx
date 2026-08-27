import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockTransactions = [
  { id: "TXN-101", date: "2024-03-01", amount: "$500.00", status: "Paid", client: "Sunrise Public School" },
  { id: "TXN-102", date: "2024-04-01", amount: "$500.00", status: "Paid", client: "Sunrise Public School" },
  { id: "TXN-103", date: "2024-05-01", amount: "$500.00", status: "Overdue", client: "Sunrise Public School" },
];

export default function Transactions() {
  return (
    <div className="container max-w-5xl py-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Transactions History</h2>
        <p className="text-muted-foreground">
          View payments, subscriptions, and billing status for clients.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Billing</CardTitle>
          <CardDescription>A list of recent invoice transactions for the software licensing.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Transaction ID</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Client</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium">{txn.id}</td>
                    <td className="px-4 py-3">{txn.date}</td>
                    <td className="px-4 py-3">{txn.client}</td>
                    <td className="px-4 py-3 font-semibold">{txn.amount}</td>
                    <td className="px-4 py-3">
                      <Badge variant={txn.status === "Paid" ? "default" : "destructive"}>
                        {txn.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
