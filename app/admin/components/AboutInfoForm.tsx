"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getBasicInfo,
  getAboutInfo,
  updateAboutMe,
  getAboutQuestions,
} from "../actions";
import { AboutQuestions, Basic } from "@prisma/client";

export default function AboutMeForm() {
  const router = useRouter();
  const [basic, setBasic] = useState<Basic>({
    id: "USER",
    name: "",
    surname: "",
    title: "",
    occupation: "",
    tagline: "",
    summeryVid: "",
  });
  const [about, setAbout] = useState<AboutQuestions>({
    id: "USER",
    specialization: "",
    excitement: "",
    yearsOfExperience: 0,
    problemsSolved: "",
    motivation: "",
    interests: "",
  });
  const [files, setFiles] = useState({
    headshot: "",
    cv: "",
  });

  useEffect(() => {
    Promise.all([getBasicInfo(), getAboutInfo(), getAboutQuestions()]).then(
      ([basicInfo, aboutInfo, aboutQuestions]) => {
        if (basicInfo !== null) {
          setBasic({ ...basicInfo });
        }
        if (aboutQuestions !== null) {
          setAbout({ ...aboutQuestions });
        }
        if (aboutInfo) {
          setFiles({ headshot: aboutInfo.img, cv: aboutInfo.cv });
        }
      }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateAboutMe({ about, basic, files });
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* <h2 className="text-xl font-semibold">Basic Information <Button></Button></h2> */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={basic.name}
              onChange={(e) => setBasic({ ...basic, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="surname">Surname</Label>
            <Input
              id="surname"
              value={basic.surname}
              onChange={(e) => setBasic({ ...basic, surname: e.target.value })}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={basic.title}
            onChange={(e) => setBasic({ ...basic, title: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            value={basic.occupation}
            onChange={(e) => setBasic({ ...basic, occupation: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={basic.tagline}
            onChange={(e) => setBasic({ ...basic, tagline: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="summeryVid">Summery Video URL</Label>
          <Input
            id="summeryVid"
            value={basic.summeryVid}
            onChange={(e) => setBasic({ ...basic, summeryVid: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Introduction and Profession</h2>
        <div>
          <Label htmlFor="specialization">Specialization or Focus Area</Label>
          <Input
            id="specialization"
            placeholder="Responsive web and mobile app development"
            value={about.specialization}
            onChange={(e) =>
              setAbout({ ...about, specialization: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="excitement">What Excites You About Your Work?</Label>
          <Textarea
            id="excitement"
            placeholder="I love turning ideas into functional, user-friendly designs."
            value={about.excitement}
            onChange={(e) => setAbout({ ...about, excitement: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Skills and Experience</h2>
        <div>
          <Label htmlFor="yearsOfExperience">Years of Experience</Label>
          <Select
            value={about.yearsOfExperience.toString()}
            onValueChange={(value) =>
              setAbout({ ...about, yearsOfExperience: Number(value) })
            }
          >
            <SelectTrigger id="yearsOfExperience">
              <SelectValue placeholder="Select years of experience" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(20)].map((_, i) => (
                <SelectItem key={i} value={(i + 1).toString()}>
                  {i + 1} year{i !== 0 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="problemsSolved">
            What Problems Do You Solve for Clients?
          </Label>
          <Textarea
            id="problemsSolved"
            placeholder="I help clients create seamless digital experiences that drive engagement."
            value={about.problemsSolved}
            onChange={(e) =>
              setAbout({ ...about, problemsSolved: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Personal Touch</h2>
        <div>
          <Label htmlFor="motivation">Motivation or Passion</Label>
          <Textarea
            id="motivation"
            placeholder="I'm passionate about crafting intuitive and efficient user interfaces."
            value={about.motivation}
            onChange={(e) => setAbout({ ...about, motivation: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="interests">Personal Interests or Hobbies</Label>
          <Input
            id="interests"
            placeholder="Exploring new music, learning about emerging tech trends."
            value={about.interests}
            onChange={(e) => setAbout({ ...about, interests: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Additional Information</h2>
        <div>
          <Label htmlFor="img">About Image URL</Label>
          <Input
            id="img"
            value={files.headshot}
            onChange={(e) => setFiles({ ...files, headshot: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="cv">CV URL</Label>
          <Input
            id="cv"
            value={files.cv}
            onChange={(e) => setFiles({ ...files, cv: e.target.value })}
          />
        </div>
      </div>

      <Button type="submit">Save Changes</Button>
    </form>
  );
}
