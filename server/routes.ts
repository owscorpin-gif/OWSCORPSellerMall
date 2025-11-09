import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertProductSchema, 
  insertCategorySchema, 
  insertCartItemSchema,
  insertOrderSchema,
  insertOrderItemSchema,
  insertReviewSchema,
  insertSellerProfileSchema,
  insertCommissionSettingSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // ============ Auth Routes ============
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // ============ Category Routes ============
  app.get('/api/categories', async (_req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.post('/api/categories', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const data = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(data);
      res.json(category);
    } catch (error: any) {
      console.error("Error creating category:", error);
      res.status(400).json({ message: error.message || "Failed to create category" });
    }
  });

  // ============ Product Routes ============
  app.get('/api/products', async (req, res) => {
    try {
      const { categoryId, sellerId } = req.query;
      
      let products;
      if (categoryId) {
        products = await storage.getProductsByCategoryId(categoryId as string);
      } else if (sellerId) {
        products = await storage.getProductsBySellerId(sellerId as string);
      } else {
        products = await storage.getAllProducts();
      }
      
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post('/api/products', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user || (user.role !== 'developer' && user.role !== 'company' && user.role !== 'admin')) {
        return res.status(403).json({ message: "Seller access required" });
      }

      const data = insertProductSchema.parse({ ...req.body, sellerId: userId });
      const product = await storage.createProduct(data);
      res.json(product);
    } catch (error: any) {
      console.error("Error creating product:", error);
      res.status(400).json({ message: error.message || "Failed to create product" });
    }
  });

  app.patch('/api/products/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      const product = await storage.getProduct(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.sellerId !== userId && user?.role !== 'admin') {
        return res.status(403).json({ message: "Not authorized to edit this product" });
      }

      const data = insertProductSchema.partial().parse(req.body);
      const updated = await storage.updateProduct(req.params.id, data);
      res.json(updated);
    } catch (error: any) {
      console.error("Error updating product:", error);
      res.status(400).json({ message: error.message || "Failed to update product" });
    }
  });

  app.delete('/api/products/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      const product = await storage.getProduct(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.sellerId !== userId && user?.role !== 'admin') {
        return res.status(403).json({ message: "Not authorized to delete this product" });
      }

      await storage.deleteProduct(req.params.id);
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // ============ Cart Routes ============
  app.get('/api/cart', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const items = await storage.getCartItems(userId);
      
      // Populate with product details
      const itemsWithDetails = await Promise.all(
        items.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return { ...item, product };
        })
      );
      
      res.json(itemsWithDetails);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post('/api/cart', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertCartItemSchema.parse({ ...req.body, userId });
      const item = await storage.addToCart(data);
      res.json(item);
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      res.status(400).json({ message: error.message || "Failed to add to cart" });
    }
  });

  app.patch('/api/cart/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { quantity } = req.body;

      // Validate quantity
      if (typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).json({ message: "Quantity must be a positive number" });
      }

      // Verify cart items to ensure ownership
      const cartItems = await storage.getCartItems(userId);
      const cartItem = cartItems.find(item => item.id === req.params.id);

      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found or does not belong to you" });
      }

      const updated = await storage.updateCartItemQuantity(req.params.id, quantity);
      res.json(updated);
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete('/api/cart/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;

      // Verify cart items to ensure ownership
      const cartItems = await storage.getCartItems(userId);
      const cartItem = cartItems.find(item => item.id === req.params.id);

      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found or does not belong to you" });
      }

      await storage.removeFromCart(req.params.id);
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ message: "Failed to remove from cart" });
    }
  });

  app.delete('/api/cart', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.clearCart(userId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // ============ Order/Checkout Routes ============
  app.get('/api/orders', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      let orders;
      if (user?.role === 'developer' || user?.role === 'company') {
        orders = await storage.getOrdersBySellerId(userId);
      } else {
        orders = await storage.getOrdersByUserId(userId);
      }
      
      // Populate with order items
      const ordersWithItems = await Promise.all(
        orders.map(async (order) => {
          const items = await storage.getOrderItems(order.id);
          return { ...order, items };
        })
      );
      
      res.json(ordersWithItems);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.post('/api/orders', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { items } = req.body;
      
      if (!items || items.length === 0) {
        return res.status(400).json({ message: "No items in order" });
      }

      // Calculate total
      let totalAmount = 0;
      for (const item of items) {
        const product = await storage.getProduct(item.productId);
        if (!product) {
          return res.status(404).json({ message: `Product ${item.productId} not found` });
        }
        totalAmount += parseFloat(product.price) * (item.quantity || 1);
      }

      // Create order
      const orderData = insertOrderSchema.parse({
        userId,
        totalAmount: totalAmount.toString(),
        status: 'completed',
      });
      const order = await storage.createOrder(orderData);

      // Create order items
      for (const item of items) {
        const product = await storage.getProduct(item.productId);
        if (product) {
          await storage.createOrderItem({
            orderId: order.id,
            productId: item.productId,
            sellerId: product.sellerId,
            price: product.price,
            quantity: item.quantity || 1,
          });
        }
      }

      // Clear cart
      await storage.clearCart(userId);

      res.json(order);
    } catch (error: any) {
      console.error("Error creating order:", error);
      res.status(400).json({ message: error.message || "Failed to create order" });
    }
  });

  app.get('/api/orders/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const order = await storage.getOrder(req.params.id);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (order.userId !== userId) {
        const user = await storage.getUser(userId);
        if (user?.role !== 'admin') {
          return res.status(403).json({ message: "Not authorized to view this order" });
        }
      }

      const items = await storage.getOrderItems(order.id);
      res.json({ ...order, items });
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  // ============ Review Routes ============
  app.get('/api/products/:id/reviews', async (req, res) => {
    try {
      const reviews = await storage.getReviewsByProductId(req.params.id);
      
      // Populate with user details
      const reviewsWithUsers = await Promise.all(
        reviews.map(async (review) => {
          const user = await storage.getUser(review.userId);
          return { ...review, user };
        })
      );
      
      res.json(reviewsWithUsers);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post('/api/reviews', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      const { productId, rating, comment } = req.body;
      const product = await storage.getProduct(productId);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const data = insertReviewSchema.parse({
        userId,
        productId,
        sellerId: product.sellerId,
        rating,
        comment,
      });
      
      const review = await storage.createReview(data);
      res.json(review);
    } catch (error: any) {
      console.error("Error creating review:", error);
      res.status(400).json({ message: error.message || "Failed to create review" });
    }
  });

  // ============ Analytics Routes ============
  app.get('/api/analytics/seller', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user || (user.role !== 'developer' && user.role !== 'company')) {
        return res.status(403).json({ message: "Seller access required" });
      }

      const products = await storage.getProductsBySellerId(userId);
      const orders = await storage.getOrdersBySellerId(userId);
      const reviews = await storage.getReviewsBySellerId(userId);

      // Calculate stats
      const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0);
      const totalSales = products.reduce((sum, product) => sum + (product.salesCount || 0), 0);
      const avgRating = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 0;

      res.json({
        totalRevenue,
        totalSales,
        productCount: products.length,
        activeProducts: products.filter(p => p.isActive).length,
        avgRating,
        reviewCount: reviews.length,
      });
    } catch (error) {
      console.error("Error fetching seller analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  app.get('/api/analytics/admin', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const users = await storage.getAllUsers();
      const products = await storage.getAllProducts();
      const categories = await storage.getAllCategories();

      res.json({
        totalUsers: users.length,
        totalProducts: products.length,
        totalCategories: categories.length,
        usersByRole: {
          users: users.filter(u => u.role === 'user').length,
          developers: users.filter(u => u.role === 'developer').length,
          companies: users.filter(u => u.role === 'company').length,
          admins: users.filter(u => u.role === 'admin').length,
        },
      });
    } catch (error) {
      console.error("Error fetching admin analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // ============ User Management Routes (Admin) ============
  app.get('/api/users', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.patch('/api/users/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const updated = await storage.updateUser(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  app.delete('/api/users/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      await storage.deleteUser(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  // ============ Profile Routes ============
  app.get('/api/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.patch('/api/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const updated = await storage.updateUser(userId, req.body);
      res.json(updated);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // ============ Seller Profile Routes ============
  app.get('/api/seller-profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.getSellerProfile(userId);
      res.json(profile);
    } catch (error) {
      console.error("Error fetching seller profile:", error);
      res.status(500).json({ message: "Failed to fetch seller profile" });
    }
  });

  app.post('/api/seller-profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertSellerProfileSchema.parse({ ...req.body, userId });
      const profile = await storage.createSellerProfile(data);
      res.json(profile);
    } catch (error: any) {
      console.error("Error creating seller profile:", error);
      res.status(400).json({ message: error.message || "Failed to create seller profile" });
    }
  });

  app.patch('/api/seller-profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const updated = await storage.updateSellerProfile(userId, req.body);
      res.json(updated);
    } catch (error) {
      console.error("Error updating seller profile:", error);
      res.status(500).json({ message: "Failed to update seller profile" });
    }
  });

  // ============ Commission Settings (Admin) ============
  app.get('/api/commission', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const settings = await storage.getCommissionSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching commission settings:", error);
      res.status(500).json({ message: "Failed to fetch commission settings" });
    }
  });

  app.post('/api/commission', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const data = insertCommissionSettingSchema.parse(req.body);
      const setting = await storage.createCommissionSetting(data);
      res.json(setting);
    } catch (error: any) {
      console.error("Error creating commission setting:", error);
      res.status(400).json({ message: error.message || "Failed to create commission setting" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
