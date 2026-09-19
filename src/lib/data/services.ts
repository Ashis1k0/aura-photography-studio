import { ServiceItem, TestimonialItem } from "@/types";

export const SERVICES: ServiceItem[] = [
  {
    id: "service-wedding",
    title: "Wedding & Destination Unions",
    category: "wedding",
    tagline: "Unobtrusive documentary sensitivity paired with haute couture editorial elegance.",
    description: "Your wedding is not a photo session; it is a sacred, living chapter in your heritage. We immerse ourselves quietly into your celebration, capturing timeless heirlooms without staging artificial moments.",
    deliverables: [
      "Full-day multi-camera comprehensive coverage",
      "Curated online private proofing & download gallery with permanent archival storage",
      "Handcrafted fine-art linen heirloom album printed on museum-grade cotton rag paper",
      "Color-graded cinematic highlights and comprehensive high-resolution digital master collection",
      "Complimentary pre-wedding or engagement editorial portrait session",
    ],
    process: [
      {
        step: "01",
        title: "Intimate Discovery",
        description: "We meet over coffee or video to understand your love story, family traditions, personal visual taste, and day timeline.",
      },
      {
        step: "02",
        title: "Vision & Creative Direction",
        description: "We craft custom moodboards, study the architectural light of your venue, and coordinate timing with your planner.",
      },
      {
        step: "03",
        title: "The Celebration",
        description: "We document the unscripted tears, joyful laughter, and regal grandeur with discreet professionalism and calm presence.",
      },
      {
        step: "04",
        title: "Fine Art Mastery",
        description: "Every photograph is individually tone-sculpted and color-graded by hand before delivery in your bespoke heirloom suite.",
      },
    ],
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    featuredProjects: ["aarav-priya-udaipur", "kabir-meera-como"],
  },
  {
    id: "service-prewedding",
    title: "Pre-Wedding & Romance in Landscape",
    category: "pre-wedding",
    tagline: "Cinematic portrait narratives set in dramatic natural and architectural vistas.",
    description: "An intentional journey to an evocative landscape—from ancient desert forts to misty mountain lakes—to celebrate your union through cinematic storytelling before the wedding celebration begins.",
    deliverables: [
      "Half-day or full-day destination location shoot",
      "Creative direction, moodboards, and styling advisory",
      "50+ artistically retouched editorial master photographs",
      "High-resolution files ready for large format prints and wedding invitations",
    ],
    process: [
      {
        step: "01",
        title: "Location Scouting",
        description: "Selecting dramatic landscapes or architectural spaces that mirror your energy as a couple.",
      },
      {
        step: "02",
        title: "Light Mapping",
        description: "Orchestrating our shooting schedule around golden hour and twilight to harness natural radiance.",
      },
      {
        step: "03",
        title: "Natural Immersion",
        description: "Gentle guidance focused on emotional connection rather than rigid posing.",
      },
      {
        step: "04",
        title: "Bespoke Delivery",
        description: "Delivering a cohesive cinematic suite within two weeks.",
      },
    ],
    heroImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop",
    featuredProjects: ["samir-tanya-thar"],
  },
  {
    id: "service-portrait",
    title: "Editorial & Character Portraits",
    category: "portrait",
    tagline: "Sculptural lighting designed to honor authenticity, depth, and creative presence.",
    description: "Tailored for artists, creative founders, authors, and individuals seeking portraits that evoke timeless soul rather than generic corporate headshots.",
    deliverables: [
      "2-3 hour dedicated studio or environmental portrait session",
      "Full lighting setup with cinematic modifiers and background options",
      "Wardrobe change guidance and live digital tethering for collaborative review",
      "15 comprehensively retouched master images with commercial usage rights",
    ],
    process: [
      {
        step: "01",
        title: "Character Consultation",
        description: "Uncovering the visual tone that speaks genuinely to who you are and what your legacy represents.",
      },
      {
        step: "02",
        title: "Studio Session",
        description: "Relaxed, collaborative environment with curated music, espresso, and live monitor review.",
      },
      {
        step: "03",
        title: "Meticulous Retouching",
        description: "Respectful frequency separation preserving natural skin textures and organic character lines.",
      },
    ],
    heroImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop",
    featuredProjects: ["chiaroscuro-portrait-series"],
  },
  {
    id: "service-fashion",
    title: "Fashion & Lookbook Campaigns",
    category: "fashion",
    tagline: "Visual narratives for couture houses, jewelry ateliers, and visionary designers.",
    description: "Synthesizing fashion aesthetics with emotional gravity. We translate apparel and accessories into compelling visual campaigns designed for international print and digital prestige.",
    deliverables: [
      "Comprehensive campaign art direction and concept generation",
      "Location scouting, lighting crew coordination, and production management",
      "Full lookbook and hero advertising master assets in print and social crops",
      "Color grading matched specifically to fabric and brand identity specifications",
    ],
    process: [
      {
        step: "01",
        title: "Brand Narrative",
        description: "Deconstructing your collection concept, target demographic, and seasonal story.",
      },
      {
        step: "02",
        title: "Production Shoot",
        description: "High-energy production with precision lighting and dynamic model direction.",
      },
      {
        step: "03",
        title: "Editorial Grade",
        description: "Advanced color grading and textural finishing suited for lookbooks and billboards.",
      },
    ],
    heroImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
    featuredProjects: ["nocturne-haute-couture"],
  },
  {
    id: "service-commercial",
    title: "Commercial & Architecture",
    category: "commercial",
    tagline: "Architectural purity and brand campaigns for design-driven establishments.",
    description: "Showcasing spaces, craftsmanship, and products with mathematical elegance, perspective correction, and dramatic lighting balances.",
    deliverables: [
      "Perspective-controlled architectural and interior photography",
      "Day-to-dusk exterior twilight sessions",
      "Commercial usage licensing for global marketing, editorial press, and architectural publications",
      "Retouching including distraction removal and atmospheric enhancement",
    ],
    process: [
      {
        step: "01",
        title: "Architectural Survey",
        description: "Studying blueprints, sun orientation, and signature architectural angles.",
      },
      {
        step: "02",
        title: "Staging & Capture",
        description: "Precision framing with tilt-shift technology and multi-exposure ambient blending.",
      },
      {
        step: "03",
        title: "Technical Post",
        description: "Flawless perspective rectification and tonal balance.",
      },
    ],
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    featuredProjects: ["zenith-architectural-campaign"],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-01",
    client: "Priya & Aarav Singhania",
    roleOrEvent: "Palace Wedding at Udaipur",
    category: "wedding",
    quote: "When we opened our gallery, we wept with gratitude. You didn't just take pictures—you preserved the atmosphere, the scent of the jasmine, and glances between us that we didn't even realize were witnessed. Your presence was calm, discreet, and deeply reassuring.",
    location: "Rajasthan",
    year: "2026",
  },
  {
    id: "test-02",
    client: "Meera & Kabir Mehta",
    roleOrEvent: "Destination Wedding at Lake Como",
    category: "wedding",
    quote: "Every single photograph feels like a still from a 35mm cinematic film. Our guests couldn't stop praising how invisible the photography team was, yet every profound emotion was preserved with effortless perfection.",
    location: "Lake Como, Italy",
    year: "2026",
  },
  {
    id: "test-03",
    client: "Evelyn Laurent",
    roleOrEvent: "Creative Director, Maison Vesper",
    category: "fashion",
    quote: "Working with this atelier was an extraordinary masterclass in lighting and rhythm. The photographs elevated our autumn collection into an editorial spectacle that was picked up across major European publications.",
    location: "Paris",
    year: "2026",
  },
  {
    id: "test-04",
    client: "Vikramaditya Rao",
    roleOrEvent: "Founding Partner, Rao & Associates Architects",
    category: "commercial",
    quote: "Capturing the interplay of concrete, natural light, and brutalist lines requires an architect's mind and an artist's soul. The commercial suite delivered surpassed all expectations.",
    location: "Tokyo / Mumbai",
    year: "2026",
  },
];
