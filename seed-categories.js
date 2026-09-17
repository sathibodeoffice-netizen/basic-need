const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/basic-need';

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    banglaName: { type: String },
    slug: { type: String, required: true, unique: true },
    image: { type: String },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const categories = [
  { name: 'Grocery', slug: 'grocery' },
  { name: 'Fresh Food', slug: 'fresh-food' },
  { name: 'Personal Care', slug: 'personal-care' },
  { name: 'Home & Cleaning', slug: 'home-cleaning' },
  { name: 'Baby Care', slug: 'baby-care' },
  { name: 'Emergency', slug: 'emergency' }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    for (const cat of categories) {
      const exists = await Category.findOne({ slug: cat.slug });
      if (!exists) {
        await Category.create(cat);
        console.log(`Created category: ${cat.name}`);
      } else {
        console.log(`Category already exists: ${cat.name}`);
      }
    }
    
    console.log('Seeding finished.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

seed();
