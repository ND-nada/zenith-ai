import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
              <span className="text-background font-extrabold text-xl font-montserrat">T</span>
            </div>
            <span className="font-extrabold text-2xl gradient-text font-montserrat tracking-tight">TagerAi</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              end
              className="text-muted-foreground hover:text-primary transition-all font-semibold font-montserrat"
              activeClassName="text-primary"
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className="text-muted-foreground hover:text-primary transition-all font-semibold font-montserrat"
              activeClassName="text-primary"
            >
              Products
            </NavLink>
            <NavLink
              to="/bundles"
              className="text-muted-foreground hover:text-primary transition-all font-semibold font-montserrat"
              activeClassName="text-primary"
            >
              Bundles
            </NavLink>
            <NavLink
              to="/contact"
              className="text-muted-foreground hover:text-primary transition-all font-semibold font-montserrat"
              activeClassName="text-primary"
            >
              Contact
            </NavLink>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <NavLink
              to="/"
              end
              className="block text-muted-foreground hover:text-foreground transition-colors py-2"
              activeClassName="text-foreground font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className="block text-muted-foreground hover:text-foreground transition-colors py-2"
              activeClassName="text-foreground font-medium"
              onClick={() => setIsOpen(false)}
            >
              Products
            </NavLink>
            <NavLink
              to="/bundles"
              className="block text-muted-foreground hover:text-foreground transition-colors py-2"
              activeClassName="text-foreground font-medium"
              onClick={() => setIsOpen(false)}
            >
              Bundles
            </NavLink>
            <NavLink
              to="/contact"
              className="block text-muted-foreground hover:text-foreground transition-colors py-2"
              activeClassName="text-foreground font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
            <Button className="w-full bg-gradient-to-r from-primary to-accent">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
