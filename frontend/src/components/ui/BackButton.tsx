import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-sm text-gray-500 hover:text-devjima-teal transition-colors mb-4 bg-transparent border-none cursor-pointer p-0"
    >
      ← Back
    </button>
  );
}
