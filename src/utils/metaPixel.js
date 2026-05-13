/**
 * Meta Pixel Tracking Utility
 * Pixel ID: 1018781647241570
 *
 * Comprehensive event tracking for a service-based landing page.
 * All standard and custom events optimized for Meta Ads Manager reporting.
 */

const PIXEL_ID = '1018781647241570';

// ⚠️ Test Event Code — REMOVE this line before going live in production
const TEST_EVENT_CODE = 'TEST21529';

// ─── Safety wrapper ────────────────────────────────────────────
const fbTrack = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    // Include test_event_code in development to see events in Meta Test Events tool
    const trackParams = {
      ...params,
      ...(import.meta.env.DEV && { test_event_code: TEST_EVENT_CODE })
    };
    
    window.fbq('track', eventName, trackParams);
    
    if (import.meta.env.DEV) {
      console.log(`[Meta Pixel] track → ${eventName}`, trackParams);
    }
  }
};

const fbTrackCustom = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    // Include test_event_code in development
    const trackParams = {
      ...params,
      ...(import.meta.env.DEV && { test_event_code: TEST_EVENT_CODE })
    };

    window.fbq('trackCustom', eventName, trackParams);
    
    if (import.meta.env.DEV) {
      console.log(`[Meta Pixel] trackCustom → ${eventName}`, trackParams);
    }
  }
};

// ─── Standard Events ───────────────────────────────────────────

/**
 * ViewContent — Fires when a user views a key section on the page
 * (Features, Video Showcase, Social Proof, etc.)
 */
export const trackViewContent = (contentName, contentCategory = 'Landing Page Section') => {
  fbTrack('ViewContent', {
    content_name: contentName,
    content_category: contentCategory,
    content_type: 'service',
  });
};

/**
 * Lead — Fires when the contact form is successfully submitted
 */
export const trackLead = (formData = {}) => {
  fbTrack('Lead', {
    content_name: 'Contact Form Submission',
    content_category: 'Service Inquiry',
    value: 0,
    currency: 'INR',
    ...(formData.email && { lead_email: formData.email }),
  });
};

/**
 * Contact — Fires when a user clicks "Talk to Sales" or similar contact actions
 */
export const trackContact = (method = 'CTA Button') => {
  fbTrack('Contact', {
    content_name: method,
    content_category: 'Sales Inquiry',
  });
};

/**
 * InitiateCheckout — Fires when a user clicks "Purchase Now" or "Start Free Trial"
 */
export const trackInitiateCheckout = (planName = 'Free Trial') => {
  fbTrack('InitiateCheckout', {
    content_name: planName,
    content_category: 'Service Plan',
    value: 0,
    currency: 'INR',
    num_items: 1,
  });
};

/**
 * CompleteRegistration — Fires on successful form submission (lead capture)
 */
export const trackCompleteRegistration = (method = 'Contact Form') => {
  fbTrack('CompleteRegistration', {
    content_name: method,
    status: true,
  });
};

/**
 * Schedule — Fires when a user initiates a demo/consultation booking
 */
export const trackSchedule = (source = 'Landing Page') => {
  fbTrack('Schedule', {
    content_name: 'Demo Request',
    content_category: source,
  });
};

// ─── Custom Events (Service-Specific) ──────────────────────────

/**
 * CTAClick — Fires on any CTA button click (for funnel analysis)
 */
export const trackCTAClick = (buttonLabel, sectionName) => {
  fbTrackCustom('CTAClick', {
    button_label: buttonLabel,
    section: sectionName,
    page_url: window.location.href,
  });
};

/**
 * VideoPlay — Fires when a user plays the demo video
 */
export const trackVideoPlay = (videoTitle = 'Demo Video') => {
  fbTrackCustom('VideoPlay', {
    content_name: videoTitle,
    content_category: 'Product Demo',
  });
};

/**
 * ScrollDepth — Fires when a user reaches specific scroll milestones
 */
export const trackScrollDepth = (percentage) => {
  fbTrackCustom('ScrollDepth', {
    depth: `${percentage}%`,
    page_url: window.location.href,
  });
};

/**
 * SectionView — Fires when a user scrolls to a key section
 */
export const trackSectionView = (sectionName) => {
  fbTrackCustom('SectionView', {
    section_name: sectionName,
    page_url: window.location.href,
  });
};

/**
 * TimeOnPage — Fires when user stays on page for 30s, 60s, 120s
 */
export const trackTimeOnPage = (seconds) => {
  fbTrackCustom('TimeOnPage', {
    time_seconds: seconds,
    page_url: window.location.href,
  });
};

// ─── Scroll & Engagement Tracking (auto-init) ─────────────────

let scrollMilestones = new Set();
let timeTracked = new Set();

/**
 * Initialize automatic scroll depth + time-on-page tracking.
 * Call once in App.jsx or main.jsx on mount.
 */
export const initEngagementTracking = () => {
  // Scroll depth tracking
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    [25, 50, 75, 90].forEach((milestone) => {
      if (scrollPercent >= milestone && !scrollMilestones.has(milestone)) {
        scrollMilestones.add(milestone);
        trackScrollDepth(milestone);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Time on page tracking
  const timeIntervals = [30, 60, 120];
  timeIntervals.forEach((seconds) => {
    setTimeout(() => {
      if (!timeTracked.has(seconds)) {
        timeTracked.add(seconds);
        trackTimeOnPage(seconds);
      }
    }, seconds * 1000);
  });

  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// ─── Section Observer (IntersectionObserver) ───────────────────

/**
 * Create an observer that tracks when sections come into view.
 * Usage: attach to section elements via ref or useEffect.
 */
export const createSectionObserver = (sectionName, callback) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          trackSectionView(sectionName);
          trackViewContent(sectionName);
          if (callback) callback();
          observer.disconnect(); // Fire only once per section
        }
      });
    },
    { threshold: 0.3 }
  );

  return observer;
};
