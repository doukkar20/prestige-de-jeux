/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {lazy, Suspense} from 'react';
import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import ScrollToAnchor from './components/ScrollToAnchor';
import SEO from './components/SEO';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Menu = lazy(() => import('./pages/Menu'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Tournaments = lazy(() => import('./pages/Tournaments'));
const Reservation = lazy(() => import('./pages/Reservation'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Pricing = lazy(() => import('./pages/Pricing'));

export default function App() {
  const basename = import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <LanguageProvider>
      <BrowserRouter basename={basename}>
        <ScrollToAnchor />
        <SEO />
        <Suspense fallback={<div className="min-h-screen bg-luxury-black" />}>
          <Routes>
            <Route path="/dist/*" element={<Navigate to="/" replace />} />
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
        </Suspense>
      </BrowserRouter>
    </LanguageProvider>
  );
}
