# Supabase Analytics Setup

This document provides a complete analytics solution for the Roadtrip Bingo app that can be reused across multiple applications.

## Database Schema

Create these tables in your Supabase database:

```sql
-- Applications table to track different apps
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table for tracking user interactions
CREATE TABLE analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  session_id TEXT, -- Browser/app session identifier
  user_id TEXT, -- Optional user identifier (can be anonymous)
  event_type TEXT NOT NULL, -- 'page_view', 'click', 'game_start', 'game_complete', etc.
  event_name TEXT NOT NULL, -- Specific event name
  properties JSONB DEFAULT '{}', -- Flexible event data
  user_agent TEXT,
  ip_address INET,
  country TEXT,
  city TEXT,
  referrer TEXT,
  pathname TEXT,
  search_params JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_analytics_events_app_id ON analytics_events(application_id);
CREATE INDEX idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX idx_analytics_events_properties ON analytics_events USING GIN(properties);

-- Insert the roadtrip bingo app
INSERT INTO applications (name, description)
VALUES ('roadtrip-bingo', 'Roadtrip Bingo Game Application');
```

## Supabase Edge Function

Create this as a Supabase Edge Function at `supabase/functions/analytics/index.ts`:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AnalyticsEvent {
  app: string;
  sessionId?: string;
  userId?: string;
  eventType: string;
  eventName: string;
  properties?: Record<string, any>;
  pathname?: string;
  searchParams?: Record<string, string>;
  referrer?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const body: AnalyticsEvent = await req.json()
    const userAgent = req.headers.get('user-agent') || ''
    const forwarded = req.headers.get('x-forwarded-for')
    const ipAddress = forwarded ? forwarded.split(',')[0] :
                     req.headers.get('cf-connecting-ip') ||
                     'unknown'

    // Get application ID
    const { data: app, error: appError } = await supabase
      .from('applications')
      .select('id')
      .eq('name', body.app)
      .single()

    if (appError || !app) {
      return new Response(
        JSON.stringify({ error: 'Application not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Insert analytics event
    const { error } = await supabase
      .from('analytics_events')
      .insert({
        application_id: app.id,
        session_id: body.sessionId,
        user_id: body.userId,
        event_type: body.eventType,
        event_name: body.eventName,
        properties: body.properties || {},
        user_agent: userAgent,
        ip_address: ipAddress,
        referrer: body.referrer,
        pathname: body.pathname,
        search_params: body.searchParams || {}
      })

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to record event' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
```

## Client-side Analytics Library

Create `app/lib/analytics.ts`:

```typescript
import { v4 as uuidv4 } from 'uuid'

const ANALYTICS_ENDPOINT = 'https://your-project.supabase.co/functions/v1/analytics'
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

  try {
    const response = await fetch(ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app: APP_NAME,
        sessionId: getSessionId(),
        userId: getUserId(),
        eventType,
        eventName,
        properties,
        pathname: window.location.pathname,
        searchParams: Object.fromEntries(new URLSearchParams(window.location.search)),
        referrer: document.referrer || undefined,
      }),
    })

    if (!response.ok) {
      console.warn('Analytics tracking failed:', response.statusText)
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
```

## Integration Points for Roadtrip Bingo App

### 1. Page Views
Add to `app/routes/_index.tsx` and `app/routes/bingo.tsx`:

```typescript
import { analytics } from '@/lib/analytics'

// In _index.tsx
export default function Index() {
  useEffect(() => {
    analytics.pageView('landing_page')
  }, [])
  // ... rest of component
}

// In bingo.tsx
export default function Bingo() {
  const { seed, language, theme } = useLoaderData<typeof loader>()

  useEffect(() => {
    analytics.pageView('bingo_game', {
      seed: seed?.slice(0, 10), // Only first 10 chars for privacy
      language,
      theme
    })
  }, [seed, language, theme])
  // ... rest of component
}
```

### 2. Game Events
Add to `app/routes/bingo.tsx`:

```typescript
// When game starts (component mounts)
useEffect(() => {
  analytics.gameStart({
    language,
    theme,
    seedLength: seed?.length
  })
}, [language, theme, seed])

// When bingo is achieved
useEffect(() => {
  if (isBingo) {
    analytics.gameComplete({
      language,
      theme,
      markedCount: state.markeditems.filter(item => item !== 0).length
    })
  }
}, [isBingo, language, theme, state.markeditems])
```

### 3. Form Interactions
Add to both form components:

```typescript
// In CustomStartForm.tsx and QuickStartForm.tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  if (!seedWord.trim()) return

  analytics.click('generate_board', {
    formType: 'custom', // or 'quick'
    language,
    theme,
    seedWordLength: seedWord.length
  })

  setIsGenerating(true)
  // ... rest of submit logic
}

// Theme changes
const handleThemeChange = (newTheme: string) => {
  setTheme(newTheme)
  analytics.themeChange(newTheme, {
    context: 'form_selection',
    previousTheme: theme
  })
}
```

### 4. Button Clicks
Add to `ActionButtons.tsx`:

```typescript
const handleReset = () => {
  analytics.click('reset_board')
  onReset()
}

const handleStartOver = () => {
  analytics.click('start_over')
  onStartOver()
}
```

### 5. Theme Drawer Interactions
Add to the theme selection in `bingo.tsx`:

```typescript
onClick={() => {
  analytics.themeChange(key, {
    context: 'game_drawer',
    previousTheme: state.theme
  })
  setSearchParams((prev) => {
    prev.set("theme", key)
    return prev
  })
  dispatch({
    type: "SET_THEME",
    payload: { value: key, position: null },
  })
}}
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install uuid
npm install --save-dev @types/uuid
```

### 2. Create Supabase Edge Function
```bash
supabase functions new analytics
# Copy the edge function code above to supabase/functions/analytics/index.ts
supabase functions deploy analytics
```

### 3. Environment Variables
Add to your app's environment:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### 4. Row Level Security (Optional)
```sql
-- Enable RLS on analytics_events
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the edge function)
CREATE POLICY "Allow analytics inserts" ON analytics_events
  FOR INSERT WITH CHECK (true);

-- Restrict reads to authenticated users only
CREATE POLICY "Restrict analytics reads" ON analytics_events
  FOR SELECT USING (auth.role() = 'authenticated');
```

## Benefits of This Design

1. **Multi-app Support**: The schema supports multiple applications
2. **Flexible Properties**: JSONB properties field allows custom event data
3. **Privacy-Aware**: IP addresses and user agents are optional
4. **Performance**: Proper indexing for common queries
5. **Extensible**: Easy to add new event types and properties
6. **Analytics-Ready**: Structure works well with BI tools and dashboards

## Sample Analytics Queries

```sql
-- Daily active sessions
SELECT DATE(created_at) as date, COUNT(DISTINCT session_id) as daily_sessions
FROM analytics_events
WHERE application_id = (SELECT id FROM applications WHERE name = 'roadtrip-bingo')
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Most popular themes
SELECT properties->>'theme' as theme, COUNT(*) as selections
FROM analytics_events
WHERE event_name = 'theme_change'
AND application_id = (SELECT id FROM applications WHERE name = 'roadtrip-bingo')
GROUP BY properties->>'theme'
ORDER BY selections DESC;

-- Game completion rate
WITH game_starts AS (
  SELECT COUNT(*) as starts FROM analytics_events
  WHERE event_name = 'game_start'
),
game_completions AS (
  SELECT COUNT(*) as completions FROM analytics_events
  WHERE event_name = 'game_complete'
)
SELECT
  starts,
  completions,
  ROUND((completions::float / starts::float) * 100, 2) as completion_rate_percent
FROM game_starts, game_completions;

-- Popular languages by usage
SELECT properties->>'language' as language, COUNT(*) as page_views
FROM analytics_events
WHERE event_name = 'bingo_game'
AND application_id = (SELECT id FROM applications WHERE name = 'roadtrip-bingo')
GROUP BY properties->>'language'
ORDER BY page_views DESC;

-- User journey analysis
SELECT
  session_id,
  STRING_AGG(event_name ORDER BY created_at) as journey,
  COUNT(*) as event_count,
  MIN(created_at) as session_start,
  MAX(created_at) as session_end
FROM analytics_events
WHERE application_id = (SELECT id FROM applications WHERE name = 'roadtrip-bingo')
AND created_at >= NOW() - INTERVAL '7 days'
GROUP BY session_id
ORDER BY session_start DESC;
```

This analytics system provides comprehensive tracking capabilities while maintaining user privacy and supporting multiple applications through a single, scalable infrastructure.