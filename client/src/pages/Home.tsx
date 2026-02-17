import React, { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
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
  Moon,
  Info,
  Truck,
  Heart
} from "lucide-react";

import { CartDrawer } from "@/components/CartDrawer";
import { SupplementFacts } from "@/components/SupplementFacts";

import heroImage from "@/assets/images/hero-wellness.png";
import gutImage from "@/assets/images/gut-health.png";
import inflammationImage from "@/assets/images/inflammation.png";
import sleepImage from "@/assets/images/sleep.png";

// UK-Optimized Product Data
const categories = [
  { id: 'gut', name: 'Gut Health', icon: <Heart className="h-4 w-4" /> },
  { id: 'inflammation', name: 'Inflammation', icon: <Zap className="h-4 w-4" /> },
  { id: 'sleep', name: 'Sleep', icon: <Moon className="h-4 w-4" /> }
];

const products = [
  // Gut Health (5 products)
  { id: "gut-1", title: "Gut Harmony Pro", category: "gut", description: "50 Billion CFU multi-strain probiotic with prebiotic fibre.", price: 39.99, subscriptionPrice: 31.99, image: gutImage, badge: "Best Seller" },
  { id: "gut-2", title: "Digestive Enzyme Plus", category: "gut", description: "Broad-spectrum enzymes for optimal nutrient absorption.", price: 24.99, subscriptionPrice: 19.99, image: gutImage },
  { id: "gut-3", title: "Saccharomyces Boulardii", category: "gut", description: "Targeted yeast probiotic for travel and intensive support.", price: 29.99, subscriptionPrice: 23.99, image: gutImage },
  { id: "gut-4", title: "L-Glutamine Pure", category: "gut", description: "Pharmaceutical grade powder for gut lining integrity.", price: 22.99, subscriptionPrice: 18.39, image: gutImage },
  { id: "gut-5", title: "Daily Fibre Complex", category: "gut", description: "Psyllium and flaxseed blend for regular bowel health.", price: 19.99, subscriptionPrice: 15.99, image: gutImage },

  // Inflammation (5 products)
  { id: "inf-1", title: "Curcumin C3 Complex", category: "inflammation", description: "High-potency turmeric extract with BioPerine for absorption.", price: 44.99, subscriptionPrice: 35.99, image: inflammationImage, badge: "Clinical Grade" },
  { id: "inf-2", title: "Omega-3 Pure EPA/DHA", category: "inflammation", description: "Wild-caught, molecularly distilled fish oil (IFOS certified).", price: 34.99, subscriptionPrice: 27.99, image: inflammationImage },
  { id: "inf-3", title: "Boswellia Serrata", category: "inflammation", description: "Traditional herbal support for joint comfort and mobility.", price: 26.99, subscriptionPrice: 21.59, image: inflammationImage },
  { id: "inf-4", title: "Quercetin & Bromelain", category: "inflammation", description: "Synergistic antioxidant blend for seasonal immune support.", price: 28.99, subscriptionPrice: 23.19, image: inflammationImage },
  { id: "inf-5", title: "Tart Cherry Extract", category: "inflammation", description: "Rich in anthocyanins for post-exercise recovery support.", price: 23.99, subscriptionPrice: 19.19, image: inflammationImage },

  // Sleep (5 products)
  { id: "slp-1", title: "Deep Rest Glycinate", category: "sleep", description: "Highly absorbable magnesium for muscle relaxation and calm.", price: 21.99, subscriptionPrice: 17.59, image: sleepImage, badge: "Award Winner" },
  { id: "slp-2", title: "Nightly Calm Blend", category: "sleep", description: "L-Theanine, Lemon Balm and Passionflower extract.", price: 25.99, subscriptionPrice: 20.79, image: sleepImage },
  { id: "slp-3", title: "5-HTP Serotonin Support", category: "sleep", description: "Natural precursor to help regulate sleep-wake cycles.", price: 27.99, subscriptionPrice: 22.39, image: sleepImage },
  { id: "slp-4", title: "Valerian Root Elite", category: "sleep", description: "Standardised extract for shorter sleep latency.", price: 18.99, subscriptionPrice: 15.19, image: sleepImage },
  { id: "slp-5", title: "Sleep Ritual Tea", category: "sleep", description: "Organic chamomile and lavender loose leaf blend.", price: 14.99, subscriptionPrice: 11.99, image: sleepImage }
];

export default function Home() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [subscriptionMode, setSubscriptionMode] = useState(true);
  const [activeCategory, setActiveCategory] = useState('gut');

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

  const filteredProducts = products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#fafafa] text-foreground font-sans selection:bg-primary/20">
      
      {/* UK Banner */}
      <div className="bg-primary text-white py-2 text-center text-xs font-medium tracking-wide">
        FREE NEXT-DAY UK DELIVERY ON ORDERS OVER £50 • TRUSTED BY 5,000+ CUSTOMERS
      </div>

      {/* Navigation */}
      <nav className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}>
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg rounded-full px-6 py-3 transition-all ${isScrolled ? "mx-4 md:mx-12" : "mx-0"}`}>
            <div className="flex items-center gap-2">
              <img src="/aura-logo.png" alt="Aura Health" className="h-8 w-8 object-contain" onError={(e) => e.currentTarget.style.display='none'} />
              <a href="/" className="font-serif text-xl font-bold tracking-tight text-primary">Aura Health</a>
            </div>
            
            <div className="hidden md:flex items-center gap-8 font-medium text-sm">
              <a href="#shop" className="hover:text-primary transition-colors">Shop All</a>
              <a href="#science" className="hover:text-primary transition-colors">The Science</a>
              <a href="#about" className="hover:text-primary transition-colors">Our Ethos</a>
            </div>

            <div className="flex items-center gap-4">
              <CartDrawer items={cartItems} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-gradient-to-b from-[#f0f4f4] to-[#fafafa]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 clip-path-slant hidden lg:block"></div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 z-10"
            >
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-primary/10 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Est. London 2024</span>
              </div>
              <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[1] text-foreground font-medium">
                The New <br />
                <span className="italic font-normal">Standard</span> of <br />
                Pure Wellness.
              </h1>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Clinically formulated in the UK. We bridge the gap between rigorous science and holistic health.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Button size="lg" className="h-14 px-10 text-base bg-primary hover:bg-primary/90 text-white rounded-full shadow-xl shadow-primary/20 group">
                  Start Your Ritual <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="flex -space-x-3 overflow-hidden ml-4">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="inline-block h-10 w-10 rounded-full ring-4 ring-white bg-secondary flex items-center justify-center text-[10px] font-bold">AH</div>
                   ))}
                   <div className="inline-block h-10 w-10 rounded-full ring-4 ring-white bg-primary text-white flex items-center justify-center text-[10px] font-bold">5k+</div>
                </div>
              </div>
            </motion.div>
            
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 rounded-[3rem] overflow-hidden shadow-3xl aspect-[4/5] bg-secondary"
              >
                <img src={heroImage} alt="Wellness" className="w-full h-full object-cover mix-blend-multiply opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </motion.div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-primary/5 z-20 max-w-[240px] hidden md:block">
                <div className="flex items-center gap-2 mb-2 text-amber-500">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 fill-current" />)}
                </div>
                <p className="text-sm italic text-foreground">"The Gut Harmony Pro has completely transformed my daily energy levels. Essential."</p>
                <p className="text-[10px] font-bold uppercase mt-4 text-primary">— Sarah J., London</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
            <h2 className="font-serif text-5xl md:text-6xl text-foreground">Targeted Rituals.</h2>
            <p className="text-muted-foreground text-xl">Select a category to explore our clinical-grade formulations.</p>
            
            {/* Category Switcher */}
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-8 py-4 rounded-full border-2 transition-all duration-300 font-medium ${activeCategory === cat.id ? 'bg-primary border-primary text-white shadow-lg' : 'bg-white border-primary/10 text-muted-foreground hover:border-primary/30'}`}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>
            
            <div className="flex items-center justify-center gap-4 pt-12">
               <span className="text-sm font-bold text-muted-foreground">ONE-TIME</span>
               <Switch checked={subscriptionMode} onCheckedChange={setSubscriptionMode} className="data-[state=checked]:bg-primary" />
               <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full italic">SUBSCRIBE & SAVE 20%</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <AnimatePresence mode="wait">
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-[#fcfcfc] rounded-3xl border border-primary/5 p-6 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                >
                  <div className="relative aspect-square mb-6 bg-secondary/20 rounded-2xl flex items-center justify-center p-4 overflow-hidden">
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur shadow-sm text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md z-10 border border-primary/5">
                        {product.badge}
                      </span>
                    )}
                    <img src={product.image} alt={product.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  
                  <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
                  <p className="text-xs text-muted-foreground mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-primary/5">
                    <div className="flex flex-col">
                      <span className="text-lg font-serif font-bold">£{subscriptionMode ? product.subscriptionPrice.toFixed(2) : product.price.toFixed(2)}</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{subscriptionMode ? 'Per Month' : 'Single'}</span>
                    </div>
                    <Button 
                      size="icon" 
                      onClick={() => addToCart(product)} 
                      className="rounded-full h-10 w-10 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-none"
                    >
                      +
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Science & Labeling */}
      <section id="science" className="py-32 bg-secondary/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-none px-4 py-1">TRANSPARENCY FIRST</Badge>
                <h2 className="font-serif text-5xl md:text-6xl">Radical <br /><span className="italic font-normal">Ingredients</span> Truth.</h2>
                <p className="text-lg text-muted-foreground">Every milligram is accounted for. No proprietary blends. No hidden fillers. Just clinical potency.</p>
              </div>

              <div className="grid gap-6">
                <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-primary/5">
                  <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0"><ShieldCheck /></div>
                  <div>
                    <h4 className="font-bold text-base mb-1">UK MHRA Compliant</h4>
                    <p className="text-sm text-muted-foreground">Manufactured to strict Good Manufacturing Practice (GMP) standards in the UK.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-primary/5">
                  <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0"><Truck /></div>
                  <div>
                    <h4 className="font-bold text-base mb-1">Carbon Neutral Shipping</h4>
                    <p className="text-sm text-muted-foreground">100% plastic-free packaging, shipped carbon-neutrally via Royal Mail & DPD.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, rotate: 2 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-primary/5 rounded-full blur-[100px]"></div>
              <SupplementFacts />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-primary/10 flex items-center gap-3">
                 <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white"><Check className="h-4 w-4" /></div>
                 <span className="text-[10px] font-bold uppercase tracking-widest">3rd Party Tested <br />for Purity</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background pt-32 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="space-y-8">
              <a href="/" className="font-serif text-3xl font-bold tracking-tight text-white block">Aura Health.</a>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Premium, science-backed nutritional supplements for the conscious individual.
              </p>
              <div className="flex gap-4">
                 <div className="h-8 w-8 rounded-full bg-white/10 hover:bg-primary transition-colors cursor-pointer"></div>
                 <div className="h-8 w-8 rounded-full bg-white/10 hover:bg-primary transition-colors cursor-pointer"></div>
                 <div className="h-8 w-8 rounded-full bg-white/10 hover:bg-primary transition-colors cursor-pointer"></div>
              </div>
            </div>
            
            <div>
              <h5 className="font-serif text-lg mb-8 text-white">The Collection</h5>
              <ul className="space-y-4 text-sm text-gray-400">
                {categories.map(c => <li key={c.id}><a href="#" className="hover:text-primary transition-colors">{c.name}</a></li>)}
                <li><a href="#" className="hover:text-primary transition-colors">Digital Gift Cards</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-serif text-lg mb-8 text-white">Knowledge</h5>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Our Science</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sourcing Map</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Journal</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-serif text-lg mb-8 text-white">Support</h5>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">UK Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Wholesale</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-12 text-center space-y-8">
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-[9px] text-gray-500 leading-relaxed uppercase tracking-[0.1em]">
                Food supplements should not be used as a substitute for a varied and balanced diet and a healthy lifestyle. 
                Keep out of reach of young children. Do not exceed the recommended daily dose.
              </p>
              <p className="text-[9px] text-gray-500 uppercase tracking-[0.1em]">
                * FDA / MHRA DISCLAIMER: These statements have not been evaluated by the MHRA. This product is not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest pt-8 border-t border-white/5">
              <p>© 2026 Aura Health (UK) Limited.</p>
              <div className="flex gap-8 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">Privacy</a>
                <a href="#" className="hover:text-white">Terms</a>
                <a href="#" className="hover:text-white">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
