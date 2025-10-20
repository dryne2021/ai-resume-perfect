import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ClipboardList, GraduationCap } from "lucide-react";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const services = [
  {
    icon: BookOpen,
    title: "Assignment Help",
    points: [
      "Nursing, Business, Education, and general writing",
      "Formatting (APA, MLA, Chicago)",
      "Plagiarism-free, well-researched content",
    ],
  },
  {
    icon: ClipboardList,
    title: "Project Guidance",
    points: [
      "Capstone planning and execution",
      "Thesis and research paper support",
      "Proposal writing and defense preparation",
    ],
  },
  {
    icon: GraduationCap,
    title: "Exam & Quiz Support",
    points: [
      "Study coaching and revision plans",
      "Test prep strategies",
      "Online class and discussion support",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
            Reliable academic support tailored to your needs. Choose the help you need and get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <Card key={s.title} className="border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-3">
                  <s.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Services;
