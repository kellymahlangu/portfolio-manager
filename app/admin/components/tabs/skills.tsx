"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  NewSkillCard,
  NewSkillCardSkeleton,
  SkillCard,
  SkillCardSkeleton,
} from "@/components/common/SkillCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  cleanIcons,
  getSkills,
  stringToObject,
  totalSkills,
} from "@/app/actions";
import { DeviconEntry, FetchSkill } from "@/app/types";
import { toast } from "sonner";
import { useBackgroundTask } from "@/hooks/updateIconDb";
import ListPagination from "@/components/common/ListPagination";
import { useSearchParams } from "next/navigation";
import { $Enums } from "@prisma/client";

const SkillsTab = () => {
  const itemsPerPage = 10;
  const [showDialog, setShowDialog] = useState(false);
  const [jsonData, setJsonData] = useState<DeviconEntry[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isRunning, updateIconDb } = useBackgroundTask();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [skills, setSkills] = useState<FetchSkill[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [fetchedSkills, total] = await Promise.all([
          getSkills(currentPage),
          totalSkills(),
        ]);
        setSkills(fetchedSkills);
        setTotalItems(total);
      } catch (error) {
        console.error("Error fetching skills:", error);
        toast.error("Failed to fetch skills");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file && file.type === "application/json") {
      try {
        setShowDialog(true);
        setIsLoading(true);
        const result = await file.text();
        const dataObject = await stringToObject(result);
        const cleanedList = await cleanIcons(dataObject.icons);
        setJsonData(cleanedList);
      } catch (error) {
        console.log(error);
        // (`${error}`);
        toast.error("Error processing file");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please upload a valid JSON file.");
    }
  };

  const handleDbUpdate = async () => {
    setShowDialog(false);
    for (const icon of jsonData) {
      try {
        const result = await updateIconDb(icon);
        if (result.success) {
          toast.success(`${icon.name} has been added to the database`);
        } else {
          toast.error(result.msg);
        }
      } catch (error) {
        console.error(`Error updating ${icon.name}:`, error);
        toast.error(`Failed to update ${icon.name}`);
      }
    }
  };

  const reloadSkill = useCallback(
    async (skillId: number) => {
      try {
        setIsLoading(true);
        const updatedSkill = await getSkills(currentPage, skillId);
        if (updatedSkill) {
          setSkills((prevSkills) =>
            prevSkills.map((skill) =>
              skill.id === skillId ? updatedSkill[0] : skill
            )
          );
        }
      } catch (error) {
        console.error(`Error reloading skill ${skillId}:`, error);
        toast.error(`Failed to reload skill ${skillId}`);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage]
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{`Skills and Languages (${totalItems})`}</h3>
        <div>
          <Input
            type="file"
            accept=".json"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <Label htmlFor="json-upload">
            <Button
              type="button"
              onClick={handleButtonClick}
              disabled={isRunning}
            >
              Upload Json File
            </Button>
          </Label>
        </div>
      </div>
      {isLoading ? (
        <ul>
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <li key={index}>
              <SkillCardSkeleton />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-2">
          {skills.map((skill) => {
            const item: {
              name: string;
              type: $Enums.SkillCategory;
              progress: number;
              icon: string;
              isActive: boolean;
              id: number;
            } = {
              name: skill.details.name,
              type: skill.category,
              progress: skill.level,
              icon: skill.details.versions.svg[0],
              isActive: skill.isKnown,
              id: skill.id,
            };
            return (
              <li key={skill.id}>
                <SkillCard
                  skill={item}
                  onReload={() => reloadSkill(skill.id)}
                />
              </li>
            );
          })}
        </ul>
      )}
      <ListPagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              You are About to add the following Icons {`(${jsonData.length})`}
            </DialogTitle>
            <DialogDescription>
              <ScrollArea className="h-[200px] rounded-md border p-4">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <NewSkillCardSkeleton key={index} />
                    ))
                  : jsonData.map((entry) => (
                      <NewSkillCard
                        key={entry.name}
                        name={entry.name}
                        icon={entry.versions.svg[0]}
                      />
                    ))}
              </ScrollArea>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleDbUpdate} disabled={isRunning || isLoading}>
              Press to proceed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SkillsTab;
