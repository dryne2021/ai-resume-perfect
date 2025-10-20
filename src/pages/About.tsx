import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GraduationCap } from "lucide-react";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">About Dryne Academic Tutoring</h1>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I provide personalized academic tutoring and support, helping students excel in assignments,
            projects, and exam preparation. With a practical, student-centered approach, I focus on clarity,
            academic integrity, and timely delivery.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            My tutoring philosophy is built on collaboration and growth. Whether you need guidance with a
            capstone project, thesis, research paper, or weekly coursework, I break complex tasks into
            manageable steps and offer actionable feedback to help you improve.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Areas of expertise include nursing, business, education, and general college-level writing.
            I am committed to confidentiality, originality, and professionalism in every engagement.
          </p>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default About;
