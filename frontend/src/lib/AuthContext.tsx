import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    userId: number | null;
    isLoggedIn: boolean;
    login: (token: string, userId: number) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: ReactNode}) {
    const [token, setToken] = useState<string | null>(() => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('token');  
    });

    const [userId, setUserId] = useState<number | null>(() => {
        if (typeof window === 'undefined') return null;
        const stored = localStorage.getItem('userId');
        return stored ? Number(stored) : null;
    });
        

    const login = (newToken: string, newUserId: number) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('userId', String(newUserId));
        setToken(newToken);
        setUserId(newUserId);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setToken(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ token, isLoggedIn: !!token, login, logout, userId}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}