import Link from "next/link";

export default function NotFound() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
            <h1 className="text-6xl font-bold text-devjima-teal mb-4">404</h1>
            <p className="text-gray-400 mb-8">Page not found.</p>
            <Link href="/" className="text-devjima-teal underline">Go home</Link>
        </div>
    );
}