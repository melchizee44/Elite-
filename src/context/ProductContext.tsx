import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { DEMO_PRODUCTS } from '../data';
import { db, auth } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  onSnapshot,
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  User 
} from 'firebase/auth';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface ProductContextType {
  products: Product[];
  categories: string[];
  isLoading: boolean;
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  addCategory: (category: string) => Promise<void>;
  deleteCategory: (category: string) => Promise<void>;
  refreshData: () => Promise<void>;
  syncToFirebase: () => Promise<{ success: boolean; count: number }>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  // Real-time synchronization for products
  useEffect(() => {
    const productsPath = 'products';
    const q = query(collection(db, productsPath), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mappedProducts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        } as Product;
      });

      if (mappedProducts.length > 0) {
        setProducts(mappedProducts);
      } else {
        const saved = localStorage.getItem('elite_products');
        setProducts(saved ? JSON.parse(saved) : DEMO_PRODUCTS);
      }
      setIsLoading(false);
    }, (error) => {
      console.error('Firestore onSnapshot error (products):', error);
      const saved = localStorage.getItem('elite_products');
      setProducts(saved ? JSON.parse(saved) : DEMO_PRODUCTS);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Real-time synchronization for categories
  useEffect(() => {
    const categoriesPath = 'categories';
    const unsubscribe = onSnapshot(collection(db, categoriesPath), (snapshot) => {
      const mappedCategories = snapshot.docs.map(doc => doc.data().name);
      
      if (mappedCategories.length > 0) {
        setCategories(mappedCategories);
      } else {
        const saved = localStorage.getItem('elite_categories');
        setCategories(saved ? JSON.parse(saved) : ['Shoes', 'Bags', 'Clothes', 'Canvas', 'School Children', 'Sport Shoes', 'Phones', 'Laptops']);
      }
    }, (error) => {
      console.error('Firestore onSnapshot error (categories):', error);
      const saved = localStorage.getItem('elite_categories');
      setCategories(saved ? JSON.parse(saved) : ['Shoes', 'Bags', 'Clothes', 'Canvas', 'School Children', 'Sport Shoes']);
    });

    return () => unsubscribe();
  }, []);

  // Backup to local storage
  useEffect(() => {
    if (products.length > 0) localStorage.setItem('elite_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (categories.length > 0) localStorage.setItem('elite_categories', JSON.stringify(categories));
  }, [categories]);

  const refreshData = async () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const productsPath = 'products';
    try {
      // Clean undefined fields for Firestore
      const cleanedData = Object.entries(productData).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key as keyof typeof acc] = value;
        }
        return acc;
      }, {} as any);

      const newProduct = {
        ...cleanedData,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await addDoc(collection(db, productsPath), newProduct);
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, productsPath);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const productPath = `products/${id}`;
    try {
      // Clean undefined fields for Firestore
      const cleanedUpdates = Object.entries(updates).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key as keyof typeof acc] = value;
        }
        return acc;
      }, {} as any);

      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, {
        ...cleanedUpdates,
        updatedAt: Date.now()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, productPath);
    }
  };

  const deleteProduct = async (id: string) => {
    const productPath = `products/${id}`;
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, productPath);
    }
  };

  const getProductById = React.useCallback((id: string) => {
    return products.find(p => p.id === id);
  }, [products]);

  const addCategory = async (category: string) => {
    const categoriesPath = 'categories';
    try {
      if (category && !categories.includes(category)) {
        await addDoc(collection(db, categoriesPath), { name: category });
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, categoriesPath);
    }
  };

  const deleteCategory = async (category: string) => {
    const categoriesPath = 'categories';
    try {
      const q = query(collection(db, categoriesPath));
      const snapshot = await getDocs(q);
      const categoryDoc = snapshot.docs.find(doc => doc.data().name === category);
      
      if (categoryDoc) {
        await deleteDoc(doc(db, categoriesPath, categoryDoc.id));
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, categoriesPath);
    }
  };

  const syncToFirebase = async () => {
    if (!user) {
      throw new Error('You must be signed in to sync data to the cloud.');
    }

    let count = 0;
    try {
      const batch = writeBatch(db);
      
      // Get existing categories and products to avoid duplicates
      const [catSnap, prodSnap] = await Promise.all([
        getDocs(collection(db, 'categories')),
        getDocs(collection(db, 'products'))
      ]);
      
      const existingCatNames = new Set(catSnap.docs.map(d => d.data().name));
      const existingSkus = new Set(prodSnap.docs.map(d => d.data().sku));
      const existingNames = new Set(prodSnap.docs.map(d => d.data().name));

      // 1. Sync Categories
      const allCategories = Array.from(new Set([...categories, 'Shoes', 'Bags', 'Clothes', 'Canvas', 'School Children', 'Sport Shoes', 'Phones', 'Laptops']));
      for (const cat of allCategories) {
        if (!existingCatNames.has(cat)) {
          const newDocRef = doc(collection(db, 'categories'));
          batch.set(newDocRef, { name: cat });
        }
      }

      // 2. Sync Products
      const allProducts = [...products, ...DEMO_PRODUCTS];
      for (const prod of allProducts) {
        if (!existingSkus.has(prod.sku) && !existingNames.has(prod.name)) {
          const { id, ...prodData } = prod; // Remove local ID
          const newDocRef = doc(collection(db, 'products'));
          batch.set(newDocRef, prodData);
          count++;
          // Prevent duplicate entries in the same batch
          existingSkus.add(prod.sku);
          existingNames.add(prod.name);
        }
      }
      
      await batch.commit();
      return { success: true, count };
    } catch (e) {
      console.error('Sync failed:', e);
      return { success: false, count: 0 };
    }
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      categories, 
      isLoading,
      user,
      login,
      logout,
      addProduct, 
      updateProduct, 
      deleteProduct, 
      getProductById,
      addCategory,
      deleteCategory,
      refreshData,
      syncToFirebase
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
}
