
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const getStatusColor = (status) => {
    switch (status) {
      case 'deployed':
      case 'success':
        return 'text-green-400 bg-green-400/10';
      case 'building':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'failed':
        return 'text-red-400 bg-red-400/10';
      case 'stopped':
        return 'text-gray-400 bg-gray-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
};

export const getStatusIcon = (status) => {
    switch (status) {
      case 'deployed':
      case 'success':
        return CheckCircle;
      case 'building':
        return Clock;
      case 'failed':
        return XCircle;
      case 'stopped':
        return AlertCircle;
      default:
        return AlertCircle;
    }
};
