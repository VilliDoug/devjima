import Link from "next/link";
import { useEffect, useState } from "react";
import { getPostCount, getMemberCount, getCountryCount } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import router from "next/router";

export default function Landing() {
  const [visible, setVisible] = useState(false);
  const [bridgeKey, setBridgeKey] = useState(0);
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

    const interval = setInterval(() => {
      setBridgeKey((k) => k + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const btn = (bg: string): React.CSSProperties => ({
    padding: "12px 28px",
    background: bg,
    borderRadius: "6px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 500,
    textDecoration: "none",
    transition: "background 0.2s ease",
    display: "inline-block",
  });

  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 48px",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >&lt;
          <span style={{ color: "#2D7D6F" }}>Dev</span>&gt;Jima
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link
            href="/"
            style={{ fontSize: "14px", color: "#888", textDecoration: "none" }}
          >
            Feed
          </Link>
          <Link
            href="/login"
            style={{
              fontSize: "13px",
              padding: "7px 16px",
              border: "1px solid #333",
              borderRadius: "20px",
              color: "#ccc",
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = "#2D7D6F";
              (e.target as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = "#333";
              (e.target as HTMLElement).style.color = "#ccc";
            }}
          >
            Login
          </Link>
          <Link
            href="/register"
            style={{
              fontSize: "13px",
              padding: "7px 16px",
              border: "1px solid #2D7D6F",
              borderRadius: "20px",
              color: "#fff",
              textDecoration: "none",
              background: "#2D7D6F",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.background = "#1F5C52")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.background = "#2D7D6F")
            }
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "80px 48px 60px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            color: "#2D7D6F",
            border: "1px solid #1F5C52",
            borderRadius: "20px",
            padding: "5px 14px",
            marginBottom: "32px",
            fontFamily: "JetBrains Mono, monospace",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#2D7D6F",
              display: "inline-block",
              animation: "pulse 2s infinite",
            }}
          />
          Now in beta · 長崎発、世界へ
        </div>

        <h1
          style={{
            fontSize: "72px",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-3px",
            maxWidth: "800px",
            marginBottom: "8px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.7s 0.15s ease",
          }}
        >
          Bridge the <span style={{ color: "#2D7D6F" }}>Gap</span>{" "}
          <span style={{ color: "#D4537E" }}>.</span>
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#666",
            maxWidth: "520px",
            lineHeight: 1.6,
            marginBottom: "4px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.7s 0.3s ease",
          }}
        >
          A bilingual developer community connecting Japanese tech culture with
          the world.
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#444",
            marginBottom: "40px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.7s 0.3s ease",
          }}
        >
          日本のテック文化と世界をつなぐ、バイリンガル開発者コミュニティ。
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "64px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.7s 0.45s ease",
          }}
        >
          <Link
            href="/"
            style={{ ...btn("#2D7D6F") }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#1F5C52")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#2D7D6F")
            }
          >
            Explore feed
          </Link>
          <Link
            href="/register"
            style={{ ...btn("#D4537E") }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#993556")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#D4537E")
            }
          >
            Join DevJima
          </Link>
          <Link
            href="/login"
            style={{
              padding: "12px 28px",
              background: "transparent",
              border: "1px solid #2a2a2a",
              borderRadius: "6px",
              color: "#888",
              fontSize: "13px",
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#555";
              (e.currentTarget as HTMLElement).style.color = "#ccc";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a";
              (e.currentTarget as HTMLElement).style.color = "#888";
            }}
          >
            Already a member?
          </Link>
        </div>

        {/* Bridge SVG — loops every 4s */}
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            marginBottom: "64px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s 0.6s ease",
          }}
        >
          <svg
            key={bridgeKey}
            viewBox="0 0 600 60"
            fill="none"
            style={{ width: "100%", height: "60px" }}
          >
            <line
              x1="0"
              y1="30"
              x2="600"
              y2="30"
              stroke="#1a1a1a"
              strokeWidth="1"
            />
            <path
              d="M50 30 Q150 5 300 15 Q450 25 550 30"
              stroke="#2D7D6F"
              strokeWidth="1.5"
              fill="none"
              style={{
                strokeDasharray: 600,
                strokeDashoffset: 0,
                animation: "drawBridge 1.5s ease forwards",
              }}
            />
            <circle cx="50" cy="30" r="5" fill="#2D7D6F" opacity="0.8" />
            <circle cx="300" cy="15" r="3" fill="#D4537E" />
            <circle cx="550" cy="30" r="5" fill="#D4537E" opacity="0.8" />
          </svg>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            padding: "20px 0",
            borderTop: "1px solid #111",
            borderBottom: "1px solid #111",
            width: "100%",
            maxWidth: "500px",
            justifyContent: "center",
            marginBottom: "16px",
            opacity: visible ? 1 : 0,
            transition: "all 0.7s 0.7s ease",
          }}
        >
          {[
            [postCount, "Posts"],
            [memberCount, "Members"],
            [countryCount, "Countries"],
          ].map(([num, label]) => (
            <div key={String(label)} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  fontFamily: "JetBrains Mono, monospace",
                  color: "#2D7D6F",
                }}
              >
                {Number(num) > 0 ? `${num}+` : "—"}
              </div>
              <div
                style={{ fontSize: "12px", color: "#555", marginTop: "2px" }}
              >
                {String(label)}
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: "13px",
            color: "#444",
            marginBottom: "80px",
            opacity: visible ? 1 : 0,
            transition: "all 0.7s 0.8s ease",
          }}
        >
          Write, share, and collaborate with developers across the language gap.
        </p>
      </section>

      {/* Value prop cards */}
      <div style={{ padding: "0 48px 80px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "#111",
            border: "1px solid #111",
            borderRadius: "12px",
            overflow: "hidden",
            maxWidth: "900px",
            margin: "0 auto 80px",
          }}
        >
          {[
            {
              accent: "#2D7D6F",
              title: "For Japanese developers",
              body: "Get global perspectives on your career, code, and culture. Connect with engineers from around the world.",
            },
            {
              accent: "#D4537E",
              title: "For foreign engineers",
              body: "Gain practical insight into Japan's tech culture. Navigate the job market with help from those who've done it.",
            },
            {
              accent: "#333",
              title: "Bilingual by design",
              body: "Posts in English and Japanese, side by side. Real conversation across the language gap.",
            },
          ].map(({ accent, title, body }) => (
            <div
              key={title}
              style={{ background: "#0e0e0e", padding: "32px 28px" }}
            >
              <div
                style={{
                  width: "24px",
                  height: "2px",
                  borderRadius: "1px",
                  background: accent,
                  marginBottom: "16px",
                }}
              />
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: "#e0e0e0",
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.6 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div
        style={{
          textAlign: "center",
          padding: "60px 48px",
          borderTop: "1px solid #111",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
            fontWeight: 700,
            letterSpacing: "-1px",
            marginBottom: "12px",
          }}
        >
          Ready to cross the bridge?
        </h2>
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "28px" }}>
          Join the community where Japan&apos;s tech world meets the rest.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <Link
            href="/register"
            style={{ ...btn("#D4537E") }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#993556")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#D4537E")
            }
          >
            Join DevJima
          </Link>
          <Link
            href="/"
            style={{ ...btn("#2D7D6F") }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#1F5C52")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#2D7D6F")
            }
          >
            Explore feed
          </Link>
        </div>
        <p style={{ fontSize: "12px", color: "#444", marginTop: "16px" }}>
          Already a member?{" "}
          <Link
            href="/login"
            style={{ color: "#2D7D6F", textDecoration: "none" }}
          >
            Login here
          </Link>
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes drawBridge {
          from { stroke-dashoffset: 600; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
