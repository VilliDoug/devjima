import { getAllTags } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { Tag } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const [tagsOpen, setTagsOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('tagsOpen') === 'true';
  });
  const [mounted, setMounted] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);

  const toggleTags = () => {
    const next = !tagsOpen;
    setTagsOpen(next);
    localStorage.setItem('tagsOpen', String(next));
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getAllTags()
      .then((data) => setTags(data))
      .catch((err) => console.error(err))
      .finally(() => setMounted(true));
  }, []);

  if (!mounted)
    return (
      <aside className="w-[240px] shrink-0 border-r border-gray-800 bg-[#0d0d0d] sticky top-0"
             style={{ height: 'calc(100vh - 52px)' }} />
    );

  return (
    <aside className="w-[240px] shrink-0 border-r border-gray-800 bg-[#0d0d0d] sticky top-0 flex flex-col gap-1 px-4 py-6 overflow-y-auto"
           style={{ height: 'calc(100vh - 52px)' }}>

      {/* Home */}
      <Link href="/"
        className={`flex items-center gap-3 px-3 py-2 rounded-lg no-underline text-sm transition-all ${
          router.pathname === "/" 
            ? "text-white bg-[#1a1a1a] font-medium" 
            : "text-gray-500 hover:text-gray-300"
        }`}>
        ⌂ Home
      </Link>

      {/* Tags */}
      <div>
        <button onClick={toggleTags}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg border-none cursor-pointer text-gray-500 bg-transparent text-sm text-left hover:text-gray-300 transition-colors">
          <span># Tags</span>
          <span className="text-[10px] transition-transform duration-200"
                style={{ transform: tagsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
        </button>

        {tagsOpen && (
          <div className="pl-3 flex flex-col gap-0.5 mt-1">
            {tags.map(tag => (
              <a key={tag.id} href={`/?tag=${tag.slug}`}
                className="px-2.5 py-1 rounded-md no-underline text-sm text-gray-600 hover:text-devjima-teal transition-colors">
                {tag.name}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 my-2" />

      {/* Language */}
      <div className="px-3 py-2">
        <p className="text-[11px] text-gray-700 mb-2 uppercase tracking-widest">Language</p>
        <div className="flex gap-1.5">
          {["en", "ja"].map(lang => (
            <button key={lang}
              className="px-3 py-1 rounded-full border border-gray-800 bg-transparent text-gray-600 text-xs cursor-pointer hover:border-devjima-teal hover:text-devjima-teal transition-all">
              {lang === "en" ? "EN" : "JP"}
            </button>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Write post */}
      {isLoggedIn && (
        <Link href="/posts/new"
          className="block text-center px-4 py-2.5 bg-devjima-teal rounded-lg text-white no-underline text-sm font-medium hover:bg-devjima-teal-hover transition-colors mb-9">
          + Write post
        </Link>
      )}
    </aside>
  );
}