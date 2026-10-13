import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Clock, Heart, Award, Sparkles, ShieldCheck, Wheat } from 'lucide-react';
import { BAKERY_PRODUCTS, CATEGORIES_DATA } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';
import { PromoBanner } from '../components/PromoBanner';

export const HomePage: React.FC = () => {
  // Best sellers: 4 hand-picked top favorites
  const bestSellers = BAKERY_PRODUCTS.filter((p) => p.badge === 'Bestseller' || p.badge === "Chef's Pick").slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.22em] font-semibold text-[#76584C]">
                <span className="w-2 h-2 rounded-full bg-[#89977A] animate-pulse" />
                <span>Wood-Fired Ovens Active Since 3:30 AM</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#C58B52]">Boutique Patisserie</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#39251F] leading-[1.12]">
                Baked with Love. <br />
                <span className="italic font-normal text-[#C58B52]">Made to Be Shared.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#76584C] max-w-xl leading-relaxed">
                Step into Crumb & Co. — where wild-fermented sourdough, golden laminated Viennoiserie, and handcrafted celebration cakes are baked fresh from our ovens every dawn.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/menu"
                  className="bg-[#C58B52] hover:bg-[#B27941] text-[#FFF5E8] font-semibold text-sm px-7 py-3.5 rounded-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                >
                  <span>Explore Our Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/about"
                  className="border border-[#39251F]/30 hover:border-[#39251F] text-[#39251F] font-semibold text-sm px-6 py-3.5 rounded-sm transition-colors"
                >
                  Our Baking Philosophy
                </Link>
              </div>

              {/* Artisan Highlights Bar */}
              <div className="pt-6 border-t border-[#39251F]/10 grid grid-cols-3 gap-4 text-xs text-[#76584C]">
                <div>
                  <p className="font-serif text-lg font-bold text-[#39251F]">36-Hour</p>
                  <p className="text-[11px] leading-tight mt-0.5">Slow cold fermentation for open, digestible crumb</p>
                </div>
                <div>
                  <p className="font-serif text-lg font-bold text-[#39251F]">100%</p>
                  <p className="text-[11px] leading-tight mt-0.5">Normandy AOP churned butter & natural starters</p>
                </div>
                <div>
                  <p className="font-serif text-lg font-bold text-[#39251F]">6:30 AM</p>
                  <p className="text-[11px] leading-tight mt-0.5">First warm batch departs daily across the city</p>
                </div>
              </div>
            </div>

            {/* Editorial Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Large Image */}
                <div className="relative overflow-hidden rounded-sm shadow-xl aspect-4/5 border border-[#39251F]/10">
                  <img
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85"
                    alt="Artisan Sourdough with crispy golden crust"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A15]/60 via-transparent to-transparent" />
                  
                  {/* Image Caption card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#FFF5E8]/95 backdrop-blur-xs p-4 rounded-sm border border-[#39251F]/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider font-semibold text-[#C58B52]">
                          Featured Today
                        </p>
                        <p className="font-serif text-base font-bold text-[#39251F]">
                          Signature Country Sourdough
                        </p>
                      </div>
                      <span className="font-bold text-sm text-[#39251F]">₹280</span>
                    </div>
                  </div>
                </div>

                {/* Overlapping Floating Badge */}
                <div className="hidden sm:block absolute -top-4 -left-6 bg-[#39251F] text-[#FFF5E8] p-4 rounded-sm shadow-lg border border-[#C58B52]/40 max-w-[190px]">
                  <div className="flex items-center gap-1.5 text-[#C58B52] mb-1">
                    <Flame className="w-4 h-4" />
                    <span className="text-[10px] font-bold tracking-widest uppercase">Live Status</span>
                  </div>
                  <p className="text-xs font-medium text-[#FFF5E8]/90">
                    Batch #03 golden sourdough & croissants currently resting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C58B52]">
              Artisan Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#39251F] mt-1">
              Explore Our Creations
            </h2>
            <p className="text-sm text-[#76584C] mt-1.5">
              Every creation is born from slow, patient methods and stone-ground heritage grains.
            </p>
          </div>

          <Link
            to="/menu"
            className="text-xs uppercase tracking-wider font-bold text-[#39251F] hover:text-[#C58B52] flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <span>View All (16 Treats)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES_DATA.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              label={cat.label}
              count={cat.count}
              description={cat.description}
              image={cat.image}
            />
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#89977A]">
              Baker's Hall of Fame
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#39251F] mt-1">
              Beloved Best Sellers
            </h2>
            <p className="text-sm text-[#76584C] mt-1.5">
              The everyday obsessions that our neighborhood regulars never leave without.
            </p>
          </div>

          <Link
            to="/menu"
            className="text-xs font-semibold uppercase tracking-wider text-[#39251F] hover:text-[#C58B52] flex items-center gap-1 transition-colors self-start md:self-auto"
          >
            <span>See Full Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Seasonal Promo Banner */}
      <section>
        <PromoBanner />
      </section>

      {/* Fresh from Our Oven (Editorial Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFF5E8] border border-[#39251F]/15 rounded-sm p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Mosaic */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-3/4 rounded-sm overflow-hidden border border-[#39251F]/10">
                  <img
                    src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80"
                    alt="Golden flaked croissants cooling on wire racks"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="bg-[#39251F] text-[#FFF5E8] p-4 rounded-sm text-xs">
                  <p className="font-serif text-sm font-semibold text-[#C58B52]">
                    81 Butter Layers
                  </p>
                  <p className="text-[#FFF5E8]/80 text-[11px] mt-1">
                    Laminated with cold churned French butter for that signature acoustic crunch.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="bg-[#FFF5E8] border border-[#39251F]/15 p-4 rounded-sm text-xs">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#89977A]">
                    Heritage Starter
                  </span>
                  <p className="font-serif text-sm font-semibold text-[#39251F] mt-0.5">
                    "Mother Hazel" (Est. 2019)
                  </p>
                  <p className="text-[#76584C] text-[11px] mt-1">
                    Fed twice daily with stoneground whole rye and spring water.
                  </p>
                </div>
                <div className="aspect-3/4 rounded-sm overflow-hidden border border-[#39251F]/10">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80"
                    alt="Dark chocolate ganache dripping over artisan cake"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Editorial Narrative */}
            <div className="lg:col-span-6 space-y-6 lg:pl-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D9A6A0]">
                Fresh From Our Oven
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#39251F] leading-tight">
                No Pre-Mixes. No Shortcuts. Just Slow, Patient Craft.
              </h2>

              <p className="text-sm sm:text-base text-[#76584C] leading-relaxed">
                In an era of commercial shortcuts and industrial bakeries, Crumb & Co. insists on doing things the old European way. Our sourdough rests for a full 36 hours in cold cellars, allowing natural enzymes to develop rich complex flavors and a blistered crust.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#C58B52]/15 text-[#C58B52] flex items-center justify-center shrink-0 mt-0.5">
                    <Wheat className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#39251F]">
                      Stoneground Heritage Grains
                    </h4>
                    <p className="text-xs text-[#76584C] mt-0.5">
                      We mill select ancient whole wheat and rye fresh each week to preserve vital nutrients and natural wheaty sweetness.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#89977A]/15 text-[#89977A] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#39251F]">
                      The 3:30 AM Baking Discipline
                    </h4>
                    <p className="text-xs text-[#76584C] mt-0.5">
                      Our pastry chefs begin when the city sleeps. Nothing on our shelves is ever baked yesterday.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#D9A6A0]/20 text-[#76584C] flex items-center justify-center shrink-0 mt-0.5">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#39251F]">
                      Made To Be Shared
                    </h4>
                    <p className="text-xs text-[#76584C] mt-0.5">
                      Packaged in unbleached compostable boxes, ready for family breakfasts, tea parties, and intimate celebrations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#39251F] hover:text-[#C58B52] transition-colors"
                >
                  <span>Read The Full Crumb & Co. Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C58B52]">
            Our Distinction
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#39251F] mt-1">
            Why Our Bakes Taste Different
          </h2>
          <p className="text-sm text-[#76584C] mt-2">
            The secret is not a trick; it is time, genuine pasture butter, and an uncompromising refusal to cut corners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#39251F]/10 p-6 rounded-sm hover:border-[#C58B52]/40 transition-colors">
            <div className="w-10 h-10 rounded-sm bg-[#FFF5E8] border border-[#39251F]/10 flex items-center justify-center text-[#C58B52] mb-4">
              <Wheat className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#39251F]">
              Wild Fermentation
            </h3>
            <p className="text-xs text-[#76584C] mt-2 leading-relaxed">
              We never use commercial chemical improvers. Our sourdough digests gluten naturally over 36 hours for easy digestion and unparalleled aroma.
            </p>
          </div>

          <div className="bg-white border border-[#39251F]/10 p-6 rounded-sm hover:border-[#C58B52]/40 transition-colors">
            <div className="w-10 h-10 rounded-sm bg-[#FFF5E8] border border-[#39251F]/10 flex items-center justify-center text-[#89977A] mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#39251F]">
              French Normandy Butter
            </h3>
            <p className="text-xs text-[#76584C] mt-2 leading-relaxed">
              We use 84% butterfat European cultured butter that gives our croissants their golden flake and our brownies their silkiness.
            </p>
          </div>

          <div className="bg-white border border-[#39251F]/10 p-6 rounded-sm hover:border-[#C58B52]/40 transition-colors">
            <div className="w-10 h-10 rounded-sm bg-[#FFF5E8] border border-[#39251F]/10 flex items-center justify-center text-[#D9A6A0] mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#39251F]">
              Baking Every Dawn
            </h3>
            <p className="text-xs text-[#76584C] mt-2 leading-relaxed">
              Two fresh baking sessions every day (6:30 AM and 2:00 PM) guarantee that your order is never dry or stale.
            </p>
          </div>

          <div className="bg-white border border-[#39251F]/10 p-6 rounded-sm hover:border-[#C58B52]/40 transition-colors">
            <div className="w-10 h-10 rounded-sm bg-[#FFF5E8] border border-[#39251F]/10 flex items-center justify-center text-[#76584C] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#39251F]">
              Zero Preservatives
            </h3>
            <p className="text-xs text-[#76584C] mt-2 leading-relaxed">
              No artificial colorings, no preservatives, and no palm oil. Pure, honest baking that you can proudly serve your family.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials / Community Love */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#39251F] text-[#FFF5E8] rounded-sm p-8 sm:p-12 lg:p-14 border border-[#C58B52]/20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D9A6A0]">
              From Breakfast Tables
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-[#FFF5E8]">
              Words from Our Patrons
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="bg-[#2A1A15] p-6 rounded-sm border border-white/10 flex flex-col justify-between">
              <p className="italic text-[#FFF5E8]/90 leading-relaxed font-serif text-base">
                "The artisan sourdough has completely ruined supermarket bread for our family. The crust crackles like music and the crumb is delightfully soft."
              </p>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#D9A6A0]">
                <span className="font-semibold text-[#FFF5E8]">Ananya S.</span>
                <span>Regular Customer · Bandra</span>
              </div>
            </div>

            <div className="bg-[#2A1A15] p-6 rounded-sm border border-white/10 flex flex-col justify-between">
              <p className="italic text-[#FFF5E8]/90 leading-relaxed font-serif text-base">
                "We ordered the Chocolate Truffle Cake for my mother's 60th birthday. It was rich, glossy, and not overly sweet. Truly world-class patisserie."
              </p>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#D9A6A0]">
                <span className="font-semibold text-[#FFF5E8]">Vikram M.</span>
                <span>Weekend Brunch Host</span>
              </div>
            </div>

            <div className="bg-[#2A1A15] p-6 rounded-sm border border-white/10 flex flex-col justify-between">
              <p className="italic text-[#FFF5E8]/90 leading-relaxed font-serif text-base">
                "Their butter croissant transported me straight back to Rue Cler in Paris. Shatteringly crisp, fragrant with butter, and arrived warm."
              </p>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#D9A6A0]">
                <span className="font-semibold text-[#FFF5E8]">Chef Rohan K.</span>
                <span>Culinary Consultant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="border border-[#39251F]/15 bg-white p-10 sm:p-14 rounded-sm">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C58B52]">
            Ready for Tomorrow's Breakfast?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#39251F] mt-2">
            Reserve Your Morning Bake
          </h2>
          <p className="text-sm text-[#76584C] max-w-lg mx-auto mt-2 mb-6">
            Small batches sell out quickly. Place your order online today and have fresh sourdough & pastries delivered straight to your door.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-[#39251F] hover:bg-[#2A1A15] text-[#FFF5E8] font-semibold text-sm px-8 py-3.5 rounded-sm transition-colors shadow-sm"
          >
            <span>Browse All 16 Baked Treats</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
