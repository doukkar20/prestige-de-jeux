/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import ScrollToAnchor from './components/ScrollToAnchor';
import SEO from './components/SEO';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import Tournaments from './pages/Tournaments';
import Reservation from './pages/Reservation';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';

import FAQ from './pages/FAQ';
import Pricing from './pages/Pricing';

export default function App() {
  const basename = import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <LanguageProvider>
      <BrowserRouter basename={basename}>
        <ScrollToAnchor />
        <SEO />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="menu" element={<Menu />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="tournaments" element={<Tournaments />} />
            <Route path="reservation" element={<Reservation />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="pricing" element={<Pricing />} />
          </Route>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
