import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { magic } from "@/lib/magic-client";

import styles from "../styles/login.module.css";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleOnChangeEmail = (event: ChangeEvent) => {
    setUserMsg("");
    const { target } = event;
    const email = (target as HTMLInputElement).value;
    setEmail(email);
  };

  const handleLoginWithEmail = async (event: MouseEvent) => {
    event.preventDefault();
    if (email) {
      try {
        setIsLoading(true);
        const didToken = await magic?.auth.loginWithMagicLink({ email });
        if (didToken) {
          router.push("/");
        }
      } catch (error) {
        console.error("Something went wrong when logging in: ", error);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setUserMsg("Enter a valid email address");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix Log In</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href={"/"}>
            <div className={styles.logoWrapper}>
              <Image
                src={"/static/netflix.svg"}
                alt="netflix logo"
                width={128}
                height={34}
              />
            </div>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.loginHeader}>Log In</h1>
          <input
            type="text"
            name=""
            id=""
            placeholder="Email Address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Log In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
