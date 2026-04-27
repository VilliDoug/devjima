import { login, register } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

// TODO: confirm email field on register
// TODO: confirm password field on register  
// TODO: username availability check (needs backend endpoint too)
// TODO: change password endpoint + page
export default function RegisterUser() {
  const { login: authLogin } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      const { token, userId } = await login(email, password);
      authLogin(token, userId, username);
      router.push('/');
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="font-bold text-xl" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {'<'}<span className="text-devjima-teal">Dev</span>{'>'}Jima
          </span>
          <h1 className="text-2xl font-bold mt-4 mb-1">Create an account</h1>
          <p className="text-sm text-gray-500">Join the community today</p>
        </div>

        {error && (
          <div className="bg-red-950/40 border border-red-800/50 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border border-gray-700 bg-transparent rounded-lg px-4 py-2.5 text-sm outline-none focus:border-devjima-teal transition-colors"
          />
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
            Sign up
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-devjima-teal no-underline hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}