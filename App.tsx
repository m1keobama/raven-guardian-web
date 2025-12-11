import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ChatWidget } from './components/Widget/ChatWidget';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { ContentProvider, useContent } from './contexts/ContentContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const EditButton = () => {
  const { isAdmin } = useContent();
  if (!isAdmin) return null;
  
  return (
    <Link 
      to="/admin" 
      className="fixed bottom-6 left-6 z-50 bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2 font-bold transition-all hover:scale-105"
    >
      <Edit3 size={24} />
      <span className="hidden md:inline">Inhalte bearbeiten</span>
    </Link>
  );
};

// Geheime Login-Komponente
const SecretLogin: React.FC = () => {
  const { login } = useContent();
  
  useEffect(() => {
    login();
  }, [login]);

  return <Navigate to="/admin" replace />;
};

const AppContent: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-200 flex flex-col selection:bg-blue-500 selection:text-white transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          {/* GEHEIME ROUTE: Loggt sofort ein */}
          <Route path="/secret" element={<SecretLogin />} />
        </Routes>
      </main>

      <Footer />
      <ChatWidget />
      <EditButton />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ContentProvider>
        <AppContent />
      </ContentProvider>
    </ThemeProvider>
  );
};

export default App;