import React, { useEffect, useState } from "react";
import styles from "./Volunteer.module.css";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


const Volunteer = () => {
    const [volunteermonasteries, setvolunteermonasteries] = useState([]);
    
      useEffect(() => {
        fetch("http://localhost:5000/api/volunteer")
          .then((response) => response.json())
          .then((data) => setvolunteermonasteries(data))
          .catch((error) => console.error("Error fetching volunteermonasteries:", error));
      }, []);

  return (
    <div>
      <Header/>
      <section className={styles.background}>
       <div style={{ width: "1000px", height: "175px", background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(5px)", borderRadius: "15px" }}>
          <p style={{ fontSize: "50px", color: "#ffffff", fontWeight: "700" }}>Volunteer with Monasteries in Sikkim</p>
          <p style={{ fontSize: "22px", color: "#ffffff", fontStyle: "italic", fontWeight: "500" }}>A journey of service, learning, and cultural exchange</p>
        </div>
      </section>
      <section>
         <p style={{ fontSize: "26px", color: "#008080", fontWeight: "700", textAlign:"center"}}>Guidelines for Volunteering</p>
         <div className={styles.guidelines} style={{paddingLeft:"10%"}}>
            <p>1.Booking Policy<br/>• Monastery360 does not handle volunteer bookings or applications.<br/>• All volunteering arrangements must be made directly with the monasteries or through registered NGOs.</p>
            <p>2.How to Get Involved<br/>• Reach out to monasteries via official contact details listed on their pages.<br/>• Some monasteries may require prior permission or a formal introduction through local organizations.</p>
            <p>3.Cultural Respect<br/>• Always respect local traditions, customs, and routines.<br/>• Follow the monastery dress code (e.g., modest clothing, no shoes in prayer halls).<br/>• Be mindful of daily schedules, including meditation, prayer, and meal times.</p>
            <p>4.Conduct and Responsibilities<br/>• Volunteers should maintain a helpful and courteous attitude.<br/>• Participate actively but respectfully in the tasks assigned.<br/>• Avoid any behavior that disrupts monastery life or the spiritual environment.</p>
         </div>
      </section>
      <section>
         <div className={styles.volunteer}>
           <p style={{ fontSize: "26px", color: "#008080", fontWeight: "700", textAlign:"center" }}>Volunteer with Monasteries in Sikkim</p>
          <div className={styles.volunteerlist}>
            {volunteermonasteries.map((volunteermonastery) => {
              return (
                <div key={volunteermonastery.id} className={styles.monasteryCard} style={{width:"400px"}}>
                  <img src={volunteermonastery.image} alt={volunteermonastery.name} style={{ height: "300px", width: "400px", borderRadius: "15px" }} />
                  <p style={{ fontSize: "22px", fontWeight: "700", color: "#008080" }}>{volunteermonastery.name}</p>
                  <p style={{ fontSize: "22px", fontWeight: "400", color: "#454545" }}>{volunteermonastery.location}<br/>{volunteermonastery.activities}<br/>{volunteermonastery.phone}<br/>{volunteermonastery.email} </p>
                </div>
              );
            })}
          </div>
          </div>
      </section>
      <Footer/>
    </div>
  )
}

export default Volunteer