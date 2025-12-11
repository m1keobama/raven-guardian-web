import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue, set, update } from "firebase/database";

// Initiale Daten (Standardwerte als Fallback)
const defaultContent = {
  general: {
    logo: "https://placehold.co/300x80/0f172a/ffffff?text=Raven+Guardian",
  },
  carousel: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&q=80&w=1920",
      title: "Professionelle Dachreinigung",
      subtitle: "Wir schützen Ihr Dach vor Moos und Witterungseinflüssen.",
      link: "/services/dach"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1920",
      title: "Solaranlagen-Pflege",
      subtitle: "Maximieren Sie Ihren Energieertrag durch kristallklare Module.",
      link: "/services/solar"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1590332822536-1e0f065363b9?auto=format&fit=crop&q=80&w=1920",
      title: "Außenflächen in Bestform",
      subtitle: "Tiefenreinigung für Einfahrten, Terrassen und Wege.",
      link: "/services/flaeche"
    }
  ],
  home: {
    introTitle: "Der Wächter für saubere Immobilien.",
    introText: "Als Experten für Flächenpflege in Cottbus und Umgebung verstehen wir, dass Sauberkeit nicht nur Optik ist, sondern Werterhalt. Raven Guardian steht für kompromisslose Qualität, moderne Technik und Zuverlässigkeit.",
    introImage: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=800",
    teaserDachImage: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&q=80&w=800",
    teaserSolarImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800",
    teaserFlaecheImage: "https://images.unsplash.com/photo-1621250269095-d85c2c5c04b8?auto=format&fit=crop&q=80&w=800"
  },
  services: {
    dach: {
      id: 'dach',
      title: "Professionelle Dachreinigung",
      image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&q=80&w=1920",
      shortDescription: "Entfernung von Moosflechten und Algen, die die Bausubstanz angreifen.",
      description: "Ihr Dach ist ständig der Witterung ausgesetzt. Moos, Algen und Flechten sehen nicht nur unschön aus, sie speichern auch Feuchtigkeit, die bei Frost zu Rissen in den Dachpfannen führen kann (Frostsprengung). Unsere professionelle Dachreinigung entfernt diese Beläge restlos und schonend.",
      benefits: [
        "Verlängerung der Lebensdauer des Daches",
        "Aufwertung der Optik der gesamten Immobilie",
        "Vermeidung teurer Reparaturen durch Frostschäden",
        "Verbesserter Wasserablauf"
      ],
      process: [
        "Kostenlose Inspektion des Dachzustands",
        "Abdecken von empfindlichen Bereichen rund ums Haus",
        "Reinigung mit Spezial-Hochdruckfräsen (nur Wasser)",
        "Aufbringen einer Desinfektionsschicht gegen Neubefall",
        "Optional: Dachbeschichtung in Wunschfarbe"
      ]
    },
    solar: {
      id: 'solar',
      title: "Solar- & PV-Reinigung",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1920",
      shortDescription: "Schmutz auf Solarmodulen kann den Ertrag um bis zu 25% mindern.",
      description: "Verschmutzungen wie Vogelkot, Blütenstaub und Feinstaub waschen sich nicht vollständig durch Regen ab. Besonders an den Rahmenrändern setzt sich Schmutz fest, der zu Moosbildung führt und Schatten wirft (Hotspots). Unsere Reinigung mit entmineralisiertem Wasser sorgt für streifenfreie Sauberkeit.",
      benefits: [
        "Sofortige Leistungssteigerung (bis zu 25%)",
        "Schutz vor dauerhaften Schäden an den Modulen",
        "Verwendung von reinem Osmosewasser (keine Chemie)",
        "Verlängerung der Anlagenlaufzeit"
      ],
      process: [
        "Sichtprüfung der Anlage auf Beschädigungen",
        "Reinigung mit wasserführenden Teleskopstangen",
        "Einsatz von rotierenden Bürsten für hartnäckigen Schmutz",
        "Abschließende Kontrolle des Reinigungsergebnisses"
      ]
    },
    flaeche: {
      id: 'flaeche',
      title: "Flächen- & Steinreinigung",
      image: "https://images.unsplash.com/photo-1621250269095-d85c2c5c04b8?auto=format&fit=crop&q=80&w=1920",
      shortDescription: "Ob Betonpflaster, Naturstein oder Terrassenplatten – wir entfernen Grauschleier.",
      description: "Egal ob Betonsteinpflaster, Naturstein, Klinker oder Holzterrassen – jede Oberfläche braucht spezielle Pflege. Wir entfernen nicht nur den oberflächlichen Schmutz, sondern auch tiefsitzende Flechten und Pilze. Auf Wunsch verfugen wir Ihre Fläche neu mit unkrauthemmendem Fugenmörtel.",
      benefits: [
        "Rutschsicherheit wird wiederhergestellt",
        "Unkrautwuchs wird langfristig gehemmt",
        "Farbauffrischung der Steine",
        "Keine Spritzwasserverschmutzung dank Absaughauben"
      ],
      process: [
        "Vorbehandlung hartnäckiger Flecken (Öl, Rost)",
        "Flächenreinigung mit Heißwasser-Hochdruck",
        "Spülen der Flächen und Fensterreinigung im Spritzbereich",
        "Einkehren von neuem Fugensand oder festem Fugenmörtel",
        "Imprägnierung zum Schutz vor Neuverschmutzung"
      ]
    }
  },
  about: {
    missionTitle: "Unsere Mission",
    missionText: "Der Name \"Raven Guardian\" steht für Wachsamkeit und Schutz. Genau das bieten wir für Ihre Immobilie. Wir haben es uns zur Aufgabe gemacht, Werte zu erhalten und durch professionelle Reinigung die Lebensdauer von Dächern, Solaranlagen und Außenflächen signifikant zu verlängern.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200"
  },
  contact: {
    address: "Musterstraße 42, 03046 Cottbus",
    phone: "0355 123 456",
    email: "info@raven-guardian.de",
    hours: {
      week: "08:00 - 18:00",
      saturday: "09:00 - 14:00"
    }
  },
  footer: {
    text: "Ihr Spezialist für professionelle Außenreinigung in der Lausitz. Wir verbinden handwerkliche Gründlichkeit mit modernster Reinigungstechnik für Dach, Solar und Flächen.",
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com"
    }
  }
};

const ContentContext = createContext<any>(null);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<any>(defaultContent);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDbConnected, setIsDbConnected] = useState(false);

  // Verbindung zur Datenbank herstellen beim Start
  useEffect(() => {
    if (db) {
      const contentRef = ref(db, 'content');
      
      // Abonniere Änderungen in der Datenbank
      const unsubscribe = onValue(contentRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setContent(data);
          setIsDbConnected(true);
        } else {
          // Wenn die Datenbank leer ist (erster Start), laden wir den Standardinhalt hoch
          set(contentRef, defaultContent);
          setIsDbConnected(true);
        }
      }, (error) => {
        console.error("Datenbank Fehler:", error);
        setIsDbConnected(false);
      });

      return () => unsubscribe();
    }
  }, []);

  const login = () => setIsAdmin(true);
  const logout = () => setIsAdmin(false);

  // Hilfsfunktion zum Speichern in DB oder lokal
  const saveChange = (newContent: any) => {
    setContent(newContent); // Sofortiges lokales Update für schnelle UI
    
    if (db) {
      // In die Cloud speichern
      set(ref(db, 'content'), newContent).catch(err => {
        console.error("Fehler beim Speichern:", err);
        alert("Fehler beim Speichern in der Cloud. Überprüfen Sie Ihre Internetverbindung.");
      });
    }
  };

  const updateContent = (section: string, key: string, value: any) => {
    const newContent = {
      ...content,
      [section]: {
        ...content[section],
        [key]: value
      }
    };
    saveChange(newContent);
  };

  const updateNestedContent = (section: string, subSection: string, key: string, value: any) => {
    const newContent = {
      ...content,
      [section]: {
        ...content[section],
        [subSection]: {
          ...content[section][subSection],
          [key]: value
        }
      }
    };
    saveChange(newContent);
  };

  const updateCarousel = (index: number, key: string, value: any) => {
    const newCarousel = [...content.carousel];
    newCarousel[index] = { ...newCarousel[index], [key]: value };
    
    const newContent = { ...content, carousel: newCarousel };
    saveChange(newContent);
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      updateNestedContent, 
      updateCarousel, 
      isAdmin, 
      login, 
      logout,
      isDbConnected 
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
