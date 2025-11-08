import { db } from "./db";
import { eq, and, desc, sql, inArray } from "drizzle-orm";
import * as schema from "@shared/schema";
import type {
  User,
  InsertUser,
  SellerProfile,
  InsertSellerProfile,
  Category,
  InsertCategory,
  Product,
  InsertProduct,
  Order,
  InsertOrder,
  OrderItem,
  InsertOrderItem,
  Review,
  InsertReview,
  CartItem,
  InsertCartItem,
  CommissionSetting,
  InsertCommissionSetting,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  deleteUser(id: string): Promise<void>;

  // Seller Profiles
  getSellerProfile(userId: string): Promise<SellerProfile | undefined>;
  createSellerProfile(profile: InsertSellerProfile): Promise<SellerProfile>;
  updateSellerProfile(userId: string, profile: Partial<InsertSellerProfile>): Promise<SellerProfile | undefined>;

  // Categories
  getAllCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: string): Promise<void>;

  // Products
  getAllProducts(): Promise<Product[]>;
  getProductsByCategoryId(categoryId: string): Promise<Product[]>;
  getProductsBySellerId(sellerId: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<void>;

  // Orders
  getOrdersByUserId(userId: string): Promise<Order[]>;
  getOrdersBySellerId(sellerId: string): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderItems(orderId: string): Promise<OrderItem[]>;
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;

  // Reviews
  getReviewsByProductId(productId: string): Promise<Review[]>;
  getReviewsBySellerId(sellerId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Cart
  getCartItems(userId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<void>;
  clearCart(userId: string): Promise<void>;

  // Commission
  getCommissionSettings(): Promise<CommissionSetting[]>;
  getCommissionByCategory(categoryId: string): Promise<CommissionSetting | undefined>;
  createCommissionSetting(setting: InsertCommissionSetting): Promise<CommissionSetting>;
  updateCommissionSetting(id: string, setting: Partial<InsertCommissionSetting>): Promise<CommissionSetting | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(schema.users).where(eq(schema.users.email, email));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(schema.users).values(user).returning();
    return result[0];
  }

  async updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db.update(schema.users).set(user).where(eq(schema.users.id, id)).returning();
    return result[0];
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(schema.users);
  }

  async deleteUser(id: string): Promise<void> {
    await db.delete(schema.users).where(eq(schema.users.id, id));
  }

  // Seller Profiles
  async getSellerProfile(userId: string): Promise<SellerProfile | undefined> {
    const result = await db.select().from(schema.sellerProfiles).where(eq(schema.sellerProfiles.userId, userId));
    return result[0];
  }

  async createSellerProfile(profile: InsertSellerProfile): Promise<SellerProfile> {
    const result = await db.insert(schema.sellerProfiles).values(profile).returning();
    return result[0];
  }

  async updateSellerProfile(userId: string, profile: Partial<InsertSellerProfile>): Promise<SellerProfile | undefined> {
    const result = await db.update(schema.sellerProfiles).set(profile).where(eq(schema.sellerProfiles.userId, userId)).returning();
    return result[0];
  }

  // Categories
  async getAllCategories(): Promise<Category[]> {
    return await db.select().from(schema.categories);
  }

  async getCategory(id: string): Promise<Category | undefined> {
    const result = await db.select().from(schema.categories).where(eq(schema.categories.id, id));
    return result[0];
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const result = await db.insert(schema.categories).values(category).returning();
    return result[0];
  }

  async updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined> {
    const result = await db.update(schema.categories).set(category).where(eq(schema.categories.id, id)).returning();
    return result[0];
  }

  async deleteCategory(id: string): Promise<void> {
    await db.delete(schema.categories).where(eq(schema.categories.id, id));
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(schema.products).where(eq(schema.products.isActive, true)).orderBy(desc(schema.products.createdAt));
  }

  async getProductsByCategoryId(categoryId: string): Promise<Product[]> {
    return await db.select().from(schema.products)
      .where(and(eq(schema.products.categoryId, categoryId), eq(schema.products.isActive, true)))
      .orderBy(desc(schema.products.createdAt));
  }

  async getProductsBySellerId(sellerId: string): Promise<Product[]> {
    return await db.select().from(schema.products)
      .where(eq(schema.products.sellerId, sellerId))
      .orderBy(desc(schema.products.createdAt));
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(schema.products).where(eq(schema.products.id, id));
    return result[0];
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const productData = {
      ...product,
      price: typeof product.price === 'number' ? product.price.toString() : product.price,
    };
    const result = await db.insert(schema.products).values(productData).returning();
    return result[0];
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const updates: any = { ...product, updatedAt: new Date() };
    if (updates.price !== undefined) {
      updates.price = typeof updates.price === 'number' ? updates.price.toString() : updates.price;
    }
    const result = await db.update(schema.products).set(updates).where(eq(schema.products.id, id)).returning();
    return result[0];
  }

  async deleteProduct(id: string): Promise<void> {
    await db.delete(schema.products).where(eq(schema.products.id, id));
  }

  // Orders
  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return await db.select().from(schema.orders).where(eq(schema.orders.userId, userId)).orderBy(desc(schema.orders.createdAt));
  }

  async getOrdersBySellerId(sellerId: string): Promise<Order[]> {
    const orderItems = await db.select().from(schema.orderItems).where(eq(schema.orderItems.sellerId, sellerId));
    const orderIds = Array.from(new Set(orderItems.map(item => item.orderId)));
    if (orderIds.length === 0) return [];
    return await db.select().from(schema.orders).where(inArray(schema.orders.id, orderIds)).orderBy(desc(schema.orders.createdAt));
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const result = await db.select().from(schema.orders).where(eq(schema.orders.id, id));
    return result[0];
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const orderData = {
      ...order,
      totalAmount: typeof order.totalAmount === 'number' ? order.totalAmount.toString() : order.totalAmount,
    };
    const result = await db.insert(schema.orders).values(orderData).returning();
    return result[0];
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return await db.select().from(schema.orderItems).where(eq(schema.orderItems.orderId, orderId));
  }

  async createOrderItem(item: InsertOrderItem): Promise<OrderItem> {
    const itemData = {
      ...item,
      price: typeof item.price === 'number' ? item.price.toString() : item.price,
      quantity: item.quantity ?? 1,
    };
    const result = await db.insert(schema.orderItems).values(itemData).returning();
    
    // Update product sales count
    await db.update(schema.products)
      .set({ salesCount: sql`${schema.products.salesCount} + ${itemData.quantity}` })
      .where(eq(schema.products.id, item.productId));
    
    return result[0];
  }

  // Reviews
  async getReviewsByProductId(productId: string): Promise<Review[]> {
    return await db.select().from(schema.reviews).where(eq(schema.reviews.productId, productId)).orderBy(desc(schema.reviews.createdAt));
  }

  async getReviewsBySellerId(sellerId: string): Promise<Review[]> {
    return await db.select().from(schema.reviews).where(eq(schema.reviews.sellerId, sellerId)).orderBy(desc(schema.reviews.createdAt));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const result = await db.insert(schema.reviews).values(review).returning();
    
    // Update product rating and review count
    const reviews = await this.getReviewsByProductId(review.productId);
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await db.update(schema.products)
      .set({ 
        rating: avgRating.toFixed(2),
        reviewCount: reviews.length 
      })
      .where(eq(schema.products.id, review.productId));
    
    return result[0];
  }

  // Cart
  async getCartItems(userId: string): Promise<CartItem[]> {
    return await db.select().from(schema.cartItems).where(eq(schema.cartItems.userId, userId));
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existing = await db.select().from(schema.cartItems)
      .where(and(eq(schema.cartItems.userId, item.userId), eq(schema.cartItems.productId, item.productId)));
    
    if (existing.length > 0) {
      // Update quantity
      const newQuantity = existing[0].quantity + (item.quantity ?? 1);
      const result = await db.update(schema.cartItems)
        .set({ quantity: newQuantity })
        .where(eq(schema.cartItems.id, existing[0].id))
        .returning();
      return result[0];
    }
    
    const result = await db.insert(schema.cartItems).values(item).returning();
    return result[0];
  }

  async updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined> {
    const result = await db.update(schema.cartItems).set({ quantity }).where(eq(schema.cartItems.id, id)).returning();
    return result[0];
  }

  async removeFromCart(id: string): Promise<void> {
    await db.delete(schema.cartItems).where(eq(schema.cartItems.id, id));
  }

  async clearCart(userId: string): Promise<void> {
    await db.delete(schema.cartItems).where(eq(schema.cartItems.userId, userId));
  }

  // Commission
  async getCommissionSettings(): Promise<CommissionSetting[]> {
    return await db.select().from(schema.commissionSettings);
  }

  async getCommissionByCategory(categoryId: string): Promise<CommissionSetting | undefined> {
    const result = await db.select().from(schema.commissionSettings).where(eq(schema.commissionSettings.categoryId, categoryId));
    if (result.length > 0) return result[0];
    
    // Return default commission if no category-specific found
    const defaultResult = await db.select().from(schema.commissionSettings).where(eq(schema.commissionSettings.isDefault, true));
    return defaultResult[0];
  }

  async createCommissionSetting(setting: InsertCommissionSetting): Promise<CommissionSetting> {
    const settingData = {
      ...setting,
      rate: typeof setting.rate === 'number' ? setting.rate.toString() : setting.rate,
    };
    const result = await db.insert(schema.commissionSettings).values(settingData).returning();
    return result[0];
  }

  async updateCommissionSetting(id: string, setting: Partial<InsertCommissionSetting>): Promise<CommissionSetting | undefined> {
    const updates: any = { ...setting };
    if (updates.rate !== undefined) {
      updates.rate = typeof updates.rate === 'number' ? updates.rate.toString() : updates.rate;
    }
    const result = await db.update(schema.commissionSettings).set(updates).where(eq(schema.commissionSettings.id, id)).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
