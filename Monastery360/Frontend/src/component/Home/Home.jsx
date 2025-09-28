import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import styles from './Home.module.css';
import Button from "../Button/Button";
import MapComponentHome from "../Map_API_Home/Map_Home.jsx";

function Home() {

  const [monasteries, setMonasteries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/monasteries")
      .then((response) => response.json())
      .then((data) => setMonasteries(data))
      .catch((error) => console.error("Error fetching monasteries:", error));
  }, []);


  return (

    <div>
      <Header />
      <section className={styles.background} >
        <div className={styles.navbtn}>
          <Link to='/monasteries'>
            <Button style={{ background: "none", fontFamily: "Karla,sans-serif" }}>Discover</Button>
          </Link>
          <h1 style={{ color: "#cc6e2e", fontFamily: "Karla,sans-serif" }}>|</h1>
          <Link to='/festivals'>
            <Button style={{ background: "none", fontFamily: "Karla,sans-serif" }}>Festivals</Button>
          </Link>
          <h1 style={{ color: "#cc6e2e" }}>|</h1>
          <Link to='/volunteer'>
            <Button style={{ background: "none", fontFamily: "Karla,sans-serif" }}>Volunteer</Button>
          </Link>
          <h1 style={{ color: "#cc6e2e" }}>|</h1>
          <Link to='/history'>
            <Button style={{ background: "none", fontFamily: "Karla,sans-serif" }}>History</Button>
          </Link>
          <h1 style={{ color: "#cc6e2e", fontFamily: "Karla,sans-serif" }}>|</h1>
          <Link to='/book'>
            <Button style={{ background: "none", fontFamily: "Karla,sans-serif" }}>Book Tour</Button>
          </Link>
        </div>
      </section>

      <section className={styles.features} style={{ color: "#454545", fontSize: "22px", fontWeight: "400" }}>
        <div className={styles.featureslogo}>
          <img src="/assets/Home/monastery.png" style={{ height: "50px", width: "50px" }}></img>
          <p>200+ Monasteries</p>
        </div>
        <div className={styles.featureslogo}>
          <img src="/assets//Home/3d-modeling.png" style={{ height: "50px", width: "50px" }}></img>
          <p>360° Virtual Tours</p>
        </div>
        <div className={styles.featureslogo}>
          <img src="/assets//Home/audio-guide.png" style={{ height: "50px", width: "50px" }}></img>
          <p>Smart Audio Guides</p>
        </div>
        <div className={styles.featureslogo}>
          <img src="/assets//Home/translation.png" style={{ height: "50px", width: "50px" }}></img>
          <p>5 Languages</p>
        </div>
        <div className={styles.featureslogo}>
          <img src="/assets//Home/calendar.png" style={{ height: "50px", width: "50px" }}></img>
          <p>Cultural Calendar</p>
        </div>
        <div className={styles.featureslogo}>
          <img src="/assets//Home/scroll.png" style={{ height: "50px", width: "50px" }}></img>
          <p>1000+ Manuscripts</p>
        </div>
      </section>

      <section className={styles.informationsection}>
        <div className={styles.information}>
          <p style={{ color: "#008080", fontSize: "50px", fontWeight: "700" }}>The Land of Monasteries and Serenity</p>
          <p style={{ color: "#454545", fontSize: "22px", fontWeight: "400" }}>Nestled in the lap of the Himalayas, Sikkim is home to some of the most sacred and picturesque monasteries in India. These timeless sanctuariesoffer more than just breathtaking views. They open the doors to spiritual awakening, inner peace, and cultural discovery.<br />Here, the fluttering of colorful prayer flags, the sound of monastic chants, and the aura of sacred silence create an atmosphere where serenity truly comes alive.<br /> ‘Seek serenity. Discover Sikkim’</p>
        </div>
      </section>

      <section className={styles.viewall}>
        <div className={styles.monastery}>
          <div className={styles.monasterylist}>
            {monasteries.slice(0, 4).map((monastery) => {
              return (
                <div key={monastery.id} className={styles.monasteryCard}>
                  <Link to={`/monasteries/${encodeURIComponent(monastery.name)}`}>
                  <img src={`http://localhost:5000${monastery.image[0]}`} alt={monastery.name} style={{ height: "300px", width: "300px", borderRadius: "15px" }} />
                  </Link>
                  <p style={{ fontSize: "22px", fontWeight: "700", color: "#008080" }}>{monastery.name}</p>
                  <p style={{ fontSize: "22px", fontWeight: "400", color: "#454545" }}>{monastery.location}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          <Link to='/monasteries'>
            <Button style={{ width: "293px", marginTop: "50px", fontFamily: "Karla,sans-serif" }}>View All Monasteries</Button>
          </Link>
        </div>
      </section>
      <section>
        <div className={styles.map}>
          <MapComponentHome monasteries={monasteries} />
          <Link to='/map'>
            <Button style={{ fontFamily: "Karla,sans-serif", marginTop: "50px" }} >Open Full Map</Button>
          </Link>
        </div>
      </section>

      <section>
        <div className={styles.timeline}>
          <p style={{ fontSize: "26px", fontWeight: "700", color: "#008080", textAlign: "center" }}>Best Time to Visit</p>
          <img src="./assets//Home/Timeline.png" alt="Timeline"></img>
          <p style={{ textAlign: "center", color: "#454545", fontStyle: "italic", fontWeight: "500", fontSize: "22px" }}>Spring and autumn offer the best experience. Explore festivals, rituals, and cultural celebrations year-round</p>
        </div>
      </section>

      <section>
        <div>
          <p style={{ fontSize: "26px", fontWeight: "700", color: "#008080", textAlign: "center" }}>Cultural Calendar: Festivals of Sikkim</p>
          <div className={styles.calender}>
            <p style={{ width: "700px", fontSize: "22px", textAlign: "center", color: "#454545", fontWeight: "500" }}>
              Sikkim celebrates over 20 vibrant festivals each year, blending Buddhist rituals, cultural traditions, and community life. From the grandeur of Losar (Tibetan New Year) to the sacred dances of Pang Lhabsol, each season carries its own spirit of devotion and joy. Festivals like Saga Dawa, honoring the life of Buddha, bring pilgrims, monks, and travelers together. Beyond spirituality, these celebrations are alive with mask dances, prayer flags, music, and community feasts making them both sacred and social experiences at the heart of Sikkim’s culture.
            </p>
            <iframe
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=UTC&showPrint=0&src=bWFuZXNhZ2FyMjEyMEBnbWFpbC5jb20&src=ZmFtaWx5MDU1OTk1MzQyNzMwNzMyODIxNTNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=MzFjZjEyNmE3NDAxNGM2NThhZGMyMzhhZmUzODI0NDY3MGU2ZjlmMjVjNDExY2NlZmViMDg3YWYwYzc0NTFjZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y2xhc3Nyb29tMTA0MzMyNzczNDM5NzUzMTA3NzU4QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y19jbGFzc3Jvb21lNDFmMzFlYkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y2xhc3Nyb29tMTAyMTc0MjQwMDE0NzA5NjI2OTI3QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039be5&color=%23d81b60&color=%23ad1457&color=%231967d2&color=%231967d2&color=%230b8043&color=%231967d2"
              style={{ border: "solid 1px #777" }}
              width="600px"
              height="375px"
            ></iframe>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
