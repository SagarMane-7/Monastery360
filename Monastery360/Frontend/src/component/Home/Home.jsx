import React, { useEffect, useState } from "react";
import styles from './Home.module.css';
import Button from "../Button/Button";
import MapComponent from "../Map/Map";

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
     <section className={styles.background} >
            <div className={styles.navbtn}>
            <Button style={{background:"none"}}>Discover</Button>
            <h1 style={{color:"#cc6e2e"}}>|</h1>
            <Button style={{background:"none"}}>Festivals</Button>
            <h1 style={{color:"#cc6e2e"}}>|</h1>
            <Button style={{background:"none"}}>Volunteer</Button>
            <h1 style={{color:"#cc6e2e"}}>|</h1>
            <Button style={{background:"none"}}>History</Button>
            <h1 style={{color:"#cc6e2e"}}>|</h1>
            <Button style={{background:"none"}}>Book Tour</Button>
            </div>
     </section>

     <section className={styles.features} style={{color:"#454545",fontSize: "22px",fontWeight:"400"}}>
            <div className={styles.featureslogo}>
              <img src="/assets/monastery.png" style={{height:"50px",width:"50px"}}></img>
              <p>200+ Monasteries</p>
            </div>
            <div className={styles.featureslogo}>
              <img src="/assets/3d-modeling.png" style={{height:"50px",width:"50px"}}></img>
              <p>360° Virtual Tours</p>
            </div>
            <div className={styles.featureslogo}>
              <img src="/assets/audio-guide.png" style={{height:"50px",width:"50px"}}></img>
              <p>Smart Audio Guides</p>
            </div>
            <div className={styles.featureslogo}>
              <img src="/assets/translation.png" style={{height:"50px",width:"50px"}}></img>
              <p>5 Languages</p>
            </div>
            <div className={styles.featureslogo}>
              <img src="/assets/calendar.png" style={{height:"50px",width:"50px"}}></img>
              <p>Cultural Calendar</p>
            </div>
            <div className={styles.featureslogo}>
              <img src="/assets/scroll.png" style={{height:"50px",width:"50px"}}></img>
              <p>1000+ Manuscripts</p>
            </div>
     </section>

     <section className={styles.information}>
          <p style={{color:"#008080",fontSize: "50px",fontWeight:"700"}}>The Land of Monasteries and Serenity</p> 
          <p style={{color:"#454545",fontSize: "17px",fontWeight:"400"}}>Nestled in the lap of the Himalayas, Sikkim is home to some of the most sacred and picturesque monasteries in India. These timeless sanctuariesoffer more than just breathtaking views. They open the doors to spiritual awakening, inner peace, and cultural discovery.<br />Here, the fluttering of colorful prayer flags, the sound of monastic chants, and the aura of sacred silence create an atmosphere where serenity truly comes alive.<br /> ‘Seek serenity. Discover Sikkim’</p> 
     </section>

     <section>
        <div className={styles.monastery}>
          <div className={styles.monasterylist}>
           {monasteries.map((monastery) => {
              const imageUrl = `http://localhost:5000${monastery.image}`;
              return (
                <div key={monastery.id} className={styles.monasteryCard}>
                  <img src={imageUrl} alt={monastery.name} style={{height:"275px", width:"275px"}}/>
                  <h3>{monastery.name}</h3>
                </div>
              );
            })}
          </div>
          <Button style={{width:"293px"}}>View All Monasteries</Button>
        </div>
      </section>
      <section>
        <div className={styles.map}>
          <MapComponent monasteries={monasteries} />
        </div>
      </section>

    </div>
  );
}

export default Home;
