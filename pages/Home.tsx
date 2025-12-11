import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from '../components/Carousel';
import { CheckCircle2, Award, Home as HomeIcon, Sun, Shield, ArrowRight } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export const Home: React.FC = () => {
  const { content } = useContent();
  
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      <Carousel />

      {/* Intro Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h4 className="text-blue-600 dark:text-blue-500 font-bold uppercase tracking-widest text-sm mb-3">Ihr Partner in Cottbus</h4>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                {content.home.introTitle}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-light">
                {content.home.introText}
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Spezialisiert auf hartnäckige Verschmutzungen",
                  "Umweltschonende Verfahren ohne aggressive Chemie",
                  "Kostenlose Probefläche bei Großaufträgen",
                  "Regionale Nähe in Cottbus & Spree-Neiße"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={20} className="text-blue-600 dark:text-blue-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about" className="text-slate-900 dark:text-white font-bold hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors group">
                Mehr über uns erfahren <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-slate-200 dark:to-slate-800 rounded-xl transform rotate-2 opacity-30 blur-lg"></div>
              <img 
                src={content.home.introImage}
                alt="Reinigung in Aktion" 
                className="relative rounded-lg shadow-xl w-full h-[450px] object-cover border border-slate-100 dark:border-slate-800"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white p-6 rounded-lg shadow-xl max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="text-amber-500" size={24} />
                  <span className="font-bold text-lg">Qualitätsgarantie</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Wir verlassen den Ort erst, wenn Sie zu 100% zufrieden sind.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Unsere Einsatzgebiete</h2>
            <div className="h-1 w-24 bg-blue-600 mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-blue-500/30 dark:hover:border-blue-900 transition-all duration-300 group hover:-translate-y-2">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={content.services.dach.image} 
                  alt="Dachreinigung" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 dark:bg-black/40 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-8 relative">
                <div className="w-14 h-14 bg-white dark:bg-slate-900 text-blue-600 rounded-lg flex items-center justify-center mb-6 -mt-16 relative z-10 shadow-lg border border-slate-100 dark:border-slate-800">
                  <HomeIcon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{content.services.dach.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                  {content.services.dach.shortDescription}
                </p>
                <Link to="/services/dach" className="text-blue-600 dark:text-blue-500 font-bold text-sm hover:text-blue-800 dark:hover:text-white flex items-center gap-1 transition-colors">
                  DETAILS ANSEHEN <span className="text-lg">›</span>
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-amber-500/30 dark:hover:border-blue-900 transition-all duration-300 group hover:-translate-y-2">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={content.services.solar.image}
                  alt="Solarreinigung" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 dark:bg-black/40 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-8 relative">
                <div className="w-14 h-14 bg-white dark:bg-slate-900 text-amber-500 rounded-lg flex items-center justify-center mb-6 -mt-16 relative z-10 shadow-lg border border-slate-100 dark:border-slate-800">
                  <Sun size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{content.services.solar.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                  {content.services.solar.shortDescription}
                </p>
                <Link to="/services/solar" className="text-blue-600 dark:text-blue-500 font-bold text-sm hover:text-blue-800 dark:hover:text-white flex items-center gap-1 transition-colors">
                  DETAILS ANSEHEN <span className="text-lg">›</span>
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-blue-900 transition-all duration-300 group hover:-translate-y-2">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={content.services.flaeche.image}
                  alt="Pflastersteinreinigung" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 dark:bg-black/40 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-8 relative">
                <div className="w-14 h-14 bg-white dark:bg-slate-900 text-emerald-500 rounded-lg flex items-center justify-center mb-6 -mt-16 relative z-10 shadow-lg border border-slate-100 dark:border-slate-800">
                  <Shield size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{content.services.flaeche.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                   {content.services.flaeche.shortDescription}
                </p>
                <Link to="/services/flaeche" className="text-blue-600 dark:text-blue-500 font-bold text-sm hover:text-blue-800 dark:hover:text-white flex items-center gap-1 transition-colors">
                  DETAILS ANSEHEN <span className="text-lg">›</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/10"></div>
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Bereit für glänzende Ergebnisse?</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 font-light">
            Kontaktieren Sie uns für eine kostenlose Besichtigung Ihres Objekts in Cottbus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/contact" className="bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white px-10 py-4 rounded font-bold text-lg transition-all hover:shadow-lg">
               Kostenloses Angebot anfordern
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};