"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AdminPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center">
          Thank you for visiting our website. We&apos;re glad you&apos;re here!
        </p>
      </CardContent>
    </Card>
  );
}

export default AdminPage;
