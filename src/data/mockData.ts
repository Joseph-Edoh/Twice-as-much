import { Product, FabricOption, CustomBespokeOrder, MeasurementKey } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-dress-01',
    name: "L'Obsidienne Couture Silk Gown",
    category: 'Dresses',
    price: 890,
    description: 'An architectural evening silhouette draped in 22mm silk crepe with hand-finished gold bullion thread along the asymmetrical neckline and sculptural waist gather.',
    imageUrl: '/src/assets/images/hero_atelier_fashion_1791567148622.jpg',
    secondaryImageUrl: '/src/assets/images/dress_silk_crepe_bespoke_1791567160227.jpg',
    colors: [
      { name: 'Obsidian Black', hex: '#0F1115' },
      { name: 'Champagne Cream', hex: '#EAE3D2' },
      { name: 'Midnight Navy', hex: '#161F30' },
    ],
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)'],
    inStock: true,
    stockCount: 8,
    isCustomizable: true,
    tailoringDays: 10,
    rating: 4.9,
    details: [
      '100% Mulberry Silk Crepe de Chine',
      'Hand-stitched interior corset boning',
      'Concealed invisible Swiss back zipper',
      'Dry clean only by couture specialist'
    ]
  },
  {
    id: 'prod-dress-02',
    name: 'The Sovereign Tailored Tuxedo Dress',
    category: 'Dresses',
    price: 750,
    description: 'Precision-cut double-breasted structured tuxedo dress cut from Super 130s Italian virgin wool with hand-faced satin peak lapels and horn buttons.',
    imageUrl: '/src/assets/images/dress_wool_tuxedo_1791567171217.jpg',
    secondaryImageUrl: '/src/assets/images/hero_atelier_fashion_1791567148622.jpg',
    colors: [
      { name: 'Midnight Noir', hex: '#121316' },
      { name: 'Ivory Satin', hex: '#F3EFE6' },
      { name: 'Bespoke Charcoal', hex: '#2C2D31' },
    ],
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)'],
    inStock: true,
    stockCount: 12,
    isCustomizable: true,
    tailoringDays: 8,
    rating: 4.8,
    details: [
      'Super 130s Worsted Virgin Wool',
      'Duchess Silk Satin Lapels',
      'Full Bemberg Cupro lining for breathability',
      'Hand-finished functional sleeve cuff buttons'
    ]
  },
  {
    id: 'prod-dress-03',
    name: 'Draped Column Silk Crepe Gown',
    category: 'Dresses',
    price: 920,
    description: 'Fluid Grecian-inspired asymmetric drape cascading into a floor-sweeping dual-tone hem. Engineered for effortless movement with tailored torso support.',
    imageUrl: '/src/assets/images/dress_silk_crepe_bespoke_1791567160227.jpg',
    secondaryImageUrl: '/src/assets/images/hero_atelier_fashion_1791567148622.jpg',
    colors: [
      { name: 'Sand & Midnight', hex: '#D7CCB9' },
      { name: 'Pure Pearl', hex: '#F9F8F5' },
      { name: 'Bespoke Emerald', hex: '#16382C' },
    ],
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)'],
    inStock: true,
    stockCount: 6,
    isCustomizable: true,
    tailoringDays: 12,
    rating: 5.0,
    details: [
      'Hand-draped bias cut silhouette',
      'Reinforced internal waist tape',
      'Weighted hem for graceful drape momentum',
      'Master tailor bespoke fitting certified'
    ]
  },
  {
    id: 'prod-acc-01',
    name: 'Chronographe Atelier 41mm',
    category: 'Wristwatches',
    price: 1250,
    description: 'Bespoke automatic mechanical chronograph featuring a deep midnight sunray dial, hand-brushed champagne gold bezel, and French alligator grain leather strap.',
    imageUrl: '/src/assets/images/accessories_luxury_collection_1791567182741.jpg',
    colors: [
      { name: 'Champagne Gold & Navy', hex: '#D4AF37' },
      { name: 'Obsidian Steel', hex: '#1E2129' },
      { name: 'Rose Gold Patina', hex: '#C28876' },
    ],
    sizes: ['38mm Case', '41mm Case', '43mm Case'],
    inStock: true,
    stockCount: 15,
    isCustomizable: false,
    rating: 4.9,
    details: [
      'Swiss Automatic Movement with 48h power reserve',
      'Double anti-reflective sapphire crystal',
      'Full grain French leather deployant clasp',
      'Water resistant to 50 meters (5 ATM)'
    ]
  },
  {
    id: 'prod-shoe-01',
    name: 'Monaco Goodyear-Welted Oxfords',
    category: 'Shoes',
    price: 480,
    description: 'Handcrafted wholecut Oxford dress shoes sculpted from full-grain French box calf leather with hand-burnished mahogany patina and bevelled waist leather soles.',
    imageUrl: '/src/assets/images/accessories_luxury_collection_1791567182741.jpg',
    colors: [
      { name: 'Deep Burgundy Espresso', hex: '#3B1E1E' },
      { name: 'Obsidian Black', hex: '#111215' },
      { name: 'Antique Cognac', hex: '#7A4822' },
    ],
    sizes: ['7 US', '8 US', '9 US', '10 US', '11 US', '12 US'],
    inStock: true,
    stockCount: 18,
    isCustomizable: false,
    rating: 4.9,
    details: [
      'Genuine Goodyear Welt construction',
      'Full vegetable-tanned leather lining',
      'Hand-painted stacked leather heel with brass pegs',
      'Includes custom cedar shoetrees'
    ]
  },
  {
    id: 'prod-eye-01',
    name: 'Avenue Hand-Polished Acetate Sunglasses',
    category: 'Eyewear',
    price: 290,
    description: 'Subtle pantos geometric sunglasses milled from 8mm Japanese block acetate with hand-pinned five-barrel hinges and Carl Zeiss polarized mineral lenses.',
    imageUrl: '/src/assets/images/accessories_luxury_collection_1791567182741.jpg',
    colors: [
      { name: 'Obsidian Black', hex: '#101114' },
      { name: 'Havana Tortoiseshell', hex: '#573D25' },
      { name: 'Champagne Crystal', hex: '#DFD8C4' },
    ],
    sizes: ['Standard 49-21', 'Wide 52-21'],
    inStock: true,
    stockCount: 24,
    isCustomizable: false,
    rating: 4.7,
    details: [
      'Japanese Cellulose Block Acetate',
      '100% UVA/UVB Carl Zeiss polarized protection',
      'Custom gold wire core engraving',
      'Supplied with magnetic leather travel pouch'
    ]
  },
  {
    id: 'prod-polo-01',
    name: 'Milano Silk-Cotton Mercerized Polo',
    category: 'Polos',
    price: 240,
    description: 'An elevated daily luxury staple knitted from 18-gauge long-staple Egyptian cotton and mulberry silk with genuine mother-of-pearl buttons and tailored ribbed collar.',
    imageUrl: '/src/assets/images/polo_cashmere_navy_1791570033703.jpg',
    colors: [
      { name: 'Midnight Navy', hex: '#111927' },
      { name: 'Champagne Sand', hex: '#DED3BF' },
      { name: 'Dark Olive', hex: '#2A3328' },
      { name: 'Pure White', hex: '#FBFBFB' },
    ],
    sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)'],
    inStock: true,
    stockCount: 30,
    isCustomizable: false,
    rating: 4.8,
    details: [
      '70% Extra Long Staple Cotton, 30% Mulberry Silk',
      '18-gauge fully fashioned knitwear',
      'Natural Australian mother-of-pearl buttons',
      'Pre-washed for zero shrinkage retention'
    ]
  },
  {
    id: 'prod-dress-04',
    name: 'Riviera Artisanal Belgian Linen Wrap Gown',
    category: 'Dresses',
    price: 680,
    description: 'Effortlessly draped dual-tone wrap silhouette tailored from certified master Belgian flax with balloon poet cuffs, cascading sash tie, and breathable architectural drape.',
    imageUrl: '/src/assets/images/dress_linen_resort_1791570057844.jpg',
    secondaryImageUrl: '/src/assets/images/dress_silk_crepe_bespoke_1791567160227.jpg',
    colors: [
      { name: 'Ivory Pearl', hex: '#FAF9F5' },
      { name: 'Natural Flax & Sand', hex: '#D5C6AC' },
      { name: 'Midnight Navy', hex: '#0C163F' },
    ],
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)'],
    inStock: true,
    stockCount: 10,
    isCustomizable: true,
    tailoringDays: 9,
    rating: 4.9,
    details: [
      '100% Certified European Flax Linen',
      'Wrap construction with internal stabilizing tie',
      'French seam interior finishing throughout',
      'Dry clean or cold delicate artisan hand-wash'
    ]
  },
  {
    id: 'prod-shoe-02',
    name: 'The Kensington Burnished Leather Chelsea Boots',
    category: 'Shoes',
    price: 540,
    description: 'Masterfully sculpted Chelsea dress boots in hand-burnished mahogany patina French calfskin, featuring Goodyear welted bevelled leather soles and woven gold-accented pull tabs.',
    imageUrl: '/src/assets/images/shoe_chelsea_boot_1791570047389.jpg',
    colors: [
      { name: 'Mahogany Patina', hex: '#4A2318' },
      { name: 'Obsidian Noir', hex: '#111215' },
      { name: 'Tobacco Suede', hex: '#724928' },
    ],
    sizes: ['7 US', '8 US', '9 US', '10 US', '11 US', '12 US'],
    inStock: true,
    stockCount: 16,
    isCustomizable: false,
    rating: 4.9,
    details: [
      'Full-grain French box calf leather',
      'Goodyear welted single-layer leather sole',
      'High-tensile stretch side gusset for ergonomic fit',
      'Hand-burnished toe medal patina'
    ]
  },
  {
    id: 'prod-polo-02',
    name: 'Atelier Royal Cashmere-Blend Polo',
    category: 'Polos',
    price: 320,
    description: 'Ultra-fine knitted 16-gauge Mongolian cashmere and silk blend in midnight royal navy, finished with hand-linked champagne gold micro-piping on the sartorial spread collar.',
    imageUrl: '/src/assets/images/polo_cashmere_navy_1791570033703.jpg',
    colors: [
      { name: 'Midnight Navy & Gold', hex: '#0C163F' },
      { name: 'Pearl Cream', hex: '#EAE3D2' },
      { name: 'Obsidian Noir', hex: '#0F1115' },
    ],
    sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)'],
    inStock: true,
    stockCount: 22,
    isCustomizable: false,
    rating: 5.0,
    details: [
      '60% Mongolian Cashmere, 40% Grade 6A Mulberry Silk',
      'Champagne gold contrast collar tipping',
      'Natural smoky mother-of-pearl engraved buttons',
      'Seamless tubular ribbed hem and cuffs'
    ]
  },
  {
    id: 'prod-acc-02',
    name: 'Palladium Buckle Woven Leather Belt',
    category: 'Accessories',
    price: 185,
    description: 'Hand-braided bridle leather finished with satin brushed palladium hardware and hand-waxed burnished edges.',
    imageUrl: '/src/assets/images/accessories_luxury_collection_1791567182741.jpg',
    colors: [
      { name: 'Saddle Chestnut', hex: '#4A2A18' },
      { name: 'Midnight Black', hex: '#141416' },
    ],
    sizes: ['85cm (32")', '90cm (34")', '95cm (36")', '100cm (38")'],
    inStock: true,
    stockCount: 14,
    isCustomizable: false,
    rating: 4.6,
    details: [
      'Vegetable-tanned full-grain leather',
      'Solid brass buckle with palladium electroplating',
      'Hand-burnished edge beveling',
      'Made in Florence, Italy'
    ]
  },
  {
    id: 'prod-acc-03',
    name: '18K Gold Guilloché Cufflinks & Navy Cardholder Set',
    category: 'Accessories',
    price: 360,
    description: 'A curated bespoke gift set pairing monogrammed 18-karat champagne gold-plated guilloché cufflinks with a full-grain French calfskin bifold cardholder and silk twill pocket square.',
    imageUrl: '/src/assets/images/accessories_cufflinks_wallet_1791570067726.jpg',
    colors: [
      { name: 'Champagne Gold & Navy', hex: '#D5A848' },
      { name: 'Rose Gold & Obsidian', hex: '#C28876' },
    ],
    sizes: ['One Size (Gift Box)'],
    inStock: true,
    stockCount: 18,
    isCustomizable: false,
    rating: 4.9,
    details: [
      '18-karat gold electroplated solid brass cufflinks',
      'Hand-guilloché engine-turned pattern',
      'Full-grain pebble leather cardholder with 6 card slots',
      'Comes encased in signature TWICE AS MUCH gift box'
    ]
  },
  {
    id: 'prod-acc-04',
    name: 'Sovereign Silk Twill Pocket Square',
    category: 'Accessories',
    price: 115,
    description: '100% 16mm silk twill with geometric heraldic crest borders and hand-rolled, hand-stitched edges crafted by master silk artisans in Como, Italy.',
    imageUrl: '/src/assets/images/accessories_cufflinks_wallet_1791570067726.jpg',
    colors: [
      { name: 'Royal Navy & Gold', hex: '#0D1B50' },
      { name: 'Ivory & Gold', hex: '#F4EEDF' },
      { name: 'Bordeaux Noir', hex: '#3D141C' },
    ],
    sizes: ['42cm x 42cm'],
    inStock: true,
    stockCount: 28,
    isCustomizable: false,
    rating: 4.8,
    details: [
      '100% Mulberry Silk Twill 16mm',
      'Hand-rolled and hand-sewn hem',
      'Screen printed with eco-certified colorfast dyes',
      'Made in Como, Italy'
    ]
  },
  {
    id: 'prod-dress-05',
    name: 'Empress Midnight Velvet Cape Gown',
    category: 'Dresses',
    price: 1150,
    description: 'An architectural haute couture evening gown in heavy royal midnight navy silk velvet. Features sculptural pleated capelet shoulders, champagne gold duchess satin interior accents, and a dramatic floor-trailing column skirt.',
    imageUrl: '/src/assets/images/dress_velvet_evening_1791570223470.jpg',
    secondaryImageUrl: '/src/assets/images/hero_atelier_fashion_1791567148622.jpg',
    colors: [
      { name: 'Royal Midnight Velvet', hex: '#0B153D' },
      { name: 'Obsidian Noir Velvet', hex: '#0B0D13' },
      { name: 'Imperial Emerald Velvet', hex: '#0F2B1D' },
    ],
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)'],
    inStock: true,
    stockCount: 5,
    isCustomizable: true,
    tailoringDays: 14,
    rating: 5.0,
    details: [
      '100% Silk-Plush Royal Velvet imported from Lyon',
      'Internal structured French corsetry support',
      'Champagne gold pure silk duchess lining',
      'Hand-hemmed by master atelier seamstresses'
    ]
  },
  {
    id: 'prod-bag-01',
    name: 'The Royal Bamboo-Handle Saffiano Box Bag',
    category: 'Accessories',
    price: 680,
    description: 'A masterpiece of leathercraft. Structured royal navy Italian box calfskin framed with hand-burnished champagne gold leather trim, custom jewel-latch lock, and hand-scorched artisanal bamboo top handle.',
    imageUrl: '/src/assets/images/bag_leather_handbag_1791570211121.jpg',
    colors: [
      { name: 'Royal Navy & Gold', hex: '#0D1B50' },
      { name: 'Noir & Gold', hex: '#111216' },
      { name: 'Ivory Pebble', hex: '#EBE5D8' },
    ],
    sizes: ['Medium (26 x 20 x 10 cm)'],
    inStock: true,
    stockCount: 11,
    isCustomizable: false,
    rating: 4.9,
    details: [
      'Full-grain Italian box calfskin leather',
      'Fire-treated natural bamboo handle with brass pivot hardware',
      'Solid brass push-clasp electroplated in 24k champagne gold',
      'Nappa leather lined interior with zip pocket and vanity mirror'
    ]
  },
  {
    id: 'prod-shoe-03',
    name: 'Vendôme Sculpted Gold Stiletto Pumps',
    category: 'Shoes',
    price: 540,
    description: 'Pointed-toe high-fashion evening pumps in velvety royal midnight navy Italian kidskin suede. Elevated by an architectural 100mm flared stiletto heel electroplated in polished champagne gold with an adjustable ankle buckle.',
    imageUrl: '/src/assets/images/shoe_heels_gold_accent_1791570234837.jpg',
    colors: [
      { name: 'Midnight Navy Suede', hex: '#0E1A47' },
      { name: 'Obsidian Velvet Black', hex: '#0D0E12' },
      { name: 'Champagne Satin', hex: '#E4D5B7' },
    ],
    sizes: ['6 US (36)', '7 US (37)', '8 US (38)', '9 US (39)', '10 US (40)', '11 US (41)'],
    inStock: true,
    stockCount: 14,
    isCustomizable: false,
    rating: 4.9,
    details: [
      'Velvety French kidskin suede upper',
      'Sculpted 100mm (4") high-gloss gold fluted heel',
      'Padded memory-foam leather footbed for couture comfort',
      'Hand-lacquered midnight leather sole with brass sole logo'
    ]
  },
  {
    id: 'prod-acc-05',
    name: '18K Gold Atelier Curb Chain & Signet Ensemble',
    category: 'Accessories',
    price: 480,
    description: 'High-jewelry ensemble featuring a substantial 18-karat champagne gold-plated heavy curb link bracelet with box safety lock, paired with a hand-engraved heraldic coat-of-arms oval signet ring.',
    imageUrl: '/src/assets/images/accessories_gold_jewelry_1791570252625.jpg',
    colors: [
      { name: '18K Champagne Gold', hex: '#D5A848' },
      { name: 'Palladium White Gold', hex: '#D8DEE9' },
    ],
    sizes: ['Ring Size 8 / 19cm Bracelet', 'Ring Size 9 / 20cm Bracelet', 'Ring Size 10 / 21cm Bracelet'],
    inStock: true,
    stockCount: 9,
    isCustomizable: false,
    rating: 5.0,
    details: [
      'Heavy solid brass core with 5-micron 18K gold vermeil plating',
      'Dual-security tongue clasp on 14mm Cuban curb links',
      'Laser-carved and hand-chiseled heraldic signet shield',
      'Delivered in velvet-lined piano lacquer jewelry chest'
    ]
  },
  {
    id: 'prod-eye-02',
    name: 'The Sovereign Gold-Rim Double-Bridge Aviator',
    category: 'Eyewear',
    price: 340,
    description: 'Aerospace-grade Japanese titanium pilot frames electroplated in champagne gold. Features custom double brow-bar filigree, midnight tortoiseshell acetate temple tips, and gradient amber polarized mineral lenses.',
    imageUrl: '/src/assets/images/accessories_gold_jewelry_1791570252625.jpg',
    colors: [
      { name: 'Champagne Gold & Amber', hex: '#D5A848' },
      { name: 'Obsidian Titanium', hex: '#1C1E24' },
    ],
    sizes: ['Standard 55-16-145'],
    inStock: true,
    stockCount: 16,
    isCustomizable: false,
    rating: 4.8,
    details: [
      'Ultra-light Japanese titanium chassis',
      'Gradient anti-reflective polarized mineral glass lenses',
      'Hypoallergenic ceramic nose pads with micro logo engraving',
      'Handcrafted hard leather protective folio case'
    ]
  },
  {
    id: 'prod-watch-02',
    name: 'Sovereign Moonphase Automatic 40mm',
    category: 'Wristwatches',
    price: 1480,
    description: 'Complicated haute horlogerie timepiece featuring a grand astronomical moonphase aperture, midnight blue guilloché dial, blued steel hands, and solid 18k gold fluted coin-edge bezel on navy alligator strap.',
    imageUrl: '/src/assets/images/accessories_luxury_collection_1791567182741.jpg',
    colors: [
      { name: 'Midnight Navy & Gold', hex: '#D4AF37' },
      { name: 'Monochrome Steel', hex: '#C0C5CE' },
    ],
    sizes: ['40mm Dress Case'],
    inStock: true,
    stockCount: 7,
    isCustomizable: false,
    rating: 5.0,
    details: [
      'Calibre TH-820 Automatic mechanical movement (28,800 vph)',
      'Accurate astronomical 29.5-day moonphase disc with gold stars',
      'Double curved anti-reflective scratchproof sapphire crystal',
      'Hand-stitched Louisiana alligator leather strap with folding gold buckle'
    ]
  },
  {
    id: 'prod-polo-03',
    name: 'Portofino Silk-Linen Textured Knit Polo',
    category: 'Polos',
    price: 260,
    description: 'Bespoke open-collar resort polo knitted in a subtle chevron honeycomb weave from 55% Grade 6A mulberry silk and 45% French linen. Exceptional breathability with refined sartorial drape.',
    imageUrl: '/src/assets/images/polo_cashmere_navy_1791570033703.jpg',
    colors: [
      { name: 'Midnight Navy', hex: '#0C163F' },
      { name: 'Champagne Gold Tipped', hex: '#D9C8A0' },
      { name: 'Artisan Ecru', hex: '#F0EAD6' },
    ],
    sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)'],
    inStock: true,
    stockCount: 20,
    isCustomizable: false,
    rating: 4.9,
    details: [
      '55% Grade 6A Mulberry Silk, 45% Certified French Linen',
      'Johnny collar construction without buttons for effortless elegance',
      'Textured micro-chevron knit for temperature regulation',
      'Hand-finished tubular ribbed cuffs and waistband'
    ]
  },
  {
    id: 'prod-sneaker-01',
    name: 'Vendôme Italian Midnight Navy Leather Court Sneaker',
    category: 'Sneakers',
    price: 420,
    description: 'Handcrafted in Civitanova Marche, Italy from ultra-soft midnight navy full-grain calfskin leather. Features a cushioned Margom rubber cupsole, hand-stamped champagne gold foil insignia, and butter-soft leather lining.',
    imageUrl: '/src/assets/images/sneakers_luxury_navy_1791574171620.jpg',
    colors: [
      { name: 'Midnight Navy & Gold', hex: '#0D1B50' },
      { name: 'Onyx Black', hex: '#111215' },
      { name: 'Pure Chalk White', hex: '#F5F5F0' },
    ],
    sizes: ['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45', 'EU 46'],
    inStock: true,
    stockCount: 16,
    isCustomizable: false,
    rating: 4.9,
    details: [
      '100% Full-Grain Italian Calfskin Leather with water-repellent conditioning',
      'Original Italian Margom vulcanized rubber stitched cupsole',
      'Natural vegetable-tanned calfskin lining with antibacterial memory foam insole',
      'Solid brass 18k champagne gold eyelets with waxed cotton laces'
    ]
  },
  {
    id: 'prod-sneaker-02',
    name: 'Monaco Minimalist Nappa Leather & Navy Suede Sneaker',
    category: 'Sneakers',
    price: 445,
    description: 'Pristine minimalist luxury sneaker crafted from smooth white Italian nappa leather, elevated with midnight navy velvet suede lateral saddle accents and champagne gold piping.',
    imageUrl: '/src/assets/images/sneakers_white_gold_1791574182394.jpg',
    colors: [
      { name: 'White & Midnight Navy', hex: '#FFFFFF' },
      { name: 'Monochrome Ivory', hex: '#F7F6F2' },
      { name: 'Navy & Gold Accent', hex: '#0B153D' },
    ],
    sizes: ['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45', 'EU 46'],
    inStock: true,
    stockCount: 14,
    isCustomizable: false,
    rating: 4.95,
    details: [
      'Grade-A Italian Nappa Calf Leather with French velvet suede trims',
      'Double-stitched stress zones with reinforced padded collar',
      'Champagne gold metal lace lock aglets and subtle heel insignia',
      'Custom tread pattern for optimal urban traction'
    ]
  },
  {
    id: 'prod-senator-01',
    name: 'The Sovereign Royal Navy Bespoke Senator Suit',
    category: 'Senator Wear',
    price: 680,
    description: 'Commanding Nigerian Senator two-piece formal attire crafted from Super 150s worsted wool and cashmere. Features an architectural mandarin collar, front placket adorned with exquisite champagne gold geometric hand embroidery, and tailored matching trousers.',
    imageUrl: '/src/assets/images/senator_navy_gold_1791574194620.jpg',
    colors: [
      { name: 'Royal Midnight Navy & Gold', hex: '#0E1B4F' },
      { name: 'Deep Regal Navy', hex: '#162456' },
      { name: 'Imperial Black & Gold', hex: '#101114' },
    ],
    sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)', 'Bespoke Custom Made'],
    inStock: true,
    stockCount: 10,
    isCustomizable: true,
    tailoringDays: 7,
    rating: 5.0,
    details: [
      'Super 150s Virgin Wool blended with 15% Mongolian Cashmere',
      'Over 25 hours of artisanal champagne gold metallic cord embroidery',
      'High mandarin collar with concealed front hook-and-eye and hidden buttons',
      'Tailored slim-tapered trousers with side adjusters and deep inner hem allowance',
      'Fully customizable with your 8 anatomical body measurements in our studio'
    ]
  },
  {
    id: 'prod-senator-02',
    name: 'The Viceroy Obsidian Black & Gold Embroidered Senator Suit',
    category: 'Senator Wear',
    price: 720,
    description: 'Opulent longline Nigerian Senator tunic and trousers in deep obsidian black Italian wool-silk. Features elaborate golden heraldic embroidery cascading down the chest placket, sleeve cuffs, and lower hem.',
    imageUrl: '/src/assets/images/senator_black_gold_1791574205461.jpg',
    colors: [
      { name: 'Obsidian Black & Gold', hex: '#111215' },
      { name: 'Midnight Blue & Gold', hex: '#0B153D' },
      { name: 'Deep Wine Burgundy', hex: '#3B101D' },
    ],
    sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)', 'Bespoke Custom Made'],
    inStock: true,
    stockCount: 8,
    isCustomizable: true,
    tailoringDays: 8,
    rating: 4.95,
    details: [
      'Italian Super 140s Wool and Mulberry Silk weave for rich drape',
      'Intricate gold bullion placket embroidery with reinforced interfacing',
      'Side vent slits for effortless movement and pocket access',
      'Double-pocket tailored trousers with comfortable flex waistband',
      'Available ready-to-wear or bespoke cut via Make For Me Studio'
    ]
  },
  {
    id: 'prod-agbada-01',
    name: 'The Grand Monarch Royal Navy Agbada 3-Piece Ensemble',
    category: 'Agbada',
    price: 1250,
    description: 'The pinnacle of West African royal grandeur. A magnificent three-piece Agbada ensemble featuring a voluminous flowing outer robe in heavy Italian velvet damask with dense artisanal champagne gold chest and neck embroidery, matching inner Buba tunic, tailored Sokoto trousers, and hand-embroidered royal Fila cap.',
    imageUrl: '/src/assets/images/agbada_royal_navy_1791574216715.jpg',
    colors: [
      { name: 'Royal Midnight Navy & Gold', hex: '#0D1B50' },
      { name: 'Imperial Emerald & Gold', hex: '#0A2619' },
      { name: 'Ceremonial White & Gold', hex: '#F6F6F2' },
    ],
    sizes: ['M (40-42)', 'L (44-46)', 'XL (48-50)', 'Royal Bespoke Custom'],
    inStock: true,
    stockCount: 6,
    isCustomizable: true,
    tailoringDays: 14,
    rating: 5.0,
    details: [
      'Complete 3-Piece Traditional Attire: Grand Agbada Robe, Buba Tunic, Sokoto Trousers, plus matching embroidered Fila cap',
      'Over 60 hours of master hand-guided champagne gold filigree embroidery',
      'Majestic 12-foot shoulder wing span engineered for sweeping royal drape',
      'Pure breathable Egyptian cotton poplin inner lining for celebration comfort',
      'Full bespoke pattern drafting to exact wingspan, chest, and height'
    ]
  }
];

export const FABRIC_COLLECTIONS: FabricOption[] = [
  {
    id: 'fabric-silk',
    name: 'Pure Mulberry Silk Crepe',
    composition: '100% Grade 6A Mulberry Silk',
    weightGsm: 180,
    momme: 22,
    character: 'Liquid Fluidity & Subdued Sheen',
    drape: 'Ultra-fluid drape that hugs anatomical contours without clinging.',
    priceModifier: 180,
    swatchHex: '#EFE7DA',
    texturePattern: 'silk-crepe',
    bestFor: 'Red carpet galas, evening cocktail wear, and flowing column gowns'
  },
  {
    id: 'fabric-wool',
    name: 'Super 130s Merino Worsted Wool',
    composition: '100% Extra-Fine Australian Merino Wool',
    weightGsm: 285,
    character: 'Architectural Structure & Natural Stretch',
    drape: 'Holds sharp pleats, sharp shoulder lines, and crisp tuxedo lapels.',
    priceModifier: 220,
    swatchHex: '#1B1D22',
    texturePattern: 'worsted-wool',
    bestFor: 'Tailored tuxedo dresses, power silhouettes, and transitional season formalwear'
  },
  {
    id: 'fabric-linen',
    name: 'Artisanal Belgian Master Linen',
    composition: '100% Certified European Flax',
    weightGsm: 230,
    character: 'Breathable, Crisp & Organic Tactility',
    drape: 'Relaxed yet elegant silhouette with natural slub character that softens with wear.',
    priceModifier: 120,
    swatchHex: '#D7CBBA',
    texturePattern: 'belgian-linen',
    bestFor: 'Destination summer weddings, garden soirées, and resort galas'
  },
  {
    id: 'fabric-cotton',
    name: 'Mercerized Italian Cotton Twill',
    composition: '100% Double-Twisted Giza Cotton',
    weightGsm: 240,
    character: 'Supple Hand, Lustrous Finish & Durability',
    drape: 'Clean tailored contours with smooth tactile glide and all-day comfort.',
    priceModifier: 90,
    swatchHex: '#F0ECE1',
    texturePattern: 'cotton-twill',
    bestFor: 'Day-to-evening dresses, tailored shirtdresses, and warm climate black-tie'
  },
  {
    id: 'fabric-velvet',
    name: 'Royal Heritage Silk Velvet',
    composition: '82% Rayon, 18% Mulberry Silk Backing',
    weightGsm: 340,
    character: 'Deep Obsidian Light Absorption & Plush Weight',
    drape: 'Substantial, regal drape with rich color depth that catches ambient candlelight.',
    priceModifier: 250,
    swatchHex: '#0C0E14',
    texturePattern: 'silk-velvet',
    bestFor: 'Winter galas, operatic occasions, and dramatic statement evening gowns'
  }
];

export interface MeasurementGuideInfo {
  key: MeasurementKey;
  label: string;
  shortLabel: string;
  defaultInches: number;
  minInches: number;
  maxInches: number;
  instruction: string;
  tailorTip: string;
  avatarRegion: 'shoulders' | 'bust' | 'arms' | 'waist' | 'hips' | 'length' | 'legs' | 'height';
}

export const MEASUREMENT_GUIDES: MeasurementGuideInfo[] = [
  {
    key: 'shoulderWidth',
    label: 'Shoulder Width',
    shortLabel: 'Shoulders',
    defaultInches: 15.5,
    minInches: 12,
    maxInches: 22,
    instruction: 'Measure across the natural curve of your upper back from the tip of one shoulder bone to the other.',
    tailorTip: 'Keep your posture natural and relaxed. Do not puff your chest or hunch forward.',
    avatarRegion: 'shoulders'
  },
  {
    key: 'bustChest',
    label: 'Bust / Chest Circumference',
    shortLabel: 'Bust/Chest',
    defaultInches: 36.0,
    minInches: 28,
    maxInches: 54,
    instruction: 'Wrap the measuring tape horizontally around the fullest part of your bust/chest, keeping tape level across shoulder blades.',
    tailorTip: 'Breathe normally. Wear the exact style of undergarment you plan to wear under the dress.',
    avatarRegion: 'bust'
  },
  {
    key: 'armLength',
    label: 'Arm / Sleeve Length',
    shortLabel: 'Arm Length',
    defaultInches: 23.5,
    minInches: 18,
    maxInches: 32,
    instruction: 'Measure from the top tip of your shoulder bone, down along the outside of the arm to the wrist bone.',
    tailorTip: 'Bend your elbow slightly (approx 20°) to ensure mobility when the sleeve is tailored.',
    avatarRegion: 'arms'
  },
  {
    key: 'waist',
    label: 'Natural Waist Circumference',
    shortLabel: 'Waist',
    defaultInches: 28.0,
    minInches: 22,
    maxInches: 48,
    instruction: 'Locate your natural waistline (the narrowest point of your torso, typically 1 to 2 inches above your navel). Measure snug but not tight.',
    tailorTip: 'Slip one finger between the tape and your body to allow comfortable breathing room.',
    avatarRegion: 'waist'
  },
  {
    key: 'hips',
    label: 'Hip & Seat Circumference',
    shortLabel: 'Hips',
    defaultInches: 38.5,
    minInches: 30,
    maxInches: 60,
    instruction: 'Stand with your feet together and measure around the fullest prominence of your hips and buttocks.',
    tailorTip: 'Check in a mirror to ensure the tape is completely horizontal all the way around.',
    avatarRegion: 'hips'
  },
  {
    key: 'garmentLength',
    label: 'Desired Dress / Garment Length',
    shortLabel: 'Full Length',
    defaultInches: 56.0,
    minInches: 32,
    maxInches: 68,
    instruction: 'Measure vertically from the highest point of your shoulder (near the collarbone) straight down over the bust apex to your desired hemline.',
    tailorTip: 'Consider the heel height of the shoes you intend to pair with this garment.',
    avatarRegion: 'length'
  },
  {
    key: 'inseam',
    label: 'Inside Leg / Inseam Length',
    shortLabel: 'Inseam',
    defaultInches: 31.0,
    minInches: 24,
    maxInches: 40,
    instruction: 'Measure from the lowest point of your crotch down the inner leg to the bottom of the ankle bone.',
    tailorTip: 'Stand straight against a wall with legs slightly apart for the most precise measurement.',
    avatarRegion: 'legs'
  },
  {
    key: 'totalHeight',
    label: 'Full Standing Height',
    shortLabel: 'Height',
    defaultInches: 67.0,
    minInches: 54,
    maxInches: 84,
    instruction: 'Measure from the crown of your head to the floor without shoes.',
    tailorTip: 'Assists the master patternmaker in calibrating accurate torso-to-skirt proportions.',
    avatarRegion: 'height'
  }
];

export const INITIAL_CUSTOM_ORDERS: CustomBespokeOrder[] = [
  {
    id: 'AM-7721',
    createdAt: '2026-10-07T14:22:00Z',
    clientName: 'Genevieve Laurent',
    clientEmail: 'g.laurent@vogue-paris.com',
    clientPhone: '+33 6 42 18 90 12',
    shippingAddress: '14 Rue du Faubourg Saint-Honoré, 75008 Paris, France',
    notes: 'Please extend hem by 2cm to drape over 105mm stiletto heels for the Monaco gala.',
    productReference: {
      id: 'prod-dress-01',
      name: "L'Obsidienne Couture Silk Gown",
      basePrice: 890,
      imageUrl: '/src/assets/images/hero_atelier_fashion_1791567148622.jpg'
    },
    fabric: {
      id: 'fabric-silk',
      name: 'Pure Mulberry Silk Crepe',
      color: 'Obsidian Black',
      colorHex: '#0F1115',
      priceModifier: 180
    },
    measurements: {
      shoulderWidth: 15.2,
      bustChest: 34.5,
      armLength: 23.0,
      waist: 26.5,
      hips: 37.0,
      garmentLength: 58.0,
      inseam: 31.5,
      totalHeight: 68.0,
      fitPreference: 'Fitted',
      unit: 'in'
    },
    totalPrice: 1070,
    status: 'Pattern Drafting',
    targetFittingDate: '2026-10-22'
  },
  {
    id: 'AM-7719',
    createdAt: '2026-10-06T09:15:00Z',
    clientName: 'Julian Vance-Moreau',
    clientEmail: 'julian.vm@mayfair-consulting.co.uk',
    clientPhone: '+44 20 7946 0918',
    shippingAddress: '42 Berkeley Square, Mayfair, London W1J 5AW, United Kingdom',
    notes: 'Requesting extra ease in the shoulder blades for violin playing performance.',
    productReference: {
      id: 'prod-dress-02',
      name: 'The Sovereign Tailored Tuxedo Dress',
      basePrice: 750,
      imageUrl: '/src/assets/images/dress_wool_tuxedo_1791567171217.jpg'
    },
    fabric: {
      id: 'fabric-wool',
      name: 'Super 130s Merino Worsted Wool',
      color: 'Midnight Noir',
      colorHex: '#121316',
      priceModifier: 220
    },
    measurements: {
      shoulderWidth: 16.5,
      bustChest: 37.0,
      armLength: 24.2,
      waist: 29.0,
      hips: 39.5,
      garmentLength: 42.0,
      inseam: 32.0,
      totalHeight: 69.5,
      fitPreference: 'Tailored Classic',
      unit: 'in'
    },
    totalPrice: 970,
    status: 'Fabric Cutting',
    targetFittingDate: '2026-10-19'
  },
  {
    id: 'AM-7714',
    createdAt: '2026-10-04T18:40:00Z',
    clientName: 'Elena Rostova',
    clientEmail: 'e.rostova@designmilano.it',
    clientPhone: '+39 02 8739 1102',
    shippingAddress: 'Via Montenapoleone 8, 20121 Milano, Italy',
    notes: 'Standard fit for Venice Film Festival premiere.',
    productReference: {
      id: 'prod-dress-03',
      name: 'Draped Column Silk Crepe Gown',
      basePrice: 920,
      imageUrl: '/src/assets/images/dress_silk_crepe_bespoke_1791567160227.jpg'
    },
    fabric: {
      id: 'fabric-velvet',
      name: 'Royal Heritage Silk Velvet',
      color: 'Midnight Obsidian',
      colorHex: '#0C0E14',
      priceModifier: 250
    },
    measurements: {
      shoulderWidth: 14.8,
      bustChest: 35.0,
      armLength: 22.8,
      waist: 27.2,
      hips: 38.0,
      garmentLength: 57.5,
      inseam: 30.5,
      totalHeight: 66.5,
      fitPreference: 'Fitted',
      unit: 'in'
    },
    totalPrice: 1170,
    status: 'Fitting Ready',
    targetFittingDate: '2026-10-15'
  }
];
