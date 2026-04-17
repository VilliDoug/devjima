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

  const {login: authLogin} = useAuth();
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
      authLogin(token, userId);
      router.push('/')
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-6">
      <h1 className="text-2xl font-bold mb-8">Sign up</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border border-gray-600 bg-transparent rounded px-4 py-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-gray-600 bg-transparent rounded px-4 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-gray-600 bg-transparent rounded px-4 py-2"
        />
        <button
          type="submit"
          className="bg-devjima-teal text-white py-2 rounded hover:bg-devjima-teal-hover transition-colors"
        >
          Sign up
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-400">
        Already have an account? <Link href="/login" className="underline">Login</Link>
      </p>
    </div>
);
}
