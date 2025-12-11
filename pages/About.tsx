import React from 'react';
import { Shield, Award, Users } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export const About: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="bg-white dark:bg-slate-950 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Über Raven Guardian</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
            Ihr zuverlässiger Partner für Flächenpflege in der Lausitz seit 2015.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
             <img 
               src={content.about.image}
               alt="Team Meeting" 
               className="rounded-xl shadow-xl w-full h-auto object-cover border border-slate-100 dark:border-slate-800"
             />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{content.about.missionTitle}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">
              {content.about.missionText}
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Als Cottbuser Unternehmen sind wir tief in der Region verwurzelt. Wir setzen auf ehrliche Handwerksarbeit, transparente Preise und modernste Technik, die Umwelt und Material schont.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500/30 dark:hover:border-blue-900/50 transition-colors">
            <div className="w-16 h-16 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm dark:shadow-inner">
              <Shield size={32} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-3">Qualität</h3>
            <p className="text-slate-600 dark:text-slate-400">Wir arbeiten nur mit geschultem Fachpersonal und Profi-Equipment.</p>
          </div>
          <div className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500/30 dark:hover:border-blue-900/50 transition-colors">
            <div className="w-16 h-16 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm dark:shadow-inner">
              <Users size={32} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-3">Kundennähe</h3>
            <p className="text-slate-600 dark:text-slate-400">Persönliche Ansprechpartner und schnelle Termine in Cottbus.</p>
          </div>
          <div className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500/30 dark:hover:border-blue-900/50 transition-colors">
            <div className="w-16 h-16 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm dark:shadow-inner">
              <Award size={32} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-3">Erfahrung</h3>
            <p className="text-slate-600 dark:text-slate-400">Über 500 erfolgreich gereinigte Dächer und Solaranlagen.</p>
          </div>
        </div>

      </div>
    </div>
  );
};