import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Button from "../Button/Button";
import styles from "../List_of_Monasteries/List_of_Monasteries.module.css"

export const List_of_Monasteries = () => {

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
            <section className={styles.background}>
                <div style={{ width: "855px", textAlign: 'center', paddingLeft: "25px" }}>
                    <p style={{ fontSize: "50px", color: "#008080", fontWeight: "700"}}>Explore Monasteries in Sikkim</p>
                    <p style={{ fontSize: "22px", color: "#454545", fontStyle: "italic", fontWeight: "500" ,paddingBottom:"150px"}}>Experience centuries of tradition, explore spiritual heritage, and contribute through volunteering at every monastery</p>
                </div>
            </section>
            <section>
                <div className={styles.monastery}>
                    <div className={styles.monasterylist}>
                        {monasteries.map((monastery) => {
                            return (
                                <div key={monastery.id} className={styles.monasteryCard}>
                                    <Link to={`/monasteries/${encodeURIComponent(monastery.name)}`}>
                                    <img src={`http://localhost:5000${monastery.image[0]}`} alt={monastery.name} style={{ height: "300px", width: "400px", borderRadius: "15px" }} />
                                    </Link>
                                    <p style={{ fontSize: "22px", fontWeight: "700", color: "#008080" }}>{monastery.name}</p>
                                    <p style={{ fontSize: "22px", fontWeight: "400", color: "#454545" }}>{monastery.location}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section>

            </section>
            <Footer />
        </div>
    )
}
