import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { Sparkles, Zap, Shield, TrendingUp, ArrowRight, Users, Rocket, Globe, Award, CheckCircle, Star, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Index = () => {
  const featuredProducts = products.slice(0, 6);
  const statsAnimation = useScrollAnimation(0.2);
  const howItWorksAnimation = useScrollAnimation(0.2);
  const testimonialsAnimation = useScrollAnimation(0.2);
  const faqAnimation = useScrollAnimation(0.2);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden noise-texture">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Geometric decorative elements */}
        <div className="absolute top-1/4 left-20 w-20 h-20 border-2 border-primary/20 rounded-lg rotate-45 animate-float"></div>
        <div className="absolute top-1/3 right-40 w-16 h-16 border-2 border-secondary/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-20 w-12 h-12 bg-primary/10 rounded-lg rotate-12 animate-float" style={{ animationDelay: '3s' }}></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <Badge className="tech-card shadow-glow">
              <Sparkles className="w-3 h-3 mr-1" />
              Trusted by 10,000+ Companies Worldwide
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight font-montserrat">
              Discover AI Solutions for{" "}
              <span className="gradient-text animate-glow">Every Industry</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Transform your business with cutting-edge AI solutions. From healthcare to finance, 
              find the perfect tools to accelerate growth and innovation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/products">
                <Button size="lg">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/bundles">
                <Button size="lg" variant="outline">
                  View Bundles
                </Button>
              </Link>
            </div>
          </div>

          {/* Floating Tech Cards Animation */}
          <div className="mt-20 relative h-64 hidden lg:block">
            <div className="absolute top-0 left-1/4 tech-card p-6 animate-float shadow-glow" style={{ animationDelay: '0s', width: '220px' }}>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary shadow-glow"></div>
                <span className="font-bold text-sm font-montserrat">AI Analytics</span>
              </div>
              <p className="text-xs text-muted-foreground font-light">99.9% accuracy rate</p>
              <div className="mt-2 h-1 w-full bg-primary/20 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              </div>
            </div>
            
            <div className="absolute top-12 right-1/4 tech-card p-6 animate-float shadow-glow" style={{ animationDelay: '2s', width: '220px' }}>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-primary shadow-glow"></div>
                <span className="font-bold text-sm font-montserrat">Smart Automation</span>
              </div>
              <p className="text-xs text-muted-foreground font-light">Save 60% time daily</p>
              <div className="mt-2 h-1 w-full bg-secondary/20 rounded-full overflow-hidden">
                <div className="h-full w-3/5 bg-gradient-to-r from-secondary to-primary rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="tech-card p-8 noise-texture">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 neon-glow">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-montserrat">Lightning Fast</h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">
                Deploy AI solutions in minutes, not months. Get started instantly.
              </p>
            </div>

            <div className="tech-card p-8 noise-texture">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 neon-glow">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-montserrat">Enterprise Security</h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">
                Bank-level encryption and compliance with SOC 2, GDPR, HIPAA.
              </p>
            </div>

            <div className="tech-card p-8 noise-texture">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 neon-glow">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-montserrat">Scale Effortlessly</h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">
                From startup to enterprise, our AI grows with your business.
              </p>
            </div>

            <div className="tech-card p-8 noise-texture">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 neon-glow">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-montserrat">AI Innovation</h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">
                Access the latest AI models and technologies as they emerge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-6xl font-extrabold font-montserrat">
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Explore our most popular AI solutions trusted by industry leaders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 relative overflow-hidden noise-texture">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5"></div>
        <div 
          ref={statsAnimation.ref}
          className={`container mx-auto relative z-10 transition-all duration-1000 ${
            statsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-5xl md:text-7xl font-extrabold text-primary font-montserrat neon-glow">
                <AnimatedCounter end={10000} suffix="+" isVisible={statsAnimation.isVisible} />
              </div>
              <p className="text-muted-foreground font-semibold font-montserrat">Active Users</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl md:text-7xl font-extrabold text-primary font-montserrat neon-glow">
                <AnimatedCounter end={500} suffix="+" isVisible={statsAnimation.isVisible} />
              </div>
              <p className="text-muted-foreground font-semibold font-montserrat">AI Solutions</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl md:text-7xl font-extrabold text-primary font-montserrat neon-glow">
                <AnimatedCounter end={95} suffix="%" isVisible={statsAnimation.isVisible} />
              </div>
              <p className="text-muted-foreground font-semibold font-montserrat">Satisfaction Rate</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl md:text-7xl font-extrabold text-primary font-montserrat neon-glow">
                <AnimatedCounter end={120} suffix="+" isVisible={statsAnimation.isVisible} />
              </div>
              <p className="text-muted-foreground font-semibold font-montserrat">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-card/30 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-40 h-40 border border-primary/10 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 border border-secondary/10 rounded-lg rotate-45"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <Badge className="tech-card shadow-glow">
              <Rocket className="w-3 h-3 mr-1" />
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-6xl font-extrabold font-montserrat">
              Get Started in <span className="gradient-text">3 Easy Steps</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Deploy enterprise AI solutions in minutes, not months
            </p>
          </div>

          <div 
            ref={howItWorksAnimation.ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: "01",
                icon: Users,
                title: "Choose Your Solution",
                description: "Browse our curated marketplace of AI solutions or explore pre-built bundles tailored to your industry needs."
              },
              {
                step: "02",
                icon: Zap,
                title: "Quick Integration",
                description: "Seamlessly integrate with your existing tools using our plug-and-play APIs and comprehensive documentation."
              },
              {
                step: "03",
                icon: TrendingUp,
                title: "Scale & Optimize",
                description: "Monitor performance in real-time and scale effortlessly as your business grows with our intelligent infrastructure."
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 delay-${index * 200} ${
                  howItWorksAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="tech-card p-8 relative overflow-hidden group noise-texture">
                  <div className="absolute top-0 right-0 text-[140px] font-extrabold text-primary/5 leading-none font-montserrat">
                    {item.step}
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 shadow-glow-intense">
                      <item.icon className="w-8 h-8 text-background" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 font-montserrat">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-6xl font-extrabold font-montserrat">
              Browse by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Find AI solutions tailored to your industry
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.slice(1).map((category) => (
              <Link
                key={category}
                to="/products"
                className="tech-card p-6 text-center group noise-texture"
              >
                <h3 className="font-bold group-hover:text-primary transition-all font-montserrat">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge className="tech-card shadow-glow">
              <Star className="w-3 h-3 mr-1" />
              Trusted by Leaders
            </Badge>
            <h2 className="text-4xl md:text-6xl font-extrabold font-montserrat">
              What Our <span className="gradient-text">Customers Say</span>
            </h2>
          </div>

          <div 
            ref={testimonialsAnimation.ref}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${
              testimonialsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {[
              {
                name: "Sarah Chen",
                role: "CTO at HealthTech Solutions",
                content: "TagerAi's infrastructure has transformed how we deploy AI models. What used to take weeks now takes hours. The scalability is unmatched.",
                rating: 5
              },
              {
                name: "Marcus Rodriguez",
                role: "VP of Operations at FinanceFlow",
                content: "The analytics platform gave us insights we never thought possible. ROI was positive within the first quarter. Absolutely game-changing.",
                rating: 5
              },
              {
                name: "Emily Watson",
                role: "Head of Marketing at RetailHub",
                content: "Our conversion rates jumped 40% after implementing the AI optimization suite. The customer support is exceptional too.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="tech-card p-8 relative border-l-4 border-primary noise-texture"
              >
                <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/20" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed font-light">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary shadow-glow"></div>
                  <div>
                    <div className="font-bold font-montserrat">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground font-light">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-extrabold font-montserrat">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              Everything you need to know about TagerAi
            </p>
          </div>

          <div 
            ref={faqAnimation.ref}
            className={`transition-all duration-1000 ${
              faqAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="tech-card px-6">
                <AccordionTrigger className="hover:no-underline font-bold font-montserrat">
                  How quickly can I get started?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light">
                  Most of our AI solutions can be deployed in under 30 minutes. Our quick-start guides and comprehensive documentation ensure you're up and running fast.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="tech-card px-6">
                <AccordionTrigger className="hover:no-underline font-bold font-montserrat">
                  What kind of support do you offer?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light">
                  We provide 24/7 technical support, dedicated account managers for enterprise clients, comprehensive documentation, and regular training webinars.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="tech-card px-6">
                <AccordionTrigger className="hover:no-underline font-bold font-montserrat">
                  Is my data secure?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light">
                  Absolutely. We're SOC 2 Type II certified, GDPR compliant, and HIPAA compliant. All data is encrypted at rest and in transit using bank-level encryption.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="tech-card px-6">
                <AccordionTrigger className="hover:no-underline font-bold font-montserrat">
                  Can I customize the AI solutions?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light">
                  Yes! All our solutions offer extensive customization options. Enterprise clients can also request fully custom AI models tailored to their specific needs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="tech-card px-6">
                <AccordionTrigger className="hover:no-underline font-bold font-montserrat">
                  What happens if I need to scale?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light">
                  Our infrastructure automatically scales with your needs. From startup to enterprise, you can upgrade your plan anytime without any downtime or data migration.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="relative rounded-3xl overflow-hidden noise-texture shadow-glow-intense">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"></div>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-64 h-64 bg-background rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-background rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10 px-8 py-20 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold text-background font-montserrat">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-background/90 max-w-2xl mx-auto font-light">
                Join thousands of companies leveraging AI to drive growth and innovation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/products">
                  <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90 shadow-elevated">
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-background text-background hover:bg-background/20">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
