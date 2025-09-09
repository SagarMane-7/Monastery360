import React, { useEffect, useState } from 'react';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import styles from '../List_of_Festivals/List_of_Festivals.module.css'


const List_of_Festivals = () => {
    const [festivals, setFestivals] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/festivals")
            .then((response) => response.json())
            .then((data) => setFestivals(data.festivals))
            .catch((error) => console.error("Error fetching festivals:", error));
    }, []);

    return (
        <div>
            <Header />
            <section className={styles.background}>
                <div style={{ width: "750px", height: "200px", background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(5px)", borderRadius: "15px" }}>
                    <p style={{ fontSize: "50px", color: "#ffffff", fontWeight: "700" }}>Festivals of Sikkim</p>
                    <p style={{ fontSize: "22px", color: "#ffffff", fontStyle: "italic", fontWeight: "500" }}>Sacred celebrations that keep centuries-old traditions alive</p>
                </div>
            </section>

            <section >
                <div className={styles.festival}>
                    <div className={styles.festivallist}>
                        {festivals.map((festival) => (
                            <div key={festival.id} className={styles.festivalCard}>
                                <img
                                    src={`http://localhost:5000${festival.image[0]}`}
                                    alt={festival.name}
                                    style={{ height: "300px", width: "400px", borderRadius: "15px" }}
                                />
                                <p style={{ fontSize: "22px", fontWeight: "700", color: "#008080" }}>
                                    {festival.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default List_of_Festivals