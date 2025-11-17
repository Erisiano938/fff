'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSiteTexts } from '../lib/textService';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const texts = useSiteTexts();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigationItems = [
    {
      title: texts.navDashboard,
      href: '/dashboard',
      subItems: [
        { title: 'Aperçu du Portefeuille', href: '/dashboard', icon: 'ri-pie-chart-line' },
        { title: 'Allocation d\'Actifs', href: '/allocation', icon: 'ri-bar-chart-line' },
        { title: 'Simulateur de Retraite', href: '/dashboard#retirement', icon: 'ri-time-line' },
        { title: 'Calculateur Fiscal', href: '/dashboard#tax', icon: 'ri-calculator-line' },
        { title: 'Recommandations AI', href: '/dashboard#ai', icon: 'ri-robot-line' },
        { title: 'Ingénierie Patrimoniale', href: '/dashboard#engineering', icon: 'ri-settings-3-line' }
      ]
    },
    {
      title: 'Trading',
      href: '/trading',
      subItems: [
        { title: 'Dashboard Trading', href: '/trading', icon: 'ri-line-chart-line' },
        { title: 'Graphiques en Temps Réel', href: '/trading#charts', icon: 'ri-bar-chart-box-line' },
        { title: 'Outils de Trading', href: '/trading#tools', icon: 'ri-tools-line' },
        { title: 'Création de Contenu', href: '/trading#content', icon: 'ri-edit-line' },
        { title: 'Analyse Technique', href: '/trading#analysis', icon: 'ri-search-line' },
        { title: 'Positions Ouvertes', href: '/trading#positions', icon: 'ri-wallet-line' }
      ]
    },
    {
      title: texts.navOpportunities,
      href: '/opportunities',
      subItems: [
        { title: 'Analyse Temps Réel', href: '/opportunities', icon: 'ri-radar-line' },
        { title: 'Marchés Publics BOAMP', href: '/opportunities#boamp', icon: 'ri-government-line' },
        { title: 'Analyse Sectorielle', href: '/opportunities#sectors', icon: 'ri-building-line' },
        { title: 'Brevets & Innovation', href: '/opportunities#patents', icon: 'ri-lightbulb-line' },
        { title: 'Dirigeants & Mouvements', href: '/opportunities#executives', icon: 'ri-team-line' }
      ]
    },
    {
      title: texts.navIndicators,
      href: '/indicators',
      subItems: [
        { title: 'Marketplace', href: '/indicators', icon: 'ri-store-line' },
        { title: 'Indicateurs Crypto', href: '/indicators#crypto', icon: 'ri-coin-line' },
        { title: 'Indicateurs Forex', href: '/indicators#forex', icon: 'ri-exchange-line' },
        { title: 'Indicateurs Actions', href: '/indicators#stocks', icon: 'ri-stock-line' },
        { title: 'Indicateurs Personnalisés', href: '/indicators#custom', icon: 'ri-tools-line' }
      ]
    },
    {
      title: 'Formation Interactive',
      href: '/formation-interactive',
      subItems: [
        { title: texts.navAcademy, href: '/academy', icon: 'ri-graduation-cap-line' },
        { title: 'Trading Débutant', href: '/academy/trading-debutant', icon: 'ri-seedling-line' },
        { title: 'Analyse Technique', href: '/academy/analyse-technique', icon: 'ri-line-chart-line' },
        { title: 'Analyse Fondamentale', href: '/academy/analyse-fondamentale', icon: 'ri-file-text-line' },
        { title: 'Gestion des Risques', href: '/academy/gestion-risques', icon: 'ri-shield-line' },
        { title: 'Trading Avancé', href: '/academy/trading-avance', icon: 'ri-rocket-line' },
        { title: 'Psychologie du Trading', href: '/academy/psychologie', icon: 'ri-brain-line' }
      ]
    },
    {
      title: texts.navContact,
      href: '/contact',
      subItems: [
        { title: 'Nous Contacter', href: '/contact', icon: 'ri-mail-line' },
        { title: 'Support Client', href: '/contact#support', icon: 'ri-customer-service-line' },
        { title: 'Demande de Devis', href: '/contact#quote', icon: 'ri-file-list-line' },
        { title: 'Partenariats', href: '/contact#partnership', icon: 'ri-handshake-line' }
      ]
    }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-yellow-500/20">
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <div className="h-20 w-auto object-contain flex items-center">
              {!logoError ? (
                <img 
                  src="https://static.readdy.ai/image/2fd303749c7ebdaed28729a47deb56cb/80b17f25e3a532af122faeda0213970f.png"
                  alt="Valeris Capital Logo"
                  className="h-24 w-auto object-contain bg-transparent"
                  style={{ mixBlendMode: 'multiply' }}
                  onError={() => setLogoError(true)}
                  onLoad={() => setLogoError(false)}
                />
              ) : (
                <span className="text-2xl font-normal text-yellow-400 uppercase font-semibold">
                  VALERIS CAPITAL
                </span>
              )}
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative group">
                <Link 
                  href={item.href}
                  className="px-4 py-2 text-white hover:text-yellow-400 transition-colors font-medium rounded-lg hover:bg-black/50 whitespace-nowrap"
                >
                  {item.title}
                  <i className="ri-arrow-down-s-line ml-1 text-sm group-hover:rotate-180 transition-transform"></i>
                </Link>
                
                <div className="absolute top-full left-0 mt-2 w-80 bg-black/95 backdrop-blur-md border border-yellow-500/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-4">
                    <div className="text-xs text-yellow-400 font-semibold mb-3 uppercase tracking-wide">
                      {item.title}
                    </div>
                    <div className="grid gap-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-yellow-500/10 hover:border-yellow-500/30 border border-transparent transition-all group/sub"
                        >
                          <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center group-hover/sub:bg-yellow-500/30 transition-colors">
                            <i className={`${subItem.icon} text-yellow-400 text-sm`}></i>
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium group-hover/sub:text-yellow-400 transition-colors">
                              {subItem.title}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              href="/admin/dashboard" 
              className="px-4 py-2 bg-black hover:bg-yellow-400 hover:text-black text-white border border-yellow-400 rounded-lg transition-colors font-medium whitespace-nowrap cursor-pointer"
            >
              Admin
            </Link>
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all cursor-pointer whitespace-nowrap font-medium"
            >
              {texts.btnLogin}
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all cursor-pointer whitespace-nowrap font-medium shadow-lg"
            >
              {texts.btnRegister}
            </Link>
          </div>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-black/50 transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl text-white`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-yellow-500/20 rounded-b-lg">
            <nav className="p-4 space-y-4">
              {navigationItems.map((item, index) => (
                <div key={index} className="border-b border-yellow-500/20 pb-4 last:border-b-0">
                  <Link 
                    href={item.href}
                    className="block text-yellow-400 font-semibold text-lg mb-3 hover:text-yellow-300 transition-colors"
                  >
                    {item.title}
                  </Link>
                  <div className="grid gap-2 pl-4">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-black/50 transition-colors"
                      >
                        <i className={`${subItem.icon} text-yellow-400 text-sm`}></i>
                        <span className="text-white text-sm">{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-yellow-500/20">
                <Link
                  href="/admin/dashboard"
                  className="px-4 py-2 bg-black text-white border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition-all cursor-pointer whitespace-nowrap font-medium"
                >
                  <i className="ri-admin-line mr-2"></i>
                  Administration
                </Link>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all cursor-pointer whitespace-nowrap font-medium"
                >
                  {texts.btnLogin}
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all cursor-pointer whitespace-nowrap font-medium shadow-lg"
                >
                  {texts.btnRegister}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
