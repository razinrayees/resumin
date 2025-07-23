import React, { useState } from 'react';
import { Github, Link as LinkIcon, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useMarketplace } from '../hooks/useMarketplace';
import toast from 'react-hot-toast';

export const GitHubMarketplaceLink: React.FC = () => {
  const { marketplaceStatus, loading, linkGitHubAccount, isPro, hasActiveSubscription } = useMarketplace();
  const [githubLogin, setGithubLogin] = useState('');
  const [isLinking, setIsLinking] = useState(false);

  const handleLinkAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!githubLogin.trim()) {
      toast.error('Please enter your GitHub username');
      return;
    }

    setIsLinking(true);
    
    try {
      const result = await linkGitHubAccount(githubLogin.trim());
      toast.success(`Successfully linked GitHub Marketplace subscription: ${result.plan}`);
      setGithubLogin('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to link GitHub account');
    } finally {
      setIsLinking(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-center py-8">
          <Loader2 size={24} className="animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading marketplace status...</span>
        </div>
      </div>
    );
  }

  // Show success state if already linked
  if (hasActiveSubscription && isPro) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Check size={20} className="text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              GitHub Marketplace Connected
            </h3>
            <p className="text-green-800 mb-4">
              Your GitHub Marketplace subscription is active and linked to your Resumin account.
            </p>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-700 font-medium">Plan:</span>
                  <span className="ml-2 text-green-900">{marketplaceStatus?.planName || 'Pro'}</span>
                </div>
                <div>
                  <span className="text-green-700 font-medium">Billing:</span>
                  <span className="ml-2 text-green-900 capitalize">{marketplaceStatus?.billingCycle || 'Monthly'}</span>
                </div>
                {marketplaceStatus?.onFreeTrial && (
                  <div className="col-span-2">
                    <span className="text-green-700 font-medium">Free Trial Ends:</span>
                    <span className="ml-2 text-green-900">
                      {marketplaceStatus.freeTrialEndsOn ? new Date(marketplaceStatus.freeTrialEndsOn).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                )}
                {marketplaceStatus?.nextBillingDate && (
                  <div className="col-span-2">
                    <span className="text-green-700 font-medium">Next Billing:</span>
                    <span className="ml-2 text-green-900">
                      {new Date(marketplaceStatus.nextBillingDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show linking form if not connected
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Github size={20} className="text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Link GitHub Marketplace Subscription
          </h3>
          <p className="text-blue-800 mb-4">
            If you've purchased Resumin Pro through GitHub Marketplace, link your GitHub account 
            to activate your Pro features.
          </p>
          
          <form onSubmit={handleLinkAccount} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                GitHub Username
              </label>
              <input
                type="text"
                value={githubLogin}
                onChange={(e) => setGithubLogin(e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                placeholder="your-github-username"
                disabled={isLinking}
              />
              <p className="text-xs text-blue-700 mt-1">
                Enter the GitHub username associated with your Marketplace purchase
              </p>
            </div>
            
            <button
              type="submit"
              disabled={isLinking || !githubLogin.trim()}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLinking ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Linking...</span>
                </>
              ) : (
                <>
                  <LinkIcon size={16} />
                  <span>Link Account</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-800">
                <p className="font-medium mb-1">Don't have a GitHub Marketplace subscription?</p>
                <p>
                  Visit the{' '}
                  <a 
                    href="https://github.com/marketplace" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-900"
                  >
                    GitHub Marketplace
                  </a>
                  {' '}to purchase Resumin Pro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};