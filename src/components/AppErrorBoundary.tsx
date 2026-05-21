import React, { type ErrorInfo, type ReactNode } from 'react';

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

export default class AppErrorBoundary extends React.Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  constructor(props: AppErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[App] Runtime render failure caught by boundary.', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-luxury-black px-6 text-center text-white">
          <div className="max-w-xl">
            <p className="font-display text-4xl font-bold text-gold">Prestige de Jeux</p>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-white/60">Chargement interrompu</p>
            <p className="mt-5 text-white/75">
              Une section n'a pas pu s'afficher. Rechargez la page ou revenez a l'accueil.
            </p>
            <a
              href={import.meta.env.BASE_URL}
              className="mt-8 inline-flex rounded-full border border-gold/50 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-black"
            >
              Accueil
            </a>
          </div>
        </main>
      );
    }

    return (this as React.Component<AppErrorBoundaryProps, AppErrorBoundaryState>).props.children;
  }
}
