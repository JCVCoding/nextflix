import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
type NavBarType = {
  username: string;
};

const NavBar = ({ username }: NavBarType) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href={"/"}>
          <div className={styles.logoWrapper}>Nextflix</div>
        </Link>

        <ul className={styles.navItems}>
          <li className={styles.navItem}>Home</li>
          <li className={styles.navItem2}>My List</li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn}>
              <p className={styles.username}>{username}</p>
              {/* Expand more icon */}
            </button>
            <div className={styles.navDropdown}>
              <div>
                <a className={styles.linkName} href="">
                  Sign Out
                </a>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
