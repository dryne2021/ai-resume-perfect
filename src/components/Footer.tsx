import { GraduationCap, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Dryne Academic Tutoring
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Trusted academic support: assignments, projects, and exam preparation.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> <a href="mailto:dryne2021@gmail.com" className="hover:text-foreground transition-colors">dryne2021@gmail.com</a></li>
              <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> <a href="https://wa.me/254796341760" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">+254 796 341 760</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://wa.me/254796341760?text=Hello%20Dryne%2C%20I%27d%20like%20tutoring%20assistance" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><Link to="/admin" className="hover:text-foreground transition-colors">Admin</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Dryne Academic Tutoring Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};