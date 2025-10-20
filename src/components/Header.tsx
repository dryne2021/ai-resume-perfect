import { Button } from "@/components/ui/button";
import { GraduationCap, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Dryne Academic Tutoring
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">
            Services
          </Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Link to="/admin">
            <Button variant="ghost" size="sm">
              Admin
            </Button>
          </Link>
          <a
            href="https://wa.me/254796341760?text=Hello%20Dryne%2C%20I%27d%20like%20tutoring%20assistance"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="bg-gradient-primary shadow-elegant">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};