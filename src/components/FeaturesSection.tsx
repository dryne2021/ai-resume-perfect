import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sparkles, 
  FileText, 
  Zap, 
  Target, 
  Download, 
  Shield,
  Clock,
  Award,
  Bot
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Content",
    description: "Generate professional resume content using advanced AI that understands your industry and role requirements."
  },
  {
    icon: Target,
    title: "ATS Optimization",
    description: "Ensure your resume passes Applicant Tracking Systems with our built-in optimization engine."
  },
  {
    icon: Zap,
    title: "Quick Generation",
    description: "Create a complete, professional resume in under 2 minutes with our streamlined process."
  },
  {
    icon: FileText,
    title: "Multiple Templates",
    description: "Choose from our collection of professionally designed, industry-specific resume templates."
  },
  {
    icon: Download,
    title: "Export Options",
    description: "Download your resume in multiple formats including PDF, DOCX, and get shareable links."
  },
  {
    icon: Shield,
    title: "Privacy Focused",
    description: "Your data is encrypted and secure. We never share your personal information with third parties."
  },
  {
    icon: Clock,
    title: "Real-time Preview",
    description: "See your resume update in real-time as you make changes with our live preview feature."
  },
  {
    icon: Award,
    title: "Job Matching",
    description: "Tailor your resume to specific job descriptions with our intelligent matching algorithm."
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Powerful Features</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Land Your Dream Job
            </span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our AI-powered resume builder combines cutting-edge technology with proven recruiting insights 
            to help you create resumes that get noticed.
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

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
            <div className="text-muted-foreground text-sm">Resumes Created</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground text-sm">ATS Pass Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">2 Min</div>
            <div className="text-muted-foreground text-sm">Average Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-muted-foreground text-sm">User Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};