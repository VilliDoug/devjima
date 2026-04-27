import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/AuthContext';
import { login } from '@/lib/api';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const { login: authLogin } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            const { token, userId, username } = await login(email, password);
            authLogin(token, userId, username);
            router.push('/');
        } catch {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex mt-30 justify-center px-6">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-8">
                    <span className="font-bold text-3xl" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {'<'}<span className="text-devjima-teal">Dev</span>{'>'}Jima
                    </span>
                    <h1 className="text-2xl font-bold mt-10 mb-1">Welcome back</h1>
                    <p className="text-sm text-gray-500 mt-5">Sign in to your account</p>
                </div>

                {error && (
                    <div className="bg-red-950/40 border border-red-800/50 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="border border-gray-700 bg-transparent rounded-lg px-4 py-2.5 text-sm outline-none focus:border-devjima-teal transition-colors"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="border border-gray-700 bg-transparent rounded-lg px-4 py-2.5 text-sm outline-none focus:border-devjima-teal transition-colors"
                    />
                    <button type="submit"
                        className="bg-devjima-teal text-white py-2.5 rounded-lg text-sm font-medium hover:bg-devjima-teal-hover transition-colors mt-1">
                        Login
                    </button>
                </form>

                <p className="mt-6 text-sm text-gray-500 text-center">
                    No account?{" "}
                    <Link href="/register" className="text-devjima-teal no-underline hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}