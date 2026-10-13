import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wheat, Heart, Sparkles, Clock, Flame, Award, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Editorial Header */}
      <section className="pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C58B52]">
            The Crumb & Co. Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#39251F] leading-[1.12]">
            Where Patience Is Our Most Prized Ingredient.
          </h1>
          <p className="text-base sm:text-lg text-[#76584C] leading-relaxed pt-2">
            Founded with an enduring fascination for European patisserie and wild wild-yeast baking, Crumb & Co. began in a small corner kitchen with one cast-iron Dutch oven and a living sourdough starter.
          </p>
        </div>
      </section>

      {/* Large Hero Editorial Image & Kicker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-sm overflow-hidden border border-[#39251F]/10 shadow-lg aspect-16/9 sm:aspect-21/9 max-h-[520px]">
          <img
            src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1600&q=85"
            alt="Artisan baker dusting stoneground flour onto freshly scored sourdough loaves"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A15]/80 via-[#2A1A15]/30 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row items-start sm:items-end justify-between text-[#FFF5E8] gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D9A6A0]">
                Every Morning · 3:30 AM
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-[#FFF5E8]">
                Flour, Water, Salt & Living Culture.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#FFF5E8]/80 max-w-sm">
              No chemical accelerants. No artificial stabilizers. Just four humble elements elevated through slow time and passionate hands.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Our Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#89977A]">
              Foundation & Craft
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#39251F] leading-tight">
              Our Philosophy
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#76584C] leading-relaxed">
              <p>
                In a fast-paced world obsessed with industrial speed, we chose the slower path. True artisan bread cannot be rushed. It requires watching the ambient temperature, feeling the tension in the dough, and listening to the crackle of the crust as it leaves the deck oven.
              </p>
              <p>
                Our signature sourdough loaves undergo a rigorous 36-hour cold proofing cycle. During this time, beneficial lactic acid bacteria break down complex starches, generating deeper nutritional bioavailability, remarkable keeping qualities, and our unmistakable custard-like interior.
              </p>
            </div>

            <div className="pt-2 border-t border-[#39251F]/10 grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white border border-[#39251F]/10 rounded-sm">
                <span className="font-serif text-xl font-bold text-[#39251F]">36 Hours</span>
                <p className="text-[#76584C] mt-1">Cold fermentation window for optimal flavor</p>
              </div>
              <div className="p-4 bg-white border border-[#39251F]/10 rounded-sm">
                <span className="font-serif text-xl font-bold text-[#39251F]">81 Layers</span>
                <p className="text-[#76584C] mt-1">Individual laminated butter folds per croissant</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative aspect-3/4 rounded-sm overflow-hidden border border-[#39251F]/10">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
                  alt="Baker gently kneading artisan dough with precision"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-[#39251F]/90 text-[#FFF5E8] px-3 py-1.5 rounded-xs text-[11px]">
                  Manual Dough Folding
                </div>
              </div>

              <div className="space-y-4 pt-0 sm:pt-8">
                <div className="relative aspect-3/4 rounded-sm overflow-hidden border border-[#39251F]/10">
                  <img
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
                    alt="Golden baked sourdough loaf with scoring ear"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#39251F]/90 text-[#FFF5E8] px-3 py-1.5 rounded-xs text-[11px]">
                    Deck Oven Spring
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Fresh Ingredients, Every Day */}
      <section className="bg-[#FFF5E8] border-y border-[#39251F]/15 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C58B52]">
              Sourced with Integrity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#39251F] mt-1">
              Fresh Ingredients, Every Day
            </h2>
            <p className="text-sm text-[#76584C] mt-2">
              Great baking is transparent. Here are the five cornerstones of everything we knead, fold, and bake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#39251F]/10 p-6 rounded-sm">
              <div className="w-10 h-10 rounded-sm bg-[#FFF5E8] text-[#C58B52] flex items-center justify-center font-serif font-bold text-lg mb-4">
                01
              </div>
              <h3 className="font-serif text-xl font-bold text-[#39251F]">
                Normandy AOP Butter
              </h3>
              <p className="text-xs text-[#76584C] mt-2 leading-relaxed">
                Imported cultured French butter with an 84% butterfat ratio. Churned from the milk of grass-fed cows, producing golden flaky lamination and unmatched nutty depth.
              </p>
            </div>

            <div className="bg-white border border-[#39251F]/10 p-6 rounded-sm">
              <div className="w-10 h-10 rounded-sm bg-[#FFF5E8] text-[#89977A] flex items-center justify-center font-serif font-bold text-lg mb-4">
                02
              </div>
              <h3 className="font-serif text-xl font-bold text-[#39251F]">
                Single-Origin Belgian Chocolate
              </h3>
              <p className="text-xs text-[#76584C] mt-2 leading-relaxed">
                70% dark Callebaut cocoa solids crafted from sustainably harvested beans. Rich in antioxidants and devoid of cheap vegetable oil substitutes or palm fat.
              </p>
            </div>

            <div className="bg-white border border-[#39251F]/10 p-6 rounded-sm">
              <div className="w-10 h-10 rounded-sm bg-[#FFF5E8] text-[#D9A6A0] flex items-center justify-center font-serif font-bold text-lg mb-4">
                03
              </div>
              <h3 className="font-serif text-xl font-bold text-[#39251F]">
                Madagascar Bourbon Vanilla
              </h3>
              <p className="text-xs text-[#76584C] mt-2 leading-relaxed">
                We split and scrape whole plump vanilla bean pods by hand into our custards, cheesecakes, and cake batters. Never artificial vanillin essence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Made with Heart */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative rounded-sm overflow-hidden border border-[#39251F]/10 shadow-lg aspect-4/3">
              <img
                src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1000&q=80"
                alt="Artisan dessert display featuring handcrafted pastries"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-4 p-4 bg-[#39251F] text-[#FFF5E8] rounded-sm text-xs flex items-center justify-between">
              <div>
                <p className="font-serif font-bold text-[#C58B52] text-sm">Small Batch Promise</p>
                <p className="text-[#FFF5E8]/80 text-[11px]">Capped daily yields ensure every single item meets our exacting standards.</p>
              </div>
              <Award className="w-6 h-6 text-[#C58B52] shrink-0" />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D9A6A0]">
              The Heartbeat of Our Bakery
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#39251F] leading-tight">
              Made with Heart
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#76584C] leading-relaxed">
              <p>
                Behind every golden crust and glossy mirror glaze is a small, dedicated team of pastry artisans, dough kneaders, and decorators who genuinely love the craft.
              </p>
              <p>
                Food is memory. Whether it is a comforting slice of banana walnut bread with your morning filter coffee, or a towering chocolate truffle cake celebrating a child's milestone birthday, we feel profoundly grateful to be part of your most cherished family moments.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-[#C58B52] hover:bg-[#B27941] text-[#FFF5E8] font-semibold text-sm px-7 py-3.5 rounded-sm transition-all shadow-sm"
              >
                <span>Discover Our Bakery Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Daily Ritual (Timeline) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#39251F]/15 p-8 sm:p-12 rounded-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#89977A]">
              Behind the Scenes
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#39251F] mt-1">
              A Day in Our Artisan Bakery
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="p-4 bg-[#FFF5E8]/60 border border-[#39251F]/10 rounded-sm">
              <span className="font-mono text-sm font-bold text-[#C58B52]">3:30 AM</span>
              <h4 className="font-serif text-base font-bold text-[#39251F] mt-1">Ovens Fired</h4>
              <p className="text-[#76584C] mt-1">
                Deck stone ovens preheated to 240°C. Cold-proofed sourdough loaves scored with razor blades.
              </p>
            </div>

            <div className="p-4 bg-[#FFF5E8]/60 border border-[#39251F]/10 rounded-sm">
              <span className="font-mono text-sm font-bold text-[#C58B52]">5:45 AM</span>
              <h4 className="font-serif text-base font-bold text-[#39251F] mt-1">Croissant Lamination</h4>
              <p className="text-[#76584C] mt-1">
                Viennoiserie proofed until jiggly. Egg-washed and baked until amber golden.
              </p>
            </div>

            <div className="p-4 bg-[#FFF5E8]/60 border border-[#39251F]/10 rounded-sm">
              <span className="font-mono text-sm font-bold text-[#C58B52]">7:00 AM</span>
              <h4 className="font-serif text-base font-bold text-[#39251F] mt-1">Doors Open & Dispatch</h4>
              <p className="text-[#76584C] mt-1">
                The aroma fills the street. Freshly packed delivery boxes leave for morning breakfast runs.
              </p>
            </div>

            <div className="p-4 bg-[#FFF5E8]/60 border border-[#39251F]/10 rounded-sm">
              <span className="font-mono text-sm font-bold text-[#C58B52]">2:00 PM</span>
              <h4 className="font-serif text-base font-bold text-[#39251F] mt-1">Afternoon Tea Bake</h4>
              <p className="text-[#76584C] mt-1">
                Warm brownies, cinnamon rolls, and celebration cakes decorated fresh for evening gatherings.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
