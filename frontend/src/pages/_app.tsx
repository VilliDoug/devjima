import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/lib/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hiddenNavbar = ['/landing'];

  return (
    <AuthProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      {!hiddenNavbar.includes(router.pathname) && <Navbar />}
      <div style= {{ flex: 1 }}>
        <Component {...pageProps} />
      </div>      
      <Footer />
      </div>
    </AuthProvider>
  )
}
