/**
 * Meta Conversions API (CAPI) Utility
 * Dataset ID / Pixel ID: 1018781647241570
 *
 * Sends server-side events directly to Meta to complement the browser Pixel.
 * Improves signal quality, bypasses ad blockers, and handles iOS 14+ restrictions.
 *
 * Docs: https://developers.facebook.com/docs/marketing-api/conversions-api
 */

import crypto from 'crypto';

const PIXEL_ID = '1018781647241570';
const API_VERSION = 'v19.0';
const CAPI_ENDPOINT = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`;

// ─── Hashing helper (SHA-256, required by Meta) ────────────────
const hash = (value) => {
  if (!value) return undefined;
  return crypto
    .createHash('sha256')
    .update(String(value).toLowerCase().trim())
    .digest('hex');
};

// ─── Send event(s) to Meta CAPI ───────────────────────────────
export const sendCapiEvent = async (events) => {
  const accessToken = process.env.META_CAPI_TOKEN;

  if (!accessToken) {
    console.warn('⚠️  META_CAPI_TOKEN not set — CAPI event skipped.');
    return;
  }

  const payload = {
    data: Array.isArray(events) ? events : [events],
    // Include test_event_code only in non-production environments
    ...(process.env.NODE_ENV !== 'production' && {
      test_event_code: process.env.META_TEST_EVENT_CODE || 'TEST21529',
    }),
  };

  try {
    const response = await fetch(`${CAPI_ENDPOINT}?access_token=${accessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.error) {
      console.error('❌ Meta CAPI error:', result.error.message);
    } else {
      console.log(`✅ Meta CAPI → ${payload.data.map((e) => e.event_name).join(', ')} | Events received: ${result.events_received}`);
    }
  } catch (err) {
    console.error('❌ Meta CAPI request failed:', err.message);
  }
};

// ─── Event Builders ───────────────────────────────────────────

/**
 * Build a Lead event (fires when contact form is submitted)
 */
export const buildLeadEvent = ({ email, phone, name, clientIp, userAgent, eventSourceUrl, fbc, fbp }) => ({
  event_name: 'Lead',
  event_time: Math.floor(Date.now() / 1000),
  event_source_url: eventSourceUrl || process.env.CLIENT_URL,
  action_source: 'website',
  user_data: {
    em: hash(email),
    ph: hash(phone),
    fn: hash(name?.split(' ')[0]),
    ln: hash(name?.split(' ').slice(1).join(' ')),
    client_ip_address: clientIp,
    client_user_agent: userAgent,
    ...(fbc && { fbc }),   // Facebook Click ID cookie (_fbc)
    ...(fbp && { fbp }),   // Facebook Browser ID cookie (_fbp)
  },
  custom_data: {
    content_name: 'Contact Form Submission',
    content_category: 'Service Inquiry',
    currency: 'INR',
    value: 0,
  },
});

/**
 * Build a PageView event (for server-side PageView deduplication)
 */
export const buildPageViewEvent = ({ clientIp, userAgent, eventSourceUrl, fbc, fbp }) => ({
  event_name: 'PageView',
  event_time: Math.floor(Date.now() / 1000),
  event_source_url: eventSourceUrl || process.env.CLIENT_URL,
  action_source: 'website',
  user_data: {
    client_ip_address: clientIp,
    client_user_agent: userAgent,
    ...(fbc && { fbc }),
    ...(fbp && { fbp }),
  },
});
