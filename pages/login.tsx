import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/login.module.css";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");

  const handleOnChangeEmail = (event: ChangeEvent) => {
    setUserMsg("");
    const { target } = event;
    const email = (target as HTMLInputElement).value;
    setEmail(email);
  };

  const handleLoginWithEmail = (event: MouseEvent) => {
    event.preventDefault();
    if (email) {
      router.push("/");
    } else {
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
            Log In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
