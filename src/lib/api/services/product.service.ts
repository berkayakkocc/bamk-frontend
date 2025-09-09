import { apiClient } from '../../api-client';
import { Product, Category, ProductFilters, PaginatedResponse, ApiResponse } from '@/types';

export class ProductService {
  // Get all products with filters
  static async getProducts(filters?: ProductFilters): Promise<ApiResponse<PaginatedResponse<Product>>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const url = queryString ? `/products?${queryString}` : '/products';
    
    return apiClient.get<PaginatedResponse<Product>>(url);
  }

  // Get single product by ID
  static async getProduct(id: string): Promise<ApiResponse<Product>> {
    return apiClient.get<Product>(`/products/${id}`);
  }

  // Get products by category
  static async getProductsByCategory(
    categoryId: string, 
    filters?: Omit<ProductFilters, 'category'>
  ): Promise<ApiResponse<PaginatedResponse<Product>>> {
    const params = new URLSearchParams();
    params.append('category', categoryId);
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    return apiClient.get<PaginatedResponse<Product>>(`/products?${queryString}`);
  }

  // Search products
  static async searchProducts(
    query: string, 
    filters?: Omit<ProductFilters, 'search'>
  ): Promise<ApiResponse<PaginatedResponse<Product>>> {
    const params = new URLSearchParams();
    params.append('search', query);
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    return apiClient.get<PaginatedResponse<Product>>(`/products?${queryString}`);
  }

  // Get featured products
  static async getFeaturedProducts(limit?: number): Promise<ApiResponse<Product[]>> {
    const params = new URLSearchParams();
    if (limit) {
      params.append('limit', limit.toString());
    }
    
    const queryString = params.toString();
    const url = queryString ? `/products/featured?${queryString}` : '/products/featured';
    
    return apiClient.get<Product[]>(url);
  }

  // Get related products
  static async getRelatedProducts(productId: string, limit?: number): Promise<ApiResponse<Product[]>> {
    const params = new URLSearchParams();
    if (limit) {
      params.append('limit', limit.toString());
    }
    
    const queryString = params.toString();
    const url = queryString ? `/products/${productId}/related?${queryString}` : `/products/${productId}/related`;
    
    return apiClient.get<Product[]>(url);
  }

  // Get all categories
  static async getCategories(): Promise<ApiResponse<Category[]>> {
    return apiClient.get<Category[]>('/categories');
  }

  // Get single category
  static async getCategory(id: string): Promise<ApiResponse<Category>> {
    return apiClient.get<Category>(`/categories/${id}`);
  }

  // Get category by slug
  static async getCategoryBySlug(slug: string): Promise<ApiResponse<Category>> {
    return apiClient.get<Category>(`/categories/slug/${slug}`);
  }

  // Admin: Create product
  static async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Product>> {
    return apiClient.post<Product>('/admin/products', productData);
  }

  // Admin: Update product
  static async updateProduct(id: string, productData: Partial<Product>): Promise<ApiResponse<Product>> {
    return apiClient.put<Product>(`/admin/products/${id}`, productData);
  }

  // Admin: Delete product
  static async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/admin/products/${id}`);
  }

  // Admin: Upload product image
  static async uploadProductImage(
    productId: string, 
    file: File, 
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ imageUrl: string }>> {
    return apiClient.uploadFile<{ imageUrl: string }>(`/admin/products/${productId}/images`, file, onProgress);
  }

  // Admin: Delete product image
  static async deleteProductImage(productId: string, imageUrl: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/admin/products/${productId}/images`, {
      data: { imageUrl }
    });
  }
}
