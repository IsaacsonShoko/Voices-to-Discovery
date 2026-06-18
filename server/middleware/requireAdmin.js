import crypto from "node:crypto";

// Constant-time comparison so the admin key cannot be guessed via timing.
function safeEqual(a, b) {
  const bufferA = Buffer.from(String(a));
  const bufferB = Buffer.from(String(b));

  if (bufferA.length !== bufferB.length) {
    return false;
  }

  return crypto.timingSafeEqual(bufferA, bufferB);
}

export function requireAdmin(request, response, next) {
  const adminKey = process.env.ADMIN_KEY;
  const provided = request.header("x-admin-key");

  if (!adminKey || !provided || !safeEqual(provided, adminKey)) {
    response.status(401).json({ error: "Unauthorized." });
    return;
  }

  next();
}

export default requireAdmin;
