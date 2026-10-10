import React, { useState } from 'react';
import { MeasurementKey } from '../types';
import { MEASUREMENT_GUIDES } from '../data/mockData';

interface AvatarMeasurementGuideProps {
  activeKey: MeasurementKey;
  onSelectKey: (key: MeasurementKey) => void;
  unit: 'in' | 'cm';
  currentValues: Record<MeasurementKey, number | string>;
}

export const AvatarMeasurementGuide: React.FC<AvatarMeasurementGuideProps> = ({
  activeKey,
  onSelectKey,
  unit,
  currentValues,
}) => {
  const [modelSilhouette, setModelSilhouette] = useState<'couture' | 'sartorial'>('couture');
  const activeGuide = MEASUREMENT_GUIDES.find((g) => g.key === activeKey) || MEASUREMENT_GUIDES[0];

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-center bg-[#091338] p-6 lg:p-8 rounded-2xl border border-[rgba(213,168,72,0.35)] shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-[#162768]/40 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#D5A848]/10 blur-3xl rounded-full pointer-events-none" />

      {/* Left/Center: Visual 2D Human Figure Mannequin & Measuring Tape */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative">
        <div className="flex items-center justify-between w-full max-w-[340px] mb-2 px-2 text-xs text-neutral-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D5A848] animate-pulse" />
            <span className="font-mono tracking-wider uppercase text-[#F3D17A] font-semibold text-[11px]">
              Human Anatomy Guide
            </span>
          </div>
          
          {/* Silhouette Mode Toggle */}
          <div className="flex items-center bg-[#070D24] p-0.5 rounded-lg border border-[rgba(213,168,72,0.3)] text-[10px]">
            <button
              onClick={() => setModelSilhouette('couture')}
              className={`px-2 py-0.5 rounded transition-all font-medium ${
                modelSilhouette === 'couture'
                  ? 'bg-[#D5A848] text-[#070D24] font-bold shadow'
                  : 'text-neutral-300 hover:text-white'
              }`}
              title="Haute Couture Silhouette with Statuesque Long Legs"
            >
              Couture (F)
            </button>
            <button
              onClick={() => setModelSilhouette('sartorial')}
              className={`px-2 py-0.5 rounded transition-all font-medium ${
                modelSilhouette === 'sartorial'
                  ? 'bg-[#D5A848] text-[#070D24] font-bold shadow'
                  : 'text-neutral-300 hover:text-white'
              }`}
              title="Tailored Sartorial Silhouette"
            >
              Sartorial (M)
            </button>
          </div>
        </div>

        <div className="relative w-[320px] h-[580px] bg-[#070D24] rounded-xl border border-[rgba(213,168,72,0.3)] p-2 flex items-center justify-center shadow-inner">
          <svg
            viewBox="0 0 280 670"
            className="w-full h-full select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Metallic Gold Gradient for Measuring Tapes */}
              <linearGradient id="goldTape" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C4932D" />
                <stop offset="25%" stopColor="#FDEAA8" />
                <stop offset="50%" stopColor="#E5BD5F" />
                <stop offset="75%" stopColor="#FFF2BF" />
                <stop offset="100%" stopColor="#C4932D" />
              </linearGradient>

              {/* Glowing shadow filter */}
              <filter id="goldGlow" x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Human Body Shading Gradient - Torso */}
              <linearGradient id="humanTorsoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#141E42" />
                <stop offset="30%" stopColor="#223062" />
                <stop offset="50%" stopColor="#2A3B75" />
                <stop offset="70%" stopColor="#223062" />
                <stop offset="100%" stopColor="#141E42" />
              </linearGradient>

              {/* Human Legs Shading Gradient - Long limbs */}
              <linearGradient id="humanLegGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#121B3D" />
                <stop offset="40%" stopColor="#202D5C" />
                <stop offset="60%" stopColor="#26366E" />
                <stop offset="100%" stopColor="#131C3F" />
              </linearGradient>

              {/* Muscle Highlights */}
              <linearGradient id="highlightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4A61A8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#2E3C6E" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Atelier Studio Floor Pedestal / Mannequin Stand */}
            <g id="pedestal">
              <ellipse cx="140" cy="648" rx="85" ry="14" fill="#0C1538" stroke="#25356E" strokeWidth="1.5" />
              <ellipse cx="140" cy="645" rx="76" ry="11" fill="#111D4B" stroke="rgba(213,168,72,0.4)" strokeWidth="1" />
              <line x1="60" y1="647" x2="220" y2="647" stroke="#D5A848" strokeWidth="1" opacity="0.5" />
            </g>

            {/* HUMAN BODY ANATOMICAL SILHOUETTE */}
            {modelSilhouette === 'couture' ? (
              /* ================== 1. FEMININE HAUTE COUTURE SILHOUETTE (Statuesque Proportions) ================== */
              <g id="couture-female-anatomy">
                {/* 1A. REALISTIC LONG LEGS: Crotch y:285 down to ankles y:595 and stiletto floor y:640 */}
                {/* Left Leg (Observer's Left) */}
                <path
                  d="M 124 285
                     C 122 305 110 335 107 375
                     C 105 400 108 420 112 435
                     C 114 445 115 455 113 475
                     C 111 498 107 525 108 550
                     C 109 568 114 585 117 598
                     L 114 624
                     L 126 624
                     C 125 615 124 600 125 592
                     C 126 572 129 545 132 510
                     C 134 475 133 450 131 435
                     C 129 420 131 395 133 365
                     C 134 335 137 305 138 286
                     Z"
                  fill="url(#humanLegGrad)"
                  stroke="#3B4E88"
                  strokeWidth="1.5"
                  className="cursor-pointer hover:stroke-[#D5A848] transition-colors"
                  onClick={() => onSelectKey('inseam')}
                />

                {/* Right Leg (Observer's Right) */}
                <path
                  d="M 142 286
                     C 143 305 146 335 147 365
                     C 149 395 151 420 149 435
                     C 147 450 146 475 148 510
                     C 151 545 154 572 155 592
                     C 156 600 155 615 154 624
                     L 166 624
                     L 163 598
                     C 166 585 171 568 172 550
                     C 173 525 169 498 167 475
                     C 165 455 166 445 168 435
                     C 172 420 175 400 173 375
                     C 170 335 158 305 156 285
                     Z"
                  fill="url(#humanLegGrad)"
                  stroke="#3B4E88"
                  strokeWidth="1.5"
                  className="cursor-pointer hover:stroke-[#D5A848] transition-colors"
                  onClick={() => onSelectKey('inseam')}
                />

                {/* Subtle Anatomical Highlights on Legs (Quadriceps & Patella Kneecap) */}
                {/* Left Quad highlight */}
                <path d="M 115 320 C 117 350 119 385 118 410" stroke="#485D9C" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
                {/* Right Quad highlight */}
                <path d="M 165 320 C 163 350 161 385 162 410" stroke="#485D9C" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
                {/* Kneecaps (Patella landmark) */}
                <ellipse cx="120" cy="435" rx="5" ry="7" fill="#1C2752" stroke="#3D508C" strokeWidth="1" opacity="0.8" />
                <ellipse cx="160" cy="435" rx="5" ry="7" fill="#1C2752" stroke="#3D508C" strokeWidth="1" opacity="0.8" />
                {/* Calf muscle contour subtle lines */}
                <path d="M 111 485 C 109 515 110 545 113 565" stroke="#3F5394" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
                <path d="M 169 485 C 171 515 170 545 167 565" stroke="#3F5394" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />

                {/* Ankle bones (Malleolus) */}
                <circle cx="116" cy="595" r="2" fill="#F3D17A" opacity="0.6" />
                <circle cx="164" cy="595" r="2" fill="#F3D17A" opacity="0.6" />

                {/* Tailored Couture Stiletto Shoes / High Arch Feet */}
                <path d="M 114 624 L 110 638 L 128 638 L 126 624 Z" fill="#0C1433" stroke="#D5A848" strokeWidth="1.2" />
                <line x1="113" y1="624" x2="111" y2="638" stroke="#D5A848" strokeWidth="1.5" /> {/* Heel post */}
                <path d="M 154 624 L 152 638 L 170 638 L 166 624 Z" fill="#0C1433" stroke="#D5A848" strokeWidth="1.2" />
                <line x1="167" y1="624" x2="169" y2="638" stroke="#D5A848" strokeWidth="1.5" /> {/* Heel post */}

                {/* 1B. TORSO & WAIST (Compact, Sleek, Natural Hourglass from Shoulders y:118 down to Crotch y:285) */}
                <path
                  d="M 140 114
                     C 152 114 176 118 188 126
                     C 192 129 194 135 190 144
                     C 186 154 180 170 176 186
                     C 172 202 163 214 161 222
                     C 159 230 164 245 171 262
                     C 176 274 174 284 168 290
                     C 162 295 150 296 140 296
                     C 130 296 118 295 112 290
                     C 106 284 104 274 109 262
                     C 116 245 121 230 119 222
                     C 117 214 108 202 104 186
                     C 100 170 94 154 90 144
                     C 86 135 88 129 92 126
                     C 104 118 128 114 140 114 Z"
                  fill="url(#humanTorsoGrad)"
                  stroke="#3D508C"
                  strokeWidth="1.8"
                />

                {/* Clavicles & Collarbone Anatomy */}
                <path d="M 110 128 C 120 133 133 133 140 136 C 147 133 160 133 170 128" stroke="#485D9C" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.8" />
                {/* Bust Apex and Cleavage contour */}
                <path d="M 114 164 C 124 176 136 176 140 172 C 144 176 156 176 166 164" stroke="#3D508C" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.7" />
                {/* Sternum / Midline */}
                <line x1="140" y1="174" x2="140" y2="220" stroke="#2B3A68" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
                {/* Navel / Belly button landmark */}
                <ellipse cx="140" cy="242" rx="1.8" ry="2.5" fill="#1C2752" stroke="#3D508C" strokeWidth="0.8" />
                {/* Iliac Crest subtle hip lines */}
                <path d="M 124 258 C 130 262 135 262 138 260" stroke="#2E3C6E" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
                <path d="M 156 258 C 150 262 145 262 142 260" stroke="#2E3C6E" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />

                {/* 1C. ARMS & HANDS (Observer's Left & Right with natural elbow at waist y:220 and wrist at hips y:280) */}
                {/* Left Arm */}
                <path
                  d="M 91 127
                     C 80 138 72 165 70 198
                     C 68 218 70 236 71 258
                     C 72 272 73 286 73 300
                     C 73 310 75 320 76 325
                     L 80 324
                     C 78 317 77 308 77 296
                     C 77 280 76 265 77 248
                     C 78 226 79 208 82 182
                     C 85 158 89 142 94 133
                     Z"
                  fill="url(#humanLegGrad)"
                  stroke="#3B4E88"
                  strokeWidth="1.5"
                  className="cursor-pointer hover:stroke-[#D5A848] transition-colors"
                  onClick={() => onSelectKey('armLength')}
                />
                {/* Left hand & fingers */}
                <path d="M 76 325 C 77 332 79 338 80 342 C 81 340 82 334 81 328 Z" fill="#202D5C" stroke="#3B4E88" strokeWidth="1" />

                {/* Right Arm */}
                <path
                  d="M 189 127
                     C 200 138 208 165 210 198
                     C 212 218 210 236 209 258
                     C 208 272 207 286 207 300
                     C 207 310 205 320 204 325
                     L 200 324
                     C 202 317 203 308 203 296
                     C 203 280 204 265 203 248
                     C 202 226 201 208 198 182
                     C 195 158 191 142 186 133
                     Z"
                  fill="url(#humanLegGrad)"
                  stroke="#3B4E88"
                  strokeWidth="1.5"
                  className="cursor-pointer hover:stroke-[#D5A848] transition-colors"
                  onClick={() => onSelectKey('armLength')}
                />
                {/* Right hand & fingers */}
                <path d="M 204 325 C 203 332 201 338 200 342 C 199 340 198 334 199 328 Z" fill="#202D5C" stroke="#3B4E88" strokeWidth="1" />

                {/* 1D. HUMAN-LIKE HEAD, GRACEFUL NECK & CHIC COUTURE SILHOUETTE */}
                {/* Slender Graceful Neck */}
                <path
                  d="M 133 92 L 133 115 C 133 118 136 120 140 120 C 144 120 147 118 147 115 L 147 92 Z"
                  fill="#1C2750"
                  stroke="#3D508C"
                  strokeWidth="1.2"
                />
                {/* Neck muscle line */}
                <line x1="136" y1="96" x2="138" y2="114" stroke="#485D9C" strokeWidth="1" opacity="0.6" />
                <line x1="144" y1="96" x2="142" y2="114" stroke="#485D9C" strokeWidth="1" opacity="0.6" />

                {/* Haute Couture Chignon Bun / Hairpin */}
                <circle cx="140" cy="30" r="10" fill="#101838" stroke="#D5A848" strokeWidth="1.2" />
                <line x1="132" y1="26" x2="148" y2="34" stroke="#F3D17A" strokeWidth="1.5" />

                {/* Refined Human Face & Head Silhouette */}
                <path
                  d="M 140 34
                     C 126 34 120 45 120 62
                     C 120 74 126 84 133 91
                     C 137 95 140 97 140 97
                     C 140 97 143 95 147 91
                     C 154 84 160 74 160 62
                     C 160 45 154 34 140 34 Z"
                  fill="#1B264E"
                  stroke="#3D508C"
                  strokeWidth="1.5"
                  className="cursor-pointer hover:stroke-[#D5A848] transition-colors"
                  onClick={() => onSelectKey('totalHeight')}
                />
                {/* Refined human facial profile lines */}
                {/* Eyebrow arch hint */}
                <path d="M 129 52 C 132 50 136 50 138 52" stroke="#485D9C" strokeWidth="1" fill="none" opacity="0.7" />
                <path d="M 142 52 C 144 50 148 50 151 52" stroke="#485D9C" strokeWidth="1" fill="none" opacity="0.7" />
                {/* Eye line / lashes hint */}
                <line x1="131" y1="56" x2="136" y2="56" stroke="#485D9C" strokeWidth="1" opacity="0.6" />
                <line x1="144" y1="56" x2="149" y2="56" stroke="#485D9C" strokeWidth="1" opacity="0.6" />
                {/* Nose tip subtle contour */}
                <path d="M 140 60 L 141 66 L 139 68" stroke="#485D9C" strokeWidth="0.8" fill="none" opacity="0.5" />
                {/* Serene Lip contour */}
                <path d="M 136 74 C 138 73 142 73 144 74" stroke="#F3D17A" strokeWidth="1" fill="none" opacity="0.7" />
                {/* Sculpted Jawline */}
                <path d="M 130 76 C 135 83 140 85 140 85 C 140 85 145 83 150 76" stroke="#334375" strokeWidth="1.2" fill="none" opacity="0.6" />
              </g>
            ) : (
              /* ================== 2. MASCULINE / SARTORIAL SILHOUETTE (Broad Shoulders, Long Tailored Legs) ================== */
              <g id="sartorial-male-anatomy">
                {/* Broad Shoulders & Athletic Torso */}
                <path
                  d="M 140 114
                     C 156 114 186 117 202 124
                     C 206 126 207 132 203 142
                     C 198 154 191 172 186 190
                     C 181 206 174 218 171 224
                     C 168 230 170 245 174 262
                     C 176 274 173 284 167 290
                     C 160 295 150 296 140 296
                     C 130 296 120 295 113 290
                     C 107 284 104 274 106 262
                     C 110 245 112 230 109 224
                     C 106 218 99 206 94 190
                     C 89 172 82 154 77 142
                     C 73 132 74 126 78 124
                     C 94 117 124 114 140 114 Z"
                  fill="url(#humanTorsoGrad)"
                  stroke="#3D508C"
                  strokeWidth="1.8"
                />

                {/* Sartorial Pectorals and Collarbones */}
                <path d="M 104 128 C 118 133 132 133 140 135 C 148 133 162 133 176 128" stroke="#485D9C" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
                <path d="M 108 166 C 122 174 136 174 140 170 C 144 174 158 174 172 166" stroke="#3D508C" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.7" />

                {/* Long Tailored Trousers Legs */}
                <path
                  d="M 122 286
                     C 119 315 111 360 109 415
                     C 108 445 109 480 110 520
                     C 111 555 113 585 115 615
                     L 128 615
                     C 127 585 128 555 130 520
                     C 132 480 134 445 135 415
                     C 136 360 137 315 138 286 Z"
                  fill="url(#humanLegGrad)"
                  stroke="#3B4E88"
                  strokeWidth="1.5"
                  className="cursor-pointer hover:stroke-[#D5A848] transition-colors"
                  onClick={() => onSelectKey('inseam')}
                />
                <path
                  d="M 142 286
                     C 143 315 144 360 145 415
                     C 146 445 148 480 150 520
                     C 152 555 153 585 152 615
                     L 165 615
                     C 167 585 169 555 170 520
                     C 171 480 172 445 171 415
                     C 169 360 161 315 158 286 Z"
                  fill="url(#humanLegGrad)"
                  stroke="#3B4E88"
                  strokeWidth="1.5"
                  className="cursor-pointer hover:stroke-[#D5A848] transition-colors"
                  onClick={() => onSelectKey('inseam')}
                />

                {/* Tailored Crease lines on trousers */}
                <line x1="118" y1="320" x2="121" y2="610" stroke="#485D9C" strokeWidth="1.2" strokeDasharray="6 3" opacity="0.6" />
                <line x1="162" y1="320" x2="159" y2="610" stroke="#485D9C" strokeWidth="1.2" strokeDasharray="6 3" opacity="0.6" />

                {/* Oxford Dress Shoes */}
                <path d="M 112 615 L 110 635 L 130 635 L 128 615 Z" fill="#0C1433" stroke="#D5A848" strokeWidth="1.2" />
                <path d="M 150 615 L 150 635 L 170 635 L 168 615 Z" fill="#0C1433" stroke="#D5A848" strokeWidth="1.2" />

                {/* Arms */}
                <path d="M 78 126 C 68 145 64 185 64 220 C 64 255 67 290 69 320 L 75 320 C 73 290 71 255 72 220 C 74 185 81 145 86 130 Z" fill="url(#humanLegGrad)" stroke="#3B4E88" strokeWidth="1.5" onClick={() => onSelectKey('armLength')} />
                <path d="M 202 126 C 212 145 216 185 216 220 C 216 255 213 290 211 320 L 205 320 C 207 290 209 255 208 220 C 206 185 199 145 194 130 Z" fill="url(#humanLegGrad)" stroke="#3B4E88" strokeWidth="1.5" onClick={() => onSelectKey('armLength')} />

                {/* Head & Strong Jawline */}
                <path d="M 132 90 L 132 115 L 148 115 L 148 90 Z" fill="#1C2750" stroke="#3D508C" strokeWidth="1.2" />
                <path d="M 140 38 C 127 38 122 48 122 64 C 122 76 128 86 134 92 C 137 95 140 96 140 96 C 140 96 143 95 146 92 C 152 86 158 76 158 64 C 158 48 153 38 140 38 Z" fill="#1B264E" stroke="#3D508C" strokeWidth="1.5" onClick={() => onSelectKey('totalHeight')} />
                <path d="M 132 78 C 137 84 140 86 140 86 C 140 86 143 84 148 78" stroke="#334375" strokeWidth="1.4" fill="none" />
              </g>
            )}

            {/* DYNAMIC MEASUREMENT OVERLAYS & REALISTIC MEASURING TAPES */}

            {/* 1. SHOULDER WIDTH (Horizontal span across natural shoulder points y: 122) */}
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => onSelectKey('shoulderWidth')}
              opacity={activeKey === 'shoulderWidth' ? 1 : 0.4}
            >
              <line
                x1={modelSilhouette === 'couture' ? '90' : '76'}
                y1="124"
                x2={modelSilhouette === 'couture' ? '190' : '204'}
                y2="124"
                stroke={activeKey === 'shoulderWidth' ? 'url(#goldTape)' : '#5A6794'}
                strokeWidth={activeKey === 'shoulderWidth' ? 4 : 2}
                strokeDasharray={activeKey === 'shoulderWidth' ? '4 2' : 'none'}
                filter={activeKey === 'shoulderWidth' ? 'url(#goldGlow)' : undefined}
              />
              <circle cx={modelSilhouette === 'couture' ? '90' : '76'} cy="124" r={activeKey === 'shoulderWidth' ? 4.5 : 3} fill="#F3D17A" />
              <circle cx={modelSilhouette === 'couture' ? '190' : '204'} cy="124" r={activeKey === 'shoulderWidth' ? 4.5 : 3} fill="#F3D17A" />
              {activeKey === 'shoulderWidth' && (
                <g>
                  <rect x="110" y="106" width="60" height="20" rx="4" fill="#070D24" stroke="#D5A848" strokeWidth="1.2" />
                  <text x="140" y="120" fill="#F0F4FC" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
                    {currentValues.shoulderWidth || '15.5'}{unit}
                  </text>
                </g>
              )}
            </g>

            {/* 2. BUST / CHEST (Horizontal tape looping across bust apex y: 168) */}
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => onSelectKey('bustChest')}
              opacity={activeKey === 'bustChest' ? 1 : 0.4}
            >
              <path
                d={modelSilhouette === 'couture' ? "M 96 168 C 114 178 166 178 184 168" : "M 90 168 C 112 178 168 178 190 168"}
                stroke={activeKey === 'bustChest' ? 'url(#goldTape)' : '#5A6794'}
                strokeWidth={activeKey === 'bustChest' ? 5 : 2}
                strokeDasharray={activeKey === 'bustChest' ? '6 2' : 'none'}
                fill="none"
                filter={activeKey === 'bustChest' ? 'url(#goldGlow)' : undefined}
              />
              {activeKey === 'bustChest' && (
                <rect x={modelSilhouette === 'couture' ? "92" : "86"} y="165" width="6" height="7" rx="1" fill="#C4932D" stroke="#000" strokeWidth="0.5" />
              )}
              {activeKey === 'bustChest' && (
                <g>
                  <rect x="108" y="164" width="64" height="20" rx="4" fill="#070D24" stroke="#D5A848" strokeWidth="1.2" />
                  <text x="140" y="178" fill="#F0F4FC" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
                    {currentValues.bustChest || '36'}{unit}
                  </text>
                </g>
              )}
            </g>

            {/* 3. ARM / SLEEVE LENGTH (Shoulder y:124 down past elbow y:220 to wrist y:285) */}
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => onSelectKey('armLength')}
              opacity={activeKey === 'armLength' ? 1 : 0.4}
            >
              <path
                d={modelSilhouette === 'couture' ? "M 189 126 C 206 155 210 220 205 300" : "M 202 126 C 218 155 218 220 210 300"}
                stroke={activeKey === 'armLength' ? 'url(#goldTape)' : '#5A6794'}
                strokeWidth={activeKey === 'armLength' ? 4 : 2}
                strokeDasharray={activeKey === 'armLength' ? '4 2' : 'none'}
                fill="none"
                filter={activeKey === 'armLength' ? 'url(#goldGlow)' : undefined}
              />
              <circle cx={modelSilhouette === 'couture' ? '189' : '202'} cy="126" r={activeKey === 'armLength' ? 4 : 2.5} fill="#F3D17A" />
              <circle cx={modelSilhouette === 'couture' ? '205' : '210'} cy="300" r={activeKey === 'armLength' ? 4 : 2.5} fill="#F3D17A" />
              {activeKey === 'armLength' && (
                <g>
                  <rect x="204" y="210" width="60" height="20" rx="4" fill="#070D24" stroke="#D5A848" strokeWidth="1.2" />
                  <text x="234" y="224" fill="#F0F4FC" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
                    {currentValues.armLength || '23.5'}{unit}
                  </text>
                </g>
              )}
            </g>

            {/* 4. WAIST (Narrowest point of natural waist y: 222) */}
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => onSelectKey('waist')}
              opacity={activeKey === 'waist' ? 1 : 0.4}
            >
              <path
                d={modelSilhouette === 'couture' ? "M 118 222 C 126 227 154 227 162 222" : "M 110 224 C 122 229 158 229 170 224"}
                stroke={activeKey === 'waist' ? 'url(#goldTape)' : '#5A6794'}
                strokeWidth={activeKey === 'waist' ? 5 : 2}
                strokeDasharray={activeKey === 'waist' ? '5 2' : 'none'}
                fill="none"
                filter={activeKey === 'waist' ? 'url(#goldGlow)' : undefined}
              />
              {activeKey === 'waist' && (
                <g>
                  <rect x="110" y="218" width="60" height="20" rx="4" fill="#070D24" stroke="#D5A848" strokeWidth="1.2" />
                  <text x="140" y="232" fill="#F0F4FC" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
                    {currentValues.waist || '28'}{unit}
                  </text>
                </g>
              )}
            </g>

            {/* 5. HIPS (Widest point of pelvis & seat y: 278) */}
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => onSelectKey('hips')}
              opacity={activeKey === 'hips' ? 1 : 0.4}
            >
              <path
                d={modelSilhouette === 'couture' ? "M 106 278 C 118 290 162 290 174 278" : "M 106 278 C 118 288 162 288 174 278"}
                stroke={activeKey === 'hips' ? 'url(#goldTape)' : '#5A6794'}
                strokeWidth={activeKey === 'hips' ? 5 : 2}
                strokeDasharray={activeKey === 'hips' ? '6 2' : 'none'}
                fill="none"
                filter={activeKey === 'hips' ? 'url(#goldGlow)' : undefined}
              />
              {activeKey === 'hips' && (
                <g>
                  <rect x="108" y="274" width="64" height="20" rx="4" fill="#070D24" stroke="#D5A848" strokeWidth="1.2" />
                  <text x="140" y="288" fill="#F0F4FC" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
                    {currentValues.hips || '38.5'}{unit}
                  </text>
                </g>
              )}
            </g>

            {/* 6. GARMENT FULL LENGTH (Shoulder y:124 straight down over long human legs to hem y:610) */}
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => onSelectKey('garmentLength')}
              opacity={activeKey === 'garmentLength' ? 1 : 0.35}
            >
              <line
                x1="140"
                y1="124"
                x2="140"
                y2="615"
                stroke={activeKey === 'garmentLength' ? 'url(#goldTape)' : '#5A6794'}
                strokeWidth={activeKey === 'garmentLength' ? 3.5 : 1.5}
                strokeDasharray={activeKey === 'garmentLength' ? '5 2' : '3 3'}
                filter={activeKey === 'garmentLength' ? 'url(#goldGlow)' : undefined}
              />
              {/* Desired hemline crossbar */}
              <line x1="95" y1="615" x2="185" y2="615" stroke="#F3D17A" strokeWidth="2.5" />
              {activeKey === 'garmentLength' && (
                <g>
                  <rect x="35" y="520" width="66" height="20" rx="4" fill="#070D24" stroke="#D5A848" strokeWidth="1.2" />
                  <text x="68" y="534" fill="#F0F4FC" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
                    {currentValues.garmentLength || '58'}{unit}
                  </text>
                </g>
              )}
            </g>

            {/* 7. INSEAM (From crotch y:286 down the long human leg to inner ankle bone y:595) */}
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => onSelectKey('inseam')}
              opacity={activeKey === 'inseam' ? 1 : 0.35}
            >
              <path
                d="M 139 288 L 132 435 L 123 595"
                stroke={activeKey === 'inseam' ? 'url(#goldTape)' : '#5A6794'}
                strokeWidth={activeKey === 'inseam' ? 3.5 : 1.5}
                strokeDasharray={activeKey === 'inseam' ? '4 2' : 'none'}
                fill="none"
                filter={activeKey === 'inseam' ? 'url(#goldGlow)' : undefined}
              />
              <circle cx="139" cy="288" r={activeKey === 'inseam' ? 3.5 : 2} fill="#F3D17A" />
              <circle cx="123" cy="595" r={activeKey === 'inseam' ? 3.5 : 2} fill="#F3D17A" />
              {activeKey === 'inseam' && (
                <g>
                  <rect x="52" y="450" width="60" height="20" rx="4" fill="#070D24" stroke="#D5A848" strokeWidth="1.2" />
                  <text x="82" y="464" fill="#F0F4FC" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
                    {currentValues.inseam || '32'}{unit}
                  </text>
                </g>
              )}
            </g>

            {/* 8. TOTAL HEIGHT (Side bracket spanning full crown y:24 to floor y:642) */}
            <g
              className="cursor-pointer transition-all duration-300"
              onClick={() => onSelectKey('totalHeight')}
              opacity={activeKey === 'totalHeight' ? 1 : 0.3}
            >
              <line x1="20" y1="26" x2="34" y2="26" stroke="#D5A848" strokeWidth="2" />
              <line
                x1="26"
                y1="26"
                x2="26"
                y2="642"
                stroke={activeKey === 'totalHeight' ? 'url(#goldTape)' : '#5A6794'}
                strokeWidth={activeKey === 'totalHeight' ? 3 : 1.5}
                strokeDasharray={activeKey === 'totalHeight' ? '6 2' : 'none'}
              />
              <line x1="20" y1="642" x2="34" y2="642" stroke="#D5A848" strokeWidth="2" />
              {activeKey === 'totalHeight' && (
                <g>
                  <rect x="2" y="310" width="54" height="20" rx="4" fill="#070D24" stroke="#D5A848" strokeWidth="1.2" />
                  <text x="29" y="324" fill="#F0F4FC" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
                    {currentValues.totalHeight || '69'}{unit}
                  </text>
                </g>
              )}
            </g>
          </svg>
        </div>

        {/* Quick legend buttons */}
        <div className="flex flex-wrap gap-1.5 justify-center mt-3 max-w-[340px]">
          {MEASUREMENT_GUIDES.map((g) => (
            <button
              key={g.key}
              onClick={() => onSelectKey(g.key)}
              className={`text-[11px] px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                activeKey === g.key
                  ? 'bg-[#D5A848] text-[#070D24] font-bold shadow'
                  : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {g.shortLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Master Tailor Guidance Card */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between h-full bg-[#070D24] p-6 rounded-xl border border-[rgba(213,168,72,0.25)] shadow-lg min-h-[500px]">
        <div>
          <div className="flex items-center justify-between pb-3.5 border-b border-[rgba(213,168,72,0.2)] mb-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D5A848] shadow-sm shadow-[#D5A848]" />
              <span className="text-xs uppercase font-mono tracking-widest text-[#F3D17A] font-semibold">
                Anatomical Step-by-Step
              </span>
            </div>
            <span className="text-xs text-neutral-300 font-mono">
              Target Zone: <strong className="text-white uppercase">{activeGuide.avatarRegion}</strong>
            </span>
          </div>

          <h4 className="text-2xl font-serif text-white tracking-wide mb-3">
            {activeGuide.label}
          </h4>

          <p className="text-sm text-neutral-200 leading-relaxed mb-6">
            {activeGuide.instruction}
          </p>

          <div className="bg-[#0B153D] p-4 rounded-xl border border-[rgba(213,168,72,0.35)] mb-6 shadow-inner">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#F3D17A] mb-1.5">
              <svg className="w-4 h-4 text-[#D5A848]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Master Tailor Anatomical Rule
            </div>
            <p className="text-xs text-neutral-300 italic leading-relaxed">
              "{activeGuide.tailorTip}"
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[rgba(213,168,72,0.2)] flex items-center justify-between text-xs text-neutral-300">
          <span>Standard adult anatomical range:</span>
          <span className="font-mono text-[#F3D17A] font-semibold text-sm">
            {unit === 'in'
              ? `${activeGuide.minInches}" – ${activeGuide.maxInches}"`
              : `${Math.round(activeGuide.minInches * 2.54)}cm – ${Math.round(activeGuide.maxInches * 2.54)}cm`}
          </span>
        </div>
      </div>
    </div>
  );
};
