import React, { useState } from 'react';
import { Product, CustomBespokeOrder, Category, ProductColor } from '../types';
import { MEASUREMENT_GUIDES } from '../data/mockData';
import { TwiceAsMuchLogo } from './TwiceAsMuchLogo';

interface AdminDashboardProps {
  products: Product[];
  customOrders: CustomBespokeOrder[];
  onUpdateOrderStatus: (orderId: string, status: CustomBespokeOrder['status']) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateStock: (productId: string, stock: number) => void;
  brandName: string;
  brandLogoUrl: string | null;
  onUpdateBrand: (name: string, logoUrl: string | null) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  customOrders,
  onUpdateOrderStatus,
  onAddProduct,
  onDeleteProduct,
  onUpdateStock,
  brandName,
  brandLogoUrl,
  onUpdateBrand,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'branding'>('orders');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(
    customOrders.length > 0 ? customOrders[0].id : null
  );

  // New Product Modal State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Exclude<Category, 'All'>>('Dresses');
  const [newPrice, setNewPrice] = useState('650');
  const [newStock, setNewStock] = useState('10');
  const [newImageUrl, setNewImageUrl] = useState('/src/assets/images/hero_atelier_fashion_1791567148622.jpg');
  const [newDescription, setNewDescription] = useState('');
  const [newIsCustomizable, setNewIsCustomizable] = useState(true);
  const [newColors, setNewColors] = useState<ProductColor[]>([
    { name: 'Obsidian Noir', hex: '#0F1115' },
    { name: 'Champagne Gold', hex: '#D4AF37' }
  ]);
  const [newSizes, setNewSizes] = useState<string>('XS, S, M, L, XL');

  // Brand Settings State
  const [tempBrandName, setTempBrandName] = useState(brandName);
  const [logoPreview, setLogoPreview] = useState<string | null>(brandLogoUrl);
  const [copiedSpecId, setCopiedSpecId] = useState<string | null>(null);
  const [brandSaveSuccess, setBrandSaveSuccess] = useState(false);

  // Handle Logo File Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogoPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBrand = () => {
    onUpdateBrand(tempBrandName, logoPreview);
    setBrandSaveSuccess(true);
    setTimeout(() => setBrandSaveSuccess(false), 3000);
  };

  // Add Product Submit
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const sizesArr = newSizes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const created: Product = {
      id: `prod-${Date.now()}`,
      name: newTitle.trim(),
      category: newCategory,
      price: Number(newPrice) || 500,
      stockCount: Number(newStock) || 5,
      inStock: (Number(newStock) || 5) > 0,
      imageUrl: newImageUrl.trim(),
      description: newDescription.trim() || 'Hand-finished luxury atelier collection piece.',
      isCustomizable: newIsCustomizable,
      colors: newColors,
      sizes: sizesArr.length > 0 ? sizesArr : ['Standard'],
      tailoringDays: newIsCustomizable ? 10 : undefined,
    };

    onAddProduct(created);
    setIsAddProductOpen(false);
    // Reset
    setNewTitle('');
    setNewDescription('');
  };

  // Copy Tailor Work Order to Clipboard
  const handleCopyTailorWorkOrder = (order: CustomBespokeOrder) => {
    const text = `
=============================================
ATELIER HAUTE - MASTER TAILOR WORK ORDER
Order Reference: ${order.id}
Date: ${new Date(order.createdAt).toLocaleDateString()}
Client: ${order.clientName}
Email: ${order.clientEmail} | Phone: ${order.clientPhone}
Fitting / Delivery: ${order.shippingAddress}
---------------------------------------------
GARMENT: ${order.productReference.name}
TEXTILE: ${order.fabric.name} (${order.fabric.color})
FIT PREFERENCE: ${order.measurements.fitPreference}
---------------------------------------------
ANATOMICAL MEASUREMENT SHEET (${order.measurements.unit}):
- Shoulder Width: ${order.measurements.shoulderWidth} ${order.measurements.unit}
- Bust / Chest:   ${order.measurements.bustChest} ${order.measurements.unit}
- Arm Length:     ${order.measurements.armLength} ${order.measurements.unit}
- Waist:          ${order.measurements.waist} ${order.measurements.unit}
- Hips:           ${order.measurements.hips} ${order.measurements.unit}
- Full Length:    ${order.measurements.garmentLength} ${order.measurements.unit}
- Inseam:         ${order.measurements.inseam} ${order.measurements.unit}
- Total Height:   ${order.measurements.totalHeight} ${order.measurements.unit}
---------------------------------------------
SPECIAL CLIENT NOTES:
${order.notes || 'None provided'}
=============================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedSpecId(order.id);
    setTimeout(() => setCopiedSpecId(null), 2000);
  };

  // Metrics
  const totalBespokeRevenue = customOrders.reduce((sum, o) => sum + o.totalPrice, 0);
  const pendingOrdersCount = customOrders.filter((o) => o.status === 'Pending Review').length;
  const inProductionCount = customOrders.filter((o) => o.status !== 'Pending Review' && o.status !== 'Dispatched').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              Maison Master Tailor & Store Owner Portal
            </span>
          </div>
          <h1 className="text-3xl font-serif text-white tracking-tight mt-1">
            Atelier Management Studio
          </h1>
        </div>

        <button
          onClick={onClose}
          className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 bg-[#14161D]"
        >
          Return to Storefront
        </button>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        <div className="bg-[#14161D] p-4 rounded-xl border border-white/10">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
            Bespoke Orders
          </span>
          <div className="text-2xl font-mono font-bold text-white mt-1">
            {customOrders.length}
          </div>
          <span className="text-[11px] text-[#D4AF37] font-mono">Live In Queue</span>
        </div>

        <div className="bg-[#14161D] p-4 rounded-xl border border-white/10">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
            Tailoring Revenue
          </span>
          <div className="text-2xl font-mono font-bold text-[#D4AF37] mt-1">
            ${totalBespokeRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-neutral-400 font-mono">Custom Value</span>
        </div>

        <div className="bg-[#14161D] p-4 rounded-xl border border-white/10">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
            Pending Review
          </span>
          <div className="text-2xl font-mono font-bold text-amber-400 mt-1">
            {pendingOrdersCount}
          </div>
          <span className="text-[11px] text-neutral-400">Needs measurement audit</span>
        </div>

        <div className="bg-[#14161D] p-4 rounded-xl border border-white/10">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
            Active in Atelier
          </span>
          <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">
            {inProductionCount}
          </div>
          <span className="text-[11px] text-neutral-400">Drafting / Cutting</span>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'orders'
              ? 'bg-[#D4AF37] text-[#0F1115]'
              : 'bg-[#14161D] text-neutral-400 hover:text-white'
          }`}
        >
          Pre-Order Measurement Manager ({customOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'inventory'
              ? 'bg-[#D4AF37] text-[#0F1115]'
              : 'bg-[#14161D] text-neutral-400 hover:text-white'
          }`}
        >
          Product & Inventory Catalog ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('branding')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'branding'
              ? 'bg-[#D4AF37] text-[#0F1115]'
              : 'bg-[#14161D] text-neutral-400 hover:text-white'
          }`}
        >
          Brand Logo & Maison Identity
        </button>
      </div>

      {/* TAB 1: PRE-ORDER MEASUREMENT MANAGER */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-serif text-white">Custom Tailoring Orders</h3>
              <p className="text-xs text-neutral-400">
                Expand any order row to inspect full anatomical body metrics and generate master tailor work orders.
              </p>
            </div>
          </div>

          {customOrders.length === 0 ? (
            <div className="bg-[#14161D] p-12 rounded-xl border border-white/10 text-center text-neutral-400">
              No bespoke custom orders submitted yet. Orders submitted via "Make For Me" will appear here automatically.
            </div>
          ) : (
            <div className="space-y-3">
              {customOrders.map((order) => {
                const isExpanded = expandedOrderId === order.id;
                return (
                  <div
                    key={order.id}
                    className="bg-[#14161D] rounded-xl border border-white/10 overflow-hidden transition-all"
                  >
                    {/* Collapsible Row Header */}
                    <div
                      onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                      className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-[#D4AF37] font-semibold">
                          #{order.id}
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {order.clientName}
                          </div>
                          <div className="text-xs text-neutral-400">
                            {order.clientEmail} · {order.clientPhone}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs">
                        <div>
                          <span className="text-neutral-500 block">Garment:</span>
                          <span className="text-neutral-200 font-medium">
                            {order.productReference.name}
                          </span>
                        </div>

                        <div>
                          <span className="text-neutral-500 block">Textile:</span>
                          <span className="text-neutral-200 font-medium">
                            {order.fabric.name}
                          </span>
                        </div>

                        <div>
                          <span className="text-neutral-500 block">Total:</span>
                          <span className="text-[#D4AF37] font-mono font-bold">
                            ${order.totalPrice}
                          </span>
                        </div>

                        {/* Status Dropdown */}
                        <div onClick={(e) => e.stopPropagation()}>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              onUpdateOrderStatus(order.id, e.target.value as CustomBespokeOrder['status'])
                            }
                            className="bg-[#0F1115] border border-white/15 text-xs text-white rounded px-2.5 py-1 font-mono focus:outline-none focus:border-[#D4AF37]"
                          >
                            <option value="Pending Review">Pending Review</option>
                            <option value="Pattern Drafting">In Pattern Drafting</option>
                            <option value="Fabric Cutting">Fabric Cutting</option>
                            <option value="Hand Tailoring">Hand Tailoring</option>
                            <option value="Fitting Ready">Fitting Ready</option>
                            <option value="Dispatched">Dispatched</option>
                          </select>
                        </div>

                        <div className="text-neutral-400">
                          <svg
                            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Spec Sheet for Master Tailor */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-white/5 bg-[#0F1115]/50 animate-in fade-in duration-200">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-3">
                          {/* Garment Preview thumbnail */}
                          <div className="lg:col-span-3 flex flex-col gap-2">
                            <img
                              src={order.productReference.imageUrl}
                              alt={order.productReference.name}
                              referrerPolicy="no-referrer"
                              className="w-full aspect-[3/4] object-cover rounded-lg border border-white/10"
                            />
                            <div className="text-xs text-neutral-400">
                              <span className="block font-mono text-[#D4AF37]">
                                Chosen Color: {order.fabric.color}
                              </span>
                              <span className="block text-neutral-500 mt-1">
                                Delivery: {order.shippingAddress}
                              </span>
                            </div>
                          </div>

                          {/* Complete Anatomical Measurements Grid */}
                          <div className="lg:col-span-9 bg-[#14161D] p-5 rounded-xl border border-white/10">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2 mb-4">
                              <div className="flex items-center gap-2">
                                <span className="text-xs uppercase font-mono tracking-wider text-[#D4AF37]">
                                  Tailoring Pattern Spec Sheet
                                </span>
                                <span className="text-xs text-neutral-400">
                                  ({order.measurements.unit})
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleCopyTailorWorkOrder(order)}
                                  className="text-xs px-3 py-1.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20 flex items-center gap-1.5"
                                >
                                  {copiedSpecId === order.id ? (
                                    <>✓ Work Order Copied</>
                                  ) : (
                                    <>
                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                      </svg>
                                      Export Tailor Work Order
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {MEASUREMENT_GUIDES.map((g) => (
                                <div key={g.key} className="bg-[#0F1115] p-3 rounded-lg border border-white/5">
                                  <span className="text-[11px] text-neutral-400 block truncate">
                                    {g.shortLabel}
                                  </span>
                                  <span className="text-lg font-mono text-white font-semibold">
                                    {order.measurements[g.key]} {order.measurements.unit}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                              <div>
                                <span className="text-neutral-500 block">Fit Preference:</span>
                                <span className="text-white font-medium">{order.measurements.fitPreference}</span>
                              </div>
                              {order.notes && (
                                <div>
                                  <span className="text-neutral-500 block">Client Tailoring Requests:</span>
                                  <span className="text-neutral-300 italic">{order.notes}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PRODUCT & INVENTORY MANAGEMENT */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-serif text-white">Product Inventory</h3>
              <p className="text-xs text-neutral-400">
                Manage ready-to-wear items, adjust stock counts, or introduce new silhouettes.
              </p>
            </div>
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#0F1115] text-xs font-semibold hover:bg-[#E6CA65] flex items-center gap-2 self-start"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Upload New Product
            </button>
          </div>

          <div className="bg-[#14161D] rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-[#0F1115] text-neutral-400 uppercase font-mono border-b border-white/10">
                  <tr>
                    <th className="p-4">Item & Silhouette</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock Qty</th>
                    <th className="p-4">Bespoke Eligible</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02]">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-12 object-cover rounded border border-white/10 shrink-0"
                        />
                        <div>
                          <div className="font-medium text-white">{p.name}</div>
                          <div className="text-[11px] text-neutral-500 font-mono">
                            {p.colors.length} colors · {p.sizes.join(', ')}
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-mono">{p.category}</td>

                      <td className="p-4 font-mono font-semibold text-white">${p.price}</td>

                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="0"
                            value={p.stockCount}
                            onChange={(e) => onUpdateStock(p.id, Number(e.target.value) || 0)}
                            className="w-16 px-2 py-1 bg-[#0F1115] border border-white/15 rounded text-white font-mono text-xs"
                          />
                          <span className={p.stockCount > 0 ? 'text-emerald-400' : 'text-red-400'}>
                            {p.stockCount > 0 ? 'In Stock' : 'Depleted'}
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        {p.isCustomizable ? (
                          <span className="text-[#D4AF37] font-mono text-[11px] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                            ✓ Make For Me Enabled
                          </span>
                        ) : (
                          <span className="text-neutral-500 font-mono text-[11px]">Ready to Wear Only</span>
                        )}
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Remove "${p.name}" from inventory?`)) {
                              onDeleteProduct(p.id);
                            }
                          }}
                          className="text-red-400 hover:text-red-300 font-medium text-xs ml-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BRAND LOGO & MAISON IDENTITY */}
      {activeTab === 'branding' && (
        <div className="max-w-2xl bg-[#14161D] rounded-xl border border-white/10 p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37]">
              Maison Customization
            </span>
            <h3 className="text-xl font-serif text-white mt-1">
              Brand Identity & Logo Configuration
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Upload your official company emblem/logo file or customize the wordmark.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-neutral-300 uppercase mb-1.5">
                Brand Display Name
              </label>
              <input
                type="text"
                value={tempBrandName}
                onChange={(e) => setTempBrandName(e.target.value)}
                placeholder="ATELIER HAUTE"
                className="w-full px-4 py-2.5 rounded-lg bg-[#0F1115] border border-white/15 text-white font-serif tracking-widest text-lg focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-300 uppercase mb-2">
                Company Logo Emblem
              </label>
              <div className="flex items-center gap-4">
                {logoPreview ? (
                  <div className="relative w-28 h-20 rounded-lg bg-[#070D24] border border-[#D5A848]/40 p-2 flex items-center justify-center">
                    <img
                      src={logoPreview}
                      alt="Brand Logo"
                      className="max-h-full max-w-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setLogoPreview(null)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 rounded-full text-white text-[10px] flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="relative w-36 h-20 rounded-lg bg-[#070D24] border border-[rgba(213,168,72,0.4)] p-2 flex items-center justify-center shadow-inner">
                    <TwiceAsMuchLogo size="md" />
                  </div>
                )}

                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="block w-full text-xs text-neutral-400 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37] file:text-[#0F1115] hover:file:bg-[#E6CA65] cursor-pointer"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Accepts PNG, SVG, JPG. Transparent background recommended.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            {brandSaveSuccess ? (
              <span className="text-xs text-[#F3D17A] bg-[#0E1B45] border border-[#D5A848]/50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium">
                <span className="text-[#D5A848]">✦</span>
                Brand identity updated successfully!
              </span>
            ) : <span />}
            <button
              onClick={handleSaveBrand}
              className="px-6 py-2.5 rounded-lg bg-[#D4AF37] text-[#0F1115] font-semibold text-xs hover:bg-[#E6CA65] transition-colors shadow"
            >
              Save Brand Settings
            </button>
          </div>
        </div>
      )}

      {/* UPLOAD NEW PRODUCT MODAL */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#14161D] max-w-2xl w-full rounded-2xl border border-white/15 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37]">
                  Inventory Management
                </span>
                <h3 className="text-2xl font-serif text-white">Upload New Product</h3>
              </div>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Elysée Hand-Pleated Chiffon Dress"
                  className="w-full px-3 py-2 bg-[#0F1115] border border-white/15 rounded text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#0F1115] border border-white/15 rounded text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Dresses">Dresses</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Wristwatches">Wristwatches</option>
                    <option value="Eyewear">Eyewear</option>
                    <option value="Polos">Polos</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase mb-1">
                    Price ($ USD) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0F1115] border border-white/15 rounded text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase mb-1">
                    Initial Stock *
                  </label>
                  <input
                    type="number"
                    required
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0F1115] border border-white/15 rounded text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase mb-1">
                  Product Image URL *
                </label>
                <input
                  type="text"
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="/src/assets/images/... or https://..."
                  className="w-full px-3 py-2 bg-[#0F1115] border border-white/15 rounded text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase mb-1">
                  Available Sizes (Comma separated)
                </label>
                <input
                  type="text"
                  value={newSizes}
                  onChange={(e) => setNewSizes(e.target.value)}
                  placeholder="XS, S, M, L, XL or 7, 8, 9, 10, 11"
                  className="w-full px-3 py-2 bg-[#0F1115] border border-white/15 rounded text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Textile composition, cut details, artisan craftsmanship..."
                  className="w-full px-3 py-2 bg-[#0F1115] border border-white/15 rounded text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="customizable"
                  checked={newIsCustomizable}
                  onChange={(e) => setNewIsCustomizable(e.target.checked)}
                  className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <label htmlFor="customizable" className="text-xs text-neutral-200">
                  Enable bespoke custom tailoring ("Make For Me" feature)
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 border border-white/15 rounded text-neutral-300 text-xs hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4AF37] text-[#0F1115] font-semibold rounded text-xs hover:bg-[#E6CA65]"
                >
                  Upload & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
