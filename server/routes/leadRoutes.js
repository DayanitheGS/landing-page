import { Router } from 'express';
import { validateLead } from '../middleware/validate.js';

const router = Router();

// In-memory storage (replace with MongoDB in production)
const leads = [];

/**
 * POST /api/lead
 * Store lead info from "Start Free Trial" button.
 * Fields: name, email, phone (optional), company (optional)
 */
router.post('/', validateLead, (req, res) => {
  try {
    const { name, email, phone, company } = req.body;

    // Check for duplicate email
    const existingLead = leads.find((l) => l.email === email);
    if (existingLead) {
      return res.status(409).json({
        success: false,
        message: 'This email is already registered for a free trial.',
      });
    }

    const newLead = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name,
      email,
      phone,
      company,
      plan: 'free_trial',
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    leads.push(newLead);

    console.log(`🚀 New lead: ${name} <${email}> — Free Trial`);

    res.status(201).json({
      success: true,
      message: 'Welcome! Your free trial has been activated.',
      data: { id: newLead.id, plan: newLead.plan },
    });
  } catch (error) {
    console.error('❌ Lead error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
});

/**
 * GET /api/lead
 * Retrieve all leads (for admin/dev purposes).
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: leads.length,
    data: leads,
  });
});

export default router;
