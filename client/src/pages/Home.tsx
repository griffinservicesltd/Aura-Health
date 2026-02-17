import React, { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, ShieldCheck, Leaf, Beaker, Menu, Star, ArrowRight,
  Clock, Zap, Moon, Info, Truck, Heart
} from "lucide-react";

import { CartDrawer } from "@/components/CartDrawer";
import { SupplementFacts } from "@/components/SupplementFacts";

import heroImage from "@/assets/images/hero-wellness.png";
import gutImage from "@/assets/images/gut-health.png";
import inflammationImage from "@/assets/images/inflammation.png";
import sleepImage from "@/assets/images/sleep.png";

import gutHero from "@/assets/images/gut-hero.png";
import infHero from "@/assets/images/inf-hero.png";
import sleepHero from "@/assets/images/sleep-hero.png";

const categories = [
  { id: 'gut', name: 'Gut Health', icon: <Heart className="h-4 w-4" />, color: 'emerald', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', hero: gutHero },
  { id: 'inflammation', name: 'Inflammation', icon: <Zap className="h-4 w-4" />, color: 'amber', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', hero: infHero },
  { id: 'sleep', name: 'Sleep', icon: <Moon className="h-4 w-4" />, color: 'indigo', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', hero: sleepHero }
];

const products = [
  { id: "gut-1", title: "Gut Harmony Pro", category: "gut", description: "50 Billion CFU multi-strain probiotic with prebiotic fibre.", price: 39.99, subscriptionPrice: 31.99, image: gutImage, badge: "Best Seller" },
  { id: "gut-2", title: "Digestive Enzyme Plus", category: "gut", description: "Broad-spectrum enzymes for optimal nutrient absorption.", price: 24.99, subscriptionPrice: 19.99, image: gutImage },
  { id: "gut-3", title: "Saccharomyces Boulardii", category: "gut", description: "Targeted yeast probiotic for travel and intensive support.", price: 29.99, subscriptionPrice: 23.99, image: gutImage },
  { id: "gut-4", title: "L-Glutamine Pure", category: "gut", description: "Pharmaceutical grade powder for gut lining integrity.", price: 22.99, subscriptionPrice: 18.39, image: gutImage },
  { id: "gut-5", title: "Daily Fibre Complex", category: "gut", description: "Psyllium and flaxseed blend for regular bowel health.", price: 19.99, subscriptionPrice: 15.99, image: gutImage },
  { id: "inf-1", title: "Curcumin C3 Complex", category: "inflammation", description: "High-potency turmeric extract with BioPerine for absorption.", price: 44.99, subscriptionPrice: 35.99, image: inflammationImage, badge: "Clinical Grade" },
  { id: "inf-2", title: "Omega-3 Pure EPA/DHA", category: "inflammation", description: "Wild-caught, molecularly distilled fish oil (IFOS certified).", price: 34.99, subscriptionPrice: 27.99, image: inflammationImage },
  { id: "inf-3", title: "Boswellia Serrata", category: "inflammation", description: "Traditional herbal support for joint comfort and mobility.", price: 26.99, subscriptionPrice: 21.59, image: inflammationImage },
  { id: "inf-4", title: "Quercetin & Bromelain", category: "inflammation", description: "Synergistic antioxidant blend for seasonal immune support.", price: 28.99, subscriptionPrice: 23.19, image: inflammationImage },
  { id: "inf-5", title: "Tart Cherry Extract", category: "inflammation", description: "Rich in anthocyanins for post-exercise recovery support.", price: 23.99, subscriptionPrice: 19.19, image: inflammationImage },
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
          item.id === product.id && item.subscription === subscriptionMode ? { ...item, quantity: item.quantity + 1 } : item
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

  const removeFromCart = (id: string) => setCartItems(prev => prev.filter(item => item.id !== id));
  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="bg-primary text-white py-2 text-center text-xs font-medium tracking-wide z-[60] relative">
        FREE NEXT-DAY UK DELIVERY ON ORDERS OVER £50 • TRUSTED BY 5,000+ CUSTOMERS
      </div>

      <nav className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}>
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-full px-8 py-4 transition-all`}>
            <Link href="/" className="flex items-center gap-3 group">
              <img src="/aura-logo-large.png" alt="Aura Health" className="h-10 w-10 object-contain group-hover:scale-110 transition-transform" />
              <span className="font-serif text-2xl font-bold tracking-tight text-primary">Aura Health</span>
            </Link>
            <div className="hidden md:flex items-center gap-10 font-medium text-sm">
              <Link href="/category/gut" className="hover:text-primary transition-colors">Gut Health</Link>
              <Link href="/category/inflammation" className="hover:text-primary transition-colors">Inflammation</Link>
              <Link href="/category/sleep" className="hover:text-primary transition-colors">Sleep</Link>
              <a href="#science" className="hover:text-primary transition-colors">The Science</a>
            </div>
            <CartDrawer items={cartItems} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />
          </div>
        </div>
      </nav>

      <section className="relative pt-48 pb-32 overflow-hidden bg-gradient-to-b from-[#f0f4f4] to-[#fafafa]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 z-10">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-primary/10 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Est. London 2016</span>
              </div>
              <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] text-foreground font-medium">
                Purity <br /><span className="italic font-normal">Redefined</span>.
              </h1>
              <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
                UK's premier clinical-grade supplement house. Science-backed rituals for the modern human.
              </p>
              <Button size="lg" className="h-16 px-12 text-lg bg-primary hover:bg-primary/90 text-white rounded-full shadow-2xl shadow-primary/20 group">
                Shop The Collection <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            <div className="relative">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="rounded-[4rem] overflow-hidden shadow-3xl aspect-square bg-secondary">
                <img src={heroImage} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-5xl text-center mb-20">Browse by Ritual</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {categories.map(cat => (
              <Link key={cat.id} href={`/category/${cat.id}`}>
                <motion.div whileHover={{ y: -10 }} className={`relative group cursor-pointer rounded-[3rem] overflow-hidden aspect-[4/5] ${cat.bg} border-2 ${cat.border} transition-all`}>
                  <img src={cat.hero} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 p-12 flex flex-col justify-end z-10">
                    <div className={`h-16 w-16 rounded-2xl ${cat.bg} border ${cat.border} flex items-center justify-center ${cat.text} mb-6 shadow-sm`}>
                      {React.cloneElement(cat.icon as React.ReactElement, { className: "h-8 w-8" })}
                    </div>
                    <h3 className="font-serif text-4xl mb-4">{cat.name}</h3>
                    <p className={`text-sm ${cat.text} font-medium flex items-center gap-2`}>
                      Explore Ritual <ArrowRight className="h-4 w-4" />
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background pt-32 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl mb-8">Aura Health.</h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-8">© 2026 Aura Health (UK) Limited. Est. London 2016.</p>
        </div>
      </footer>
    </div>
  );
}
