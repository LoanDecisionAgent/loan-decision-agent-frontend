"use client";

import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className="animate-fade-in">
            {children}
        </div>
    );
}
