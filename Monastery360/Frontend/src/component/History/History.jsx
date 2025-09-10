import React from 'react';
import { Link } from 'react-router-dom';
import styles from './History.module.css';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Button from '../Button/Button';


const History = () => {
  return (
    <div>
      <Header />
      <section className={styles.background}>
        <h1 style={{ fontSize: "50px", fontWeight: "700", color: "#ffffff", textAlign: "center", paddingTop: "50px" }}>History of Monasteries in Sikkim</h1>
        <p style={{ fontSize: "26px", fontWeight: "500", color: "#ffffff", fontStyle: "italic", textAlign: "center" }}>Tracing the spiritual and cultural journey of the Land of Monasteries</p>
      </section>
      <section className={styles.history}>
        <div className={styles.information}>
          <p>Sikkim’s monasteries trace their roots to the 8th century, when Guru Padmasambhava, revered as the ‘Second Buddha,’ first introduced Buddhism to the region. These monasteries were more than mere places of worship — they evolved into guardians of knowledge, art, and identity, preserving spiritual and cultural traditions across centuries.<br />The Nyingma school of Tibetan Buddhism, among the oldest traditions, found fertile ground in Sikkim through wandering lamas who taught, meditated, and established monastic communities. Over time, monasteries became sacred centers for learning, art, and ritual practice — manuscripts were carefully preserved, vibrant murals painted, and rituals performed, shaping the cultural and spiritual fabric of the Himalayas.<br />Nestled in the serene Himalayan landscape, Sikkim’s monasteries also served as community hubs, influencing festivals, governance, and daily life. Today, Sikkim is home to over 200 monasteries, each telling a story of faith, resilience, and harmony with nature.</p>
        </div>
      </section>
      <section>
        <p style={{ color: "#008080", fontWeight: "700", textAlign: "center", fontSize: "26px" }}>Journey Through Sikkim’s Spiritual History</p>
        <div className={styles.timeline1}>
          <p style={{ height: "175px", width: "525px", color: "#008080", fontWeight: "700", paddingRight: "25px" }}>8th Century – Guru Padmasambhava’s Arrival<p style={{ color: "#454545", fontWeight: "400" }}>Buddhism is introduced, laying the foundation of Sikkim’s spiritual heritage. Lamas begin establishing meditation centers that evolve into monasteries.</p></p>
          <img src="./assets/History/buddha.png" alt="Timeline" style={{ height: "80px", width: "80px" }}></img>
        </div>
        <div className={styles.timeline2}>
          <img src="./assets/History/crown.png" alt="Timeline" style={{ height: "80px", width: "80px" }}></img>
          <p style={{ height: "175px", width: "525px", paddingLeft: "25px", color: "#008080", fontWeight: "700" }}>1642 – Namgyal Dynasty Established<p style={{ color: "#454545", fontWeight: "400" }}>Phuntsog Namgyal becomes the first Chogyal (king) of Sikkim. Buddhism is declared the state religion, leading to the expansion of monasteries and royal patronage.</p></p>
        </div>
        <div className={styles.timeline1}>
          <p style={{ height: "175px", width: "525px", color: "#008080", fontWeight: "700", paddingRight: "25px" }}>1700s – Founding of Major Monasteries<p style={{ color: "#454545", fontWeight: "400" }}>Prominent monasteries like Pemayangtse (1670s) are established as royal monasteries. Rumtek Monastery rises as the seat of the Karmapa, becoming an international hub of Tibetan Buddhism.</p></p>
          <img src="./assets/History/monastery.png" alt="Timeline" style={{ height: "80px", width: "80px" }}></img>
        </div>
        <div className={styles.timeline2}>
          <img src="./assets/History/colonial.png" alt="Timeline" style={{ height: "80px", width: "90px" }}></img>
          <p style={{ height: "175px", width: "525px", paddingLeft: "25px", color: "#008080", fontWeight: "700" }}>19th Century – Colonial Encounters<p style={{ color: "#454545", fontWeight: "400" }}>British explorers, scholars, and missionaries document Sikkim’s monasteries, bringing global awareness. This sparks preservation efforts but also introduces challenges from modernization.</p></p>
        </div>
        <div className={styles.timeline1}>
          <p style={{ height: "175px", width: "525px", color: "#008080", fontWeight: "700", paddingRight: "25px" }}>Modern Era – Preservation & Digitalization<p style={{ color: "#454545", fontWeight: "400" }}>Initiatives like Monastery360 and local heritage projects work to digitize manuscripts, preserve murals, and make monastery history accessible worldwide.</p></p>
          <img src="./assets/History/digital.png" alt="Timeline" style={{ height: "80px", width: "80px" }}></img>
        </div>
      </section>
      <section className={styles.legacysection}>
        <div className={styles.legacy}>
          <p style={{ color: "#008080", fontWeight: "700", textAlign: "center", fontSize: "26px" }}>Legacy of Monasteries in Sikkim</p>
          <p>The legacy of these monasteries extends beyond their ancient history. Today, they serve as living centers for cultural preservation, actively digitizing manuscripts and restoring ancient murals. They empower local communities, ensuring spiritual traditions continue to guide future generations.<br />These monasteries are also vital hubs for spiritual education and artistic expression. They operate monastic schools, passing down centuries-old knowledge. The art forms housed within their walls are not merely decorations but a visual representation of sacred teachings.<br />They also play a crucial role in ecological preservation. Situated within the Himalayan landscape, many monasteries are silent sentinels of the environment. Their spiritual ethos of reverence for all life forms has contributed to the protection of local flora and fauna. This deep connection to nature is often reflected in the remote locations chosen for their construction.</p>
        </div>
      </section>
      <section>
        <p style={{ color: "#008080", fontWeight: "700", textAlign: "center", fontSize: "26px" }}>Did You Know?</p>
        <div className={styles.fact}>
          <div style={{ height: "225px", width: "650px", borderStyle: "solid", borderWidth: "3px", borderColor: "#cc6e2e", borderRadius: "15px", margin: "50px" }}>
            <p style={{ color: "#008080", fontWeight: "700" }}>🕉️ Oldest Monastery</p>
            <p> • Dubdi Monastery, founded in 1701, is considered the oldest monastery in Sikkim.<br /> • It was built soon after the coronation of Phuntsog Namgyal, the first Chogyal (king) of Sikkim.</p>
          </div>
          <div style={{ height: "225px", width: "650px", borderStyle: "solid", borderWidth: "3px", borderColor: "#cc6e2e", borderRadius: "15px", margin: "50px" }}>
            <p style={{ color: "#008080", fontWeight: "700" }}>📜 Hidden Manuscripts</p>
            <p> • Monasteries preserved ancient scriptures by wrapping them in silk and storing them in carved wooden chests.<br /> • Some texts survived for centuries without damage due to these practices.</p>
          </div>
          <div style={{ height: "225px", width: "650px", borderStyle: "solid", borderWidth: "3px", borderColor: "#cc6e2e", borderRadius: "15px", margin: "50px" }}>
            <p style={{ color: "#008080", fontWeight: "700" }}>🎶 Sacred Sounds</p>
            <p> • Rituals often feature long copper trumpets (dungchen), whose sound can travel across valleys.<br /> • These instruments symbolize the spreading of Buddhist teachings in all directions.</p>
          </div>
          <div style={{ height: "225px", width: "650px", borderStyle: "solid", borderWidth: "3px", borderColor: "#cc6e2e", borderRadius: "15px", margin: "50px" }}>
            <p style={{ color: "#008080", fontWeight: "700" }}>🏔️ Festival Origins</p>
            <p> • The Pang Lhabsol festival began in the 13th century.<br /> • It honors Mount Kanchenjunga as the guardian deity of Sikkim and celebrates unity among communities.</p>
          </div>
        </div>
      </section>
      <section>
        <p style={{ color: "#008080", fontWeight: "700", textAlign: "center", fontSize: "26px" }}>Continue Your Journey</p>
        <div className={styles.journey}>
          <Link to='/monasteries'>
            <Button style={{ width: "293px", fontFamily: "Karla,sans-serif" }}>Explore Monasteries</Button>
          </Link>
           <Link to='/festivals'>
            <Button style={{ width: "300px", fontFamily: "Karla,sans-serif" }}>Learn About Festivals</Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default History;