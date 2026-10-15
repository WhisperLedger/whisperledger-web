// Vercel Serverless Function to verify client IP and emergency admin passkey
export default async function handler(req: any, res: any) {
  // Extract client IP from Vercel proxy headers
  const forwarded = req.headers['x-forwarded-for'] || req.headers['x-real-ip'];
  const clientIp = typeof forwarded === 'string'
    ? forwarded.split(',')[0].trim()
    : req.socket?.remoteAddress || '';

  // Configured allowed IPs (Tanmay's current public IP + local loopback + env overrides)
  const defaultAllowedIps = [
    '223.185.130.211',
    '127.0.0.1',
    '::1',
    'localhost'
  ];

  const envAllowedIps = (process.env.ADMIN_ALLOWED_IPS || '')
    .split(',')
    .map((ip: string) => ip.trim())
    .filter(Boolean);

  const allowedIps = new Set([...defaultAllowedIps, ...envAllowedIps]);

  // Master passkey for emergency bypass when mobile/broadband IP changes
  const secretKey = process.env.ADMIN_SECRET_KEY || 'wl-master-admin-2026';
  const providedKey = req.query?.key || req.headers['x-admin-key'] || req.body?.key;

  const isIpAllowed = allowedIps.has(clientIp);
  const isKeyValid = Boolean(providedKey && providedKey === secretKey);

  if (isIpAllowed || isKeyValid) {
    return res.status(200).json({
      allowed: true,
      clientIp,
      authMethod: isIpAllowed ? 'ip_whitelist' : 'master_key'
    });
  }

  // Not authorized - return 403 Forbidden with cloaked response
  return res.status(403).json({
    allowed: false,
    clientIp
  });
}
