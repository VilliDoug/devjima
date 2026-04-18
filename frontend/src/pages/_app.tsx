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
      {!hiddenNavbar.includes(router.pathname) && <Navbar />}
      <Component {...pageProps} />
    </AuthProvider>
  )
}
