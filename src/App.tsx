import React, { useState, useEffect } from 'react';
import { Product, CustomBespokeOrder, CartItem, ActiveView } from './types';
import { INITIAL_PRODUCTS, INITIAL_CUSTOM_ORDERS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { MakeForMeWizard } from './components/MakeForMeWizard';
import { AdminDashboard } from './components/AdminDashboard';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';

export default function App() {
  // Persistence for products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_products');
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((p) => p.id));
        const missing = INITIAL_PRODUCTS.filter((p) => !existingIds.has(p.id));
        if (missing.length > 0) {
          const merged = [...parsed, ...missing];
          localStorage.setItem('atelier_products', JSON.stringify(merged));
          return merged;
        }
        return parsed;
      }
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Persistence for custom orders
  const [customOrders, setCustomOrders] = useState<CustomBespokeOrder[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_custom_orders');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOM_ORDERS;
    } catch {
      return INITIAL_CUSTOM_ORDERS;
    }
  });

  // Persistence for cart items
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Brand Name & Logo customization
  const [brandName, setBrandName] = useState<string>(() => {
    const saved = localStorage.getItem('atelier_brand_name');
    if (!saved || saved === 'ATELIER HAUTE') return 'TWICE AS MUCH';
    return saved;
  });
  const [brandLogoUrl, setBrandLogoUrl] = useState<string | null>(() => {
    return localStorage.getItem('atelier_brand_logo') || null;
  });

  // Active View
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [previousView, setPreviousView] = useState<ActiveView>('home');
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProductForCustom, setSelectedProductForCustom] = useState<Product | undefined>(undefined);
  const [homeQuickViewProduct, setHomeQuickViewProduct] = useState<Product | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('atelier_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('atelier_custom_orders', JSON.stringify(customOrders));
  }, [customOrders]);

  useEffect(() => {
    localStorage.setItem('atelier_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('atelier_brand_name', brandName);
    if (brandLogoUrl) {
      localStorage.setItem('atelier_brand_logo', brandLogoUrl);
    } else {
      localStorage.removeItem('atelier_brand_logo');
    }
  }, [brandName, brandLogoUrl]);

  // Cart operations
  const handleAddToCart = (item: Omit<CartItem, 'id'>) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.size === item.size && i.color.name === item.color.name
      );
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}` }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Bespoke Custom Order operations
  const handleStartCustomOrder = (product?: Product) => {
    setPreviousView(activeView);
    if (product) {
      setSelectedProductForCustom(product);
    }
    setActiveView('make-for-me');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitCustomOrder = (newOrder: CustomBespokeOrder) => {
    setCustomOrders((prev) => [newOrder, ...prev]);
  };

  // Admin handlers
  const handleUpdateOrderStatus = (orderId: string, status: CustomBespokeOrder['status']) => {
    setCustomOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleUpdateStock = (productId: string, stock: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stockCount: stock, inStock: stock > 0 } : p
      )
    );
  };

  const handleUpdateBrand = (name: string, logoUrl: string | null) => {
    setBrandName(name);
    setBrandLogoUrl(logoUrl);
  };

  // Curated spotlight creations for the homepage
  const featuredHighlights = React.useMemo(() => {
    const desiredOrder = [
      'prod-agbada-01',
      'prod-senator-01',
      'prod-sneaker-01',
      'prod-dress-01',
      'prod-senator-02',
      'prod-sneaker-02',
    ];
    const found = desiredOrder
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
    return found.length >= 3 ? found : products.slice(0, 6);
  }, [products]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#070D24] text-[#F0F4FC] flex flex-col font-sans selection:bg-[#D5A848] selection:text-[#070D24]">
      {/* Sticky Top Navbar */}
      <Navbar
        activeView={activeView}
        onNavigate={(view) => {
          if (view !== activeView) {
            setPreviousView(activeView);
            setActiveView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        brandName={brandName}
        brandLogoUrl={brandLogoUrl}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero onNavigate={setActiveView} />

            {/* Featured Haute Couture & Custom Tailoring Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
              <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[rgba(213,168,72,0.2)] gap-4">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-[#F3D17A]">
                    Bespoke & Ready-to-Wear Highlights
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight mt-1">
                    Signature Creations
                  </h2>
                </div>
                <button
                  onClick={() => setActiveView('catalog')}
                  className="text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-[#F3D17A] transition-colors flex items-center gap-1.5 self-start md:self-auto"
                >
                  <span>Explore Full Collection ({products.length} Pieces)</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              {/* Curated Grid Featuring Agbada, Senator Wear, Sneakers & Couture */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {featuredHighlights.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-[#0B153D] rounded-xl border border-[rgba(213,168,72,0.25)] overflow-hidden flex flex-col justify-between hover:border-[#D5A848] transition-all duration-300 shadow-lg"
                  >
                    <div>
                      <div
                        className="relative aspect-[3/4] bg-[#070D24] overflow-hidden cursor-pointer"
                        onClick={() => setHomeQuickViewProduct(item)}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        {item.isCustomizable && (
                          <div className="absolute top-3 left-3 bg-[#070D24]/90 backdrop-blur border border-[#D5A848]/60 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider text-[#F3D17A]">
                            Make For Me Available
                          </div>
                        )}
                        <div className="absolute inset-0 bg-[#070D24]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                          <span className="px-3.5 py-1.5 rounded-lg bg-white text-[#070D24] text-xs font-bold shadow">
                            Quick View Options
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between text-xs text-neutral-300 mb-1">
                          <span className="uppercase font-mono tracking-wider">{item.category}</span>
                          <span className="font-mono tabular-nums text-[#F3D17A] font-semibold">
                            ${item.price}
                          </span>
                        </div>
                        <h3
                          onClick={() => setHomeQuickViewProduct(item)}
                          className="text-lg font-serif text-white font-medium group-hover:text-[#F3D17A] transition-colors cursor-pointer"
                        >
                          {item.name}
                        </h3>
                        <p className="text-xs text-neutral-300 mt-2 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex gap-2">
                      {item.isCustomizable ? (
                        <>
                          <button
                            onClick={() => handleStartCustomOrder(item)}
                            className="flex-1 py-2.5 px-3 rounded-lg bg-[#D5A848] text-[#070D24] text-xs font-bold hover:bg-[#F3D17A] transition-colors flex items-center justify-center gap-1.5 shadow"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                            </svg>
                            Make For Me
                          </button>
                          <button
                            onClick={() => setHomeQuickViewProduct(item)}
                            className="py-2.5 px-3 rounded-lg border border-[rgba(213,168,72,0.3)] text-neutral-200 text-xs hover:text-white hover:border-[#D5A848] transition-colors bg-[#081030]"
                          >
                            Quick View
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setHomeQuickViewProduct(item)}
                          className="w-full py-2.5 px-3 rounded-lg bg-[#0E1A4A] border border-[rgba(213,168,72,0.3)] text-white text-xs font-medium hover:bg-[#152563] transition-colors flex items-center justify-center gap-1.5"
                        >
                          Select Options & Bag
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Craftsmanship & 2D Avatar Measurement Spotlight Feature */}
              <div className="mt-20 p-8 sm:p-12 rounded-2xl bg-[#0B153D] border border-[rgba(213,168,72,0.35)] relative overflow-hidden shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F3D17A]">
                      The TWICE AS MUCH Atelier Experience
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-serif text-white">
                      Never Settle for Off-The-Rack Inexactitude.
                    </h3>
                    <p className="text-sm text-neutral-200 leading-relaxed max-w-xl">
                      Standard sizes ignore posture, shoulder slope, and personal proportion. In our "Make For Me" studio, you are guided through 8 key anatomical markers with a visual 2D avatar. Our master tailors translate your measurements directly into an individual paper pattern, cut by hand from pure silk and fine merino.
                    </p>

                    <div className="pt-2 flex flex-wrap gap-4">
                      <button
                        onClick={() => setActiveView('make-for-me')}
                        className="px-6 py-3 rounded-lg bg-[#D5A848] text-[#070D24] font-bold text-xs uppercase tracking-wider hover:bg-[#F3D17A] transition-all shadow-md shadow-[#D5A848]/20"
                      >
                        Launch Measurement Studio
                      </button>
                      <button
                        onClick={() => setActiveView('admin')}
                        className="px-6 py-3 rounded-lg border border-[rgba(213,168,72,0.3)] bg-[#070D24]/60 text-neutral-200 text-xs uppercase tracking-wider hover:text-white hover:border-[#D5A848] transition-colors"
                      >
                        Preview Master Tailor Portal
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-[rgba(213,168,72,0.3)] bg-[#070D24] p-4 shadow-xl">
                      <img
                        src="/src/assets/images/accessories_luxury_collection_1791567182741.jpg"
                        alt="TWICE AS MUCH luxury accessories and craftsmanship"
                        referrerPolicy="no-referrer"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="mt-3 flex items-center justify-between text-xs text-neutral-300">
                        <span className="font-mono text-[#F3D17A]">Complimentary Consultation</span>
                        <span>Tailor Review Included</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick View Modal for Home View */}
            <ProductQuickViewModal
              product={homeQuickViewProduct}
              onClose={() => setHomeQuickViewProduct(null)}
              onAddToCart={handleAddToCart}
              onStartCustomOrder={handleStartCustomOrder}
            />
          </div>
        )}

        {activeView === 'catalog' && (
          <ProductCatalog
            products={products}
            onAddToCart={handleAddToCart}
            onStartCustomOrder={handleStartCustomOrder}
            initialCategory="All"
          />
        )}

        {activeView === 'make-for-me' && (
          <MakeForMeWizard
            products={products}
            selectedProduct={selectedProductForCustom}
            onSelectProduct={(p) => setSelectedProductForCustom(p)}
            onSubmitOrder={handleSubmitCustomOrder}
            onCancel={() => {
              setActiveView(previousView === 'make-for-me' ? 'catalog' : previousView);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewDashboard={() => setActiveView('admin')}
          />
        )}

        {activeView === 'accessories' && (
          <ProductCatalog
            products={products}
            onAddToCart={handleAddToCart}
            onStartCustomOrder={handleStartCustomOrder}
            initialCategory="Accessories"
          />
        )}

        {activeView === 'admin' && (
          <AdminDashboard
            products={products}
            customOrders={customOrders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateStock={handleUpdateStock}
            brandName={brandName}
            brandLogoUrl={brandLogoUrl}
            onUpdateBrand={handleUpdateBrand}
            onClose={() => setActiveView('home')}
          />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Footer */}
      <Footer onNavigate={setActiveView} brandName={brandName} />
    </div>
  );
}
