import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { Lock, LogOut, Upload, Image as ImageIcon, Settings, ShieldCheck, AlertCircle, PanelBottom } from 'lucide-react';
import { hashString, ADMIN_PASSWORD_HASH, ADMIN_USERNAME_HASH } from '../utils/security';

// Helper Component for Image Upload/URL Input
const ImageInput: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ label, value, onChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      onChange(imageUrl);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
        <ImageIcon size={16} className="text-blue-600 dark:text-blue-500" /> {label}
      </label>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://beispiel.de/bild.jpg"
            className="flex-1 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-3 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600"
          />
        </div>
        <div className="flex items-center gap-4">
           <label className="cursor-pointer bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors border border-slate-300 dark:border-slate-700 flex items-center gap-2 shadow-sm">
            <Upload size={16} />
            <span>Datei hochladen</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
          <span className="text-xs text-slate-500">Unterstützt JPG, PNG, WebP</span>
        </div>
        {value && (
          <div className="mt-2">
            <p className="text-xs text-slate-500 mb-2 font-medium">Vorschau:</p>
            <div className="relative w-full max-w-xs h-32 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md group p-2 flex items-center justify-center">
               <img src={value} alt="Preview" className="max-w-full max-h-full object-contain" />
               <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs rounded-lg">
                 {value.startsWith('blob:') ? 'Lokale Datei' : 'Externe URL'}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const Admin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const [isChecking, setIsChecking] = useState(false);
  
  const { content, updateContent, updateNestedContent, updateCarousel, isAdmin, login, logout } = useContent();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsChecking(true);
    
    try {
      // 1. Eingaben bereinigen (Leerzeichen entfernen)
      const cleanUser = username.trim();
      const cleanPass = password.trim();

      // 2. Hashes berechnen
      const userHash = await hashString(cleanUser);
      const passHash = await hashString(cleanPass);

      // 3. Vergleichen
      if (userHash === ADMIN_USERNAME_HASH && passHash === ADMIN_PASSWORD_HASH) {
        login();
      } else {
        console.warn("Login Failed.");
        console.group("Debug Login Infos (F12)");
        console.log("Eingegebener User:", cleanUser);
        console.log("Berechneter Hash:", userHash);
        console.log("Erwarteter Hash (aus Env/Config):", ADMIN_USERNAME_HASH);
        console.log("---");
        console.log("Berechneter Pass Hash:", passHash);
        console.log("Erwarteter Pass Hash:", ADMIN_PASSWORD_HASH);
        console.groupEnd();
        
        setError("Benutzername oder Passwort falsch.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Ein technischer Fehler ist aufgetreten.");
    } finally {
      setIsChecking(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 transition-colors duration-300">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-800">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-blue-900/50">
              <Lock size={40} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Admin Login</h1>
            <p className="text-slate-500">Raven Guardian Verwaltung</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 p-3 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Benutzername</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                placeholder="Benutzername eingeben"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Passwort</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                placeholder="Passwort eingeben"
              />
            </div>
            <button 
              type="submit" 
              disabled={isChecking}
              className="w-full bg-slate-900 dark:bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-all shadow-lg shadow-slate-900/30 dark:shadow-blue-900/30 flex items-center justify-center gap-2"
            >
              {isChecking ? 'Überprüfe...' : 'Einloggen'}
            </button>
            
            <div className="text-center mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={12} />
              <span>Sichere Client-Side Authentifizierung</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <span className="font-bold text-xl flex items-center gap-3"><Lock size={20} className="text-amber-500" /> Admin Panel</span>
          <button onClick={logout} className="flex items-center gap-2 text-sm bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg transition-colors font-medium">
            <LogOut size={16} /> Abmelden
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Sidebar Nav */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 h-fit sticky top-24">
            <div className="space-y-2">
              <button onClick={() => setActiveTab("general")} className={`w-full text-left p-4 rounded-xl font-medium transition-all flex items-center gap-3 ${activeTab === "general" ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30" : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}`}>
                <Settings size={18} /> Allgemein (Logo)
              </button>
              <button onClick={() => setActiveTab("home")} className={`w-full text-left p-4 rounded-xl font-medium transition-all ${activeTab === "home" ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30" : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}`}>
                Startseite & Intro
              </button>
              <button onClick={() => setActiveTab("carousel")} className={`w-full text-left p-4 rounded-xl font-medium transition-all ${activeTab === "carousel" ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30" : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}`}>
                Karussell Bilder
              </button>
              <button onClick={() => setActiveTab("services")} className={`w-full text-left p-4 rounded-xl font-medium transition-all ${activeTab === "services" ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30" : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}`}>
                Dienstleistungen
              </button>
              <button onClick={() => setActiveTab("about")} className={`w-full text-left p-4 rounded-xl font-medium transition-all ${activeTab === "about" ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30" : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}`}>
                Über uns
              </button>
              <button onClick={() => setActiveTab("contact")} className={`w-full text-left p-4 rounded-xl font-medium transition-all ${activeTab === "contact" ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30" : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}`}>
                Kontakt & Zeiten
              </button>
              <button onClick={() => setActiveTab("footer")} className={`w-full text-left p-4 rounded-xl font-medium transition-all flex items-center gap-3 ${activeTab === "footer" ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30" : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}`}>
                <PanelBottom size={18} /> Footer
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3 space-y-8">

             {activeTab === "general" && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white"><Settings className="text-blue-600 dark:text-blue-500" /> Allgemeine Einstellungen</h2>
                <div className="space-y-8">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 p-4 rounded-lg text-blue-800 dark:text-blue-200 text-sm">
                    Hier können Sie das Logo der Webseite ändern. Es wird automatisch in der Navigationsleiste aktualisiert.
                  </div>
                  
                  <ImageInput 
                    label="Webseiten Logo"
                    value={content.general?.logo}
                    onChange={(val) => updateContent("general", "logo", val)}
                  />
                </div>
              </div>
            )}
            
            {activeTab === "home" && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Startseite bearbeiten</h2>
                <div className="space-y-8">
                  <div>
                     <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Intro Überschrift</label>
                     <input 
                       type="text" 
                       value={content.home.introTitle}
                       onChange={(e) => updateContent("home", "introTitle", e.target.value)}
                       className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Intro Text</label>
                     <textarea 
                       rows={4}
                       value={content.home.introText}
                       onChange={(e) => updateContent("home", "introText", e.target.value)}
                       className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                     />
                  </div>
                  
                  <ImageInput 
                    label="Intro Bild"
                    value={content.home.introImage}
                    onChange={(val) => updateContent("home", "introImage", val)}
                  />
                </div>
              </div>
            )}

            {activeTab === "carousel" && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Karussell Bilder</h2>
                {content.carousel.map((slide: any, idx: number) => (
                  <div key={slide.id} className="mb-10 border-b border-slate-200 dark:border-slate-800 pb-10 last:border-0 last:pb-0">
                    <h3 className="font-bold text-lg mb-6 text-blue-600 dark:text-blue-500 flex items-center gap-2">
                       <span className="bg-blue-100 dark:bg-blue-500/10 px-2 py-1 rounded">Slide {idx + 1}</span>
                    </h3>
                    <div className="grid gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Titel</label>
                        <input 
                           type="text" 
                           value={slide.title}
                           onChange={(e) => updateCarousel(idx, "title", e.target.value)}
                           className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                         />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Untertitel</label>
                        <input 
                           type="text" 
                           value={slide.subtitle}
                           onChange={(e) => updateCarousel(idx, "subtitle", e.target.value)}
                           className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                         />
                      </div>
                      
                      <ImageInput 
                        label={`Bild für Slide ${idx + 1}`}
                        value={slide.image}
                        onChange={(val) => updateCarousel(idx, "image", val)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "services" && (
              <div className="space-y-8">
                {Object.keys(content.services).map((key) => {
                  const service = content.services[key];
                  return (
                    <div key={key} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                      <h2 className="text-xl font-bold mb-8 uppercase text-blue-600 dark:text-blue-500 border-b border-slate-200 dark:border-slate-800 pb-4">{service.title}</h2>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Titel</label>
                          <input 
                             type="text" 
                             value={service.title}
                             onChange={(e) => updateNestedContent("services", key, "title", e.target.value)}
                             className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                           />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Kurzbeschreibung (Übersicht)</label>
                          <input 
                             type="text" 
                             value={service.shortDescription}
                             onChange={(e) => updateNestedContent("services", key, "shortDescription", e.target.value)}
                             className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                           />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Vollbeschreibung (Detailseite)</label>
                          <textarea 
                             rows={4}
                             value={service.description}
                             onChange={(e) => updateNestedContent("services", key, "description", e.target.value)}
                             className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                           />
                        </div>
                        
                        <ImageInput 
                          label="Dienstleistungs-Bild"
                          value={service.image}
                          onChange={(val) => updateNestedContent("services", key, "image", val)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

             {activeTab === "about" && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Über Uns</h2>
                <div className="space-y-8">
                  <div>
                     <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Titel</label>
                     <input 
                       type="text" 
                       value={content.about.missionTitle}
                       onChange={(e) => updateContent("about", "missionTitle", e.target.value)}
                       className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Text</label>
                     <textarea 
                       rows={6}
                       value={content.about.missionText}
                       onChange={(e) => updateContent("about", "missionText", e.target.value)}
                       className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                     />
                  </div>
                  
                  <ImageInput 
                    label="Team/Firmen Bild"
                    value={content.about.image}
                    onChange={(val) => updateContent("about", "image", val)}
                  />
                </div>
              </div>
            )}
            
            {activeTab === "contact" && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Kontaktdaten & Zeiten</h2>
                <div className="grid gap-8">
                   <div>
                     <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Adresse</label>
                     <input 
                       type="text" 
                       value={content.contact.address}
                       onChange={(e) => updateContent("contact", "address", e.target.value)}
                       className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                     />
                  </div>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Telefon</label>
                     <input 
                       type="text" 
                       value={content.contact.phone}
                       onChange={(e) => updateContent("contact", "phone", e.target.value)}
                       className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">E-Mail</label>
                     <input 
                       type="text" 
                       value={content.contact.email}
                       onChange={(e) => updateContent("contact", "email", e.target.value)}
                       className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                     />
                  </div>
                  
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                     <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">Öffnungszeiten</h3>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div>
                           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Montag - Freitag</label>
                           <input 
                             type="text" 
                             value={content.contact.hours.week}
                             onChange={(e) => updateNestedContent("contact", "hours", "week", e.target.value)}
                             className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Samstag</label>
                           <input 
                             type="text" 
                             value={content.contact.hours.saturday}
                             onChange={(e) => updateNestedContent("contact", "hours", "saturday", e.target.value)}
                             className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                           />
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "footer" && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
                  <PanelBottom className="text-blue-600 dark:text-blue-500" /> Footer Einstellungen
                </h2>
                <div className="space-y-8">
                  <div>
                     <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Footer Beschreibungstext</label>
                     <textarea 
                       rows={4}
                       value={content.footer.text}
                       onChange={(e) => updateContent("footer", "text", e.target.value)}
                       className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                     />
                  </div>
                  
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                     <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">Social Media Links</h3>
                     <div className="grid gap-6">
                        <div>
                           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Facebook URL</label>
                           <input 
                             type="text" 
                             value={content.footer.social.facebook}
                             onChange={(e) => updateNestedContent("footer", "social", "facebook", e.target.value)}
                             className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Instagram URL</label>
                           <input 
                             type="text" 
                             value={content.footer.social.instagram}
                             onChange={(e) => updateNestedContent("footer", "social", "instagram", e.target.value)}
                             className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                           />
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
