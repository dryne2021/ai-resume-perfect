import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, GraduationCap, ClipboardList, BookOpen } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary-glow/20 rounded-full blur-2xl animate-pulse delay-700"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-accent/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border mb-6">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">Trusted Academic Support</span>
      </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Get Expert Help With Your
            {" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">Assignments, Projects</span>
            {" "}
            and Exams
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Personalized tutoring and academic support in nursing, business, education, and general college-level writing. On-time, plagiarism-free, and confidential.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="/contact">
              <Button size="lg" className="bg-gradient-primary shadow-elegant hover:shadow-glow transition-all">
                Get Support
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a
              href="https://wa.me/254796341760?text=Hello%20Dryne%2C%20I%27d%20like%20tutoring%20assistance"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="hover:bg-accent/50 transition-colors">
                WhatsApp Me
              </Button>
            </a>
          </div>
          
          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">Assignments</div>
                <div className="text-sm text-muted-foreground">Nursing, Business, Education, Writing</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">Projects</div>
                <div className="text-sm text-muted-foreground">Capstone, Thesis, Research</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">Exam Prep</div>
                <div className="text-sm text-muted-foreground">Coaching & Online Class Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};