import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

interface BookingRow {
  id: string;
  created_at: string | null;
  subject: string | null;
  description: string | null;
  service_type: string;
  user_id: string; // using email as identifier
  status: string | null;
}

const Admin = () => {
  const [authed, setAuthed] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [rows, setRows] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("dryne_admin_authed");
    if (saved === "true") setAuthed(true);
  }, []);

  async function login() {
    const expected = import.meta.env.VITE_ADMIN_PASSWORD || "dryneadmin";
    if (password === expected) {
      localStorage.setItem("dryne_admin_authed", "true");
      setAuthed(true);
    } else {
      toast.error("Incorrect password");
    }
  }

  async function load() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("id, created_at, subject, description, service_type, user_id, status")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setRows((data as any) || []);
    } catch (err) {
      toast.error("Failed to load messages");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function markReviewed(id: string) {
    try {
      const { error } = await supabase.from("bookings").update({ status: "reviewed" }).eq("id", id);
      if (error) throw error;
      toast.success("Marked as reviewed");
      await load();
    } catch (err) {
      toast.error("Failed to update");
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={login}>Login</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <Button variant="outline" onClick={load} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rows.map((r) => (
            <Card key={r.id} className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{r.subject || "(No name)"}</span>
                  <span className="text-xs text-muted-foreground">{r.service_type}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-2">{r.user_id}</div>
                <p className="mb-3 whitespace-pre-wrap">{r.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{r.created_at?.replace("T", " ").slice(0, 16)}</span>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => markReviewed(r.id)} variant="secondary">
                      Mark reviewed
                    </Button>
                    <a
                      className="text-primary hover:underline text-sm"
                      href={`mailto:${r.user_id}`}
                    >
                      Reply via email
                    </a>
                  </div>
                </div>
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

export default Admin;
