import React from "react";
import styles from './Header.module.css';


function Header() {
  return (
    <div>

      <section className={styles.header}>
        <div className={styles.logo}>
          <img src="/assets/logo.png" alt="Logo1" className={styles.logo1}></img>
        </div>

        <div className={styles.logo}>
          <img src="/assets/sikkimtourism-logo 1.png" alt="Logo2" className={styles.logo2}he></img>
          <img src="/assets/sk-logo-lg 1.png" alt="Logo3" className={styles.logo3}></img>
        </div>
      </section>

    

    </div>
  );
}

export default Header;