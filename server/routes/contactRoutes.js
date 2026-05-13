import { Router } from 'express';
import { validateContact } from '../middleware/validate.js';
import { sendCapiEvent, buildLeadEvent } from '../utils/capi.js';

const router = Router();

// In-memory storage (replace with MongoDB in production)
const contacts = [];

/**
 * POST /api/contact
 * Collect user data from the landing page contact form.
 * Fields: name, email, phone (optional), message
 * Also fires a server-side Meta CAPI Lead event.
 */
router.post('/', validateContact, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newContact = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name,
      email,
      phone,
      message,
      createdAt: new Date().toISOString(),
    };

    contacts.push(newContact);
    console.log(`✅ New contact received from: ${name} <${email}>`);

    // ── Meta Conversions API: server-side Lead event ──────────
    const clientIp =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress;

    const capiEvent = buildLeadEvent({
      email,
      phone,
      name,
      clientIp,
      userAgent: req.headers['user-agent'],
      eventSourceUrl: req.headers['referer'] || process.env.CLIENT_URL,
      fbc: req.cookies?.['_fbc'],   // Facebook Click ID
      fbp: req.cookies?.['_fbp'],   // Facebook Browser ID
    });

    // Fire CAPI async — don't block the response
    sendCapiEvent(capiEvent).catch(() => {});
    // ──────────────────────────────────────────────────────────

    res.status(201).json({
      success: true,
      message: 'Thank you! We\'ll get back to you within 24 hours.',
      data: { id: newContact.id },
    });
  } catch (error) {
    console.error('❌ Contact error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
});

/**
 * GET /api/contact
 * Retrieve all contacts (for admin/dev purposes).
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: contacts.length,
    data: contacts,
  });
});

export default router;

