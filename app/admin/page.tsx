import ProjectsAndSkills from "@/app/admin/components/ProjectsAndSkills";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

function AdminPage() {
  return (
    <div className="container mx-auto p-4 w-9/12">
      <h1 className="text-3xl font-bold mb-6">Skills And Projects</h1>
      <div>
        <Card className="">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {/* <h2 className="text-xl font-semibold">Basic Information</h2>
              <GenerateAboutDialog /> */}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
              <ProjectsAndSkills />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminPage;
