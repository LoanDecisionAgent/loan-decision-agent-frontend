"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es' | 'fr';

interface Translations {
    [key: string]: {
        [key in Language]: string;
    };
}

const translations: Translations = {
    dashboard: {
        en: 'Dashboard',
        es: 'Tablero',
        fr: 'Tableau de bord',
    },
    vendors: {
        en: 'Vendors',
        es: 'Vendedores',
        fr: 'Vendeurs',
    },
    profile: {
        en: 'Profile',
        es: 'Perfil',
        fr: 'Profil',
    },
    apiKeys: {
        en: 'API Keys',
        es: 'Claves API',
        fr: 'Clés API',
    },
    auditLogs: {
        en: 'Audit Logs',
        es: 'Registros de auditoría',
        fr: 'Journaux d\'audit',
    },
    settings: {
        en: 'Settings',
        es: 'Configuración',
        fr: 'Paramètres',
    },
    signOut: {
        en: 'Sign Out',
        es: 'Cerrar sesión',
        fr: 'Déconnexion',
    },
    welcomeBack: {
        en: 'Welcome back',
        es: 'Bienvenido de nuevo',
        fr: 'Bon retour',
    },
    search: {
        en: 'Search...',
        es: 'Buscar...',
        fr: 'Chercher...',
    },
    notifications: {
        en: 'Notifications',
        es: 'Notificaciones',
        fr: 'Notifications',
    },
    docs: {
        en: 'Documentation',
        es: 'Documentación',
        fr: 'Documentation',
    }
};

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    // Load language from local storage on mount
    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && ['en', 'es', 'fr'].includes(savedLang)) {
            setLanguage(savedLang);
        }
    }, []);

    // Save language to local storage when changed
    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key: string): string => {
        if (translations[key] && translations[key][language]) {
            return translations[key][language];
        }
        return key; // Fallback to key if translation missing
    };

    return (
        <I18nContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}
