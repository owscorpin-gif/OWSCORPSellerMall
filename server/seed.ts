import { db } from "./db";
import * as schema from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Create admin user
  const adminUser = await db.insert(schema.users).values({
    email: "admin@owscorp.com",
    name: "Admin",
    role: "admin",
  }).returning();
  console.log("Created admin user:", adminUser[0].email);

  // Create categories
  const categories = await db.insert(schema.categories).values([
    { name: "Web Templates", description: "Professional website templates and themes" },
    { name: "Mobile Apps", description: "Ready-to-use mobile application templates" },
    { name: "AI Agents", description: "Intelligent automation and AI solutions" },
    { name: "Desktop Software", description: "Applications for Windows, Mac, and Linux" },
  ]).returning();
  console.log("Created", categories.length, "categories");

  // Create sample seller
  const seller = await db.insert(schema.users).values({
    email: "developer@example.com",
    name: "TechStudio",
    role: "developer",
  }).returning();
  console.log("Created sample seller:", seller[0].email);

  // Create seller profile
  await db.insert(schema.sellerProfiles).values({
    userId: seller[0].id,
    description: "Professional web development studio specializing in modern templates",
    companyName: "TechStudio",
  });

  // Create sample products
  const products = await db.insert(schema.products).values([
    {
      sellerId: seller[0].id,
      categoryId: categories[0].id,
      title: "Modern Dashboard Template",
      description: "A beautiful and responsive admin dashboard template with clean design and modern components",
      price: "49.99",
      features: ["Responsive Design", "Dark Mode", "50+ Components", "Clean Code"],
      rating: "4.5",
      reviewCount: 234,
      salesCount: 156,
    },
    {
      sellerId: seller[0].id,
      categoryId: categories[1].id,
      title: "Mobile E-commerce App",
      description: "Complete e-commerce mobile app template for iOS and Android with cart and payment integration",
      price: "79.99",
      features: ["Cross-platform", "Payment Integration", "User Authentication", "Product Catalog"],
      rating: "5.0",
      reviewCount: 456,
      salesCount: 289,
    },
    {
      sellerId: seller[0].id,
      categoryId: categories[2].id,
      title: "AI Content Generator",
      description: "Powerful AI-powered content generation tool using GPT technology",
      price: "99.99",
      features: ["GPT Integration", "Multiple Templates", "API Access", "Custom Training"],
      rating: "4.8",
      reviewCount: 189,
      salesCount: 145,
    },
  ]).returning();
  console.log("Created", products.length, "sample products");

  // Create default commission setting
  await db.insert(schema.commissionSettings).values({
    rate: "10.00",
    isDefault: true,
  });
  console.log("Created default commission setting");

  console.log("Seed completed successfully!");
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
