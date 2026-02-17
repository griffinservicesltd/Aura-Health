import React, { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { 
  Check, 
  ShieldCheck, 
  Leaf, 
  Beaker, 
  Menu, 
  Star, 
  ArrowRight,
  Clock,
  Zap,
  Moon
} from "lucide-react";

import { CartDrawer } from "@/components/CartDrawer";
import { SupplementFacts } from "@/components/SupplementFacts";

import heroImage from "@/assets/images/hero-wellness.png";
import gutImage from "@/assets/images/gut-health.png";
import inflammationImage from "@/assets/images/inflammation.png";
import sleepImage from "@/assets/images/sleep.png";

// Data
const products = [
  {
    id: "gut",
    title: "Gut Harmony",
    category: "Gut Health",
    description: "Complete digestive support with 50 Billion CFU Probiotics & Prebiotics.",
    price: 49.00,
    subscriptionPrice: 39.20,
    image: gutImage,
    accent: "bg-emerald-50 text-emerald-900",
    badge: "Bestseller"
  },
  {
    id: "inflammation",
    title: "Relief Complex",
    category: "Inflammation",
    description: "Advanced Curcumin & Boswellia blend for systemic inflammation support.",
    price: 54.00,
    subscriptionPrice: 43.20,
    image: inflammationImage,
    accent: "bg-amber-50 text-amber-900",
    badge: "New Formula"
  },
  {
    id: "sleep",
    title: "Deep Rest",
    category: "Sleep",
    description: "Non-habit forming Magnesium & L-Theanine for restorative sleep cycles.",
    price: 42.00,
    subscriptionPrice: 33.60,
    image: sleepImage,
    accent: "bg-indigo-50 text-indigo-900",
    badge: "Clinically Tested"
  }
];

const scienceCards = [
  {
    icon: <Beaker className="h-6 w-6" />,
    title: "Gut Microbiome",
    description: "Your gut is your second brain. Our synbiotic blend restores diversity to your microbiome, impacting mood, immunity, and digestion.",
    details: ["L. Acidophilus NCFM", "B. Lactis Bi-07", "Organic Prebiotics"]
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Systemic Inflammation",
    description: "Chronic inflammation is the root of modern ailment. We use bio-available Curcumin C3 Complex® to target inflammatory markers.",
    details: ["95% Curcuminoids", "Black Pepper Extract", "Boswellia Serrata"]
  },
  {
    icon: <Moon className="h-6 w-6" />,
    title: "Restorative Sleep",
    description: "Deep sleep cleanses the brain. We skip melatonin in favor of Magnesium Glycinate to support natural circadian rhythms without grogginess.",
    details: ["Magnesium Bisglycinate", "L-Theanine", "Apigenin"]
  }
];

export default function Home() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [subscriptionMode, setSubscriptionMode] = useState(true);

  // Scroll listener
  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.subscription === subscriptionMode);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.subscription === subscriptionMode
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.title,
        price: subscriptionMode ? product.subscriptionPrice : product.price,
        quantity: 1,
        image: product.image,
        subscription: subscriptionMode
      }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Menu className="h-6 w-6 md:hidden" />
            <a href="/" className="font-serif text-2xl font-semibold tracking-tight text-primary">Aura Health.</a>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-foreground/80">
            <a href="#shop" className="hover:text-primary transition-colors">Shop</a>
            <a href="#science" className="hover:text-primary transition-colors">The Science</a>
            <a href="#about" className="hover:text-primary transition-colors">Our Story</a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:flex text-sm font-medium">Log In</Button>
            <CartDrawer items={cartItems} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 z-10">
              <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-wider">
                Clinical Grade Wellness
              </Badge>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-foreground">
                Science-Backed <br />
                <span className="text-primary italic">Inner Harmony</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Advanced formulations for Gut Health, Inflammation, and Sleep. 
                Pure, potent, and third-party tested for your peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="h-12 px-8 text-base bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-full">
                  Shop Formulations
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full border-2 hover:bg-secondary/50">
                  Read the Science
                </Button>
              </div>
              
              <div className="pt-8 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span>FDA Registered Facility</span>
                </div>
                <div className="flex items-center gap-2">
                  <Beaker className="h-5 w-5 text-primary" />
                  <span>Clinically Dosed</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/50 rounded-[2rem] -rotate-3 scale-95 z-0"></div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl"
              >
                <img 
                  src={heroImage} 
                  alt="Woman holding water glass" 
                  className="w-full h-full object-cover aspect-[4/5]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="shop" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="font-serif text-4xl md:text-5xl mb-4 text-foreground">Curated Essentials</h2>
              <p className="text-muted-foreground text-lg">Targeted support for the three pillars of modern wellness.</p>
            </div>
            
            <div className="flex items-center gap-3 bg-secondary/50 p-2 rounded-full border">
              <span className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all ${!subscriptionMode ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}>One-time</span>
              <Switch checked={subscriptionMode} onCheckedChange={setSubscriptionMode} className="data-[state=checked]:bg-primary" />
              <span className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all ${subscriptionMode ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground'}`}>
                Subscribe & Save 20%
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-2xl border hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
              >
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-foreground text-background text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {product.badge}
                  </div>
                )}
                
                <div className={`h-80 w-full flex items-center justify-center p-8 rounded-t-2xl ${product.accent} bg-opacity-30`}>
                  <img src={product.image} alt={product.title} className="h-full w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="p-8">
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{product.category}</div>
                  <h3 className="font-serif text-2xl font-medium mb-3">{product.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-2xl font-serif font-medium">
                        ${subscriptionMode ? product.subscriptionPrice.toFixed(2) : product.price.toFixed(2)}
                      </span>
                      {subscriptionMode && (
                        <span className="text-xs text-muted-foreground line-through decoration-destructive/50">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Button 
                      onClick={() => addToCart(product)} 
                      className="rounded-full px-6 bg-foreground text-background hover:bg-primary transition-colors"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section id="science" className="py-24 bg-secondary/30 relative overflow-hidden">
        {/* Abstract shapes background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">The Science of Wellbeing</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We don't believe in magic pills. We believe in clinical doses, bioavailable ingredients, 
              and transparent labeling. Every formula is backed by peer-reviewed research.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="grid gap-8">
              {scienceCards.map((card, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-medium mb-2">{card.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                        {card.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {card.details.map((detail, i) => (
                          <span key={i} className="text-xs font-medium bg-secondary px-2.5 py-1 rounded-md text-secondary-foreground">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:sticky lg:top-24">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-indigo-100/20 rounded-xl blur-xl"></div>
                <SupplementFacts />
                
                <div className="mt-8 text-center">
                  <p className="text-sm font-medium text-primary flex items-center justify-center gap-2">
                    <Check className="h-4 w-4" /> Full Transparency Labeling
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 mb-2">
                <Leaf className="h-8 w-8" />
              </div>
              <h4 className="font-serif font-bold text-lg">100% Vegan</h4>
              <p className="text-xs text-muted-foreground max-w-[150px]">Plant-based ingredients with zero animal byproducts.</p>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 mb-2">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h4 className="font-serif font-bold text-lg">Third-Party Tested</h4>
              <p className="text-xs text-muted-foreground max-w-[150px]">Every batch tested for purity, potency, and heavy metals.</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 mb-2">
                <Beaker className="h-8 w-8" />
              </div>
              <h4 className="font-serif font-bold text-lg">Non-GMO</h4>
              <p className="text-xs text-muted-foreground max-w-[150px]">Sourced from sustainable, non-genetically modified crops.</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-700 mb-2">
                <Star className="h-8 w-8" />
              </div>
              <h4 className="font-serif font-bold text-lg">GMP Certified</h4>
              <p className="text-xs text-muted-foreground max-w-[150px]">Manufactured in FDA-registered GMP compliant facilities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background pt-20 pb-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <a href="/" className="font-serif text-3xl font-semibold tracking-tight text-white mb-6 block">Aura Health.</a>
              <p className="text-gray-400 text-sm leading-relaxed">
                Elevating the standard of wellness through science-backed formulations and radical transparency.
              </p>
            </div>
            
            <div>
              <h5 className="font-serif text-lg mb-6 text-white">Shop</h5>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Gut Health</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Inflammation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sleep</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Bundles</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-serif text-lg mb-6 text-white">Company</h5>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Science</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Reviews</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-serif text-lg mb-6 text-white">Stay in the loop</h5>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  className="bg-white/10 border-none rounded-md px-4 py-2 text-sm text-white placeholder:text-gray-500 w-full focus:ring-1 focus:ring-primary"
                />
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Join our newsletter for science-backed wellness tips and exclusive offers.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 mt-8">
            <p className="text-[10px] text-gray-500 leading-relaxed mb-6 max-w-4xl mx-auto text-center border p-4 border-white/10 rounded-lg">
              * FDA DISCLAIMER: These statements have not been evaluated by the Food and Drug Administration. 
              This product is not intended to diagnose, treat, cure, or prevent any disease. 
              Consult your physician before using this product if you are pregnant, nursing, taking medication, or have a medical condition.
            </p>
            
            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
              <p>&copy; 2026 Aura Health Inc. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
                <a href="#" className="hover:text-white">Shipping & Returns</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
