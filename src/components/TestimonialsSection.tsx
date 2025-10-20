import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Nursing Student",
    quote:
      "Dryne helped me structure my capstone and polish my research writing. I felt confident and prepared.",
  },
  {
    name: "Business Major",
    quote:
      "Clear guidance and on-time delivery. My grades improved and studying became less stressful.",
  },
  {
    name: "Education Student",
    quote:
      "Great feedback on assignments and consistent support during exams. Highly recommend!",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-accent/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border mb-4">
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Student Feedback</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Testimonials</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="border-border/50">
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">“{t.quote}”</p>
                <div className="font-semibold">{t.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
