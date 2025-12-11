// Importiere die benötigten Funktionen von Firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// --- ANLEITUNG ---
// 1. Gehe auf: https://console.firebase.google.com/
// 2. Erstelle ein Projekt.
// 3. WICHTIG: Wähle im Menü links "Build" -> "Realtime Database" (NICHT Firestore!).
// 4. Erstelle die Datenbank im "Testmodus".
// 5. Gehe auf das Zahnrad (Einstellungen) -> Projekteinstellungen.
// 6. Scrolle runter zu "Meine Apps", klicke auf das </> Symbol.
// 7. Kopiere die Werte aus dem angezeigten Code-Block hier hinein:

const firebaseConfig = {
  // Ersetze diese Zeilen mit deinen echten Daten von Google:
  apiKey: "AIzaSyC6UFsmEYzgGFHJfnG5ceVcz-U-wroIflM",        // z.B. "AIzaSyD..."
  authDomain: "ravenguardian-acb2e.firebaseapp.com",
  databaseURL: "https://ravenguardian-acb2e-default-rtdb.europe-west1.firebasedatabase.app", // WICHTIG: Muss mit https:// beginnen und auf firebasedatabase.app enden
  projectId: "ravenguardian-acb2e",
  storageBucket: "ravenguardian-acb2e.firebasestorage.app",
  messagingSenderId: "282163580662",
  appId: "1:282163580662:web:64f2721967abcafd52e6d7"
};

// -----------------------------------------------------------

const isConfigured = firebaseConfig.apiKey !== "AIzaSyC6UFsmEYzgGFHJfnG5ceVcz-U-wroIflM";

let app;
let db: any = null;

if (isConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    // Initialisiere die Realtime Database
    db = getDatabase(app);
    console.log("Firebase erfolgreich initialisiert");
  } catch (error) {
    console.error("Fehler bei der Firebase Initialisierung:", error);
  }
} else {
  console.warn("ACHTUNG: Firebase ist noch nicht konfiguriert! Bitte trage die Daten in firebase.ts ein.");
}

export { db };