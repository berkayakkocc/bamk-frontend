import { apiClient } from '../../api-client';
import { User, LoginForm, RegisterForm, ApiResponse } from '@/types';

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RefreshTokenResponse {
  token: string;
}

export class AuthService {
  // Login user
  static async login(credentials: LoginForm): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/auth/login', credentials);
  }

  // Register user
  static async register(userData: RegisterForm): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/auth/register', userData);
  }

  // Logout user
  static async logout(): Promise<ApiResponse<void>> {
    return apiClient.post<void>('/auth/logout');
  }

  // Refresh token
  static async refreshToken(): Promise<ApiResponse<RefreshTokenResponse>> {
    return apiClient.post<RefreshTokenResponse>('/auth/refresh');
  }

  // Get current user profile
  static async getProfile(): Promise<ApiResponse<User>> {
    return apiClient.get<User>('/auth/profile');
  }

  // Update user profile
  static async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.put<User>('/auth/profile', userData);
  }

  // Change password
  static async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse<void>> {
    return apiClient.put<void>('/auth/change-password', data);
  }

  // Forgot password
  static async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>('/auth/forgot-password', { email });
  }

  // Reset password
  static async resetPassword(data: {
    token: string;
    password: string;
  }): Promise<ApiResponse<void>> {
    return apiClient.post<void>('/auth/reset-password', data);
  }

  // Verify email
  static async verifyEmail(token: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>('/auth/verify-email', { token });
  }

  // Resend verification email
  static async resendVerification(): Promise<ApiResponse<void>> {
    return apiClient.post<void>('/auth/resend-verification');
  }
}
