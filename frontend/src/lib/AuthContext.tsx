import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    userId: number | null;
    username: string | null;
    isLoggedIn: boolean;
    login: (token: string, userId: number, username: string) => void;
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

    const [username, setUsername] = useState<string | null>(() => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('username');        
    })
        

    const login = (newToken: string, newUserId: number, newUsername: string) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('userId', String(newUserId));
        localStorage.setItem('username', newUsername);
        setToken(newToken);
        setUserId(newUserId);
        setUsername(newUsername);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        setToken(null);
        setUserId(null);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ token, isLoggedIn: !!token, login, logout, userId, username}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}