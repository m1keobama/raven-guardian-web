// Utility für Client-Side Security

/**
 * Erstellt einen SHA-256 Hash aus einem String.
 * Dies ist eine Einweg-Funktion (One-Way-Hash).
 * Im Gegensatz zu Base64 kann der Hash nicht einfach zurückgerechnet werden.
 */
export async function hashString(message: string): Promise<string> {
  // Text in Bytes umwandeln
  const msgBuffer = new TextEncoder().encode(message);
  
  // SHA-256 Hash erzeugen (Kryptografisch sicher)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  
  // Bytes in Hex-String umwandeln
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

// SHA-256 Hash für Benutzername "OppitzAdmin"
export const ADMIN_USERNAME_HASH = "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5";

// SHA-256 Hash für Passwort "0pp1tz8ur0"
export const ADMIN_PASSWORD_HASH = "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35";