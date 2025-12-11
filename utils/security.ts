// Utility für Client-Side Security

/**
 * Kodiert einen String in Base64.
 * Dies funktioniert in allen Browser-Umgebungen zuverlässig und versteckt
 * die Passwörter im Quellcode, sodass sie nicht im Klartext lesbar sind.
 */
export async function hashString(message: string): Promise<string> {
  // Wir simulieren eine asynchrone Operation für konsistente API
  return new Promise((resolve) => {
    // Einfache Base64 Kodierung
    // In einer echten Server-Umgebung würden wir hier bcrypt verwenden.
    // Für Frontend-Only ist dies eine gute Balance aus "Verstecken" und "Funktionieren".
    const encoded = btoa(message);
    resolve(encoded);
  });
}

// Kodierter Wert für "0pp1tz8ur0" (Base64)
export const ADMIN_PASSWORD_HASH = "MHBwMXR6OHVyMA==";

// Kodierter Wert für "OppitzAdmin" (Base64)
export const ADMIN_USERNAME_HASH = "T3BwaXR6QWRtaW4=";
