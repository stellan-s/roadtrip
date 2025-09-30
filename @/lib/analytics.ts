import { v4 as uuidv4 } from 'uuid'

const ANALYTICS_ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analytics`
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const APP_NAME = 'roadtrip-bingo'

// Generate or get session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return ''

  let sessionId = sessionStorage.getItem('analytics_session_id')
  if (!sessionId) {
    sessionId = uuidv4()
    sessionStorage.setItem('analytics_session_id', sessionId)
  }
  return sessionId
}

// Get user ID (could be from auth or localStorage)
function getUserId(): string | undefined {
  if (typeof window === 'undefined') return undefined

  // You could get this from auth context or generate a persistent anonymous ID
  let userId = localStorage.getItem('anonymous_user_id')
  if (!userId) {
    userId = uuidv4()
    localStorage.setItem('anonymous_user_id', userId)
  }
  return userId
}

interface TrackEventParams {
  eventType: string
  eventName: string
  properties?: Record<string, any>
}

export async function trackEvent({ eventType, eventName, properties = {} }: TrackEventParams) {
  if (typeof window === 'undefined') return

  const payload = {
    app: APP_NAME,
    sessionId: getSessionId(),
    userId: getUserId(),
    eventType,
    eventName,
    properties,
    pathname: window.location.pathname,
    searchParams: Object.fromEntries(new URLSearchParams(window.location.search)),
    referrer: document.referrer || undefined,
  };

  console.log('📊 Analytics Event:', eventName, payload);

  try {
    const response = await fetch(ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(payload),
    })

    console.log('📊 Analytics Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('Analytics tracking failed:', response.status, response.statusText, errorText);
    } else {
      console.log('📊 Analytics Success:', eventName);
    }
  } catch (error) {
    console.warn('Analytics tracking error:', error)
  }
}

// Convenience functions for common events
export const analytics = {
  pageView: (pageName: string, properties?: Record<string, any>) =>
    trackEvent({ eventType: 'page_view', eventName: pageName, properties }),

  gameStart: (properties?: Record<string, any>) =>
    trackEvent({ eventType: 'game', eventName: 'game_start', properties }),

  gameComplete: (properties?: Record<string, any>) =>
    trackEvent({ eventType: 'game', eventName: 'game_complete', properties }),

  themeChange: (theme: string, properties?: Record<string, any>) =>
    trackEvent({ eventType: 'interaction', eventName: 'theme_change', properties: { theme, ...properties } }),

  click: (element: string, properties?: Record<string, any>) =>
    trackEvent({ eventType: 'interaction', eventName: 'click', properties: { element, ...properties } }),
}