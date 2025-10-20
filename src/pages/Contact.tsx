import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const serviceType = String(formData.get("serviceType") || "General");
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("bookings").insert({
        user_id: email, // using email as identifier (bookings has no FK)
        subject: name,
        service_type: serviceType,
        description: message,
        status: "new",
      });
      if (error) throw error;
      toast.success("Message sent! I'll get back to you shortly.");
      (event.target as HTMLFormElement).reset();
    } catch (err: any) {
      toast.error("Failed to send message. Please try WhatsApp or email.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact</h1>
          <p className="text-muted-foreground mb-6">
            WhatsApp: <a className="text-primary hover:underline" href="https://wa.me/254796341760" target="_blank" rel="noopener noreferrer">+254 796 341 760</a>
            {" "}| Email: <a className="text-primary hover:underline" href="mailto:dryne2021@gmail.com">dryne2021@gmail.com</a>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your full name" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <Label htmlFor="serviceType">Service</Label>
              <select
                id="serviceType"
                name="serviceType"
                className="w-full border rounded-md p-2 bg-background"
                defaultValue="General"
              >
                <option>General</option>
                <option>Assignment Help</option>
                <option>Project Guidance</option>
                <option>Exam & Quiz Prep</option>
              </select>
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="How can I help?" rows={6} required />
            </div>
            <Button type="submit" disabled={submitting} className="bg-gradient-primary">
              {submitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Contact;
