import React from 'react';

interface TwiceAsMuchLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const TwiceAsMuchLogo: React.FC<TwiceAsMuchLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const heightMap = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-16',
    xl: 'h-24',
  };

  return (
    <div className={`inline-flex items-center justify-center ${heightMap[size]} ${className}`}>
      <svg
        viewBox="0 0 520 260"
        className="h-full w-auto select-none drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Gold Gradient for Outer Rim */}
          <linearGradient id="tamGoldRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2B755" />
            <stop offset="25%" stopColor="#F9E29B" />
            <stop offset="50%" stopColor="#D5A848" />
            <stop offset="75%" stopColor="#F4D984" />
            <stop offset="100%" stopColor="#A87A22" />
          </linearGradient>

          {/* Gold Gradient for Emblem Ball & Stem */}
          <linearGradient id="tamGoldEmblem" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#FCE7A6" />
            <stop offset="40%" stopColor="#E5BC5C" />
            <stop offset="80%" stopColor="#C4932D" />
            <stop offset="100%" stopColor="#966B16" />
          </linearGradient>

          {/* Radial highlight for the Gold Sphere */}
          <radialGradient id="tamSphereGlow" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF9E0" />
            <stop offset="45%" stopColor="#E5BD5F" />
            <stop offset="90%" stopColor="#B38020" />
            <stop offset="100%" stopColor="#7A520E" />
          </radialGradient>

          {/* Deep Navy Gradient for Shield Background */}
          <linearGradient id="tamNavyShield" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#0D1B50" />
            <stop offset="50%" stopColor="#09143C" />
            <stop offset="100%" stopColor="#060E2B" />
          </linearGradient>

          {/* Subtle Outer Drop Shadow */}
          <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* 1. OUTER GOLD SHIELD / RIM */}
        {/* Curved heraldic shape: Arched top, soft curved shoulders, tapered bottom point */}
        <path
          d="M 260 56
             C 340 56 415 67 448 83
             C 453 85 456 90 455 96
             L 446 166
             C 445 174 439 181 432 184
             L 260 216
             L 88 184
             C 81 181 75 174 74 166
             L 65 96
             C 64 90 67 85 72 83
             C 105 67 180 56 260 56 Z"
          fill="url(#tamGoldRim)"
          filter="url(#badgeShadow)"
        />

        {/* 2. INNER NAVY SHIELD */}
        <path
          d="M 260 66
             C 336 66 406 76 437 91
             L 429 160
             C 428 165 423 170 417 172
             L 260 202
             L 103 172
             C 97 170 92 165 91 160
             L 83 91
             C 114 76 184 66 260 66 Z"
          fill="url(#tamNavyShield)"
        />

        {/* 3. INNER DELICATE GOLD PINSTRIPE */}
        <path
          d="M 260 72
             C 332 72 398 81 428 95
             L 421 156
             C 420 160 416 163 411 165
             L 260 194
             L 109 165
             C 104 163 100 160 99 156
             L 92 95
             C 122 81 188 72 260 72 Z"
          stroke="url(#tamGoldRim)"
          strokeWidth="1.8"
          fill="none"
          opacity="0.85"
        />

        {/* 4. THE ICONIC GOLD "I" EMBLEM (Sphere + Sculpted Crescent Swoosh) */}
        <g id="gold-i-emblem">
          {/* Top Sphere Pin */}
          <circle cx="260" cy="52" r="22" fill="url(#tamSphereGlow)" stroke="#F3D17A" strokeWidth="1.5" />
          
          {/* Sculpted Drop/Crescent Tail of the 'i' */}
          <path
            d="M 244 76
               C 244 76 258 76 263 76
               C 274 76 288 88 288 106
               C 288 126 280 148 274 158
               C 270 164 266 167 262 167
               C 255 167 253 162 254 154
               C 256 142 260 126 260 115
               C 260 102 254 94 246 88
               Z"
            fill="url(#tamGoldEmblem)"
          />

          {/* Delicate Highlight Reflection on the curve */}
          <path
            d="M 260 78
               C 270 78 282 88 282 104
               C 282 118 276 138 270 148"
            stroke="#FFF4C4"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </g>

        {/* 5. TYPOGRAPHY: "TW" AND "CE" (Crisp White Bold Modern Geometric Sans) */}
        <g id="twice-typography" fill="#FFFFFF">
          {/* Letter T */}
          <path d="M 112 102 L 149 102 L 149 116 L 137 116 L 137 156 L 124 156 L 124 116 L 112 116 Z" />

          {/* Letter W */}
          <path d="M 152 102 L 165 102 L 174 140 L 184 102 L 196 102 L 206 140 L 215 102 L 228 102 L 213 156 L 200 156 L 190 120 L 180 156 L 167 156 Z" />

          {/* Letter C */}
          <path d="M 338 102 C 354 102 364 112 365 125 L 351 125 C 350 119 345 114 337 114 C 326 114 319 123 319 129 C 319 135 326 144 337 144 C 345 144 350 139 351 133 L 365 133 C 364 146 354 156 338 156 C 318 156 305 144 305 129 C 305 114 318 102 338 102 Z" />

          {/* Letter E */}
          <path d="M 376 102 L 409 102 L 409 115 L 389 115 L 389 123 L 407 123 L 407 135 L 389 135 L 389 143 L 410 143 L 410 156 L 376 156 Z" />
        </g>

        {/* 6. SUBTITLE: "AS MUCH" (Centered Geometric Caps) */}
        <text
          x="260"
          y="186"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
          fontSize="24"
          fontWeight="800"
          letterSpacing="0.28em"
          textAnchor="middle"
        >
          AS MUCH
        </text>
      </svg>
    </div>
  );
};
