import { motion } from "framer-motion";

export function SupplementFacts() {
  return (
    <div className="mx-auto max-w-md bg-white p-6 shadow-sm ring-1 ring-black/5 rounded-sm font-sans text-black">
      <h3 className="border-b-4 border-black pb-2 text-3xl font-black uppercase leading-none tracking-tighter">
        Supplement Facts
      </h3>
      <div className="border-b border-black py-1">
        <p className="text-sm">Serving Size: 2 Capsules</p>
        <p className="text-sm">Servings Per Container: 30</p>
      </div>
      <div className="border-b-4 border-black py-1">
        <div className="flex justify-between font-bold text-sm">
          <span>Amount Per Serving</span>
          <span>% Daily Value</span>
        </div>
      </div>
      
      <div className="border-b border-black py-1 flex justify-between text-sm">
        <span><span className="font-bold">Probiotic Blend</span> (50 Billion CFU)</span>
        <span className="font-bold">**</span>
      </div>
      <div className="border-b border-black py-1 pl-4 text-xs text-gray-600">
        <p>Lactobacillus acidophilus, Bifidobacterium lactis, Lactobacillus plantarum</p>
      </div>

      <div className="border-b border-black py-1 flex justify-between text-sm">
        <span><span className="font-bold">Prebiotic Fiber Complex</span></span>
        <span className="font-bold">**</span>
      </div>
      <div className="border-b border-black py-1 pl-4 text-xs text-gray-600">
        <p>Organic Acacia Fiber, Jerusalem Artichoke Inulin</p>
      </div>

      <div className="border-b-4 border-black py-1 flex justify-between text-sm">
        <span><span className="font-bold">Digestive Enzyme Blend</span></span>
        <span className="font-bold">**</span>
      </div>
      <div className="py-2 text-[10px] leading-tight text-gray-600">
        <p>* Percent Daily Values are based on a 2,000 calorie diet.</p>
        <p>** Daily Value not established.</p>
      </div>
      <div className="mt-2 text-[10px] leading-tight">
        <p><span className="font-bold">Other Ingredients:</span> Vegetable Cellulose (Capsule), Organic Rice Hulls.</p>
      </div>
    </div>
  );
}
