import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  projectContext?: string;
  avatarUrl?: string;
}

const Exampletestimonials: Testimonial[] = [
  {
    quote:
      "The team's expertise and dedication transformed our project. Their innovative solutions exceeded our expectations.",
    author: "Alex Johnson",
    position: "CTO",
    company: "TechCorp",
    projectContext: "Worked together on the AI Integration Project",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    quote:
      "Their attention to detail and user-centric approach significantly improved our product's usability and performance.",
    author: "Samantha Lee",
    position: "Product Manager",
    company: "InnovateSoft",
    projectContext: "Collaborated on UX Redesign",
  },
  {
    quote:
      "Exceptional service and results. They delivered a robust solution that scaled effortlessly with our growing user base.",
    author: "Michael Chen",
    position: "Founder",
    company: "StartUp Dynamics",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
];

export function Testimonials() {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 ">
          What People Say
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Exampletestimonials.map((testimonial, index) => (
            <Card key={index} className="">
              <CardContent className="p-6">
                <blockquote className="text-lg font-medium mb-4">
                  {`"${testimonial.quote}"`}
                </blockquote>
                <div className="flex items-center">
                  {testimonial.avatarUrl ? (
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage
                        src={testimonial.avatarUrl}
                        alt={testimonial.author}
                      />
                      <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div
                      className="h-10 w-10 rounded-full mr-4"
                      aria-hidden="true"
                    />
                  )}
                  <div>
                    <p className="font-semibold ">{testimonial.author}</p>
                    <p className="text-sm">
                      {testimonial.position}, {testimonial.company}
                    </p>
                    {testimonial.projectContext && (
                      <p className="text-xs mt-1">
                        {testimonial.projectContext}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
