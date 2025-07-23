import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Eye, 
  Users, 
  Globe, 
  Smartphone, 
  Clock, 
  TrendingUp,
  Calendar,
  MousePointer,
  RefreshCw
} from 'lucide-react';
import { AnalyticsCard } from './AnalyticsCard';
import { AnalyticsChart } from './AnalyticsChart';
import { getAnalyticsSummary } from '../utils/analytics';
import { AnalyticsSummary } from '../types/analytics';

interface AnalyticsDashboardProps {
  profileId: string;
  username: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  profileId,
  username
}) => {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getAnalyticsSummary(profileId);
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshAnalytics = async () => {
    try {
      setRefreshing(true);
      const data = await getAnalyticsSummary(profileId);
      setAnalytics(data);
    } catch (error) {
      console.error('Error refreshing analytics:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [profileId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-32 animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Analytics Data</h3>
        <p className="text-gray-600">Analytics data will appear once your profile gets visitors.</p>
      </div>
    );
  }

  const calculateChange = (current: number, previous: number): { change: string; type: 'increase' | 'decrease' | 'neutral' } => {
    if (previous === 0) return { change: 'New', type: 'neutral' };
    const percentage = ((current - previous) / previous) * 100;
    if (percentage > 0) return { change: `+${percentage.toFixed(1)}%`, type: 'increase' };
    if (percentage < 0) return { change: `${percentage.toFixed(1)}%`, type: 'decrease' };
    return { change: '0%', type: 'neutral' };
  };

  // Calculate previous week data for comparison
  const previousWeekViews = analytics.totalViews - analytics.viewsThisWeek;
  const weekChange = calculateChange(analytics.viewsThisWeek, previousWeekViews);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          <p className="text-gray-600">Track your resume performance and visitor insights</p>
        </div>
        <button
          onClick={refreshAnalytics}
          disabled={refreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Total Views"
          value={analytics.totalViews.toLocaleString()}
          change={weekChange.change}
          changeType={weekChange.type}
          icon={<Eye size={20} />}
          subtitle="All time page views"
        />
        
        <AnalyticsCard
          title="Unique Visitors"
          value={analytics.uniqueVisitors.toLocaleString()}
          icon={<Users size={20} />}
          subtitle="Unique sessions"
        />
        
        <AnalyticsCard
          title="This Week"
          value={analytics.viewsThisWeek.toLocaleString()}
          icon={<Calendar size={20} />}
          subtitle="Views in last 7 days"
        />
        
        <AnalyticsCard
          title="Click-throughs"
          value={(analytics.clickThroughs.email + analytics.clickThroughs.phone + analytics.clickThroughs.social + analytics.clickThroughs.links).toLocaleString()}
          icon={<MousePointer size={20} />}
          subtitle="Total interactions"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Countries */}
        <AnalyticsChart
          title="Top Countries"
          data={analytics.topCountries.map(item => ({
            label: item.country,
            value: item.count
          }))}
          type="bar"
          icon={<Globe size={20} />}
        />

        {/* Device Breakdown */}
        <AnalyticsChart
          title="Device Types"
          data={[
            { label: 'Mobile', value: analytics.deviceBreakdown.mobile },
            { label: 'Desktop', value: analytics.deviceBreakdown.desktop },
            { label: 'Tablet', value: analytics.deviceBreakdown.tablet }
          ].filter(item => item.value > 0)}
          type="donut"
          icon={<Smartphone size={20} />}
        />

        {/* Top Referrers */}
        <AnalyticsChart
          title="Traffic Sources"
          data={analytics.topReferrers.map(item => ({
            label: item.referrer,
            value: item.count
          }))}
          type="list"
          icon={<TrendingUp size={20} />}
        />

        {/* Click-through Breakdown */}
        <AnalyticsChart
          title="Interactions"
          data={[
            { label: 'Email Clicks', value: analytics.clickThroughs.email },
            { label: 'Phone Clicks', value: analytics.clickThroughs.phone },
            { label: 'Social Links', value: analytics.clickThroughs.social },
            { label: 'Other Links', value: analytics.clickThroughs.links }
          ].filter(item => item.value > 0)}
          type="donut"
          icon={<MousePointer size={20} />}
        />
      </div>

      {/* Weekly Trend */}
      {analytics.weeklyTrend.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp size={20} className="text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">7-Day Trend</h3>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {analytics.weeklyTrend.map((day, index) => {
              const maxViews = Math.max(...analytics.weeklyTrend.map(d => d.views));
              const height = maxViews > 0 ? (day.views / maxViews) * 100 : 0;
              const date = new Date(day.date);
              
              return (
                <div key={index} className="text-center">
                  <div className="h-20 flex items-end justify-center mb-2">
                    <div
                      className="w-8 bg-gradient-to-t from-orange-500 to-pink-500 rounded-t transition-all duration-300"
                      style={{ height: `${height}%`, minHeight: day.views > 0 ? '4px' : '0' }}
                    />
                  </div>
                  <div className="text-xs text-gray-600">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="text-xs font-medium text-gray-900">{day.views}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {analytics.recentViews.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Clock size={20} className="text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {analytics.recentViews.slice(0, 5).map((view, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-600">
                    Visitor from {view.country || 'Unknown'}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span className="capitalize">{view.device}</span>
                  <span>•</span>
                  <span>{new Date(view.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Export Analytics</h3>
        <p className="text-blue-800 mb-4">
          Download your analytics data for further analysis or reporting.
        </p>
        <button
          onClick={() => {
            const data = JSON.stringify(analytics, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${username}-analytics-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Download JSON
        </button>
      </div>
    </div>
  );
};