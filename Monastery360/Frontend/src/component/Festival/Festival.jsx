import React, { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import styles from '../Festival/Festival.module.css';

const Festival = () => {
  const [festival, setFestival] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/festivals")
      .then((response) => response.json())
      .then((data) => {
        setFestival(data.festivals[0]); // Pick the first festival from the list
      })
      .catch((error) => console.error("Error fetching festival:", error));
  }, []);

  if (!festival) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />

      <section className={styles.images}>
        <img src={`http://localhost:5000${festival.image}`} alt={festival.name} style={{ height: "400px", width: "100%" }} />
      </section>

      <section className={styles.information} style={{ textAlign: "center" }}>
        <div style={{width:"1300px"}}>
          <p style={{ fontSize: "50px", color: "#008080", fontWeight: "700", paddingTop: "25px" }}>{festival.name}</p>
          <p style={{ fontSize: "22px", color: "#454545", fontStyle: "italic", fontWeight: "500" }}>{festival.description}</p>
        </div>
      </section>

      <section className={styles.history} style={{ textAlign: "center" }}>
        <div style={{width:"1300px"}}>
          <p style={{ fontSize: "26px", color: "#008080", fontWeight: "700", paddingTop: "25px" }}>History & Origins</p>
          <p>{festival.history_origins}</p>
        </div>
      </section>

      <section className={styles.images}>
        <img src={`http://localhost:5000${festival.image}`} alt={festival.name} style={{ width: "400px", height: "200px" }} />
        <img src={`http://localhost:5000${festival.image}`} alt={festival.name} style={{ width: "400px", height: "200px" }} />
        <img src={`http://localhost:5000${festival.image}`} alt={festival.name} style={{ width: "400px", height: "200px" }} />
      </section>

      <section className={styles.rituals} style={{ textAlign: "center" }}>
        <div style={{width:"1300px"}}>
          <p style={{ fontSize: "26px", color: "#008080", fontWeight: "700", paddingTop: "25px" }}>Rituals & Practices</p>
          <p>{festival.rituals_practices.join(", ")}</p>
        </div>
      </section>

      <section className={styles.images}>
        <img src={`http://localhost:5000${festival.image}`} alt={festival.name} style={{ width: "400px", height: "200px" }} />
        <img src={`http://localhost:5000${festival.image}`} alt={festival.name} style={{ width: "400px", height: "200px" }} />
        <img src={`http://localhost:5000${festival.image}`} alt={festival.name} style={{ width: "400px", height: "200px" }} />
      </section>

      <section className={styles.culture} style={{ textAlign: "center" }}>
        <div style={{width:"1300px"}}>
          <p style={{ fontSize: "26px", color: "#008080", fontWeight: "700", paddingTop: "25px" }}>Cultural Significance</p>
          <p>{festival.cultural_significance}</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Festival;
