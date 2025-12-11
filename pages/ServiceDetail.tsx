import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Phone } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { content } = useContent();
  
  // Safe access to service data from context
  const service = id && content.services[id] ? content.services[id] : null;

  if (!service) {
    return (
      <div className="py-20 text-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
        <h2 className="text-2xl font-bold">Service nicht gefunden</h2>
        <Link to="/services" className="text-blue-600 mt-4 inline-block">Zurück zur Übersicht</Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Header */}
      <div className="relative h-96 bg-slate-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${service.image})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-slate-900/50 to-transparent transition-colors duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <Link to="/services" className="text-slate-200 hover:text-white flex items-center gap-2 mb-6 text-sm font-bold uppercase tracking-wider transition-colors">
            <ArrowLeft size={16} /> Zurück zur Übersicht
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-2 shadow-sm dark:shadow-none">{service.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-16">
          
          {/* Main Content */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Warum ist diese Reinigung wichtig?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-light">
              {service.description}
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Ihre Vorteile</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {service.benefits.map((benefit: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg">
                  <CheckCircle2 className="text-blue-600 dark:text-blue-500 shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Unser Arbeitsablauf</h3>
            <div className="space-y-6 relative pl-6 border-l border-slate-200 dark:border-slate-800">
              {service.process.map((step: string, idx: number) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[29px] top-1 w-5 h-5 rounded-full bg-white dark:bg-slate-950 border-4 border-blue-600"></div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Schritt {idx + 1}</h4>
                  <p className="text-slate-600 dark:text-slate-400">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 sticky top-24 shadow-lg dark:shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Interesse geweckt?</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed">
                Gerne erstellen wir Ihnen ein unverbindliches Angebot für Ihr Objekt in Cottbus und Umgebung.
              </p>
              
              <Link to="/contact" className="block w-full bg-blue-600 text-white text-center py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors mb-6 shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20">
                Angebot anfordern
              </Link>
              
              <div className="flex items-center gap-3 justify-center text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-6">
                <Phone size={20} className="text-blue-600 dark:text-blue-500" />
                <span className="font-bold text-lg">{content.contact.phone}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};