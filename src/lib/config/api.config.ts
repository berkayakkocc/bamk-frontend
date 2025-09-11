export const API_CONFIG = {
  // Base URL for API requests
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:44318/api',
  
  // Request timeout in milliseconds
  TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  
  // Retry configuration
  RETRY: {
    attempts: 3,
    delay: 1000, // 1 second
  },
  
  // Endpoints
  ENDPOINTS: {
    // Auth endpoints
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      PROFILE: '/auth/profile',
      CHANGE_PASSWORD: '/auth/change-password',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      VERIFY_EMAIL: '/auth/verify-email',
      RESEND_VERIFICATION: '/auth/resend-verification',
    },
    
    // Product endpoints
    PRODUCTS: {
      LIST: '/products',
      DETAIL: '/products/:id',
      FEATURED: '/products/featured',
      RELATED: '/products/:id/related',
      SEARCH: '/products/search',
    },
    
    // Category endpoints
    CATEGORIES: {
      LIST: '/categories',
      DETAIL: '/categories/:id',
      BY_SLUG: '/categories/slug/:slug',
    },
    
    // Order endpoints
    ORDERS: {
      LIST: '/orders',
      DETAIL: '/orders/:id',
      CREATE: '/orders',
      CANCEL: '/orders/:id/cancel',
      TRACKING: '/orders/tracking/:trackingNumber',
      NOTES: '/orders/:id/notes',
    },
    
    // Cart endpoints
    CART: {
      GET: '/cart',
      ADD_ITEM: '/cart/items',
      UPDATE_ITEM: '/cart/items/:id',
      REMOVE_ITEM: '/cart/items/:id',
      CLEAR: '/cart',
      SYNC: '/cart/sync',
      SUMMARY: '/cart/summary',
      VALIDATE: '/cart/validate',
      DISCOUNT: '/cart/discount',
    },
    
    // User endpoints
    USERS: {
      PROFILE: '/users/profile',
      ADDRESSES: '/users/addresses',
      PREFERENCES: '/users/preferences',
      ACTIVITY: '/users/activity',
      AVATAR: '/users/avatar',
    },
    
    // Admin endpoints
    ADMIN: {
      USERS: '/admin/users',
      PRODUCTS: '/admin/products',
      ORDERS: '/admin/orders',
      STATISTICS: '/admin/statistics',
    },
  },
  
  // HTTP status codes
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
  },
  
  // Error messages
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'İnternet bağlantınızı kontrol edin.',
    TIMEOUT_ERROR: 'İstek zaman aşımına uğradı.',
    UNAUTHORIZED: 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.',
    FORBIDDEN: 'Bu işlem için yetkiniz bulunmuyor.',
    NOT_FOUND: 'Aranan kaynak bulunamadı.',
    VALIDATION_ERROR: 'Girilen bilgiler geçersiz. Lütfen kontrol edin.',
    SERVER_ERROR: 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.',
    UNKNOWN_ERROR: 'Beklenmeyen bir hata oluştu.',
  },
} as const;

// Helper function to build endpoint URLs
export const buildEndpoint = (endpoint: string, params?: Record<string, string | number>): string => {
  let url = endpoint;
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value));
    });
  }
  
  return url;
};

// Helper function to build query string
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  return searchParams.toString();
};
