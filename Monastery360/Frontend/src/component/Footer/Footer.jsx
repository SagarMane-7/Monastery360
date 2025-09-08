import React from "react";
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';


function Footer() {
  return (
    <div>
      <section className={styles.footer}>
        <div style={{paddingTop:"75px"}}>
          <img src="/assets/sikkimtourism-logo 1.png" alt="Logo2" className={styles.logo2} he></img>
          <img src="/assets/sk-logo-lg 1.png" alt="Logo3" className={styles.logo3}></img>
        </div>
        <div>
          <p>Contact Info</p>
          <p>Email: info@monastery360.in</p>
          <p>Tourism Helpline: +91-xxxx-xxxx</p>
          <p>Address: Dept. of Tourism, Govt. of Sikkim</p>
        </div>
        <div>
          <p>Social Media Links</p>
         <FontAwesomeIcon icon={faFacebook} size="2x" />
          <FontAwesomeIcon icon={faInstagram} size="2x" />
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </div>
        <p style={{paddingLeft:"425px"}}>© 2025 Monastery360 | Government of Sikkim | All Rights Reserved</p>
      </section>
    </div>
  );
}

export default Footer;