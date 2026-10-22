import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialProducts = [
  {
    name: "Everyday Glow Box",
    slug: "everyday-glow-box",
    thumbnail: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&auto=format&fit=crop&q=80",
    category: "Beauty & Skincare",
    frequency: "Monthly",
    price: 34.99,
    subscriptionPrice: 28.99,
    description: "Your go-to box for daily radiance! Features curated essential makeup and gentle skincare items for a fresh, natural, and radiant everyday look.",
    features: JSON.stringify([
      "Lightweight BB Cream / Tinted Hydrator",
      "Organic Natural Mineral Blush",
      "Nourishing Vegan Mascara",
      "Hydrating Berry Lip Oil",
      "Gentle Rosewater Face Mist"
    ]),
    subscriptionBenefits: JSON.stringify([
      "20% recurring discount compared to one-time purchase",
      "Free surprise full-size mystery item every 3 months",
      "Free priority express shipping",
      "Cancel, skip or pause anytime with one click"
    ]),
    rating: 4.8,
    reviewCount: 142,
    stock: 75,
    isFeatured: true
  },
  {
    name: "Glam Night Out Box",
    slug: "glam-night-out-box",
    thumbnail: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1400&auto=format&fit=crop&q=80",
    category: "Beauty & Skincare",
    frequency: "Bi-Monthly",
    price: 54.99,
    subscriptionPrice: 44.99,
    description: "Elevate your evening look with high-impact beauty essentials engineered for dazzling parties, events, and special dinner dates.",
    features: JSON.stringify([
      "Smokey & Shimmer 9-Pan Eyeshadow Palette",
      "Waterproof Precision Liquid Eyeliner",
      "Velvet Matte Bold Red Lipstick",
      "Champagne Glow Liquid Highlighter",
      "Long-wear Makeup Setting Spray"
    ]),
    subscriptionBenefits: JSON.stringify([
      "Early VIP access to limited luxury collections",
      "Complimentary invitation to masterclass webinars",
      "Deluxe bonus perfume miniature included"
    ]),
    rating: 4.9,
    reviewCount: 98,
    stock: 50,
    isFeatured: true
  },
  {
    name: "CyberTech Gadget Crate",
    slug: "cybertech-gadget-crate",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1400&auto=format&fit=crop&q=80",
    category: "Tech & Gadgets",
    frequency: "Monthly",
    price: 69.99,
    subscriptionPrice: 59.99,
    description: "A monthly wonderland for tech enthusiasts and modern desk setups! Packed with innovative gadgets, EDC tech, cables, and productivity tools.",
    features: JSON.stringify([
      "Wireless Fast Qi Charging Pad with RGB Accent",
      "Multi-port GaN 65W Compact Travel Adapter",
      "Braided Magnetic Cable Organizer & Ties",
      "Portable Bluetooth Audio Speaker with Bass Boost",
      "Tech Cleaning Kit with Antistatic Brushes"
    ]),
    subscriptionBenefits: JSON.stringify([
      "Save $10/month + Free Extended 1-Year Device Warranty",
      "Member-only discounts on premium mechanical keyboards",
      "Quarterly secret bonus prototype tech gadget"
    ]),
    rating: 4.9,
    reviewCount: 215,
    stock: 90,
    isFeatured: true
  },
  {
    name: "Artisan Coffee Roasters Vault",
    slug: "artisan-coffee-roasters-vault",
    thumbnail: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1400&auto=format&fit=crop&q=80",
    category: "Gourmet & Beverage",
    frequency: "Monthly",
    price: 39.99,
    subscriptionPrice: 32.99,
    description: "Experience the world's finest freshly roasted single-origin coffees delivered to your kitchen within 48 hours of roasting.",
    features: JSON.stringify([
      "Two 250g Bags of Specialty Single-Origin Beans (Whole or Ground)",
      "Detailed Roaster's Tasting Notes & Origin Cards",
      "Artisan Dark Chocolate Pairing Bar",
      "Barista Recipe Guide for V60, Chemex & French Press"
    ]),
    subscriptionBenefits: JSON.stringify([
      "Freshly roasted guaranteed within 48 hours of dispatch",
      "Exclusive access to micro-lot rare seasonal beans",
      "15% off all brewing equipment and ceramic mugs"
    ]),
    rating: 4.8,
    reviewCount: 160,
    stock: 120,
    isFeatured: true
  },
  {
    name: "Zen Wellness & Mind Spa",
    slug: "zen-wellness-mind-spa",
    thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1400&auto=format&fit=crop&q=80",
    category: "Wellness & Spa",
    frequency: "Monthly",
    price: 45.99,
    subscriptionPrice: 38.50,
    description: "Your sanctuary in a box. Curated with natural self-care, aromatherapy, calming teas, and bath essentials to wash stress away.",
    features: JSON.stringify([
      "Hand-poured Soy Candle with Lavender & Bergamot",
      "Himalayan Pink Salt Bath Soak with Botanicals",
      "Organic Herbal Sleep Tea Infusion",
      "Silk Eye Mask with Contoured Cushioning",
      "Mindfulness Journal with Guided Daily Prompts"
    ]),
    subscriptionBenefits: JSON.stringify([
      "Monthly curated meditation audio sessions",
      "Free gift wrapping for birthdays or celebrations",
      "Subscribers save over $25 vs retail value"
    ]),
    rating: 4.7,
    reviewCount: 110,
    stock: 60,
    isFeatured: false
  },
  {
    name: "Eco-Living Zero Waste Box",
    slug: "eco-living-zero-waste-box",
    thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1400&auto=format&fit=crop&q=80",
    category: "Eco & Lifestyle",
    frequency: "Quarterly",
    price: 49.99,
    subscriptionPrice: 41.99,
    description: "Make sustainability effortless and stylish. High quality, plastic-free alternatives for your kitchen, bathroom, and on-the-go lifestyle.",
    features: JSON.stringify([
      "Organic Beeswax Food Wrap Variety Set (3 pack)",
      "Bamboo Fiber Dish Brushes with Replaceable Heads",
      "Zero-Waste Solid Shampoo & Conditioner Bars",
      "Collapsible Stainless Steel Straw & Case",
      "Re-usable Heavy Cotton Canvas Market Tote"
    ]),
    subscriptionBenefits: JSON.stringify([
      "Tree planted with every recurring box delivered",
      "Zero-carbon carbon-neutral doorstep shipping",
      "Access to eco-living community workshops"
    ]),
    rating: 4.6,
    reviewCount: 84,
    stock: 80,
    isFeatured: false
  }
];

async function main() {
  console.log("Seeding database...");
  
  // Clear old products
  await prisma.review.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.product.deleteMany({});
  
  for (const prod of initialProducts) {
    const created = await prisma.product.create({
      data: prod
    });

    // Add some sample reviews
    await prisma.review.create({
      data: {
        productId: created.id,
        authorName: "Sarah Khan",
        rating: 5,
        comment: `Loved this! The quality surpassed my expectations. The unboxing was truly special.`
      }
    });

    await prisma.review.create({
      data: {
        productId: created.id,
        authorName: "Tanvir Ahmed",
        rating: 5,
        comment: `Great value for money. Subscribing saved me a lot compared to individual store buys.`
      }
    });
  }

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

