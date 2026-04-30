import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { AuthProvider } from "@/lib/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hiddenNavbar = ["/landing"];
  const noScrollPages = ["/", "/posts"];

  return (
    <AuthProvider>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        {!hiddenNavbar.includes(router.pathname) && <Navbar />}
        <div
          style={{
            flex: 1,
            overflow: noScrollPages.some(p => router.pathname.startsWith(p)) ? "hidden" : "auto",
          }}
        >
          <Component {...pageProps} />
        </div>
        {!hiddenNavbar.includes(router.pathname) && <Footer />}
      </div>
    </AuthProvider>
  );
}
