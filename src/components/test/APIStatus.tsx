'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui';
import { apiClient } from '@/lib/api-client';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export function APIStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAPIStatus = async () => {
      try {
        // Try to reach the API health endpoint
        await apiClient.get('/health');
        setStatus('online');
        setError(null);
      } catch (err: any) {
        setStatus('offline');
        setError(err.message || 'API bağlantısı kurulamadı');
      }
    };

    checkAPIStatus();
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'checking':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
      case 'online':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'offline':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'checking':
        return 'API durumu kontrol ediliyor...';
      case 'online':
        return 'Backend API çevrimiçi';
      case 'offline':
        return 'Backend API çevrimdışı';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'checking':
        return 'border-blue-200 bg-blue-50';
      case 'online':
        return 'border-green-200 bg-green-50';
      case 'offline':
        return 'border-red-200 bg-red-50';
    }
  };

  return (
    <Card className={`p-4 ${getStatusColor()}`}>
      <div className="flex items-center space-x-3">
        {getStatusIcon()}
        <div>
          <h3 className="font-medium text-gray-900">{getStatusText()}</h3>
          {error && (
            <p className="text-sm text-red-600 mt-1">{error}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            API URL: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}
          </p>
        </div>
      </div>
    </Card>
  );
}
