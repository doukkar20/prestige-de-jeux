import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToAnchor() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.replace('#', '');
    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    scrollToElement();
    const timer = window.setTimeout(scrollToElement, 100);
    return () => window.clearTimeout(timer);
  }, [pathname, hash, key]);

  return null;
}
