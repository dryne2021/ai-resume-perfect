import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Palette, Building, GraduationCap } from "lucide-react";

interface Template {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  category: string;
  data: {
    personalInfo: {
      fullName: string;
      email: string;
      phone: string;
      location: string;
      linkedin: string;
    };
    summary: string;
    experience: Array<{
      id: string;
      company: string;
      position: string;
      duration: string;
      description: string;
    }>;
    education: Array<{
      id: string;
      institution: string;
      degree: string;
      year: string;
    }>;
    skills: string[];
  };
}

const templates: Template[] = [
  {
    id: "professional",
    name: "Professional",
    icon: Building,
    description: "Clean and corporate design perfect for traditional industries",
    category: "Business",
    data: {
      personalInfo: {
        fullName: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 (555) 123-4567",
        location: "New York, NY",
        linkedin: "linkedin.com/in/johnsmith"
      },
      summary: "Experienced professional with 8+ years in project management and team leadership. Proven track record of delivering complex projects on time and within budget while maintaining high quality standards.",
      experience: [
        {
          id: "1",
          company: "Tech Solutions Inc",
          position: "Senior Project Manager",
          duration: "2020 - Present",
          description: "Led cross-functional teams of 10+ members to deliver software projects worth $2M+. Implemented agile methodologies resulting in 30% faster delivery times."
        },
        {
          id: "2",
          company: "Digital Innovations",
          position: "Project Coordinator",
          duration: "2018 - 2020",
          description: "Coordinated multiple projects simultaneously, managing timelines, resources, and stakeholder communications. Achieved 95% on-time delivery rate."
        }
      ],
      education: [
        {
          id: "1",
          institution: "University of Business",
          degree: "Bachelor of Business Administration",
          year: "2018"
        }
      ],
      skills: ["Project Management", "Team Leadership", "Agile/Scrum", "Risk Management", "Stakeholder Communication", "Budget Planning"]
    }
  },
  {
    id: "creative",
    name: "Creative",
    icon: Palette,
    description: "Modern and colorful design for creative professionals",
    category: "Design",
    data: {
      personalInfo: {
        fullName: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 987-6543",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/sarahjohnson"
      },
      summary: "Creative designer with 6+ years of experience in digital marketing and brand development. Passionate about creating compelling visual stories that drive engagement and business results.",
      experience: [
        {
          id: "1",
          company: "Creative Studio",
          position: "Senior Graphic Designer",
          duration: "2021 - Present",
          description: "Design marketing materials, brand identities, and digital campaigns for Fortune 500 clients. Increased client engagement by 45% through innovative design solutions."
        },
        {
          id: "2",
          company: "Marketing Agency",
          position: "Junior Designer",
          duration: "2019 - 2021",
          description: "Created social media graphics, web layouts, and print materials. Collaborated with marketing teams to develop cohesive brand experiences."
        }
      ],
      education: [
        {
          id: "1",
          institution: "Art Institute",
          degree: "Bachelor of Fine Arts - Graphic Design",
          year: "2019"
        }
      ],
      skills: ["Adobe Creative Suite", "UI/UX Design", "Brand Development", "Typography", "Digital Marketing", "Photography"]
    }
  },
  {
    id: "technical",
    name: "Technical",
    icon: FileText,
    description: "Clean layout optimized for technical roles and engineering",
    category: "Technology",
    data: {
      personalInfo: {
        fullName: "Alex Chen",
        email: "alex.chen@email.com",
        phone: "+1 (555) 456-7890",
        location: "Seattle, WA",
        linkedin: "linkedin.com/in/alexchen"
      },
      summary: "Full-stack software engineer with 5+ years of experience building scalable web applications. Expertise in modern JavaScript frameworks, cloud architecture, and agile development practices.",
      experience: [
        {
          id: "1",
          company: "Tech Innovations",
          position: "Senior Software Engineer",
          duration: "2022 - Present",
          description: "Architect and develop microservices handling 1M+ daily requests. Led migration to cloud-native architecture, reducing infrastructure costs by 40%."
        },
        {
          id: "2",
          company: "StartupCo",
          position: "Full Stack Developer",
          duration: "2020 - 2022",
          description: "Built and maintained React applications with Node.js backends. Implemented CI/CD pipelines and automated testing, improving deployment frequency by 300%."
        }
      ],
      education: [
        {
          id: "1",
          institution: "State University",
          degree: "Bachelor of Computer Science",
          year: "2020"
        }
      ],
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "MongoDB", "PostgreSQL", "Git", "Agile"]
    }
  },
  {
    id: "academic",
    name: "Academic",
    icon: GraduationCap,
    description: "Formal design suitable for academic and research positions",
    category: "Education",
    data: {
      personalInfo: {
        fullName: "Dr. Emily Wilson",
        email: "emily.wilson@university.edu",
        phone: "+1 (555) 321-0987",
        location: "Boston, MA",
        linkedin: "linkedin.com/in/emilywilson"
      },
      summary: "Research scientist with 10+ years of experience in molecular biology and biochemistry. Published 25+ peer-reviewed papers and secured $2M+ in research funding. Passionate about advancing scientific knowledge and mentoring the next generation of researchers.",
      experience: [
        {
          id: "1",
          company: "Research University",
          position: "Associate Professor",
          duration: "2020 - Present",
          description: "Lead research group of 8 graduate students and postdocs. Teach undergraduate and graduate courses in molecular biology. Secured NSF grants totaling $1.5M."
        },
        {
          id: "2",
          company: "Medical Research Institute",
          position: "Postdoctoral Researcher",
          duration: "2018 - 2020",
          description: "Conducted independent research on protein folding mechanisms. Published 8 first-author papers in high-impact journals including Nature and Science."
        }
      ],
      education: [
        {
          id: "1",
          institution: "Harvard University",
          degree: "Ph.D. in Biochemistry",
          year: "2018"
        },
        {
          id: "2",
          institution: "MIT",
          degree: "B.S. in Biology",
          year: "2012"
        }
      ],
      skills: ["Molecular Biology", "Biochemistry", "Research Design", "Statistical Analysis", "Grant Writing", "Scientific Writing", "Protein Purification", "Mass Spectrometry"]
    }
  }
];

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
}

export const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Choose a Template</h3>
        <p className="text-muted-foreground">
          Select a professional template to get started quickly
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => {
          const IconComponent = template.icon;
          return (
            <Card key={template.id} className="hover:shadow-elegant transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5 text-primary" />
                    {template.name}
                  </CardTitle>
                  <Badge variant="secondary">{template.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => onSelectTemplate(template)}
                  className="w-full bg-gradient-primary shadow-soft"
                >
                  Use This Template
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};