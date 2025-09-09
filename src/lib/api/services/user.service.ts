import { apiClient } from '../../api-client';
import { User, Address, ApiResponse, PaginatedResponse } from '@/types';

export interface UpdateUserData {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export class UserService {
  // Get user profile
  static async getProfile(): Promise<ApiResponse<User>> {
    return apiClient.get<User>('/users/profile');
  }

  // Update user profile
  static async updateProfile(userData: UpdateUserData): Promise<ApiResponse<User>> {
    return apiClient.put<User>('/users/profile', userData);
  }

  // Change password
  static async changePassword(passwordData: ChangePasswordData): Promise<ApiResponse<void>> {
    return apiClient.put<void>('/users/change-password', passwordData);
  }

  // Upload avatar
  static async uploadAvatar(
    file: File, 
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ avatarUrl: string }>> {
    return apiClient.uploadFile<{ avatarUrl: string }>('/users/avatar', file, onProgress);
  }

  // Delete avatar
  static async deleteAvatar(): Promise<ApiResponse<void>> {
    return apiClient.delete<void>('/users/avatar');
  }

  // Get user addresses
  static async getAddresses(): Promise<ApiResponse<Address[]>> {
    return apiClient.get<Address[]>('/users/addresses');
  }

  // Add address
  static async addAddress(addressData: Omit<Address, 'id'>): Promise<ApiResponse<Address>> {
    return apiClient.post<Address>('/users/addresses', addressData);
  }

  // Update address
  static async updateAddress(id: string, addressData: Partial<Address>): Promise<ApiResponse<Address>> {
    return apiClient.put<Address>(`/users/addresses/${id}`, addressData);
  }

  // Delete address
  static async deleteAddress(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/users/addresses/${id}`);
  }

  // Set default address
  static async setDefaultAddress(id: string): Promise<ApiResponse<Address>> {
    return apiClient.put<Address>(`/users/addresses/${id}/default`);
  }

  // Get user preferences
  static async getPreferences(): Promise<ApiResponse<{
    theme: 'light' | 'dark';
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  }>> {
    return apiClient.get<{
      theme: 'light' | 'dark';
      language: string;
      currency: string;
      notifications: {
        email: boolean;
        sms: boolean;
        push: boolean;
      };
    }>('/users/preferences');
  }

  // Update user preferences
  static async updatePreferences(preferences: {
    theme?: 'light' | 'dark';
    language?: string;
    currency?: string;
    notifications?: {
      email?: boolean;
      sms?: boolean;
      push?: boolean;
    };
  }): Promise<ApiResponse<void>> {
    return apiClient.put<void>('/users/preferences', preferences);
  }

  // Get user activity log
  static async getActivityLog(filters?: {
    page?: number;
    limit?: number;
    type?: string;
  }): Promise<ApiResponse<PaginatedResponse<{
    id: string;
    type: string;
    description: string;
    createdAt: string;
    metadata?: Record<string, any>;
  }>>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const url = queryString ? `/users/activity?${queryString}` : '/users/activity';
    
    return apiClient.get<PaginatedResponse<{
      id: string;
      type: string;
      description: string;
      createdAt: string;
      metadata?: Record<string, any>;
    }>>(url);
  }

  // Delete user account
  static async deleteAccount(password: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>('/users/account', { data: { password } });
  }

  // Admin: Get all users
  static async getAllUsers(filters?: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
  }): Promise<ApiResponse<PaginatedResponse<User>>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const url = queryString ? `/admin/users?${queryString}` : '/admin/users';
    
    return apiClient.get<PaginatedResponse<User>>(url);
  }

  // Admin: Update user role
  static async updateUserRole(userId: string, role: string): Promise<ApiResponse<User>> {
    return apiClient.put<User>(`/admin/users/${userId}/role`, { role });
  }

  // Admin: Deactivate user
  static async deactivateUser(userId: string): Promise<ApiResponse<void>> {
    return apiClient.put<void>(`/admin/users/${userId}/deactivate`);
  }

  // Admin: Activate user
  static async activateUser(userId: string): Promise<ApiResponse<void>> {
    return apiClient.put<void>(`/admin/users/${userId}/activate`);
  }
}
