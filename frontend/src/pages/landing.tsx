import Link from "next/link";
import { useEffect, useState } from "react";
import { getPostCount, getMemberCount, getCountryCount } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import router from "next/router";
import MeganeBashi from "@/components/ui/MeganeBashi";
import Footer from "@/components/layout/Footer";

export default function Landing() {
  const [visible, setVisible] = useState(false);
  const [postCount, setPostCount] = useState<number>(0);
  const [memberCount, setMemberCount] = useState<number>(0);
  const [countryCount, setCountryCount] = useState<number>(0);

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) router.push('/');
  }, [isLoggedIn]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setVisible(true);
    getPostCount().then(setPostCount);
    getMemberCount().then(setMemberCount);
    getCountryCount().then(setCountryCount);
  }, []);

  const fadeUp = (delay: string): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(32px)",
    transition: `all 0.7s ${delay} ease`,
  });

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-12 py-5 border-b border-gray-900">
        <span className="font-bold text-lg" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          &lt;<span className="text-devjima-teal">Dev</span>&gt;Jima
        </span>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-gray-500 no-underline hover:text-gray-300 transition-colors">Feed</Link>
          <Link href="/login" className="text-sm px-4 py-1.5 border border-gray-700 rounded-full text-gray-300 no-underline hover:border-devjima-teal hover:text-white transition-colors">Login</Link>
          <Link href="/register" className="text-sm px-4 py-1.5 bg-devjima-teal border border-devjima-teal rounded-full text-white no-underline hover:bg-devjima-teal-hover transition-colors">Sign up</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-12 pt-20 pb-16">

        {/* Beta badge */}
        <h2 className="font-bold text-4xl mb-6" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          &lt;<span className="text-devjima-teal">Dev</span>&gt;Jima
        </h2>
        <div className="inline-flex items-center gap-2 text-xs text-devjima-teal border border-[#1F5C52] rounded-full px-3.5 py-1.5 mb-8"
             style={{ ...fadeUp('0s'), fontFamily: 'JetBrains Mono, monospace' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-devjima-teal inline-block" style={{ animation: 'pulse 2s infinite' }} />
          Now in beta · 長崎発、世界へ
        </div>

        {/* Title */}
        
        <h1 className="text-7xl font-bold leading-none tracking-tighter max-w-[800px] mb-2"
            style={fadeUp('0.15s')}>
          Bridge the <span className="text-devjima-teal">Gap</span>{" "}
          <span className="text-pink-400">.</span>
        </h1>
        {/* 眼鏡橋 Bridge SVG */}
        <div className="w-full max-w-[600px] mb-16" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s 0.6s ease' }}>
  <MeganeBashi />
</div>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 max-w-[520px] leading-relaxed mb-1"
           style={fadeUp('0.3s')}>
          A bilingual developer community connecting Japanese tech culture with the world.
        </p>
        <p className="text-sm text-gray-700 mb-10" style={fadeUp('0.3s')}>
          日本のテック文化と世界をつなぐ、バイリンガル開発者コミュニティ。
        </p>

        {/* CTA buttons */}
        <div className="flex gap-3 mb-16" style={fadeUp('0.45s')}>
          <Link href="/" className="px-7 py-3 bg-devjima-teal rounded-md text-white text-sm font-medium no-underline hover:bg-devjima-teal-hover transition-colors">
            Explore feed
          </Link>
          <Link href="/register" className="px-7 py-3 bg-pink-500 rounded-md text-white text-sm font-medium no-underline hover:bg-pink-700 transition-colors">
            Join DevJima
          </Link>
          <Link href="/login" className="px-7 py-3 bg-transparent border border-gray-800 rounded-md text-gray-500 text-sm no-underline hover:border-gray-500 hover:text-gray-300 transition-colors">
            Already a member?
          </Link>
        </div>

        

        {/* Stats */}
        <div className="flex gap-12 py-5 border-t border-b border-[#111] w-full max-w-[500px] justify-center mb-4"
             style={fadeUp('0.7s')}>
          {[[postCount, "Posts"], [memberCount, "Members"], [countryCount, "Countries"]].map(([num, label]) => (
            <div key={String(label)} className="text-center">
              <div className="text-3xl font-bold text-devjima-teal" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {Number(num) > 0 ? `${num}+` : "—"}
              </div>
              <div className="text-xs text-gray-600 mt-0.5">{String(label)}</div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-700 mb-20" style={fadeUp('0.8s')}>
          Write, share, and collaborate with developers across the language gap.
        </p>
      </section>

      {/* Value prop cards */}
      <div className="px-12 pb-20">
        <div className="grid grid-cols-3 gap-px bg-[#111] border border-[#111] rounded-xl overflow-hidden max-w-[900px] mx-auto mb-20">
          {[
            { accent: "#2D7D6F", title: "For Japanese developers", body: "Get global perspectives on your career, code, and culture. Connect with engineers from around the world." },
            { accent: "#D4537E", title: "For foreign engineers", body: "Gain practical insight into Japan's tech culture. Navigate the job market with help from those who've done it." },
            { accent: "#333", title: "Bilingual by design", body: "Posts in English and Japanese, side by side. Real conversation across the language gap." },
          ].map(({ accent, title, body }) => (
            <div key={title} className="bg-[#0e0e0e] px-7 py-8">
              <div className="w-6 h-0.5 rounded-sm mb-4" style={{ background: accent }} />
              <h3 className="text-sm font-semibold mb-2 text-gray-200">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center px-12 py-16 border-t border-[#111]">
        <h2 className="text-4xl font-bold tracking-tight mb-3">Ready to cross the bridge?</h2>
        <p className="text-sm text-gray-600 mb-7">Join the community where Japan&apos;s tech world meets the rest.</p>
        <div className="flex gap-3 justify-center mb-4">
          <Link href="/register" className="px-7 py-3 bg-pink-500 rounded-md text-white text-sm font-medium no-underline hover:bg-pink-700 transition-colors">
            Join DevJima
          </Link>
          <Link href="/" className="px-7 py-3 bg-devjima-teal rounded-md text-white text-sm font-medium no-underline hover:bg-devjima-teal-hover transition-colors">
            Explore feed
          </Link>
        </div>
        <p className="text-xs text-gray-700">
          Already a member?{" "}
          <Link href="/login" className="text-devjima-teal no-underline hover:underline">Login here</Link>
        </p>
      </div>

      <Footer />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}