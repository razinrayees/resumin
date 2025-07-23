import React, { useState, useEffect, useCallback } from 'react';
import { User, Check, X, AlertCircle, Loader2 } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

interface UsernameInputProps {
  username: string;
  onUsernameChange: (username: string) => void;
  currentUserId?: string;
}

type UsernameStatus = 'idle' | 'checking' | 'available' | 'taken' | 'invalid';

export const UsernameInput: React.FC<UsernameInputProps> = ({ 
  username, 
  onUsernameChange,
  currentUserId 
}) => {
  const [status, setStatus] = useState<UsernameStatus>('idle');
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const { currentUser } = useAuth();

  const validateUsername = (value: string): boolean => {
    // Username must be 3-30 characters, alphanumeric and hyphens only, no consecutive hyphens
    const regex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
    return value.length >= 3 && value.length <= 30 && regex.test(value) && !value.includes('--');
  };

  const checkUsernameAvailability = useCallback(async (value: string) => {
    if (!validateUsername(value)) {
      setStatus('invalid');
      return;
    }

    setStatus('checking');

    try {
      const usersQuery = query(
        collection(db, 'users'),
        where('username', '==', value.toLowerCase())
      );
      
      const querySnapshot = await getDocs(usersQuery);
      
      // If we find a document, check if it's the current user's document
      if (!querySnapshot.empty) {
        const existingDoc = querySnapshot.docs[0];
        const isCurrentUser = currentUser && existingDoc.id === currentUser.uid;
        setStatus(isCurrentUser ? 'available' : 'taken');
      } else {
        setStatus('available');
      }
    } catch (error) {
      console.error('Error checking username:', error);
      setStatus('idle');
    }
  }, [currentUser]);

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (username.length === 0) {
      setStatus('idle');
      return;
    }

    const timer = setTimeout(() => {
      checkUsernameAvailability(username);
    }, 500);

    setDebounceTimer(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [username, checkUsernameAvailability]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    onUsernameChange(value);
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'checking':
        return <Loader2 size={16} className="animate-spin text-gray-400" />;
      case 'available':
        return <Check size={16} className="text-green-500" />;
      case 'taken':
        return <X size={16} className="text-red-500" />;
      case 'invalid':
        return <AlertCircle size={16} className="text-orange-500" />;
      default:
        return <User size={16} className="text-gray-400" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'checking':
        return 'Checking availability...';
      case 'available':
        return 'Username is available!';
      case 'taken':
        return 'Username is already taken';
      case 'invalid':
        return 'Username must be 3-30 characters, alphanumeric and hyphens only';
      default:
        return 'Choose a unique username for your profile URL';
    }
  };

  const getInputBorderColor = () => {
    switch (status) {
      case 'available':
        return 'border-green-300 focus:border-green-500 focus:ring-green-500';
      case 'taken':
        return 'border-red-300 focus:border-red-500 focus:ring-red-500';
      case 'invalid':
        return 'border-orange-300 focus:border-orange-500 focus:ring-orange-500';
      default:
        return 'border-gray-300 focus:border-orange-500 focus:ring-orange-500';
    }
  };

  const getMessageColor = () => {
    switch (status) {
      case 'available':
        return 'text-green-600';
      case 'taken':
        return 'text-red-600';
      case 'invalid':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Username
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 text-sm">resumin.link/</span>
        </div>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className={`w-full pl-24 pr-10 py-3 border rounded-lg transition-colors ${getInputBorderColor()}`}
          placeholder="your-username"
          maxLength={30}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {getStatusIcon()}
        </div>
      </div>
      <p className={`text-sm ${getMessageColor()}`}>
        {getStatusMessage()}
      </p>
      {username && (
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-600">
            Your profile will be available at:{' '}
            <span className="font-mono font-medium text-orange-600">
              resumin.link/{username}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};