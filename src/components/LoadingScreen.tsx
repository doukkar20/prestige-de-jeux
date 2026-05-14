import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { brandLogo } from '../data/brandAssets';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Brand mark */}
          <motion.div
            initial={{ scale: 0.86, opacity: 0 }}
            animate={{ scale: [1, 1.04, 1], opacity: 1 }}
            transition={{
              opacity: { duration: 0.8, ease: 'easeOut' },
              scale: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' },
            }}
            className="relative mb-8 flex items-center justify-center"
          >
            <span className="absolute inset-0 rounded-full bg-gold/20 blur-3xl" />
            {logoFailed ? (
              <span className="relative font-display text-3xl md:text-5xl font-bold gold-text">Prestige de jeux</span>
            ) : (
              <img
                src={brandLogo.src}
                width={brandLogo.width}
                height={brandLogo.height}
                alt={brandLogo.alt}
                onError={() => setLogoFailed(true)}
                className="relative h-28 w-auto object-contain drop-shadow-[0_0_35px_rgba(212,175,55,0.4)] md:h-36"
              />
            )}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full bg-gold/20 blur-2xl -z-10"
            />
          </motion.div>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="h-[1px] bg-gold/50 mt-4"
          />

          {/* Background Sparks/Fire Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: window.innerHeight + 10,
                  opacity: 0 
                }}
                animate={{ 
                  y: -10,
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                className="absolute w-1 h-1 bg-fire rounded-full blur-[1px]"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
