"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Experience, Skill } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  getSkills,
} from "@/app/actions";

export default function ExperienceList() {
  const router = useRouter();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({});
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null
  );

  useEffect(() => {
    getExperiences().then(setExperiences);
    getSkills().then(setSkills);
  }, []);

  const handleCreateExperience = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const createdExperience = await createExperience(
      newExperience as Experience
    );
    setExperiences([...experiences, createdExperience]);
    setNewExperience({});
    router.refresh();
  };

  const handleUpdateExperience = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!editingExperience) return;

    const updatedExperience = await updateExperience(
      editingExperience.id,
      editingExperience
    );
    setExperiences(
      experiences.map((experience) =>
        experience.id === updatedExperience.id ? updatedExperience : experience
      )
    );
    setEditingExperience(null);
    router.refresh();
  };

  const handleDeleteExperience = async (id: number) => {
    console.log(skills);

    await deleteExperience(id);
    setExperiences(experiences.filter((experience) => experience.id !== id));
    router.refresh();
  };

  const ExperienceForm = ({
    experience,
    onSubmit,
    buttonText,
  }: {
    experience: Partial<Experience>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    buttonText: string;
  }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={experience.company || ""}
          onChange={(e) =>
            experience === newExperience
              ? setNewExperience({ ...newExperience, company: e.target.value })
              : setEditingExperience({
                  ...editingExperience!,
                  company: e.target.value,
                })
          }
        />
      </div>
      <div>
        <Label htmlFor="role">Role</Label>
        <Input
          id="role"
          value={experience.role || ""}
          onChange={(e) =>
            experience === newExperience
              ? setNewExperience({ ...newExperience, role: e.target.value })
              : setEditingExperience({
                  ...editingExperience!,
                  role: e.target.value,
                })
          }
        />
      </div>
      <div>
        <Label htmlFor="start">Start Date</Label>
        <Input
          id="start"
          type="date"
          value={
            experience.start
              ? new Date(experience.start).toISOString().split("T")[0]
              : ""
          }
          onChange={(e) => {
            const date = new Date(e.target.value);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            experience === newExperience
              ? setNewExperience({ ...newExperience, start: date })
              : setEditingExperience({ ...editingExperience!, start: date });
          }}
        />
      </div>
      <div>
        <Label htmlFor="end">End Date</Label>
        <Input
          id="end"
          type="date"
          value={
            experience.end
              ? new Date(experience.end).toISOString().split("T")[0]
              : ""
          }
          onChange={(e) => {
            const date = e.target.value ? new Date(e.target.value) : null;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            experience === newExperience
              ? setNewExperience({ ...newExperience, end: date })
              : setEditingExperience({ ...editingExperience!, end: date });
          }}
        />
      </div>
      <div>
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={experience.summary || ""}
          onChange={(e) =>
            experience === newExperience
              ? setNewExperience({ ...newExperience, summary: e.target.value })
              : setEditingExperience({
                  ...editingExperience!,
                  summary: e.target.value,
                })
          }
        />
      </div>
      <div>
        <Label htmlFor="achievements">Achievements</Label>
        <Textarea
          id="achievements"
          value={
            experience.achievements ? experience.achievements.join("\n") : ""
          }
          onChange={(e) => {
            const achievements = e.target.value
              .split("\n")
              .filter((a) => a.trim() !== "");
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            experience === newExperience
              ? setNewExperience({ ...newExperience, achievements })
              : setEditingExperience({ ...editingExperience!, achievements });
          }}
        />
        <p className="text-sm text-muted-foreground">
          Enter each achievement on a new line
        </p>
      </div>
      <div>
        <Label htmlFor="skills">Skills</Label>
        {/* <Select
          value={experience.skills?.map((s) => s.id.toString()) || []}
          onValueChange={(value) => {
            const selectedSkills = skills.filter((s) =>
              value.includes(s.id.toString())
            );
            experience === newExperience
              ? setNewExperience({ ...newExperience, skills: selectedSkills })
              : setEditingExperience({
                  ...editingExperience!,
                  skills: selectedSkills,
                });
          }}
          multiple
        >
          <SelectTrigger id="skills">
            <SelectValue placeholder="Select skills" />
          </SelectTrigger>
          <SelectContent>
            {skills.map((skill) => (
              <SelectItem key={skill.id} value={skill.id.toString()}>
                {skill.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>
      <Button type="submit">{buttonText}</Button>
      {experience === editingExperience && (
        <Button
          type="button"
          variant="outline"
          onClick={() => setEditingExperience(null)}
        >
          Cancel
        </Button>
      )}
    </form>
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Experiences</h3>
      <ul className="space-y-2 mb-4">
        {experiences.map((experience) => (
          <li key={experience.id} className="flex items-center justify-between">
            <span>
              {experience.company} - {experience.role}
            </span>
            <div>
              <Button onClick={() => setEditingExperience(experience)}>
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteExperience(experience.id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {editingExperience ? (
        <ExperienceForm
          experience={editingExperience}
          onSubmit={handleUpdateExperience}
          buttonText="Update Experience"
        />
      ) : (
        <ExperienceForm
          experience={newExperience}
          onSubmit={handleCreateExperience}
          buttonText="Add Experience"
        />
      )}
    </div>
  );
}
