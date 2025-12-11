import React from 'react';
import { MapPin, Phone, Mail, Clock, Lock } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export const Contact: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="bg-white dark:bg-slate-950 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Kontaktieren Sie uns</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
            Wir freuen uns auf Ihre Anfrage. Nutzen Sie das Formular oder rufen Sie uns direkt an.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Contact Info */}
          <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 h-full">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-10">Firmensitz</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl text-blue-600 dark:text-blue-500 shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Anschrift</h3>
                  <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">{content.contact.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl text-blue-600 dark:text-blue-500 shadow-sm">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Telefon</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg mb-1">{content.contact.phone}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Mo-Fr {content.contact.hours.week}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl text-blue-600 dark:text-blue-500 shadow-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">E-Mail</h3>
                  <p className="text-slate-600 dark:text-slate-400">{content.contact.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-6 bg-white dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 text-slate-900 dark:text-white font-bold mb-4">
                <Clock size={20} className="text-amber-500" /> Öffnungszeiten
              </div>
              <div className="grid grid-cols-2 text-sm text-slate-600 dark:text-slate-400 gap-y-2">
                <span>Montag - Freitag:</span>
                <span className="text-right text-slate-900 dark:text-white">{content.contact.hours.week}</span>
                <span>Samstag:</span>
                <span className="text-right text-slate-900 dark:text-white">{content.contact.hours.saturday}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-slate-900 p-10 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Nachricht senden</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Vorname</label>
                  <input type="text" className="w-full rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white p-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600" placeholder="Max" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Nachname</label>
                  <input type="text" className="w-full rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white p-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600" placeholder="Mustermann" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">E-Mail Adresse</label>
                <input type="email" className="w-full rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white p-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600" placeholder="max@beispiel.de" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Betreff</label>
                <select className="w-full rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white p-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all appearance-none cursor-pointer">
                  <option>Allgemeine Anfrage</option>
                  <option>Angebot Dachreinigung</option>
                  <option>Angebot Solarreinigung</option>
                  <option>Angebot Flächenreinigung</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Nachricht</label>
                <textarea rows={4} className="w-full rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white p-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600" placeholder="Wie können wir Ihnen helfen?"></textarea>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-slate-900 dark:bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-all shadow-lg shadow-slate-900/30 dark:shadow-blue-900/30 transform hover:-translate-y-1">
                  Nachricht absenden
                </button>
                <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
                  <Lock size={12} />
                  <span>Ihre Daten werden sicher SSL-verschlüsselt übertragen.</span>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};