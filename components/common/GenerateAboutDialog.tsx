"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { generateAboutMeParagraph } from "@/app/actions";

function GenerateAboutDialog() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paragraphs, setParagraphs] = useState<{
    p1: string;
    p2: string;
    p3: string;
  }>({
    p1: "",
    p2: "",
    p3: "",
  });

  const handleClick = async () => {
    setIsLoading(true);
    const response = await generateAboutMeParagraph();
    if (!response.status) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong while generating paragraphs",
      });
    }
    setParagraphs(response.data);
    setIsLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Generate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Do you wish to continue</DialogTitle>
        <DialogDescription>
          Please ensure that all the data and answers inserted are acurate
        </DialogDescription>
        {isLoading && <p>Loading...</p>}
        <p>{paragraphs.p1}</p>
        <div></div>
        <p>{paragraphs.p2}</p>
        <div></div>
        <p>{paragraphs.p3}</p>
        <DialogFooter>
          <Button disabled={isLoading} onClick={handleClick}>
            Generate About Me Paragraphs
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default GenerateAboutDialog;
