import React, { useState } from 'react';
import { Product, FabricOption, BodyMeasurements, MeasurementKey, CustomBespokeOrder } from '../types';
import { FABRIC_COLLECTIONS, MEASUREMENT_GUIDES } from '../data/mockData';
import { AvatarMeasurementGuide } from './AvatarMeasurementGuide';

interface MakeForMeWizardProps {
  products: Product[];
  selectedProduct?: Product;
  onSelectProduct: (product: Product) => void;
  onSubmitOrder: (order: CustomBespokeOrder) => void;
  onCancel: () => void;
  onViewDashboard: () => void;
}

export const MakeForMeWizard: React.FC<MakeForMeWizardProps> = ({
  products,
  selectedProduct: initialProduct,
  onSelectProduct,
  onSubmitOrder,
  onCancel,
  onViewDashboard,
}) => {
  // Filter customizable garments (or fallback to first product)
  const customizableDresses = products.filter((p) => p.isCustomizable);
  const activeDress = initialProduct || customizableDresses[0] || products[0];

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Client Details
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [targetFittingDate, setTargetFittingDate] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  // Measurements
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [activeMeasurementKey, setActiveMeasurementKey] = useState<MeasurementKey>('shoulderWidth');
  
  const [measurements, setMeasurements] = useState<BodyMeasurements>({
    shoulderWidth: 15.5,
    bustChest: 36.0,
    armLength: 23.5,
    waist: 28.0,
    hips: 38.5,
    garmentLength: 56.0,
    inseam: 31.0,
    totalHeight: 67.0,
    fitPreference: 'Tailored Classic',
    unit: 'in',
  });

  // Fabric selection
  const [selectedFabric, setSelectedFabric] = useState<FabricOption>(FABRIC_COLLECTIONS[0]);
  const [selectedFabricColor, setSelectedFabricColor] = useState({
    name: 'Obsidian Black',
    hex: '#0F1115'
  });

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<CustomBespokeOrder | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Unit converter
  const handleUnitToggle = (newUnit: 'in' | 'cm') => {
    if (newUnit === unit) return;
    const factor = newUnit === 'cm' ? 2.54 : 1 / 2.54;
    setMeasurements((prev) => ({
      ...prev,
      shoulderWidth: Number((Number(prev.shoulderWidth) * factor).toFixed(1)),
      bustChest: Number((Number(prev.bustChest) * factor).toFixed(1)),
      armLength: Number((Number(prev.armLength) * factor).toFixed(1)),
      waist: Number((Number(prev.waist) * factor).toFixed(1)),
      hips: Number((Number(prev.hips) * factor).toFixed(1)),
      garmentLength: Number((Number(prev.garmentLength) * factor).toFixed(1)),
      inseam: Number((Number(prev.inseam) * factor).toFixed(1)),
      totalHeight: Number((Number(prev.totalHeight) * factor).toFixed(1)),
      unit: newUnit,
    }));
    setUnit(newUnit);
  };

  const updateMeasurementValue = (key: MeasurementKey, value: string) => {
    setMeasurements((prev) => ({
      ...prev,
      [key]: value === '' ? '' : Number(value) || value,
    }));
  };

  // Pricing calculation
  const basePrice = activeDress ? activeDress.price : 750;
  const fabricModifier = selectedFabric ? selectedFabric.priceModifier : 180;
  const totalPrice = basePrice + fabricModifier;

  // Step Validation
  const handleNextStep = () => {
    setFormError(null);
    if (currentStep === 1) {
      if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim()) {
        setFormError('Please complete your name, email, and phone number so the master tailor can coordinate your fitting.');
        return;
      }
    }
    if (currentStep === 2) {
      const emptyKey = (Object.keys(measurements) as (keyof BodyMeasurements)[]).find(
        (k) => k !== 'fitPreference' && k !== 'unit' && !measurements[k]
      );
      if (emptyKey) {
        setFormError('Please enter all anatomical measurements or use our atelier recommended baseline.');
        return;
      }
    }
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const orderId = `AM-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: CustomBespokeOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      shippingAddress: shippingAddress.trim() || 'Client fitting at Paris Atelier',
      notes: clientNotes.trim(),
      productReference: {
        id: activeDress.id,
        name: activeDress.name,
        basePrice: activeDress.price,
        imageUrl: activeDress.imageUrl,
      },
      fabric: {
        id: selectedFabric.id,
        name: selectedFabric.name,
        color: selectedFabricColor.name,
        colorHex: selectedFabricColor.hex,
        priceModifier: selectedFabric.priceModifier,
      },
      measurements: {
        ...measurements,
        unit,
      },
      totalPrice,
      status: 'Pending Review',
      targetFittingDate: targetFittingDate || undefined,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedOrder(newOrder);
      onSubmitOrder(newOrder);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Sticky Top Navigation & Exit Bar */}
      <div className="sticky top-0 z-40 bg-[#070D24]/95 backdrop-blur-md pb-4 pt-2 border-b border-[rgba(213,168,72,0.25)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <span className="text-[11px] uppercase font-mono tracking-widest text-[#F3D17A] font-semibold flex items-center gap-2">
            <span>TWICE AS MUCH</span>
            <span>·</span>
            <span>Bespoke Atelier Service</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight mt-0.5">
            "Make For Me" Tailoring Studio
          </h1>
        </div>

        <button
          onClick={onCancel}
          className="self-start sm:self-auto px-4 py-2.5 rounded-lg bg-[#0B153D] border border-[rgba(213,168,72,0.5)] text-xs text-[#F3D17A] hover:text-white hover:bg-[#152563] transition-all flex items-center gap-2.5 font-bold shadow-md group"
          title="Return to the store and collection"
        >
          <span className="w-6 h-6 rounded-full bg-[#D5A848]/20 group-hover:bg-[#D5A848] text-[#F3D17A] group-hover:text-[#070D24] flex items-center justify-center font-bold text-xs transition-colors">
            ←
          </span>
          <span>Back to Store & Products</span>
        </button>
      </div>

      {/* Step Progress Indicator */}
      <div className="py-4">
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {[
            { step: 1, label: 'Garment Silhouette & Client' },
            { step: 2, label: 'Avatar Measurement Guide' },
            { step: 3, label: 'Fabric & Quality' },
            { step: 4, label: 'Review & Submit' },
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => {
                if (s.step < currentStep || (currentStep === 1 && clientName)) {
                  setCurrentStep(s.step as 1 | 2 | 3 | 4);
                }
              }}
              className={`text-left p-2.5 sm:p-3 rounded-lg border transition-all ${
                currentStep === s.step
                  ? 'border-[#D5A848] bg-[#D5A848]/15 shadow-md shadow-[#D5A848]/10'
                  : currentStep > s.step
                  ? 'border-[rgba(213,168,72,0.25)] bg-[#0B153D] text-neutral-300'
                  : 'border-white/5 bg-transparent text-neutral-500'
              }`}
            >
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#F3D17A] font-semibold">
                Step 0{s.step}
              </div>
              <div className="text-xs sm:text-sm font-medium truncate mt-0.5 text-white">
                {s.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Error alert if any */}
      {formError && (
        <div className="mb-6 p-4 rounded-lg bg-red-950/70 border border-red-500/40 text-red-200 text-sm flex items-center gap-3">
          <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{formError}</span>
        </div>
      )}

      {/* STEP 1: DRESS REFERENCE & CLIENT DETAILS */}
      {currentStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Garment Preview Card */}
          <div className="lg:col-span-5 bg-[#0B153D] rounded-xl border border-[rgba(213,168,72,0.25)] p-6 flex flex-col shadow-lg">
            <div className="text-xs uppercase font-mono tracking-widest text-[#F3D17A] mb-3 font-semibold">
              Selected Garment Silhouette
            </div>

            <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#070D24] mb-4 border border-[rgba(213,168,72,0.2)]">
              <img
                src={activeDress.imageUrl}
                alt={activeDress.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-3 right-3 bg-[#0F1115]/90 backdrop-blur px-2.5 py-1 rounded text-xs font-mono text-[#D4AF37] border border-[#D4AF37]/30">
                ${activeDress.price} Base
              </div>
            </div>

            <h3 className="text-xl font-serif text-white">{activeDress.name}</h3>
            <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
              {activeDress.description}
            </p>

            {/* Switch Dress Carousel / Dropdown */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <label className="text-xs font-mono text-neutral-400 uppercase block mb-2">
                Choose another atelier silhouette:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {customizableDresses.map((dress) => (
                  <button
                    key={dress.id}
                    onClick={() => onSelectProduct(dress)}
                    className={`relative rounded-md overflow-hidden border p-1 text-left transition-all ${
                      dress.id === activeDress.id
                        ? 'border-[#D4AF37] ring-1 ring-[#D4AF37] bg-[#D4AF37]/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={dress.imageUrl}
                      alt={dress.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-16 object-cover rounded"
                    />
                    <div className="text-[10px] text-white truncate mt-1">{dress.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Client Details Form */}
          <div className="lg:col-span-7 bg-[#0B153D] rounded-xl border border-[rgba(213,168,72,0.25)] p-6 sm:p-8 shadow-lg">
            <div className="text-xs uppercase font-mono tracking-widest text-[#F3D17A] mb-1 font-semibold">
              Client & Atelier Profile
            </div>
            <h2 className="text-2xl font-serif text-white mb-6">
              Your Tailoring Specifications
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase mb-1.5">
                  Full Name <span className="text-[#F3D17A]">*</span>
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Genevieve Laurent"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#070D24] border border-[rgba(213,168,72,0.25)] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D5A848]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase mb-1.5">
                    Email Address <span className="text-[#F3D17A]">*</span>
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="client@domain.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#070D24] border border-[rgba(213,168,72,0.25)] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D5A848]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase mb-1.5">
                    Phone / WhatsApp <span className="text-[#F3D17A]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+1 (555) 234-5678"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#070D24] border border-[rgba(213,168,72,0.25)] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D5A848]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase mb-1.5">
                  Delivery Address / Atelier Fitting Location
                </label>
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Street, City, Postal Code, Country"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#070D24] border border-[rgba(213,168,72,0.25)] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D5A848]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase mb-1.5">
                    Event / Target Fitting Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={targetFittingDate}
                    onChange={(e) => setTargetFittingDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#070D24] border border-[rgba(213,168,72,0.25)] text-white focus:outline-none focus:border-[#D5A848]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase mb-1.5">
                    Tailoring Lead Time
                  </label>
                  <div className="px-4 py-2.5 rounded-lg bg-[#070D24]/70 border border-[rgba(213,168,72,0.2)] text-neutral-300 text-sm flex items-center justify-between">
                    <span>Hand-Tailored Production</span>
                    <span className="text-[#F3D17A] font-mono text-xs">7–14 Days</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase mb-1.5">
                  Bespoke Notes or Styling Requests
                </label>
                <textarea
                  rows={2}
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="e.g. Intend to wear with 100mm heels; prefer roomier armhole; silk lining preference..."
                  className="w-full px-4 py-2.5 rounded-lg bg-[#070D24] border border-[rgba(213,168,72,0.25)] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D5A848]"
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2.5 rounded-lg border border-[rgba(213,168,72,0.3)] text-neutral-300 hover:text-white hover:bg-white/5 text-xs transition-colors flex items-center gap-2 font-medium"
              >
                <span>←</span>
                <span>Back to Collection</span>
              </button>
              <button
                onClick={handleNextStep}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#D5A848] to-[#F3D17A] text-[#070D24] font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2 shadow-md shadow-[#D5A848]/20"
              >
                Continue to Measurements
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: INTERACTIVE AVATAR MEASUREMENT STUDIO */}
      {currentStep === 2 && (
        <div className="space-y-8">
          {/* Unit Toggle and Guidance Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-[#14161D] p-4 rounded-xl border border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Visual Measurement Assistant</h4>
                <p className="text-xs text-neutral-400">
                  Focus any input field to illuminate that anatomical zone and see precise measuring instructions.
                </p>
              </div>
            </div>

            {/* Units Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-[#0F1115] rounded-lg border border-white/10">
              <button
                onClick={() => handleUnitToggle('in')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  unit === 'in'
                    ? 'bg-[#D4AF37] text-[#0F1115]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Inches (in)
              </button>
              <button
                onClick={() => handleUnitToggle('cm')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  unit === 'cm'
                    ? 'bg-[#D4AF37] text-[#0F1115]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Interactive 2D Avatar Mannequin Component */}
          <AvatarMeasurementGuide
            activeKey={activeMeasurementKey}
            onSelectKey={(k) => setActiveMeasurementKey(k)}
            unit={unit}
            currentValues={measurements}
          />

          {/* Input Grid for all measurements */}
          <div className="bg-[#14161D] rounded-xl border border-white/10 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                  Precision Metrics
                </span>
                <h3 className="text-xl font-serif text-white">
                  Enter Your Custom Measurements
                </h3>
              </div>
              <button
                onClick={() => {
                  // Pre-fill with standard sample measurements
                  setMeasurements({
                    shoulderWidth: unit === 'in' ? 15.5 : 39.4,
                    bustChest: unit === 'in' ? 36.0 : 91.4,
                    armLength: unit === 'in' ? 23.5 : 59.7,
                    waist: unit === 'in' ? 28.0 : 71.1,
                    hips: unit === 'in' ? 38.5 : 97.8,
                    garmentLength: unit === 'in' ? 56.0 : 142.2,
                    inseam: unit === 'in' ? 31.0 : 78.7,
                    totalHeight: unit === 'in' ? 67.0 : 170.2,
                    fitPreference: measurements.fitPreference,
                    unit,
                  });
                }}
                className="text-xs text-[#D4AF37] hover:underline"
              >
                Fill Atelier Standard Baseline
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MEASUREMENT_GUIDES.map((g) => {
                const isActive = activeMeasurementKey === g.key;
                return (
                  <div
                    key={g.key}
                    onClick={() => setActiveMeasurementKey(g.key)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 ring-1 ring-[#D4AF37]/50'
                        : 'border-white/10 bg-[#0F1115] hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-neutral-200">
                        {g.label}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      )}
                    </div>
                    <div className="relative mt-2">
                      <input
                        type="number"
                        step="0.1"
                        value={measurements[g.key]}
                        onFocus={() => setActiveMeasurementKey(g.key)}
                        onChange={(e) => updateMeasurementValue(g.key, e.target.value)}
                        className="w-full px-3 py-2 pr-10 rounded bg-[#181B23] border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-[#D4AF37]"
                      />
                      <span className="absolute right-3 top-2.5 text-xs font-mono text-neutral-400">
                        {unit}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Fit Preference Selection */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <label className="block text-xs font-mono text-neutral-300 uppercase mb-3">
                Silhouetted Ease & Fit Preference
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Fitted', 'Tailored Classic', 'Relaxed'] as const).map((fit) => (
                  <button
                    key={fit}
                    onClick={() => setMeasurements((prev) => ({ ...prev, fitPreference: fit }))}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      measurements.fitPreference === fit
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white font-semibold'
                        : 'border-white/10 bg-[#0F1115] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs sm:text-sm">{fit}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">
                      {fit === 'Fitted'
                        ? 'Sculpted to anatomical contours'
                        : fit === 'Tailored Classic'
                        ? 'Signature balanced drape'
                        : 'Fluid ease with generous movement'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/10 gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-lg border border-white/15 text-neutral-300 text-xs sm:text-sm hover:text-white hover:border-white/30"
                >
                  ← Back to Reference
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-3 py-2.5 text-xs text-neutral-400 hover:text-[#F3D17A] transition-colors"
                >
                  Exit to Store
                </button>
              </div>
              <button
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-lg bg-[#D4AF37] text-[#0F1115] font-semibold text-xs sm:text-sm hover:bg-[#E6CA65] flex items-center gap-2"
              >
                Continue to Fabric Selection
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: FABRIC QUALITY SELECTION */}
      {currentStep === 3 && (
        <div className="space-y-8">
          <div className="bg-[#14161D] rounded-xl border border-white/10 p-6 sm:p-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              Atelier Textile House
            </span>
            <h2 className="text-2xl font-serif text-white mt-1 mb-2">
              Select Fabric Quality & Color Palette
            </h2>
            <p className="text-sm text-neutral-400 max-w-2xl mb-8">
              Every garment is individually cut from premium European mills. Select the textile weight and weave characteristics suited to your occasion.
            </p>

            {/* Fabric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FABRIC_COLLECTIONS.map((fabric) => {
                const isSelected = selectedFabric.id === fabric.id;
                return (
                  <div
                    key={fabric.id}
                    onClick={() => setSelectedFabric(fabric)}
                    className={`rounded-xl border p-5 flex flex-col justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 ring-1 ring-[#D4AF37]'
                        : 'border-white/10 bg-[#0F1115] hover:border-white/30'
                    }`}
                  >
                    <div>
                      {/* Swatch Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-6 h-6 rounded-full border border-white/20 shadow-inner shrink-0"
                            style={{ backgroundColor: fabric.swatchHex }}
                          />
                          <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                            {fabric.weightGsm} GSM {fabric.momme ? `· ${fabric.momme}mm` : ''}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-semibold text-white">
                          +${fabric.priceModifier}
                        </span>
                      </div>

                      <h4 className="text-lg font-serif text-white font-medium mb-1">
                        {fabric.name}
                      </h4>
                      <p className="text-xs text-neutral-300 font-mono mb-2.5">
                        {fabric.composition}
                      </p>
                      <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                        {fabric.drape}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10">
                      <div className="text-[11px] text-neutral-500">Recommended for:</div>
                      <div className="text-xs text-neutral-300 italic mt-0.5">{fabric.bestFor}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Color Swatches Palette */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <label className="block text-xs font-mono text-neutral-300 uppercase mb-3">
                Tailored Garment Color Palette
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'Obsidian Black', hex: '#0F1115' },
                  { name: 'Champagne Cream', hex: '#EAE3D2' },
                  { name: 'Midnight Navy', hex: '#161F30' },
                  { name: 'Bordeaux Noir', hex: '#3E141B' },
                  { name: 'Forest Emerald', hex: '#142E25' },
                  { name: 'Pure Pearl White', hex: '#FAF9F6' },
                ].map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedFabricColor(col)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all ${
                      selectedFabricColor.name === col.name
                        ? 'border-[#D4AF37] bg-white/10 ring-1 ring-[#D4AF37]'
                        : 'border-white/10 bg-[#0F1115] hover:border-white/20'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span className="text-xs text-white">{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/10 gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 rounded-lg border border-white/15 text-neutral-300 text-xs sm:text-sm hover:text-white"
                >
                  ← Back to Measurements
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-3 py-2.5 text-xs text-neutral-400 hover:text-[#F3D17A] transition-colors"
                >
                  Exit to Store
                </button>
              </div>
              <button
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-lg bg-[#D4AF37] text-[#0F1115] font-semibold text-xs sm:text-sm hover:bg-[#E6CA65] flex items-center gap-2"
              >
                Review Custom Order
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW & SUBMIT */}
      {currentStep === 4 && (
        <div className="space-y-8">
          <div className="bg-[#14161D] rounded-xl border border-white/10 p-6 sm:p-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              Final Atelier Review
            </span>
            <h2 className="text-2xl font-serif text-white mt-1 mb-6">
              Confirm Your Bespoke Specifications
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Garment & Fabric */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#0F1115] p-5 rounded-xl border border-white/10">
                  <div className="flex gap-4">
                    <img
                      src={activeDress.imageUrl}
                      alt={activeDress.name}
                      referrerPolicy="no-referrer"
                      className="w-24 h-32 object-cover rounded-lg border border-white/10"
                    />
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37]">
                        Garment
                      </span>
                      <h4 className="text-base font-serif text-white font-medium">{activeDress.name}</h4>
                      <div className="text-xs text-neutral-400 mt-1">
                        Base: <strong className="text-white">${activeDress.price}</strong>
                      </div>
                      <div className="text-xs text-neutral-400 mt-2 flex items-center gap-1.5">
                        <span>Color:</span>
                        <span
                          className="w-3 h-3 rounded-full border border-white/20 inline-block"
                          style={{ backgroundColor: selectedFabricColor.hex }}
                        />
                        <span className="text-white font-medium">{selectedFabricColor.name}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0F1115] p-5 rounded-xl border border-white/10">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37]">
                    Selected Textile
                  </span>
                  <h4 className="text-base font-serif text-white mt-1">{selectedFabric.name}</h4>
                  <div className="text-xs text-neutral-400 mt-0.5">{selectedFabric.composition}</div>
                  <div className="text-xs text-neutral-400 mt-2">
                    Fabric Surcharge: <strong className="text-white">+${selectedFabric.priceModifier}</strong>
                  </div>
                </div>

                <div className="bg-[#0F1115] p-5 rounded-xl border border-white/10">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37]">
                    Client & Fitting
                  </span>
                  <div className="text-sm font-medium text-white mt-1">{clientName}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">{clientEmail} · {clientPhone}</div>
                  {shippingAddress && (
                    <div className="text-xs text-neutral-400 mt-1">{shippingAddress}</div>
                  )}
                  {targetFittingDate && (
                    <div className="text-xs text-[#D4AF37] mt-2">
                      Target Fitting Date: {targetFittingDate}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Measurements Breakdown & Price */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="bg-[#0F1115] p-5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                      Body Spec Sheet ({unit})
                    </span>
                    <span className="text-xs text-neutral-400">
                      Ease: <strong className="text-white">{measurements.fitPreference}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                    {MEASUREMENT_GUIDES.map((g) => (
                      <div key={g.key} className="flex items-center justify-between py-1 border-b border-white/5">
                        <span className="text-xs text-neutral-400">{g.label}</span>
                        <span className="font-mono text-sm text-white font-medium">
                          {measurements[g.key]} {unit}
                        </span>
                      </div>
                    ))}
                  </div>

                  {clientNotes && (
                    <div className="mt-4 pt-3 border-t border-white/10 text-xs text-neutral-400">
                      <strong className="text-white block mb-0.5">Atelier Special Requests:</strong>
                      {clientNotes}
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="mt-6 bg-[#D4AF37]/5 p-5 rounded-xl border border-[#D4AF37]/30">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                    <span>Base Garment Patternmaking</span>
                    <span className="font-mono text-white">${basePrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span>Selected Luxury Textile Surcharge</span>
                    <span className="font-mono text-white">+${fabricModifier}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 pb-3 border-b border-white/10">
                    <span>Master Tailor Fitting Consultation</span>
                    <span className="text-[#D4AF37] font-mono uppercase">Complimentary</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-serif text-white pt-2">
                    <span>Total Bespoke Price</span>
                    <span className="font-mono text-[#D4AF37] text-xl font-bold">
                      ${totalPrice}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="px-4 py-2.5 rounded-lg border border-white/15 text-neutral-300 text-xs sm:text-sm hover:text-white"
                    >
                      ← Back to Fabrics
                    </button>
                    <button
                      type="button"
                      onClick={onCancel}
                      className="px-3 py-2.5 text-xs text-neutral-400 hover:text-[#F3D17A] transition-colors"
                    >
                      Exit to Store
                    </button>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-6 rounded-lg bg-[#D4AF37] text-[#0F1115] font-semibold text-sm hover:bg-[#E6CA65] transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-[#0F1115]" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Transmitting to Master Tailor...
                      </>
                    ) : (
                      <>
                        Submit Custom Order
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS CONFIRMATION MODAL */}
      {submittedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#14161D] max-w-lg w-full rounded-2xl border border-[#D4AF37]/40 p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37] flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="text-center mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                Order Confirmed · #{submittedOrder.id}
              </span>
              <h3 className="text-2xl font-serif text-white mt-1">
                Order Submitted Successfully!
              </h3>
              <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                The shop owner and master tailor have received your request and will contact you via email ({submittedOrder.clientEmail}) or phone ({submittedOrder.clientPhone}) within 24 hours to review your garment specifications.
              </p>
            </div>

            {/* Quick summary box */}
            <div className="bg-[#0F1115] p-4 rounded-xl border border-white/10 text-xs text-neutral-300 space-y-1.5 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-400">Garment:</span>
                <span className="text-white font-medium">{submittedOrder.productReference.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Textile:</span>
                <span className="text-white font-medium">{submittedOrder.fabric.name} ({submittedOrder.fabric.color})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Total Bespoke Price:</span>
                <span className="text-[#D4AF37] font-mono font-semibold">${submittedOrder.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Status:</span>
                <span className="text-amber-400 font-mono">Pending Review (Logged in Studio)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onViewDashboard}
                className="flex-1 py-2.5 px-4 rounded-lg bg-[#D4AF37] text-[#0F1115] text-xs font-semibold hover:bg-[#E6CA65] transition-colors"
              >
                View in Tailor Dashboard
              </button>
              <button
                onClick={onCancel}
                className="py-2.5 px-4 rounded-lg border border-white/15 text-neutral-300 text-xs hover:text-white transition-colors"
              >
                Back to Maison Catalog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
