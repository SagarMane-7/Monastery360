import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Button from '../Button/Button.jsx';
import styles from '../Festival/Festival.module.css';

function Festival() {
  const { name } = useParams();
  const [festival, setFestival] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/festivals/${encodeURIComponent(name)}`)
      .then(res => res.json())
      .then(data => setFestival(data))
      .catch(err => console.error("Error fetching festival:", err));
  }, [name]);

  if (!festival) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />

      <section className={styles.images}>
        <img src={`http://localhost:5000${festival.image[0]}`} alt={festival.name} style={{ height: "400px", width: "100%" }} />
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
       <img src={`http://localhost:5000${festival.image[1]}`} alt={festival.name} style={{ width: "400px", height: "200px" ,borderRadius:"15px" }} />
        <img src={`http://localhost:5000${festival.image[2]}`} alt={festival.name} style={{ width: "400px", height: "200px" ,borderRadius:"15px"}} />
        <img src={`http://localhost:5000${festival.image[3]}`} alt={festival.name} style={{ width: "400px", height: "200px" ,borderRadius:"15px" }} />
      </section>

      <section className={styles.rituals} style={{ textAlign: "center" }}>
        <div style={{width:"1300px"}}>
          <p style={{ fontSize: "26px", color: "#008080", fontWeight: "700", paddingTop: "25px" }}>Rituals & Practices</p>
          <p>{festival.rituals_practices.join(", ")}</p>
        </div>
      </section>

      <section className={styles.images}>
        <img src={`http://localhost:5000${festival.image[4]}`} alt={festival.name} style={{ width: "400px", height: "200px" ,borderRadius:"15px" }} />
        <img src={`http://localhost:5000${festival.image[5]}`} alt={festival.name} style={{ width: "400px", height: "200px" ,borderRadius:"15px" }} />
        <img src={`http://localhost:5000${festival.image[6]}`} alt={festival.name} style={{ width: "400px", height: "200px"  ,borderRadius:"15px"}} />
      </section>

      <section className={styles.culture} style={{ textAlign: "center" }}>
        <div style={{width:"1300px"}}>
          <p style={{ fontSize: "26px", color: "#008080", fontWeight: "700", paddingTop: "25px" }}>Cultural Significance</p>
          <p>{festival.cultural_significance}</p>
        </div>
      </section>

      <section>
        <div className={styles.morefestival}>
          <Link to='/festivals'>
            <Button style={{ width: "350px", fontFamily: "Karla,sans-serif" }}>Explore More Festivals</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Festival;
