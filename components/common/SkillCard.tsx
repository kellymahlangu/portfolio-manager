"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Book, BookCheck } from "lucide-react";
import { CustomIcon } from "../ui/icon";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { UpdateCardProps, UpdateSkill } from "@/app/types";
import { $Enums } from "@prisma/client";
import { Slider } from "../ui/slider";
import { updateSkill } from "@/app/actions";
import { toast } from "sonner";

interface SkillCardProps {
  name: string;
  type: string;
  progress: number;
  icon: string;
  isActive: boolean;
}

interface NewSkillCardProps {
  name: string;
  icon: string;
}

interface updateCardProps {
  skill: {
    name: string;
    type: $Enums.SkillCategory;
    progress: number;
    icon: string;
    isActive: boolean;
    id: number;
  };
  onReload: () => void;
}

function ShowSkillCard({
  name,
  progress,
  icon,
  isActive,
  type,
}: SkillCardProps) {
  return (
    <Card
      className="w-full"
      onClick={() => {
        console.log(name);
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <CustomIcon
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${icon}.svg`}
              className="h-6 w-6"
            />
          </div>
          <div className="min-w-0 flex-shrink flex-grow grid grid-cols-[1fr,120px] gap-2 items-center">
            <div>
              <h3 className="truncate text-xl font-bold">{name}</h3>
              <p className="truncate text-sm font-large">{type}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Progress value={progress} className="h-2 flex-grow" />
              <span className="text-sm whitespace-nowrap w-8">{progress}%</span>
            </div>
          </div>
          {isActive ? <BookCheck /> : <Book />}
        </div>
      </CardContent>
    </Card>
  );
}

export function NewSkillCard({ name, icon }: NewSkillCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <CustomIcon
              className={"h-5 w-5"}
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${icon}.svg`}
            />
          </div>
          <div className="min-w-0 flex-shrink flex-grow grid grid-cols-[1fr,120px] gap-2 items-center">
            <p className="truncate text-sm font-large">{name}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SkillCardSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
          <div className="min-w-0 flex-shrink flex-grow grid grid-cols-[1fr,120px] gap-2 items-center">
            <div>
              <Skeleton className="h-6 w-[150px]" />
              <Skeleton className="h-4 w-[110px]" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-2 flex-grow" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>
          <Skeleton aria-label={`Toggle ${name}`} />
        </div>
      </CardContent>
    </Card>
  );
}

export function NewSkillCardSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
          <div className="min-w-0 flex-shrink flex-grow grid grid-cols-[1fr,120px] gap-2 items-center">
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export const SkillCard = ({ skill, onReload }: updateCardProps) => {
  const [formData, setFormData] = useState<UpdateCardProps>({
    name: skill.name,
    type: skill.type,
    progress: skill.progress,
    icon: skill.icon,
    isActive: skill.isActive,
    skillId: skill.id,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTypeChange = (value: "FRONTEND" | "BACKEND" | "TOOL") => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked }));
  };

  const handleSliderChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, progress: value[0] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const updatedSkillData: UpdateSkill = {
      id: formData.skillId,
      name: formData.name,
      type: formData.type,
      progress: formData.progress,
      icon: formData.icon,
      isActive: formData.isActive,
    };

    const res = await updateSkill(updatedSkillData);
    if (res.success) {
      setIsOpen(false);
      toast.success(`${skill.name} has been updated!`);
      onReload();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="w-full">
        <div className="contents">
          <ShowSkillCard
            name={skill.name}
            type={skill.type}
            progress={skill.progress}
            icon={skill.icon}
            isActive={skill.isActive}
          />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Update Skill</DrawerTitle>
        </DrawerHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div className="mb-4">
            <p>
              <strong>Name:</strong> {skill.name}
            </p>
            <p>
              <strong>Icon:</strong> {skill.icon}
            </p>
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Select
              onValueChange={handleTypeChange}
              defaultValue={formData.type}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select skill type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FRONTEND">Frontend</SelectItem>
                <SelectItem value="BACKEND">Backend</SelectItem>
                <SelectItem value="TOOL">Tool</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="progress">{`Progress: ${formData.progress}%`}</Label>
            <Slider
              disabled={isLoading}
              id="progress"
              min={0}
              max={100}
              step={1}
              value={[formData.progress]}
              onValueChange={handleSliderChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              disabled={isLoading}
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="isActive">Active</Label>
          </div>
          <DrawerFooter>
            <Button disabled={isLoading} type="submit">
              Update Skill
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
