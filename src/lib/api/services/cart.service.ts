import { apiClient } from '../../api-client';
import { CartItem, Product, ApiResponse } from '@/types';

export interface CartItemData {
  productId: string;
  quantity: number;
}

export class CartService {
  // Get user cart
  static async getCart(): Promise<ApiResponse<CartItem[]>> {
    return apiClient.get<CartItem[]>('/cart');
  }

  // Add item to cart
  static async addToCart(itemData: CartItemData): Promise<ApiResponse<CartItem>> {
    return apiClient.post<CartItem>('/cart/items', itemData);
  }

  // Update cart item quantity
  static async updateCartItem(itemId: string, quantity: number): Promise<ApiResponse<CartItem>> {
    return apiClient.put<CartItem>(`/cart/items/${itemId}`, { quantity });
  }

  // Remove item from cart
  static async removeFromCart(itemId: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/cart/items/${itemId}`);
  }

  // Clear cart
  static async clearCart(): Promise<ApiResponse<void>> {
    return apiClient.delete<void>('/cart');
  }

  // Sync local cart with server
  static async syncCart(localItems: CartItem[]): Promise<ApiResponse<CartItem[]>> {
    return apiClient.post<CartItem[]>('/cart/sync', { items: localItems });
  }

  // Get cart summary
  static async getCartSummary(): Promise<ApiResponse<{
    totalItems: number;
    totalPrice: number;
    items: CartItem[];
  }>> {
    return apiClient.get<{
      totalItems: number;
      totalPrice: number;
      items: CartItem[];
    }>('/cart/summary');
  }

  // Validate cart items (check stock, prices, etc.)
  static async validateCart(): Promise<ApiResponse<{
    isValid: boolean;
    errors: Array<{
      itemId: string;
      message: string;
    }>;
  }>> {
    return apiClient.post<{
      isValid: boolean;
      errors: Array<{
        itemId: string;
        message: string;
      }>;
    }>('/cart/validate');
  }

  // Apply discount code
  static async applyDiscountCode(code: string): Promise<ApiResponse<{
    discount: number;
    message: string;
  }>> {
    return apiClient.post<{
      discount: number;
      message: string;
    }>('/cart/discount', { code });
  }

  // Remove discount code
  static async removeDiscountCode(): Promise<ApiResponse<void>> {
    return apiClient.delete<void>('/cart/discount');
  }
}
