import { addDoc, collection, query, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { AnalyticsEvent, AnalyticsSummary, VisitorInfo } from '../types/analytics';

// Generate unique session ID
export const generateSessionId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get visitor information (using a free IP geolocation service)
export const getVisitorInfo = async (): Promise<Partial<VisitorInfo>> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data = await response.json();
      return {
        ip: data.ip,
        country: data.country_name,
        city: data.city,
        timezone: data.timezone
      };
    }
  } catch (error) {
    console.error('Error getting visitor info:', error);
  }
  return {};
};

// Detect device type
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const userAgent = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
    return 'mobile';
  }
  return 'desktop';
};

// Get browser name
export const getBrowserName = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Opera')) return 'Opera';
  return 'Unknown';
};

// Get operating system
export const getOperatingSystem = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';
  return 'Unknown';
};

// Track analytics event
export const trackEvent = async (
  profileId: string,
  username: string,
  eventType: AnalyticsEvent['eventType'],
  additionalData?: Partial<AnalyticsEvent['metadata']>
): Promise<void> => {
  try {
    const visitorInfo = await getVisitorInfo();
    const sessionId = sessionStorage.getItem('resumin_session') || generateSessionId();
    sessionStorage.setItem('resumin_session', sessionId);

    const event: Omit<AnalyticsEvent, 'id'> = {
      profileId,
      username,
      eventType,
      timestamp: new Date().toISOString(),
      sessionId,
      metadata: {
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct',
        device: getDeviceType(),
        browser: getBrowserName(),
        os: getOperatingSystem(),
        ...visitorInfo,
        ...additionalData
      }
    };

    await addDoc(collection(db, 'analytics'), event);
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Get analytics summary for a profile
export const getAnalyticsSummary = async (profileId: string): Promise<AnalyticsSummary> => {
  try {
    // Modified query to avoid composite index requirement
    // We'll fetch all documents for the profile and sort them in memory
    const analyticsQuery = query(
      collection(db, 'analytics'),
      where('profileId', '==', profileId)
    );

    const querySnapshot = await getDocs(analyticsQuery);
    const events = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as AnalyticsEvent[];

    // Sort events by timestamp in memory (descending order)
    events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Calculate summary statistics
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const pageViews = events.filter(e => e.eventType === 'page_view');
    const uniqueVisitors = new Set(pageViews.map(e => e.sessionId)).size;
    
    const viewsThisWeek = pageViews.filter(e => new Date(e.timestamp) >= oneWeekAgo).length;
    const viewsThisMonth = pageViews.filter(e => new Date(e.timestamp) >= oneMonthAgo).length;

    // Top countries
    const countryCount = pageViews.reduce((acc, event) => {
      const country = event.metadata.country || 'Unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCountries = Object.entries(countryCount)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Top referrers
    const referrerCount = pageViews.reduce((acc, event) => {
      let referrer = event.metadata.referrer;
      if (referrer === 'direct' || !referrer) {
        referrer = 'Direct';
      } else {
        try {
          const url = new URL(referrer);
          referrer = url.hostname;
        } catch {
          referrer = 'Unknown';
        }
      }
      acc[referrer] = (acc[referrer] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topReferrers = Object.entries(referrerCount)
      .map(([referrer, count]) => ({ referrer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Device breakdown
    const deviceBreakdown = pageViews.reduce((acc, event) => {
      const device = event.metadata.device;
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, { mobile: 0, tablet: 0, desktop: 0 });

    // Recent views
    const recentViews = pageViews.slice(0, 10).map(event => ({
      timestamp: event.timestamp,
      country: event.metadata.country,
      device: event.metadata.device,
      referrer: event.metadata.referrer === 'direct' ? 'Direct' : event.metadata.referrer
    }));

    // Click throughs
    const clickThroughs = events.reduce((acc, event) => {
      if (event.eventType === 'contact_click') {
        const type = event.metadata.contactType || 'links';
        acc[type] = (acc[type] || 0) + 1;
      } else if (event.eventType === 'link_click') {
        acc.links = (acc.links || 0) + 1;
      }
      return acc;
    }, { email: 0, phone: 0, social: 0, links: 0 });

    // Peak hours
    const hourCount = pageViews.reduce((acc, event) => {
      const hour = new Date(event.timestamp).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const peakHours = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      count: hourCount[hour] || 0
    }));

    // Weekly trend
    const weeklyTrend = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      const views = pageViews.filter(e => e.timestamp.startsWith(dateStr)).length;
      return { date: dateStr, views };
    }).reverse();

    return {
      totalViews: pageViews.length,
      uniqueVisitors,
      viewsThisWeek,
      viewsThisMonth,
      topCountries,
      topReferrers,
      deviceBreakdown,
      recentViews,
      clickThroughs,
      peakHours,
      weeklyTrend
    };
  } catch (error) {
    console.error('Error getting analytics summary:', error);
    return {
      totalViews: 0,
      uniqueVisitors: 0,
      viewsThisWeek: 0,
      viewsThisMonth: 0,
      topCountries: [],
      topReferrers: [],
      deviceBreakdown: { mobile: 0, tablet: 0, desktop: 0 },
      recentViews: [],
      clickThroughs: { email: 0, phone: 0, social: 0, links: 0 },
      peakHours: [],
      weeklyTrend: []
    };
  }
};

// Global tracking state to prevent multiple calls
let isTrackingInProgress = false;
let lastTrackedProfile = '';
let lastTrackedTime = 0;

// Track page view with strict deduplication
export const trackPageView = async (profileId: string, username: string): Promise<() => void> => {
  const startTime = Date.now();
  
  try {
    // Create unique identifier for this page view
    const currentPageKey = `${profileId}_${window.location.pathname}`;
    const now = Date.now();
    
    // Check if we're already tracking or recently tracked this profile
    if (isTrackingInProgress || 
        (lastTrackedProfile === currentPageKey && (now - lastTrackedTime) < 60000)) {
      console.log(`Skipping duplicate page view for ${username}. Already tracked recently.`);
      return () => {};
    }
    
    // Set tracking state
    isTrackingInProgress = true;
    lastTrackedProfile = currentPageKey;
    lastTrackedTime = now;
    
    // Check session storage for additional protection
    const sessionKey = `pageview_tracked_${profileId}`;
    const sessionData = sessionStorage.getItem(sessionKey);
    
    if (sessionData) {
      const sessionTime = parseInt(sessionData);
      if ((now - sessionTime) < 60000) {
        console.log(`Skipping duplicate page view for ${username}. Session protection.`);
        isTrackingInProgress = false;
        return () => {};
      }
    }
    
    // Track the page view
    console.log(`Tracking page view for ${username}`);
    await trackEvent(profileId, username, 'page_view');
    
    // Store in session storage
    sessionStorage.setItem(sessionKey, now.toString());
    
  } catch (error) {
    console.error('Error in trackPageView:', error);
  } finally {
    // Always reset tracking state
    isTrackingInProgress = false;
  }

  // Return cleanup function for time tracking
  return () => {
    const timeSpent = Date.now() - startTime;
    if (timeSpent > 5000) {
      console.log(`User spent ${Math.round(timeSpent / 1000)} seconds on page`);
    }
  };
};