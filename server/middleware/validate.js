/**
 * Input validation middleware for API routes.
 * Keeps validation logic separate and reusable.
 */

/**
 * Validates contact form submissions.
 * Required: name, email, message
 * Optional: phone
 */
export const validateContact = (req, res, next) => {
  const { name, email, phone, message } = req.body;
  const errors = [];

  // Name: required, 2-100 chars
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name is required (minimum 2 characters)');
  }
  if (name && name.length > 100) {
    errors.push('Name must be under 100 characters');
  }

  // Email: required, basic format check
  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('Please provide a valid email address');
    }
  }

  // Phone: optional, but validate format if provided
  if (phone && typeof phone === 'string') {
    const phoneClean = phone.replace(/[\s\-\(\)]/g, '');
    if (phoneClean.length > 0 && (phoneClean.length < 7 || phoneClean.length > 15)) {
      errors.push('Phone number must be between 7-15 digits');
    }
  }

  // Message: required, 10-1000 chars
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push('Message is required (minimum 10 characters)');
  }
  if (message && message.length > 1000) {
    errors.push('Message must be under 1000 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Sanitize inputs — trim whitespace
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.phone = phone ? phone.trim() : '';
  req.body.message = message.trim();

  next();
};

/**
 * Validates lead (free trial) submissions.
 * Required: name, email
 * Optional: phone, company
 */
export const validateLead = (req, res, next) => {
  const { name, email, phone, company } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name is required (minimum 2 characters)');
  }

  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('Please provide a valid email address');
    }
  }

  if (phone && typeof phone === 'string') {
    const phoneClean = phone.replace(/[\s\-\(\)]/g, '');
    if (phoneClean.length > 0 && (phoneClean.length < 7 || phoneClean.length > 15)) {
      errors.push('Phone number must be between 7-15 digits');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.phone = phone ? phone.trim() : '';
  req.body.company = company ? company.trim() : '';

  next();
};
