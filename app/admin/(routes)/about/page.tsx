"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
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
} from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { AboutQuestions, Basic } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { Copy } from "lucide-react";
import { toast } from "sonner";

function AboutMeForm({
  setIsEditing,
}: {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    paragraph: "",
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
          setFiles({
            headshot: `${aboutInfo.img}`,
            cv: aboutInfo.cv,
            paragraph: aboutInfo.paragraph,
          });
        }
      }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await updateAboutMe({ about, basic, files });
    if (res.succes) {
      setIsLoading(false);
      toast.success("Details Updated succesfully");
      router.refresh();
      setIsEditing(false);
    } else {
      setIsLoading(false);
      toast.error("Something Went wrong");
    }
  };

  const copyToClipboard = () => {
    const promt = `Write a short "About Me" paragraph (2 or 3 sentances) for a professional. Here's some information to guide the writing:
    - name: ${basic.name}
    - surname: ${basic.surname}
    - occupation: ${basic.occupation}
    - tagline/slogan: ${basic.tagline} (just use as insperation but not include the actual tagline)
    - Specialization: ${about.specialization}
    - Excitement: ${about.excitement}
    - Years of Experience: ${about.yearsOfExperience}
    - Problems Solved: ${about.problemsSolved}
    - Motivation: ${about.motivation}
    - Interests: ${about.interests}
  `;
    navigator.clipboard
      .writeText(promt)
      .then(() => {
        toast("Promt copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 h-full overflow-auto pr-4"
    >
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
            value={basic.summeryVid || ""}
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
        <h2 className="text-xl font-semibold">
          Paragraph <Copy onClick={copyToClipboard} />
          {/* text */}
        </h2>
        <div>
          <Label htmlFor="paragraph">About me</Label>
          <Textarea
            id="paragraph"
            value={files.paragraph}
            onChange={(e) => setFiles({ ...files, paragraph: e.target.value })}
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

      <Button type="submit" disabled={isLoading}>
        Save Changes
      </Button>
    </form>
  );
}

function DisplayAboutMe() {
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
    paragraph: "",
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
          setFiles({
            headshot: aboutInfo.img || "",
            cv: aboutInfo.cv,
            paragraph: aboutInfo.paragraph,
          });
        }
      }
    );
  }, []);

  return (
    <div className="container mx-auto p-4 h-full overflow-auto pr-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
              <p>
                <strong>Name:</strong> {basic.name} {basic.surname}
              </p>
              <p>
                <strong>Title:</strong> {basic.title}
              </p>
              <p>
                <strong>Occupation:</strong> {basic.occupation}
              </p>
              <p>
                <strong>Tagline:</strong> {basic.tagline}
              </p>
            </div>
            <div>
              {files.headshot && (
                <Image
                  src={files.headshot}
                  alt="Profile"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Professional Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Specialization:</strong> {about.specialization}
          </p>
          <p>
            <strong>What excites me about my work:</strong> {about.excitement}
          </p>
          <p>
            <strong>Years of Experience:</strong> {about.yearsOfExperience}
          </p>
          <p>
            <strong>Problems I solve for clients:</strong>{" "}
            {about.problemsSolved}
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Personal Touch</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Motivation:</strong> {about.motivation}
          </p>
          <p>
            <strong>Interests:</strong> {about.interests}
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Paragraph</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{files.paragraph}</p>
        </CardContent>
      </Card>

      {basic.summeryVid && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Summary Video</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="">
              <iframe
                src={basic.summeryVid}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      )}

      {files.cv && (
        <Card>
          <CardHeader>
            <CardTitle>CV</CardTitle>
          </CardHeader>
          <CardContent>
            <a
              href={files.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View CV
            </a>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function AboutMeCard() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsEditing(checked);
  };
  return (
    <div className="h-[calc(100vh-100px)] overflow-hidden">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            <div>
              <p>Edit Information</p>
              <Switch
                checked={isEditing}
                onCheckedChange={handleSwitchChange}
              />
            </div>

            {/* <div>
            
            <GenerateAboutDialog />
          </div> */}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-60px)] overflow-auto">
          <Suspense fallback={<div>Loading...</div>}>
            {isEditing ? (
              <AboutMeForm setIsEditing={setIsEditing} />
            ) : (
              <DisplayAboutMe />
            )}
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
