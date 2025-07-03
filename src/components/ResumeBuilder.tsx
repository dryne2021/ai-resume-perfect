import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Download, Sparkles, Plus, X } from "lucide-react";

interface ResumeData {
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
}

export const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
    },
    summary: "",
    experience: [
      {
        id: "1",
        company: "",
        position: "",
        duration: "",
        description: "",
      },
    ],
    education: [
      {
        id: "1",
        institution: "",
        degree: "",
        year: "",
      },
    ],
    skills: [],
  });

  const [newSkill, setNewSkill] = useState("");

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          duration: "",
          description: "",
        },
      ],
    });
  };

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((s) => s !== skill),
    });
  };

  return (
    <section className="py-16 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Build Your Resume with{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AI Assistance
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fill in your information and let our AI generate professional content for your resume
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Input Form */}
          <div className="space-y-6">
            {/* Personal Information */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={resumeData.personalInfo.fullName}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          personalInfo: {
                            ...resumeData.personalInfo,
                            fullName: e.target.value,
                          },
                        })
                      }
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          personalInfo: {
                            ...resumeData.personalInfo,
                            email: e.target.value,
                          },
                        })
                      }
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          personalInfo: {
                            ...resumeData.personalInfo,
                            phone: e.target.value,
                          },
                        })
                      }
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={resumeData.personalInfo.location}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          personalInfo: {
                            ...resumeData.personalInfo,
                            location: e.target.value,
                          },
                        })
                      }
                      placeholder="New York, NY"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) =>
                      setResumeData({
                        ...resumeData,
                        personalInfo: {
                          ...resumeData.personalInfo,
                          linkedin: e.target.value,
                        },
                      })
                    }
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  value={resumeData.summary}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      summary: e.target.value,
                    })
                  }
                  placeholder="Brief professional summary highlighting your key achievements and career goals..."
                  rows={4}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    // AI enhancement placeholder
                    setResumeData({
                      ...resumeData,
                      summary: "Experienced software engineer with 5+ years developing scalable web applications. Proven track record of leading cross-functional teams and delivering high-quality solutions that drive business growth.",
                    });
                  }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Enhance
                </Button>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addSkill();
                      }
                    }}
                  />
                  <Button onClick={addSkill} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resume Preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="shadow-elegant">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Resume Preview</CardTitle>
                <Button size="sm" className="bg-gradient-primary shadow-soft">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </CardHeader>
              <CardContent>
                <div className="bg-background border rounded-lg p-6 min-h-[600px] space-y-4">
                  {/* Header */}
                  <div className="text-center border-b pb-4">
                    <h1 className="text-2xl font-bold text-foreground">
                      {resumeData.personalInfo.fullName || "Your Name"}
                    </h1>
                    <div className="text-sm text-muted-foreground mt-2 space-y-1">
                      {resumeData.personalInfo.email && (
                        <div>{resumeData.personalInfo.email}</div>
                      )}
                      {resumeData.personalInfo.phone && (
                        <div>{resumeData.personalInfo.phone}</div>
                      )}
                      {resumeData.personalInfo.location && (
                        <div>{resumeData.personalInfo.location}</div>
                      )}
                      {resumeData.personalInfo.linkedin && (
                        <div>{resumeData.personalInfo.linkedin}</div>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  {resumeData.summary && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Professional Summary</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {resumeData.summary}
                      </p>
                    </div>
                  )}

                  {/* Skills */}
                  {resumeData.skills.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Skills</h2>
                      <div className="flex flex-wrap gap-1">
                        {resumeData.skills.map((skill, index) => (
                          <span key={skill} className="text-sm">
                            {skill}
                            {index < resumeData.skills.length - 1 && " • "}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Experience</h2>
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id} className="mb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">
                              {exp.position || "Position Title"}
                            </h3>
                            <div className="text-sm text-muted-foreground">
                              {exp.company || "Company Name"}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {exp.duration || "Duration"}
                          </div>
                        </div>
                        {exp.description && (
                          <p className="text-sm mt-1 text-muted-foreground">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};