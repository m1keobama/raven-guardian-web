import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Sun, Shield, Check, ArrowRight } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export const Services: React.FC = () => {
  const { content } = useContent();
  const s = content.services;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-slate-900 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Unsere Dienstleistungen</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
            Professionelle Reinigungslösungen für jeden Anspruch. Wir setzen auf Qualität und Werterhalt.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid gap-16">
          
          {/* Service 1: Dach */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row group hover:border-blue-500/30 dark:hover:border-blue-900/50 transition-all">
            <div className="md:w-1/2 h-72 md:h-auto relative overflow-hidden">
               <img 
                 src={s.dach.image}
                 alt="Dachreinigung" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-black/5 dark:bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Home className="text-blue-600 dark:text-blue-500" size={32} />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{s.dach.title}</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {s.dach.description}
              </p>
              <ul className="space-y-3 mb-10 text-slate-700 dark:text-slate-300">
                <li className="flex gap-3"><Check size={20} className="text-green-600 dark:text-green-500" /> Entfernung von Moos & Flechten</li>
                <li className="flex gap-3"><Check size={20} className="text-green-600 dark:text-green-500" /> Dachrinnenreinigung inklusive</li>
                <li className="flex gap-3"><Check size={20} className="text-green-600 dark:text-green-500" /> Optionale Versiegelung</li>
              </ul>
              <Link to="/services/dach" className="inline-flex items-center text-white font-bold bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 px-6 py-3 rounded-lg transition-colors w-fit shadow-md">
                Mehr Details <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>

          {/* Service 2: Solar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row-reverse group hover:border-amber-500/30 dark:hover:border-blue-900/50 transition-all">
            <div className="md:w-1/2 h-72 md:h-auto relative overflow-hidden">
               <img 
                 src={s.solar.image}
                 alt="Solarreinigung" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-black/5 dark:bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Sun className="text-amber-500" size={32} />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{s.solar.title}</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {s.solar.description}
              </p>
              <ul className="space-y-3 mb-10 text-slate-700 dark:text-slate-300">
                <li className="flex gap-3"><Check size={20} className="text-green-600 dark:text-green-500" /> Ertragssteigerung sofort</li>
                <li className="flex gap-3"><Check size={20} className="text-green-600 dark:text-green-500" /> Ökologisches Osmose-Verfahren</li>
                <li className="flex gap-3"><Check size={20} className="text-green-600 dark:text-green-500" /> Werterhalt der Module</li>
              </ul>
              <Link to="/services/solar" className="inline-flex items-center text-white font-bold bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 px-6 py-3 rounded-lg transition-colors w-fit shadow-md">
                Mehr Details <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>

          {/* Service 3: Fläche */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row group hover:border-emerald-500/30 dark:hover:border-blue-900/50 transition-all">
            <div className="md:w-1/2 h-72 md:h-auto relative overflow-hidden">
               <img 
                 src={s.flaeche.image}
                 alt="Flächenreinigung" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-black/5 dark:bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-emerald-500" size={32} />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{s.flaeche.title}</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {s.flaeche.description}
              </p>
              <ul className="space-y-3 mb-10 text-slate-700 dark:text-slate-300">
                <li className="flex gap-3"><Check size={20} className="text-green-600 dark:text-green-500" /> Hochdruckreinigung mit Flächenschutz</li>
                <li className="flex gap-3"><Check size={20} className="text-green-600 dark:text-green-500" /> Fugenfüllung gegen Unkraut</li>
                <li className="flex gap-3"><Check size={20} className="text-green-600 dark:text-green-500" /> Öl- und Kaugummientfernung</li>
              </ul>
              <Link to="/services/flaeche" className="inline-flex items-center text-white font-bold bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 px-6 py-3 rounded-lg transition-colors w-fit shadow-md">
                Mehr Details <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};