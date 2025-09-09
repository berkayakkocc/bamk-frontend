import { ApiError } from '@/types';

export class ErrorHandler {
  static handle(error: any): string {
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    
    if (error?.message) {
      return error.message;
    }
    
    if (error?.status === 401) {
      return 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.';
    }
    
    if (error?.status === 403) {
      return 'Bu işlem için yetkiniz bulunmuyor.';
    }
    
    if (error?.status === 404) {
      return 'Aranan kaynak bulunamadı.';
    }
    
    if (error?.status === 422) {
      return 'Girilen bilgiler geçersiz. Lütfen kontrol edin.';
    }
    
    if (error?.status === 429) {
      return 'Çok fazla istek gönderildi. Lütfen bekleyin.';
    }
    
    if (error?.status >= 500) {
      return 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.';
    }
    
    if (error?.code === 'NETWORK_ERROR') {
      return 'İnternet bağlantınızı kontrol edin.';
    }
    
    return 'Beklenmeyen bir hata oluştu.';
  }

  static getFieldErrors(error: any): Record<string, string[]> {
    if (error?.response?.data?.errors) {
      return error.response.data.errors;
    }
    return {};
  }

  static isNetworkError(error: any): boolean {
    return error?.code === 'NETWORK_ERROR' || 
           error?.message?.includes('Network Error') ||
           !error?.response;
  }

  static isAuthError(error: any): boolean {
    return error?.status === 401 || error?.status === 403;
  }

  static isValidationError(error: any): boolean {
    return error?.status === 422;
  }

  static isServerError(error: any): boolean {
    return error?.status >= 500;
  }
}
