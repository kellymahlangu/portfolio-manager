"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";

export default function InDevPop() {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Portfolio Under Construction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            Hi there! My portfolio is currently in progress. Check back soon for
            updates!
          </p>
          {/* <Progress value={progress} className="w-full h-2" />
          <p className="text-center text-sm">{progress}% Complete</p> */}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {/* <Button variant="outline" className="w-full border-2">
            Notify Me
          </Button> */}
          <div className="flex justify-center space-x-4">
            <a href="#" className="transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="#" className="transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
          <p className="text-center text-sm">
            Kelly Mahlangu • Full-Stack Developer
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
