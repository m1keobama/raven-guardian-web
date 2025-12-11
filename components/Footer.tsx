import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Phone, Mail, Instagram, Facebook, Lock } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export const Footer: React.FC = () => {
  const { content } = useContent();

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Shield size={24} className="text-blue-600" />
              <span className="text-xl font-bold uppercase tracking-wider">Raven Guardian</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              {content.footer.text}
            </p>
            <div className="flex gap-4">
              <a href={content.footer.social.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors"><Facebook size={20} /></a>
              <a href={content.footer.social.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Kontakt</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-600 mt-0.5" />
                <span>{content.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-600" />
                <span>{content.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-600" />
                <span>{content.contact.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-white transition-colors">Dachreinigung</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Solarreinigung</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Flächenpflege</Link></li>
              <li><Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link></li>
              <li><Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-900 pt-8 flex justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} Raven Guardian Flächenpflege Cottbus. Alle Rechte vorbehalten.</p>
          <Link to="/admin" className="text-slate-800 hover:text-slate-700 p-1"><Lock size={12} /></Link>
        </div>
      </div>
    </footer>
  );
};