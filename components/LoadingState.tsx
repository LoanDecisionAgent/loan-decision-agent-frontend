import React from 'react';

export default function LoadingState({ message = 'Loading...' }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-100 dark:border-indigo-900/30"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                <div className="absolute inset-4 rounded-full bg-indigo-50 dark:bg-indigo-900/20 animate-pulse"></div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">
                {message}
            </p>
        </div>
    );
}
