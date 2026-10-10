import React, { useState, useEffect } from 'react';
import { Product, ProductColor, CartItem } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
  onStartCustomOrder: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onStartCustomOrder,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Sync state whenever active product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || null);
      setSelectedSize(product.sizes[0] || '');
      setQuantity(1);
      setAddedToast(null);
    }
  }, [product]);

  // Close on Escape key, browser popstate back, and lock background scroll
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handlePopState = () => {
      onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    if (!selectedColor) return;
    onAddToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
    setAddedToast(`Added "${product.name}" to shopping bag`);
    setTimeout(() => {
      setAddedToast(null);
      onClose();
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div
        className="bg-[#070D24] max-w-3xl w-full rounded-2xl border border-[rgba(213,168,72,0.4)] shadow-2xl overflow-hidden relative my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header / Back Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#091338] border-b border-[rgba(213,168,72,0.25)] shrink-0 z-10 sticky top-0">
          <button
            onClick={onClose}
            className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[#F3D17A] hover:text-white transition-colors group bg-[#0D1B50] px-3 py-1.5 rounded-lg border border-[#D5A848]/40 hover:border-[#D5A848]"
            title="Go back to collection grid"
          >
            <span className="w-5 h-5 rounded-full bg-[#D5A848]/20 group-hover:bg-[#D5A848] text-[#F3D17A] group-hover:text-[#070D24] flex items-center justify-center font-bold text-xs transition-colors">
              ←
            </span>
            <span>Back to Store</span>
          </button>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-[#0B153D] hover:bg-white/10 text-xs text-neutral-300 hover:text-white transition-colors flex items-center gap-2 border border-[rgba(213,168,72,0.3)] shadow-sm"
            title="Close dialog (Escape)"
          >
            <span className="hidden sm:inline">Close</span>
            <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">(Esc)</span>
            <span className="text-base leading-none font-bold">✕</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto grid grid-cols-1 md:grid-cols-2 flex-1">
          {/* Product Visual */}
          <div className="relative aspect-[4/5] bg-[#05091B]">
            <img
              src={product.imageUrl}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            {product.isCustomizable && (
              <div className="absolute top-3 left-3 bg-[#070D24]/90 backdrop-blur border border-[#D5A848]/60 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider text-[#F3D17A]">
                Bespoke Tailoring Available
              </div>
            )}
          </div>

          {/* Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between bg-[#070D24]">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-300 mb-1">
                <span className="uppercase font-mono tracking-wider">{product.category}</span>
                <span className="font-mono text-emerald-400">In Stock ({product.stockCount})</span>
              </div>

              <h3 id="modal-product-title" className="text-2xl font-serif text-white font-medium">
                {product.name}
              </h3>

              <div className="text-xl font-mono text-[#F3D17A] font-bold mt-2">
                ${product.price}
              </div>

              <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Product Details Highlights */}
              {product.details && product.details.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block mb-1.5">
                    Craftsmanship Highlights:
                  </span>
                  <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside">
                    {product.details.slice(0, 3).map((detail, idx) => (
                      <li key={idx} className="line-clamp-1">{detail}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Color Swatch Selection */}
              <div className="mt-5">
                <label className="block text-xs font-mono text-neutral-300 uppercase mb-2">
                  Color:{' '}
                  <span className="text-white font-sans">{selectedColor?.name}</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor?.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs transition-all ${
                          isSelected
                            ? 'border-[#D5A848] bg-[#D5A848]/20 ring-1 ring-[#D5A848]'
                            : 'border-white/10 hover:border-white/30 bg-[#0B153D]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-white text-[11px]">{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-neutral-300 uppercase">
                    Select Size
                  </label>
                  <span className="text-[11px] text-[#F3D17A]">True to Maison sizing</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                        selectedSize === sz
                          ? 'bg-[#D5A848] text-[#070D24] shadow'
                          : 'bg-[#0B153D] text-neutral-200 border border-[rgba(213,168,72,0.2)] hover:border-[#D5A848]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-5 flex items-center gap-3">
                <label className="text-xs font-mono text-neutral-300 uppercase">Qty:</label>
                <div className="flex items-center border border-[rgba(213,168,72,0.3)] rounded bg-[#0B153D]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2.5 py-1 text-neutral-300 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-mono text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2.5 py-1 text-neutral-300 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Action CTA */}
            <div className="mt-6 pt-5 border-t border-[rgba(213,168,72,0.2)] space-y-2.5">
              {addedToast ? (
                <div className="py-2.5 px-4 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs text-center font-medium">
                  ✓ {addedToast}
                </div>
              ) : (
                <button
                  onClick={handleAdd}
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#D5A848] to-[#F3D17A] text-[#070D24] font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D5A848]/20"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Shopping Bag · ${product.price * quantity}
                </button>
              )}

              {product.isCustomizable && (
                <button
                  onClick={() => {
                    onClose();
                    onStartCustomOrder(product);
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#D5A848]/15 border border-[#D5A848]/50 text-[#F3D17A] font-bold text-xs hover:bg-[#D5A848]/25 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                  </svg>
                  Custom Tailor to Exact Measurements (Make For Me)
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-xs text-neutral-400 hover:text-[#F3D17A] transition-colors text-center font-medium flex items-center justify-center gap-1.5"
              >
                <span>← Continue Browsing Collection</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
