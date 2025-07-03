import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Zap, Award } from "lucide-react";

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
            <span className="text-sm font-medium">AI-Powered Resume Builder</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Create Your Perfect{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AI-Generated
            </span>{" "}
            Resume
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Build professional, ATS-optimized resumes in minutes with the power of artificial intelligence. 
            Stand out from the crowd and land your dream job.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-primary shadow-elegant hover:shadow-glow transition-all">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Building Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="hover:bg-accent/50 transition-colors">
              View Templates
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">Users</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">2 Min</div>
                <div className="text-sm text-muted-foreground">Avg. Time</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-muted-foreground">ATS Pass</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};