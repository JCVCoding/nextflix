import React, { MouseEvent, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

type NavBarType = {
  username: string;
};

const NavBar = ({ username }: NavBarType) => {
  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);

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
                  <Link className={styles.linkName} href="/login">
                    Sign Out
                  </Link>
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
