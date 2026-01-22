"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[400px] flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 animate-fade-in">
                    <div className="text-center max-w-md">
                        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/10 animate-pulse-glow">
                            <span className="material-symbols-outlined text-4xl">error_outline</span>
                        </div>

                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                            Something went wrong
                        </h2>

                        <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                            We encountered an unexpected error while rendering this component.
                            Our team has been notified.
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined">refresh</span>
                                Reload Page
                            </button>

                            <button
                                onClick={() => this.setState({ hasError: false, error: null })}
                                className="px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:scale-105 active:scale-95"
                            >
                                Try Again
                            </button>
                        </div>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mt-8 text-left">
                                <details className="cursor-pointer group">
                                    <summary className="text-xs font-bold text-slate-400 hover:text-indigo-500 uppercase tracking-widest transition-colors mb-2">
                                        Show Error Details
                                    </summary>
                                    <pre className="p-4 bg-slate-950 text-slate-300 rounded-xl text-xs font-mono overflow-auto max-h-48 border border-slate-800">
                                        {this.state.error.toString()}
                                        {'\n'}
                                        {this.state.error.stack}
                                    </pre>
                                </details>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
