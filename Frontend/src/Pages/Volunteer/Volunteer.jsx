import React, { useEffect, useState } from "react";
import styles from "./Volunteer.module.css";
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';


const Volunteer = () => {
  const [volunteermonasteries, setvolunteermonasteries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/volunteer")
      .then((response) => response.json())
      .then((data) => setvolunteermonasteries(data))
      .catch((error) => console.error("Error fetching volunteermonasteries:", error));
  }, []);

  const filteredVolunteers = volunteermonasteries.filter((vol) =>
    vol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (vol.location || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (vol.activities || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header />
      <section className={styles.background}>
        <div style={{ width: "1000px", height: "175px", background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(5px)", borderRadius: "15px" }}>
          <p style={{ fontSize: "50px", color: "#ffffff", fontWeight: "700" }}>Volunteer with Monasteries in Sikkim</p>
          <p style={{ fontSize: "22px", color: "#ffffff", fontStyle: "italic", fontWeight: "500" }}>A journey of service, learning, and cultural exchange</p>
        </div>
      </section>
      <section>
        <p style={{ fontSize: "26px", color: "#008080", fontWeight: "700", textAlign: "center" }}>Guidelines for Volunteering</p>
        <div className={styles.guidelines} style={{ paddingLeft: "10%" }}>
          <p>1.Booking Policy<br />• Monastery360 does not handle volunteer bookings or applications.<br />• All volunteering arrangements must be made directly with the monasteries or through registered NGOs.</p>
          <p>2.How to Get Involved<br />• Reach out to monasteries via official contact details listed on their pages.<br />• Some monasteries may require prior permission or a formal introduction through local organizations.</p>
          <p>3.Cultural Respect<br />• Always respect local traditions, customs, and routines.<br />• Follow the monastery dress code (e.g., modest clothing, no shoes in prayer halls).<br />• Be mindful of daily schedules, including meditation, prayer, and meal times.</p>
          <p>4.Conduct and Responsibilities<br />• Volunteers should maintain a helpful and courteous attitude.<br />• Participate actively but respectfully in the tasks assigned.<br />• Avoid any behavior that disrupts monastery life or the spiritual environment.</p>
        </div>
      </section>


      <section className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search volunteer monasteries by name, location, or activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className={styles.clearBtn} onClick={() => setSearchQuery("")}>✕</button>
          )}
        </div>
        {searchQuery && (
          <p className={styles.resultCount}>
            {filteredVolunteers.length} {filteredVolunteers.length === 1 ? "result" : "results"} found
          </p>
        )}
      </section>

      <section>
        <div className={styles.volunteer}>
          <p style={{ fontSize: "26px", color: "#008080", fontWeight: "700", textAlign: "center" }}>Volunteer with Monasteries in Sikkim</p>
          <div className={styles.volunteerlist}>
            {filteredVolunteers.length > 0 ? (
              filteredVolunteers.map((volunteermonastery) => {
                return (
                  <div key={volunteermonastery._id || volunteermonastery.monasteryId} className={styles.monasteryCard} style={{ width: "400px" }}>
                    <img src={`http://localhost:5000${volunteermonastery.image[0]}`} alt={volunteermonastery.name} style={{ height: "300px", width: "400px", borderRadius: "15px" }} />
                    <p style={{ fontSize: "22px", fontWeight: "700", color: "#008080" }}>{volunteermonastery.name}</p>
                    <p style={{ fontSize: "22px", fontWeight: "400", color: "#454545" }}>{volunteermonastery.location}<br />{volunteermonastery.activities}<br />{volunteermonastery.phone}<br />{volunteermonastery.email} </p>
                  </div>
                );
              })
            ) : (
              <div className={styles.noResults}>
                <p style={{ fontSize: "20px", color: "#888", fontStyle: "italic" }}>No volunteer monasteries match your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Volunteer