import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore, useCartStore, useProductStore, useUIStore } from '@/store';
import { apiClient } from '@/lib/api-client';
import { 
  User, 
  Product, 
  Category, 
  Order, 
  LoginForm, 
  RegisterForm, 
  ProductFilters,
  ApiResponse,
  PaginatedResponse 
} from '@/types';

// Auth Hooks
export const useAuth = () => {
  const { user, isAuthenticated, isLoading, login, logout, setLoading, updateUser } = useAuthStore();
  
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginForm) => {
      const response = await apiClient.post<{ user: User; token: string }>('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.user, data.token);
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterForm) => {
      const response = await apiClient.post<{ user: User; token: string }>('/auth/register', userData);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.user, data.token);
    },
    onError: (error) => {
      console.error('Register error:', error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiClient.post('/auth/logout');
    },
    onSuccess: () => {
      logout();
    },
  });

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || loginMutation.isPending || registerMutation.isPending,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    updateUser,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};

// Product Hooks
export const useProducts = (filters?: ProductFilters) => {
  const { 
    products, 
    categories, 
    selectedCategory, 
    searchQuery, 
    filters: storeFilters,
    setProducts, 
    setCategories, 
    setSelectedCategory, 
    setSearchQuery, 
    setFilters,
    setLoading,
    getFilteredProducts 
  } = useProductStore();

  const queryClient = useQueryClient();

  // Fetch products
  const productsQuery = useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters?.category) params.append('category', filters.category);
        if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
        if (filters?.search) params.append('search', filters.search);
        if (filters?.sortBy) params.append('sortBy', filters.sortBy);
        if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());

        const response = await apiClient.get<PaginatedResponse<Product>>(`/products?${params.toString()}`);
        setProducts(response.data.data);
        return response.data;
      } finally {
        setLoading(false);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch categories
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiClient.get<Category[]>('/categories');
      setCategories(response.data);
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Fetch single product
  const useProduct = (id: string) => {
    return useQuery({
      queryKey: ['product', id],
      queryFn: async () => {
        const response = await apiClient.get<Product>(`/products/${id}`);
        return response.data;
      },
      enabled: !!id,
    });
  };

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: async (productData: Partial<Product>) => {
      const response = await apiClient.post<Product>('/products', productData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Product> }) => {
      const response = await apiClient.put<Product>(`/products/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    products: getFilteredProducts(),
    categories,
    selectedCategory,
    searchQuery,
    filters: storeFilters,
    isLoading: productsQuery.isLoading || categoriesQuery.isLoading,
    error: productsQuery.error || categoriesQuery.error,
    setSelectedCategory,
    setSearchQuery,
    setFilters,
    refetch: productsQuery.refetch,
    createProduct: createProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
    useProduct,
  };
};

// Cart Hooks
export const useCart = () => {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    isLoading,
    addItem, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    getItemQuantity 
  } = useCartStore();

  const addToCart = (product: Product, quantity: number = 1) => {
    addItem(product, quantity);
  };

  const removeFromCart = (productId: string) => {
    removeItem(productId);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const isInCart = (productId: string) => {
    return getItemQuantity(productId) > 0;
  };

  return {
    items,
    totalItems,
    totalPrice,
    isLoading,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };
};

// Order Hooks
export const useOrders = () => {
  const queryClient = useQueryClient();

  // Fetch user orders
  const ordersQuery = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await apiClient.get<Order[]>('/orders');
      return response.data;
    },
  });

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: async (orderData: Partial<Order>) => {
      const response = await apiClient.post<Order>('/orders', orderData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  // Update order status mutation
  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiClient.patch<Order>(`/orders/${id}/status`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  return {
    orders: ordersQuery.data || [],
    isLoading: ordersQuery.isLoading,
    error: ordersQuery.error,
    createOrder: createOrderMutation.mutate,
    updateOrderStatus: updateOrderStatusMutation.mutate,
    refetch: ordersQuery.refetch,
  };
};

// UI Hooks
export const useUI = () => {
  const { 
    sidebarOpen, 
    theme, 
    toasts, 
    setSidebarOpen, 
    setTheme, 
    addToast, 
    removeToast 
  } = useUIStore();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const showToast = (toast: Omit<typeof toasts[0], 'id'>) => {
    addToast(toast);
  };

  return {
    sidebarOpen,
    theme,
    toasts,
    toggleSidebar,
    toggleTheme,
    showToast,
    removeToast,
  };
};

// Utility Hooks
export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};

// Import React hooks
import { useState, useEffect } from 'react';
