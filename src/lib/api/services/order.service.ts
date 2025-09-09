import { apiClient } from '../../api-client';
import { Order, OrderItem, Address, PaginatedResponse, ApiResponse } from '@/types';

export interface CreateOrderData {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddress: Omit<Address, 'id'>;
  billingAddress: Omit<Address, 'id'>;
  paymentMethod: string;
  notes?: string;
}

export interface UpdateOrderStatusData {
  status: string;
  trackingNumber?: string;
  notes?: string;
}

export class OrderService {
  // Get user orders
  static async getUserOrders(filters?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<ApiResponse<PaginatedResponse<Order>>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const url = queryString ? `/orders?${queryString}` : '/orders';
    
    return apiClient.get<PaginatedResponse<Order>>(url);
  }

  // Get single order
  static async getOrder(id: string): Promise<ApiResponse<Order>> {
    return apiClient.get<Order>(`/orders/${id}`);
  }

  // Create new order
  static async createOrder(orderData: CreateOrderData): Promise<ApiResponse<Order>> {
    return apiClient.post<Order>('/orders', orderData);
  }

  // Cancel order
  static async cancelOrder(id: string, reason?: string): Promise<ApiResponse<Order>> {
    return apiClient.post<Order>(`/orders/${id}/cancel`, { reason });
  }

  // Update order status (admin only)
  static async updateOrderStatus(
    id: string, 
    statusData: UpdateOrderStatusData
  ): Promise<ApiResponse<Order>> {
    return apiClient.put<Order>(`/admin/orders/${id}/status`, statusData);
  }

  // Get all orders (admin only)
  static async getAllOrders(filters?: {
    page?: number;
    limit?: number;
    status?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<PaginatedResponse<Order>>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const url = queryString ? `/admin/orders?${queryString}` : '/admin/orders';
    
    return apiClient.get<PaginatedResponse<Order>>(url);
  }

  // Get order statistics (admin only)
  static async getOrderStatistics(filters?: {
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<{
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
  }>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const url = queryString ? `/admin/orders/statistics?${queryString}` : '/admin/orders/statistics';
    
    return apiClient.get<{
      totalOrders: number;
      totalRevenue: number;
      pendingOrders: number;
      completedOrders: number;
      cancelledOrders: number;
    }>(url);
  }

  // Get order by tracking number
  static async getOrderByTracking(trackingNumber: string): Promise<ApiResponse<Order>> {
    return apiClient.get<Order>(`/orders/tracking/${trackingNumber}`);
  }

  // Add order note
  static async addOrderNote(id: string, note: string): Promise<ApiResponse<Order>> {
    return apiClient.post<Order>(`/orders/${id}/notes`, { note });
  }

  // Get order notes
  static async getOrderNotes(id: string): Promise<ApiResponse<Array<{
    id: string;
    note: string;
    createdAt: string;
    createdBy: string;
  }>>> {
    return apiClient.get<Array<{
      id: string;
      note: string;
      createdAt: string;
      createdBy: string;
    }>>(`/orders/${id}/notes`);
  }
}
