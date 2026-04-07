import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/AuthContext';
import { login } from '@/lib/api';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login: authLogin} = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            const token = await login(email, password);
            authLogin(token);
            router.push('/');
        } catch {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 px-6">
            <h1 className="text-2xl font-bold mb-8">Login</h1>
            {error && <p className="text-red-500 mb-4">{error}</p> }
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input 
                type="email"
                 placeholder="Email"
                  value={email}
                   onChange={e => setEmail(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2" />
                    <input 
                    type="password"
                     placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="border border-gray-300 rounded px-4 py-2"
                       />
                       <button type="submit" className="bg-black text-white py-2 rounded hover:bg-gray-800">
                        Login
                       </button>
            </form>
            <p className="mt-4 text-sm text-gray-600">
                No account? <Link href="/register" className="underline">Sign up</Link>
            </p>
        </div>
    );
}