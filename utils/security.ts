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
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

// Helper: Bereinigt Umgebungsvariablen von versehentlichen Leerzeichen oder Anführungszeichen
const cleanEnv = (value: string | undefined, fallback: string) => {
  if (!value) return fallback;
  return value.trim().replace(/['"]/g, '');
};

// Wir nutzen nun die Werte aus der Umgebungskonfiguration (Netlify / .env)
// Fallback (nur für lokale Entwicklung, falls .env fehlt): Die bekannten Hashes
export const ADMIN_USERNAME_HASH = cleanEnv(process.env.ADMIN_USER_HASH, "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5");
export const ADMIN_PASSWORD_HASH = cleanEnv(process.env.ADMIN_PASS_HASH, "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35");
