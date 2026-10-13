import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BAKERY_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory, Product } from '../types/bakery';
import { Search, X, SlidersHorizontal, ArrowUpDown, Sparkles, Filter } from 'lucide-react';

const CATEGORY_TABS: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'All Bakes' },
  { id: 'cakes', label: 'Cakes' },
  { id: 'croissants', label: 'Croissants' },
  { id: 'bread', label: 'Bread' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'pastries', label: 'Pastries' },
  { id: 'cupcakes', label: 'Cupcakes' },
];

type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'rating';

export const MenuPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as ProductCategory) || 'all';

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    ['all', 'cakes', 'croissants', 'bread', 'cookies', 'pastries', 'cupcakes'].includes(initialCategory)
      ? initialCategory
      : 'all'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [egglessOnly, setEgglessOnly] = useState(false);

  // Sync category state when URL query changes
  useEffect(() => {
    const urlCat = searchParams.get('category') as ProductCategory;
    if (urlCat && ['all', 'cakes', 'croissants', 'bread', 'cookies', 'pastries', 'cupcakes'].includes(urlCat)) {
      setSelectedCategory(urlCat);
    }
  }, [searchParams]);

  const handleSelectCategory = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredProducts = useMemo(() => {
    return BAKERY_PRODUCTS.filter((prod) => {
      // Category filter
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }
      // Eggless filter
      if (egglessOnly && !prod.isEggless) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = prod.name.toLowerCase().includes(query);
        const matchesDesc = prod.description.toLowerCase().includes(query);
        const matchesCat = prod.category.toLowerCase().includes(query);
        const matchesIng = prod.ingredients.some((i) => i.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesIng) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended order
    });
  }, [selectedCategory, searchQuery, sortBy, egglessOnly]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('recommended');
    setEgglessOnly(false);
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-[#39251F]/15 pb-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C58B52]">
              Handcrafted Daily
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#39251F] mt-1">
              The Crumb & Co. Menu
            </h1>
            <p className="text-sm text-[#76584C] mt-2 max-w-xl">
              From blistered wood-fired sourdough and buttery French croissants to decadent celebration cakes. All baked without preservatives.
            </p>
          </div>

          <div className="text-xs text-[#76584C] bg-[#FFF5E8] border border-[#39251F]/10 px-4 py-2.5 rounded-sm self-start sm:self-auto">
            <span>Showing </span>
            <span className="font-bold text-[#39251F]">{filteredProducts.length}</span>
            <span> of 16 artisan creations</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-[#76584C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chocolate truffle, croissant, sourdough..."
              className="w-full bg-white border border-[#39251F]/15 text-[#39251F] placeholder:text-[#76584C]/60 text-sm pl-10 pr-9 py-2.5 rounded-sm focus:outline-none focus:border-[#C58B52] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#76584C] hover:text-[#39251F]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort & Dietary controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Eggless toggle */}
            <button
              type="button"
              onClick={() => setEgglessOnly(!egglessOnly)}
              className={`text-xs font-semibold px-3.5 py-2.5 rounded-sm border transition-colors flex items-center gap-1.5 cursor-pointer ${
                egglessOnly
                  ? 'bg-[#89977A] text-[#FFF5E8] border-[#89977A]'
                  : 'bg-white text-[#76584C] border-[#39251F]/15 hover:border-[#39251F]/30'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${egglessOnly ? 'bg-white' : 'bg-[#89977A]'}`} />
              <span>100% Eggless Only</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-[#39251F]/15 rounded-sm px-3 py-2 text-xs text-[#39251F]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#C58B52]" />
              <label htmlFor="sort-select" className="text-[#76584C] font-medium sr-only">
                Sort by
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent focus:outline-none text-[#39251F] font-semibold cursor-pointer"
              >
                <option value="recommended">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs (Clean Segmented / Button row with no pills) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#39251F]/10 pt-2">
          {CATEGORY_TABS.map((tab) => {
            const active = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectCategory(tab.id)}
                className={`text-xs font-medium px-4 py-2 rounded-xs whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#39251F] text-[#FFF5E8] font-semibold'
                    : 'bg-white/60 text-[#76584C] hover:bg-[#39251F]/5 hover:text-[#39251F]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active filters summary */}
      {(searchQuery || selectedCategory !== 'all' || egglessOnly || sortBy !== 'recommended') && (
        <div className="flex items-center justify-between text-xs text-[#76584C] bg-[#39251F]/5 px-4 py-2 rounded-sm border border-[#39251F]/10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#39251F]">Active filters:</span>
            {selectedCategory !== 'all' && (
              <span className="bg-white border border-[#39251F]/10 px-2 py-0.5 rounded-xs">
                Category: {selectedCategory}
              </span>
            )}
            {searchQuery && (
              <span className="bg-white border border-[#39251F]/10 px-2 py-0.5 rounded-xs">
                Search: "{searchQuery}"
              </span>
            )}
            {egglessOnly && (
              <span className="bg-white border border-[#39251F]/10 px-2 py-0.5 rounded-xs text-[#89977A] font-semibold">
                Eggless
              </span>
            )}
            {sortBy !== 'recommended' && (
              <span className="bg-white border border-[#39251F]/10 px-2 py-0.5 rounded-xs">
                Sorted by {sortBy}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-semibold text-[#C58B52] hover:text-[#B27941] underline cursor-pointer shrink-0"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-[#39251F]/15 rounded-sm p-12 text-center max-w-md mx-auto my-12 space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#FFF5E8] border border-[#39251F]/10 flex items-center justify-center text-[#76584C] mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#39251F]">
            No Bakes Found
          </h3>
          <p className="text-xs text-[#76584C] leading-relaxed">
            We couldn't find any treats matching your current criteria. Try loosening your search or resetting filters to see all 16 items.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="bg-[#C58B52] hover:bg-[#B27941] text-[#FFF5E8] text-xs font-semibold px-5 py-2.5 rounded-sm transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
