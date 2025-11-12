import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { products } from "@/data/products";
import { Check, ArrowRight, Shield, Zap, Globe, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const product = products.find((p) => p.id === id);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Product Not Found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const pricingTiers = [
    {
      name: "Starter",
      planKey: "starter",
      price: "$99",
      description: "Perfect for small teams",
      features: ["Up to 5 users", "Basic analytics", "Email support", "1GB storage"]
    },
    {
      name: "Professional",
      planKey: "professional",
      price: product.price.match(/\$\d+/)?.[0] || "$299",
      description: "For growing businesses",
      features: ["Up to 50 users", "Advanced analytics", "Priority support", "10GB storage", "API access"],
      popular: true
    },
    {
      name: "Enterprise",
      planKey: "enterprise",
      price: "Custom",
      description: "For large organizations",
      features: ["Unlimited users", "Custom integrations", "24/7 dedicated support", "Unlimited storage", "SLA guarantee"]
    }
  ];

  const handleGetStarted = (planKey: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    if (planKey === 'enterprise') {
      navigate('/contact');
      return;
    }

    navigate(`/checkout?product=${product.id}&plan=${planKey}`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="mb-16 animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  {product.category}
                </Badge>
                
                <h1 className="text-5xl md:text-6xl font-bold">{product.name}</h1>
                
                <p className="text-2xl text-muted-foreground">
                  {product.shortDescription}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:shadow-glow"
                    onClick={() => handleGetStarted('professional')}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10 w-full sm:w-auto">
                      Schedule Demo
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex-1">
                <div className="relative rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-12 aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl"></div>
                  <div className="relative text-9xl font-bold text-foreground/10">AI</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover-lift">
                <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Enterprise Security</h3>
                <p className="text-sm text-muted-foreground">Bank-level encryption</p>
              </Card>
              
              <Card className="p-6 text-center hover-lift">
                <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">99.9% uptime SLA</p>
              </Card>
              
              <Card className="p-6 text-center hover-lift">
                <Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Global Scale</h3>
                <p className="text-sm text-muted-foreground">50+ data centers</p>
              </Card>
              
              <Card className="p-6 text-center hover-lift">
                <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Always here to help</p>
              </Card>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              <span className="gradient-text">Features</span> & Capabilities
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.features.map((feature, index) => (
                <Card key={index} className="p-6 hover-lift">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature}</h3>
                      <p className="text-sm text-muted-foreground">
                        Advanced capabilities designed to streamline your workflow and boost productivity.
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-16">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Simple, <span className="gradient-text">Transparent</span> Pricing
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that fits your needs. All plans include a 14-day free trial.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingTiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={`p-8 hover-lift ${
                    tier.popular ? "border-primary shadow-glow" : ""
                  }`}
                >
                  {tier.popular && (
                    <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white">
                      Most Popular
                    </Badge>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-muted-foreground mb-6">{tier.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                  </div>

                  <Button
                    className={`w-full mb-6 ${
                      tier.popular
                        ? "bg-gradient-to-r from-primary to-accent hover:shadow-glow"
                        : ""
                    }`}
                    variant={tier.popular ? "default" : "outline"}
                    onClick={() => handleGetStarted(tier.planKey)}
                  >
                    {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>

                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90"></div>
            <div className="relative z-10 px-8 py-16 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to Get Started with {product.name}?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join thousands of companies already using our AI solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => handleGetStarted('professional')}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Talk to Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultTab="signup"
      />
    </div>
  );
};

export default ProductDetail;
