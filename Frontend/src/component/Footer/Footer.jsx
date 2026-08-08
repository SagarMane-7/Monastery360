import React from "react";
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';


function Footer() {
  return (
    <div>
      <section className={styles.footer}>
        <div style={{ paddingTop: "75px" }}>
          <img src="/assets/Home/sikkimtourismlogo.png" alt="Logo2" className={styles.logo2} he></img>
          <img src="/assets/Home/sikkimlogo.png" alt="Logo3" className={styles.logo3}></img>
        </div>
        <div>
          <p style={{textAlign:"center"}}>Contact Info</p>
          <p>Email: info@monastery360.in</p>
          <p>Tourism Helpline: +91-xxxx-xxxx</p>
          <p>Address: Dept. of Tourism, Govt. of Sikkim</p>
        </div>
        <div>

          <p style={{textAlign:"center"}}>Social Media Links</p>
          <a href="https://m.facebook.com" target="_blank" style={{color:"#ffffff"}}>
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" style={{color:"#ffffff"}}>
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>

          <a href="https://x.com/" target="_blank">
            <FontAwesomeIcon icon={faTwitter} size="2x"  style={{color:"#ffffff"}}/>
          </a>
        </div>
      </section>
    </div>
  );
}

export default Footer;