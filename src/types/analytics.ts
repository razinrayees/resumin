export interface AnalyticsEvent {
  id: string;
  profileId: string;
  username: string;
  eventType: 'page_view' | 'link_click' | 'contact_click' | 'download_click' | 'share_click' | 'testimonial_view';
  timestamp: string;
  sessionId: string;
  metadata: {
    ip?: string;
    userAgent: string;
    referrer: string;
    country?: string;
    city?: string;
    device: 'mobile' | 'tablet' | 'desktop';
    browser: string;
    os: string;
    linkUrl?: string; // For link clicks
    contactType?: 'email' | 'phone' | 'social'; // For contact clicks
  };
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  viewsThisWeek: number;
  viewsThisMonth: number;
  topCountries: Array<{ country: string; count: number }>;
  topReferrers: Array<{ referrer: string; count: number }>;
  deviceBreakdown: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  recentViews: Array<{
    timestamp: string;
    country?: string;
    device: string;
    referrer: string;
  }>;
  clickThroughs: {
    email: number;
    phone: number;
    social: number;
    links: number;
  };
  peakHours: Array<{ hour: number; count: number }>;
  weeklyTrend: Array<{ date: string; views: number }>;
}

export interface VisitorInfo {
  ip: string;
  country: string;
  city: string;
  timezone: string;
}