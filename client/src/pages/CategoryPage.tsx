import React, { useState } from "react";
import { useRoute, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ShoppingCart, Heart, Zap, Moon, ArrowRight } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";

import gutImage from "@/assets/images/gut-health.png";
import inflammationImage from "@/assets/images/inflammation.png";
import sleepImage from "@/assets/images/sleep.png";
import gutHero from "@/assets/images/gut-hero.png";
import infHero from "@/assets/images/inf-hero.png";
import sleepHero from "@/assets/images/sleep-hero.png";

const categoryData: any = {
  gut: {
    name: 'Gut Health',
    theme: 'emerald',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    primary: 'bg-emerald-600',
    border: 'border-emerald-100',
    hero: gutHero,
    icon: <Heart />,
    description: 'Advanced synbiotics for microbiome diversity and digestive resilience.'
  },
  inflammation: {
    name: 'Inflammation',
    theme: 'amber',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    primary: 'bg-amber-600',
    border: 'border-amber-100',
    hero: infHero,
    icon: <Zap />,
    description: 'Clinical grade antioxidants for systemic inflammatory response.'
  },
  sleep: {
    name: 'Sleep',
    theme: 'indigo',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    primary: 'bg-indigo-600',
    border: 'border-indigo-100',
    hero: sleepHero,
    icon: <Moon />,
    description: 'Non-habit forming magnesium and botanical blends for deep rest.'
  }
};

const products = [
  { id: "gut-1", title: "Gut Harmony Pro", category: "gut", price: 39.99, subscriptionPrice: 31.99, image: gutImage },
  { id: "gut-2", title: "Digestive Enzyme Plus", category: "gut", price: 24.99, subscriptionPrice: 19.99, image: gutImage },
  { id: "gut-3", title: "Saccharomyces Boulardii", category: "gut", price: 29.99, subscriptionPrice: 23.99, image: gutImage },
  { id: "gut-4", title: "L-Glutamine Pure", category: "gut", price: 22.99, subscriptionPrice: 18.39, image: gutImage },
  { id: "gut-5", title: "Daily Fibre Complex", category: "gut", price: 19.99, subscriptionPrice: 15.99, image: gutImage },
  { id: "inf-1", title: "Curcumin C3 Complex", category: "inflammation", price: 44.99, subscriptionPrice: 35.99, image: inflammationImage },
  { id: "inf-2", title: "Omega-3 Pure EPA/DHA", category: "inflammation", price: 34.99, subscriptionPrice: 27.99, image: inflammationImage },
  { id: "inf-3", title: "Boswellia Serrata", category: "inflammation", price: 26.99, subscriptionPrice: 21.59, image: inflammationImage },
  { id: "inf-4", title: "Quercetin & Bromelain", category: "inflammation", price: 28.99, subscriptionPrice: 23.19, image: inflammationImage },
  { id: "inf-5", title: "Tart Cherry Extract", category: "inflammation", price: 23.99, subscriptionPrice: 19.19, image: inflammationImage },
  { id: "slp-1", title: "Deep Rest Glycinate", category: "sleep", price: 21.99, subscriptionPrice: 17.59, image: sleepImage },
  { id: "slp-2", title: "Nightly Calm Blend", category: "sleep", price: 25.99, subscriptionPrice: 20.79, image: sleepImage },
  { id: "slp-3", title: "5-HTP Serotonin Support", category: "sleep", price: 27.99, subscriptionPrice: 22.39, image: sleepImage },
  { id: "slp-4", title: "Valerian Root Elite", category: "sleep", price: 18.99, subscriptionPrice: 15.19, image: sleepImage },
  { id: "slp-5", title: "Sleep Ritual Tea", category: "sleep", price: 14.99, subscriptionPrice: 11.99, image: sleepImage }
];

export default function CategoryPage() {
  const [match, params] = useRoute("/category/:slug");
  const categorySlug = params?.slug || 'gut';
  const category = categoryData[categorySlug];
  
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [subscriptionMode, setSubscriptionMode] = useState(true);

  if (!category) return <div>Category not found</div>;

  const filteredProducts = products.filter(p => p.category === categorySlug);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.subscription === subscriptionMode);
      if (existing) {
        return prev.map(item => item.id === product.id && item.subscription === subscriptionMode ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, name: product.title, price: subscriptionMode ? product.subscriptionPrice : product.price, quantity: 1, subscription: subscriptionMode }];
    });
  };

  return (
    <div className={`min-h-screen ${category.bg}`}>
      <nav className="p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Rituals
        </Link>
        <CartDrawer items={cartItems} onRemove={(id) => setCartItems(prev => prev.filter(i => i.id !== id))} onUpdateQuantity={(id, d) => setCartItems(prev => prev.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + d)} : i))} />
      </nav>

      <header className="relative py-32 px-6 overflow-hidden">
        <img src={category.hero} className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="container mx-auto relative z-10 text-center space-y-8">
          <div className={`inline-flex items-center justify-center h-20 w-20 rounded-[2rem] bg-white shadow-xl ${category.text}`}>
            {React.cloneElement(category.icon, { className: "h-10 w-10" })}
          </div>
          <h1 className="font-serif text-7xl md:text-9xl tracking-tighter">{category.name}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{category.description}</p>
        </div>
      </header>

      <section className="py-24 px-6 bg-white rounded-t-[5rem] shadow-2xl relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <h2 className="font-serif text-4xl">Available Formulations</h2>
            <div className={`flex items-center gap-4 p-2 rounded-full border-2 ${category.border}`}>
              <span className="text-xs font-bold px-4">ONE-TIME</span>
              <Switch checked={subscriptionMode} onCheckedChange={setSubscriptionMode} className={`data-[state=checked]:${category.primary}`} />
              <span className={`text-xs font-bold px-4 ${category.text}`}>SUBSCRIBE & SAVE 20%</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.map((product) => (
              <motion.div key={product.id} whileHover={{ y: -5 }} className={`group p-8 rounded-[3rem] border-2 border-transparent hover:${category.border} transition-all`}>
                <div className={`aspect-square rounded-[2rem] ${category.bg} mb-8 flex items-center justify-center p-8`}>
                  <img src={product.image} className="w-full h-full object-contain drop-shadow-2xl" />
                </div>
                <h3 className="font-serif text-2xl mb-2">{product.title}</h3>
                <div className="flex items-center justify-between mt-8">
                  <div className="flex flex-col">
                    <span className="text-2xl font-serif">£{subscriptionMode ? product.subscriptionPrice.toFixed(2) : product.price.toFixed(2)}</span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{subscriptionMode ? 'Per Month' : 'Single Purchase'}</span>
                  </div>
                  <Button onClick={() => addToCart(product)} className={`rounded-full px-8 h-12 ${category.primary} text-white`}>Add to Ritual</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
