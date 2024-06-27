import React, { MouseEvent, useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { magic } from "@/lib/magic-client";

const NavBar = () => {
  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUsername = async () => {
      try {
        const { email } = await magic?.user.getMetadata()!;
        if (email) {
          setUsername(email);
        }
      } catch (error) {
        console.error("Error retrieving email: ", error);
      }
    };
    getUsername();
  }, []);

  const handleOnClickHome = (event: MouseEvent) => {
    event.preventDefault();
    router.push("/");
  };
  const handleOnClickMyList = (event: MouseEvent) => {
    event.preventDefault();
    router.push("/browse/my-list");
  };
  const handleShowDropdown = (event: MouseEvent) => {
    event.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async (event: MouseEvent) => {
    event.preventDefault();

    try {
      await magic?.user.logout();
      console.log(await magic?.user.isLoggedIn());
      router.push("/login");
    } catch (error) {
      console.error("Error logging out user", error);
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              {showDropdown ? (
                <Image
                  src={"/static/up_arrow.svg"}
                  alt="Collapse dropdown"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src={"/static/expand_more.svg"}
                  alt="Expand dropdown"
                  width={24}
                  height={24}
                />
              )}
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignOut}>
                    Sign Out
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
