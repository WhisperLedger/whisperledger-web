import { neon } from '@neondatabase/serverless';

declare const process: any;

const NEON_DB_URL =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_pHiNvYet4US3@ep-odd-salad-b3mmgoha-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const CLOUD_RUN_API =
  process.env.VITE_API_URL ||
  'https://whisperledger-api-dozavowbya-el.a.run.app/api/v1/interest';

export default async function handler(req: any, res: any) {
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: { message: 'Method not allowed' },
    });
  }

  try {
    // Parse body if stringified
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // use raw body
      }
    }

    const { email, consent, company } = body || {};

    // 1. Silent honeypot protection: legitimate users never fill 'company'
    if (company && String(company).trim() !== '') {
      return res.status(202).json({
        success: true,
        message: 'request received',
      });
    }

    // 2. Validate consent
    if (!consent) {
      return res.status(400).json({
        success: false,
        error: { message: 'Please confirm consent to receive availability updates.' },
      });
    }

    // 3. Validate email format
    if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 254) {
      return res.status(400).json({
        success: false,
        error: { message: 'Please provide a valid email address.' },
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 4. Primary: Store directly in Neon PostgreSQL 'interest_signups'
    const sql = neon(NEON_DB_URL);
    await sql`
      INSERT INTO interest_signups (email, source, consented_at)
      VALUES (${cleanEmail}, 'website', NOW())
      ON CONFLICT (email) DO UPDATE
      SET consented_at = EXCLUDED.consented_at,
          unsubscribed_at = NULL,
          updated_at = NOW()
    `;

    // 5. Asynchronous secondary notification to Cloud Run API if configured
    try {
      fetch(CLOUD_RUN_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, consent: true, company: '' }),
      }).catch(() => {
        // Silently ignore secondary sync errors as Neon DB already committed
      });
    } catch {
      // ignore
    }

    return res.status(202).json({
      success: true,
      message: 'request received',
      data: {
        email: cleanEmail,
        status: 'subscribed',
      },
    });
  } catch (error: any) {
    console.error('Failed to store interest signup:', error);
    return res.status(500).json({
      success: false,
      error: {
        message: 'Updates are temporarily unavailable. Please try again shortly.',
      },
    });
  }
}
