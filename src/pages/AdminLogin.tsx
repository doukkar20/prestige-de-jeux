import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, User, AlertCircle } from 'lucide-react';
import { aboutImage } from '../data/galleryImages';
import { brandLogo } from '../data/brandAssets';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [logoFailed, setLogoFailed] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim() !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      setError('Identifiant ou mot de passe incorrect');
      return;
    }

    localStorage.setItem('prestige_token', `local-admin-${Date.now()}`);
    navigate('/admin/dashboard');
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden p-6">
      <img
        src={aboutImage.src}
        width={aboutImage.width}
        height={aboutImage.height}
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        alt=""
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/80" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md bg-luxury-gray border border-gold/20 p-10 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="relative mb-3 inline-flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-gold/20 blur-2xl opacity-70" />
            {logoFailed ? (
              <span className="relative text-3xl font-display font-bold gold-text">Prestige de jeux</span>
            ) : (
              <img
                src={brandLogo.src}
                width={brandLogo.width}
                height={brandLogo.height}
                alt={brandLogo.alt}
                onError={() => setLogoFailed(true)}
                className="relative h-20 w-auto object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]"
              />
            )}
          </span>
          <p className="text-white/40 text-xs uppercase tracking-[0.3em]">Portail Administration</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 flex items-center space-x-3 mb-6 animate-shake">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gold font-bold">Identifiant</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-gold/50" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black border border-white/10 p-3 pl-10 focus:border-gold outline-none text-sm transition-all"
                placeholder="admin"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gold font-bold">Mot de Passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gold/50" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 p-3 pl-10 focus:border-gold outline-none text-sm transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button type="submit" className="w-full btn-gold !py-3">
            Accéder au Dashboard
          </button>
        </form>

        <div className="mt-8 text-center">
            <a href="/" className="text-white/30 text-xs hover:text-gold transition-colors">Retour au site public</a>
        </div>
      </motion.div>
    </div>
  );
}
