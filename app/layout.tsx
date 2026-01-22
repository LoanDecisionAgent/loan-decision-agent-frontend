import '../globals.css';
import { UserProvider } from '../lib/user-context';
import { I18nProvider } from '../lib/i18n';
import ErrorBoundary from '../components/ErrorBoundary';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white dark:bg-slate-950 font-display transition-colors duration-200 selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
        <UserProvider>
          <I18nProvider>
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </I18nProvider>
        </UserProvider>
      </body>
    </html>
  );
}
