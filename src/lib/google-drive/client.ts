import crypto from "crypto";

export interface GoogleDriveAuthConfig {
  isConfigured: boolean;
  type: "service_account" | "api_key" | "none";
  token?: string;
  apiKey?: string;
}

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

/**
 * Creates a signed JWT for Google Service Account authentication without external heavy SDKs.
 */
function createServiceAccountJwt(
  clientEmail: string,
  privateKey: string,
  scopes: string[]
): string {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: clientEmail,
    scope: scopes.join(" "),
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const encodeBase64Url = (obj: object) =>
    Buffer.from(JSON.stringify(obj))
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

  const unsignedToken = `${encodeBase64Url(header)}.${encodeBase64Url(claim)}`;

  // Normalize private key formatting
  const formattedKey = privateKey.includes("\\n")
    ? privateKey.replace(/\\n/g, "\n")
    : privateKey;

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(unsignedToken);
  const signature = sign
    .sign(formattedKey, "base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${unsignedToken}.${signature}`;
}

/**
 * Exchanges signed JWT for an OAuth2 bearer access token.
 */
async function getServiceAccountAccessToken(
  clientEmail: string,
  privateKey: string
): Promise<string | null> {
  const now = Date.now();
  if (cachedAccessToken && cachedAccessToken.expiresAt > now + 60000) {
    return cachedAccessToken.token;
  }

  try {
    const jwt = createServiceAccountJwt(clientEmail, privateKey, [
      "https://www.googleapis.com/auth/drive.readonly",
    ]);

    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    });

    if (!res.ok) {
      console.warn(`[Google Drive Auth] Failed to obtain access token: ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    cachedAccessToken = {
      token: data.access_token,
      expiresAt: now + data.expires_in * 1000,
    };
    return data.access_token;
  } catch (err) {
    console.warn("[Google Drive Auth] Service Account token generation error:", err);
    return null;
  }
}

/**
 * Resolves current server-side Google Drive authentication context.
 */
export async function getGoogleDriveAuth(): Promise<GoogleDriveAuthConfig> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (clientEmail && privateKey) {
    const token = await getServiceAccountAccessToken(clientEmail, privateKey);
    if (token) {
      return {
        isConfigured: true,
        type: "service_account",
        token,
      };
    }
  }

  if (apiKey) {
    return {
      isConfigured: true,
      type: "api_key",
      apiKey,
    };
  }

  return {
    isConfigured: false,
    type: "none",
  };
}
