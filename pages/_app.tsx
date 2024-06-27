import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { magic } from "@/lib/magic-client";
import { useRouter } from "next/router";
import Loading from "@/components/loading/loading";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const routeUser = async () => {
      const isUserLoggedIn = await magic?.user.isLoggedIn();
      if (isUserLoggedIn) {
        router.push("/");
      } else {
        router.push("/login");
      }
    };
    routeUser();
  }, [router]);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}
