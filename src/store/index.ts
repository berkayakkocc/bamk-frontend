import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, AuthState, CartItem, CartState, Product, Category } from '@/types';

// Auth Store
interface AuthStore extends AuthState {
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: (user: User, token: string) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', token);
        }
        set({ user, isAuthenticated: true, isLoading: false });
      },
      
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
        }
        set({ user: null, isAuthenticated: false, isLoading: false });
      },
      
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
      
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

// Cart Store
interface CartStore extends CartState {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      isLoading: false,
      
      addItem: (product: Product, quantity: number = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.product.id === product.id);
        
        if (existingItem) {
          get().updateQuantity(product.id, existingItem.quantity + quantity);
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${Date.now()}`,
            product,
            quantity,
            addedAt: new Date().toISOString(),
          };
          
          const newItems = [...items, newItem];
          set({
            items: newItems,
            totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
          });
        }
      },
      
      removeItem: (productId: string) => {
        const { items } = get();
        const newItems = items.filter(item => item.product.id !== productId);
        set({
          items: newItems,
          totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
        });
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        const { items } = get();
        const newItems = items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        );
        
        set({
          items: newItems,
          totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
        });
      },
      
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },
      
      getItemQuantity: (productId: string) => {
        const { items } = get();
        const item = items.find(item => item.product.id === productId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Product Store
interface ProductStore {
  products: Product[];
  categories: Category[];
  selectedCategory: string | null;
  searchQuery: string;
  filters: {
    minPrice: number | null;
    maxPrice: number | null;
    sortBy: 'name' | 'price' | 'createdAt';
    sortOrder: 'asc' | 'desc';
  };
  isLoading: boolean;
  setProducts: (products: Product[]) => void;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<ProductStore['filters']>) => void;
  setLoading: (loading: boolean) => void;
  getFilteredProducts: () => Product[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  filters: {
    minPrice: null,
    maxPrice: null,
    sortBy: 'name',
    sortOrder: 'asc',
  },
  isLoading: false,
  
  setProducts: (products: Product[]) => {
    set({ products });
  },
  
  setCategories: (categories: Category[]) => {
    set({ categories });
  },
  
  setSelectedCategory: (categoryId: string | null) => {
    set({ selectedCategory: categoryId });
  },
  
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },
  
  setFilters: (newFilters: Partial<ProductStore['filters']>) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters }
    }));
  },
  
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
  
  getFilteredProducts: () => {
    const { products, selectedCategory, searchQuery, filters } = get();
    
    let filtered = products.filter(product => {
      // Category filter
      if (selectedCategory && product.category.id !== selectedCategory) {
        return false;
      }
      
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDescription = product.description.toLowerCase().includes(query);
        const matchesTags = product.tags.some(tag => tag.toLowerCase().includes(query));
        
        if (!matchesName && !matchesDescription && !matchesTags) {
          return false;
        }
      }
      
      // Price filters
      if (filters.minPrice !== null && product.price < filters.minPrice) {
        return false;
      }
      
      if (filters.maxPrice !== null && product.price > filters.maxPrice) {
        return false;
      }
      
      return true;
    });
    
    // Sort products
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }
      
      if (filters.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
    
    return filtered;
  },
}));

// UI Store
interface UIStore {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  toasts: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    description?: string;
  }>;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addToast: (toast: Omit<UIStore['toasts'][0], 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      sidebarOpen: false,
      theme: 'light',
      toasts: [],
      
      setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open });
      },
      
      setTheme: (theme: 'light' | 'dark') => {
        set({ theme });
        if (typeof window !== 'undefined') {
          document.documentElement.classList.toggle('dark', theme === 'dark');
        }
      },
      
      addToast: (toast) => {
        const id = Math.random().toString(36).substr(2, 9);
        set(state => ({
          toasts: [...state.toasts, { ...toast, id }]
        }));
        
        // Auto remove toast after 5 seconds
        setTimeout(() => {
          get().removeToast(id);
        }, 5000);
      },
      
      removeToast: (id: string) => {
        set(state => ({
          toasts: state.toasts.filter(toast => toast.id !== id)
        }));
      },
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
