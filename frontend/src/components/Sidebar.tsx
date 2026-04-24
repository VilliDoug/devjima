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
      <aside
        style={{
          width: "240px",
          minHeight: "100vh",
          borderRight: "1px solid #1a1a1a",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          background: "#0d0d0d",
          position: "sticky",
          top: "0",
          height: "calc(100vh - 52px)",
        }}
      />
    );

  return (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        borderRight: "1px solid #1a1a1a",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        background: "#0d0d0d",
        position: "sticky",
        top: "0",
        height: "calc(100vh - 52px)",
        overflowY: "auto",
      }}
    >
      {/* Home */}
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "8px 12px",
          borderRadius: "8px",
          textDecoration: "none",
          color: router.pathname === "/" ? "#fff" : "#666",
          background: router.pathname === "/" ? "#1a1a1a" : "transparent",
          fontSize: "14px",
          fontWeight: router.pathname === "/" ? 500 : 400,
          transition: "all 0.15s ease",
        }}
      >
        ⌂ Home
      </Link>

      {/* Tags */}
      <div>
        <button
          onClick={() => setTagsOpen(!tagsOpen)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            color: "#666",
            background: "transparent",
            fontSize: "14px",
            textAlign: "left",
          }}
        >
          <span># Tags</span>
          <span
            style={{
              fontSize: "10px",
              transition: "transform 0.2s",
              transform: tagsOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▼
          </span>
        </button>

        {tagsOpen && (
          <div
            style={{
              paddingLeft: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              marginTop: "4px",
            }}
          >
            {tags.map((tag) => (
              <a
                key={tag.id}
                href={`/?tag=${tag.slug}`}
                style={{
                  padding: "5px 10px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "13px",
                  color: "#555",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#2D7D6F")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#555")
                }
              >
                {tag.name}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #1a1a1a", margin: "8px 0" }} />

      {/* Settings — language toggle */}
      <div style={{ padding: "8px 12px" }}>
        <p
          style={{
            fontSize: "11px",
            color: "#333",
            marginBottom: "8px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Language
        </p>
        <div style={{ display: "flex", gap: "6px" }}>
          {["en", "ja"].map((lang) => (
            <button
              key={lang}
              style={{
                padding: "4px 12px",
                borderRadius: "20px",
                border: "1px solid #2a2a2a",
                background: "transparent",
                color: "#555",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#2D7D6F";
                e.currentTarget.style.color = "#2D7D6F";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#2a2a2a";
                e.currentTarget.style.color = "#555";
              }}
            >
              {lang === "en" ? "EN" : "JP"}
            </button>
          ))}
        </div>
      </div>      

      {/* Spacer */}
      <div style={{ flex: 0.9 }} />

      {/* Write post */}
      {isLoggedIn && (
        <Link
          href="/posts/new"
          style={{
            display: "block",
            textAlign: "center",
            padding: "10px",
            background: "#2D7D6F",
            borderRadius: "8px",
            color: "#fff",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 500,
            transition: "background 0.2s ease",
            marginBottom: "36px"
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#1F5C52")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#2D7D6F")
          }
        >
          + Write post
        </Link>
      )}
    </aside>
  );
}
