import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Books', 'Sports', 'Office'];
const brands = ['Northstar', 'Auralis', 'Mira Audio', 'Orchid', 'Nova', 'Atlas', 'Solstice', 'Evergreen', 'Lumen', 'Kairo'];
const adjectives = ['Aurora', 'Nova', 'Lumen', 'Atlas', 'Terra', 'Sage', 'Pulse', 'Crest', 'Halo', 'Echo', 'Vista', 'Vanta'];
const nouns = ['Headset', 'Lamp', 'Notebook', 'Sleeve', 'Bottle', 'Sneaker', 'Watch', 'Chair', 'Desk', 'Bag', 'Speaker', 'Case', 'Tote', 'Sculpture', 'Blender', 'Robe'];
const descriptors = [
  'crafted for daily use',
  'designed for modern living',
  'built for comfort and longevity',
  'engineered for effortless style',
  'made with premium materials',
  'created for a polished workspace',
  'built to elevate your routine',
  'an everyday essential reimagined',
];
const colors = ['#0f1724', '#f59e0b', '#111827', '#0ea5a4', '#f43f5e', '#8b5cf6', '#10b981', '#ffffff'];
const imageSeeds = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
];

const products = Array.from({ length: 100 }, (_, index) => {
  const category = categories[index % categories.length];
  const brand = brands[index % brands.length];
  const adjective = adjectives[index % adjectives.length];
  const noun = nouns[(index + 3) % nouns.length];
  const description = descriptors[index % descriptors.length];
  const primaryImage = imageSeeds[index % imageSeeds.length];
  const secondaryImage = imageSeeds[(index + 7) % imageSeeds.length];
  const price = 999 + ((index * 347) % 25000);
  const rating = Number((3.8 + (index % 12) * 0.1).toFixed(1));

  return {
    id: index + 1,
    name: `${adjective} ${noun}`,
    price,
    rating,
    brand,
    category,
    description: `${description}. A refined choice for everyday living and elevated taste.`,
    image: primaryImage,
    images: [primaryImage, secondaryImage],
    featured: index % 3 !== 0,
    bestSeller: index % 5 === 0 || index % 7 === 0,
    colors: colors.filter((_, colorIndex) => (index + colorIndex) % 3 !== 0).slice(0, 3),
  };
});

const outputPath = path.join(__dirname, '..', 'public', 'mock-data', 'products.json');
fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));
console.log(`Generated ${products.length} products at ${outputPath}`);
