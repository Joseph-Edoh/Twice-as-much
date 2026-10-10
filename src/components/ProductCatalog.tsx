import React, { useState, useMemo } from 'react';
import { Product, Category, CartItem } from '../types';
import { ProductQuickViewModal } from './ProductQuickViewModal';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
  onStartCustomOrder: (product: Product) => void;
  initialCategory?: Category;
}

const CATEGORIES: Category[] = [
  'All',
  'Agbada',
  'Senator Wear',
  'Sneakers',
  'Dresses',
  'Shoes',
  'Wristwatches',
  'Eyewear',
  'Polos',
  'Accessories'
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
  onStartCustomOrder,
  initialCategory = 'All',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Quick View Modal state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Open Quick View
  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          return (
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Category header & Filter controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[rgba(213,168,72,0.2)] gap-6">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#F3D17A] font-semibold">
            TWICE AS MUCH · Prêt-à-Porter & Accessories
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight mt-1">
            The Atelier Collection
          </h2>
        </div>

        {/* Search input & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search garments, shoes, watches..."
              className="w-56 sm:w-64 pl-9 pr-4 py-2 rounded-lg bg-[#0B153D] border border-[rgba(213,168,72,0.25)] text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-[#D5A848]"
            />
            <svg
              className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-lg bg-[#0B153D] border border-[rgba(213,168,72,0.25)] text-xs text-neutral-200 focus:outline-none focus:border-[#D5A848]"
          >
            <option value="featured">Featured Curations</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs (Interactive Segmented Control) */}
      <div className="py-6 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-[#D5A848] text-[#070D24] shadow'
                : 'bg-[#0B153D] text-neutral-300 hover:text-white hover:bg-[#112056] border border-[rgba(213,168,72,0.15)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-neutral-400 text-sm">No items found matching your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-[#D4AF37] hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#0B153D] rounded-xl border border-[rgba(213,168,72,0.25)] overflow-hidden flex flex-col justify-between hover:border-[#D5A848] transition-all duration-300 shadow-lg"
            >
              <div>
                {/* Image Container with hover reveal */}
                <div
                  className="relative aspect-[3/4] bg-[#070D24] overflow-hidden cursor-pointer"
                  onClick={() => handleOpenQuickView(product)}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle Bespoke Badge or Stock status */}
                  {product.isCustomizable && (
                    <div className="absolute top-3 left-3 bg-[#070D24]/90 backdrop-blur border border-[#D5A848]/60 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider text-[#F3D17A]">
                      Bespoke Tailoring
                    </div>
                  )}

                  {/* Quick View Button overlay on hover */}
                  <div className="absolute inset-0 bg-[#070D24]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenQuickView(product);
                      }}
                      className="px-4 py-2 rounded-lg bg-white text-[#070D24] text-xs font-bold hover:bg-[#F3D17A] shadow-lg transition-transform transform translate-y-2 group-hover:translate-y-0"
                    >
                      Quick View & Variants
                    </button>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between text-xs text-neutral-300 mb-1">
                    <span className="uppercase font-mono tracking-wider">{product.category}</span>
                    <span className="font-mono tabular-nums text-[#F3D17A] font-semibold">
                      ${product.price}
                    </span>
                  </div>

                  <h3
                    onClick={() => handleOpenQuickView(product)}
                    className="text-base font-serif text-white font-medium hover:text-[#F3D17A] cursor-pointer transition-colors line-clamp-1"
                  >
                    {product.name}
                  </h3>

                  {/* Color Swatch Preview */}
                  <div className="flex items-center gap-1.5 mt-2.5">
                    {product.colors.map((c) => (
                      <span
                        key={c.name}
                        title={c.name}
                        className="w-3.5 h-3.5 rounded-full border border-white/20 inline-block"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                    <span className="text-[11px] text-neutral-400 ml-1">
                      {product.sizes.length} sizes
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 flex gap-2">
                {product.isCustomizable ? (
                  <>
                    <button
                      onClick={() => onStartCustomOrder(product)}
                      className="flex-1 py-2 px-3 rounded-lg bg-[#D5A848] text-[#070D24] text-xs font-bold hover:bg-[#F3D17A] transition-colors flex items-center justify-center gap-1.5 shadow"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                      </svg>
                      Make For Me
                    </button>
                    <button
                      onClick={() => handleOpenQuickView(product)}
                      className="py-2 px-3 rounded-lg border border-[rgba(213,168,72,0.3)] text-neutral-200 text-xs hover:text-white hover:border-[#D5A848] transition-colors bg-[#081030]"
                      title="Ready to Wear Options"
                    >
                      Standard Sizing
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleOpenQuickView(product)}
                    className="w-full py-2 px-3 rounded-lg bg-[#0E1A4A] border border-[rgba(213,168,72,0.3)] text-white text-xs font-medium hover:bg-[#152563] transition-colors flex items-center justify-center gap-1.5"
                  >
                    Select Options & Bag
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QUICK VIEW & VARIANT MODAL */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={handleCloseQuickView}
        onAddToCart={onAddToCart}
        onStartCustomOrder={onStartCustomOrder}
      />
    </div>
  );
};
