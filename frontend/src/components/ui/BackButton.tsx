import { useRouter } from "next/router";

interface Props {
  href?: string;
}

export default function BackButton({ href }: Props) {
  const router = useRouter();

  return (
    <button
      onClick={() => href? router.push(href) : router.back()}
      className="flex items-center gap-2 text-sm text-gray-500 hover:text-devjima-teal transition-colors mb-4 bg-transparent border-none cursor-pointer p-0"
    >
      ← Back
    </button>
  );
}
