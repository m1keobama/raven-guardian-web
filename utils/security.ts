// Utility für Client-Side Security

// Typ-Definition für TypeScript, damit process.env bekannt ist
declare const process: {
  env: {
    ADMIN_USER_HASH: string;
    ADMIN_PASS_HASH: string;
  }
};

/**
 * Erstellt einen SHA-256 Hash aus einem String.
 */
export async function hashString(message: string): Promise<string> {
  // TextEncoder nutzt UTF-8 standardmäßig
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // Konvertierung zu Hex-String (kleingeschrieben)
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

// Helper: Bereinigt Umgebungsvariablen von versehentlichen Leerzeichen oder Anführungszeichen
const cleanEnv = (value: string | undefined, fallback: string) => {
  if (!value || value === "undefined" || value === "") return fallback;
  return value.trim().replace(/['"]/g, '').toLowerCase();
};

// STANDARD-LOGIN (Fallback, wenn keine Env-Vars gesetzt sind):
// User: OppitzAdmin
// Pass: 0pp1tz8ur0
const DEFAULT_USER_HASH = "725695b77708d579aa2f23b7b203d9377484d852bd8523c91361c773a4b008f5";
const DEFAULT_PASS_HASH = "7e59b20755a90d8595535e6191d84b25680104d49a37e9d722283259e8df4567";

export const ADMIN_USERNAME_HASH = cleanEnv(process.env.ADMIN_USER_HASH, DEFAULT_USER_HASH);
export const ADMIN_PASSWORD_HASH = cleanEnv(process.env.ADMIN_PASS_HASH, DEFAULT_PASS_HASH);