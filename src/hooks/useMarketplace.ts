import { useState, useEffect } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

interface MarketplaceStatus {
  hasMarketplaceSubscription: boolean;
  plan: 'free' | 'pro';
  planName?: string;
  billingCycle?: string;
  status?: string;
  onFreeTrial?: boolean;
  freeTrialEndsOn?: string;
  nextBillingDate?: string;
}

export const useMarketplace = () => {
  const { currentUser } = useAuth();
  const [marketplaceStatus, setMarketplaceStatus] = useState<MarketplaceStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMarketplaceStatus = httpsCallable(functions, 'getMarketplaceStatus');
  const linkGitHubMarketplace = httpsCallable(functions, 'linkGitHubMarketplace');

  const fetchMarketplaceStatus = async () => {
    if (!currentUser) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getMarketplaceStatus();
      setMarketplaceStatus(result.data as MarketplaceStatus);
    } catch (err) {
      console.error('Error fetching marketplace status:', err);
      setError('Failed to fetch marketplace status');
    } finally {
      setLoading(false);
    }
  };

  const linkGitHubAccount = async (githubLogin: string) => {
    if (!currentUser) {
      throw new Error('User must be authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const result = await linkGitHubMarketplace({ githubLogin });
      await fetchMarketplaceStatus(); // Refresh status
      return result.data;
    } catch (err: any) {
      console.error('Error linking GitHub account:', err);
      const errorMessage = err.message || 'Failed to link GitHub account';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchMarketplaceStatus();
    }
  }, [currentUser]);

  return {
    marketplaceStatus,
    loading,
    error,
    fetchMarketplaceStatus,
    linkGitHubAccount,
    isPro: marketplaceStatus?.plan === 'pro',
    hasActiveSubscription: marketplaceStatus?.hasMarketplaceSubscription && marketplaceStatus?.status === 'active'
  };
};