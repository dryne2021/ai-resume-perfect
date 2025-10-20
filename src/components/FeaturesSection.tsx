import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sparkles,
  ClipboardList,
  GraduationCap,
  Laptop,
  Target,
  ShieldCheck,
  Clock,
  BookOpen
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Assignment Help",
    description: "Expert guidance in nursing, business, education, and academic writing."
  },
  {
    icon: ClipboardList,
    title: "Project Guidance",
    description: "Support for capstone projects, theses, and research papers from topic to defense."
  },
  {
    icon: GraduationCap,
    title: "Exam & Quiz Prep",
    description: "Coaching, study plans, and online class support to boost your grades."
  },
  {
    icon: Laptop,
    title: "Online Class Support",
    description: "Reliable assistance for coursework, discussions, and weekly tasks."
  },
  {
    icon: Target,
    title: "Study Coaching",
    description: "Personalized strategies to improve understanding, retention, and performance."
  },
  {
    icon: ShieldCheck,
    title: "Confidential & Plagiarism-Free",
    description: "Strict confidentiality and original work with proper academic standards."
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Fast turnaround with clear milestones and updates."
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">How I Can Help</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Academic Support
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From assignments to exam preparation, get personalized, reliable, and timely support for your studies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed text-center">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a href="/services" className="inline-block">
            <span className="text-primary font-semibold hover:underline">Explore all services →</span>
          </a>
        </div>
      </div>
    </section>
  );
};