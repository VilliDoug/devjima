export default function Footer() {
  return (
    <footer
        style={{
          borderTop: "1px solid #111",
          padding: "24px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "12px", color: "#333" }}>© 2026 DevJima</span>
        <span style={{ fontSize: "12px", color: "#333" }}>
          Built by{" "}
          <a
            href="https://github.com/VilliDoug"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#2D7D6F", textDecoration: "none" }}
          >
            VilliDoug
          </a>
          {" · "}
          <a
            href="https://github.com/VilliDoug/devjima"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#2D7D6F", textDecoration: "none" }}
          >
            GitHub
          </a>
        </span>
      </footer>
  );
}