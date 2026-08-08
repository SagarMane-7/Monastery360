import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from '../../component/Header/Header.jsx';
import Footer from '../../component/Footer/Footer.jsx';
import Button from "../../component/Button/Button.jsx";
import styles from "./List_of_Monasteries.module.css"

export const List_of_Monasteries = () => {

    const [monasteries, setMonasteries] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/monasteries")
            .then((response) => response.json())
            .then((data) => setMonasteries(data))
            .catch((error) => console.error("Error fetching monasteries:", error));
    }, []);

    const filteredMonasteries = monasteries.filter((monastery) =>
        monastery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monastery.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (monastery.quickFacts?.sect || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Header />
            <section className={styles.background}>
                <div style={{ width: "855px", textAlign: 'center', paddingLeft: "25px" }}>
                    <p style={{ fontSize: "50px", color: "#008080", fontWeight: "700" }}>Explore Monasteries in Sikkim</p>
                    <p style={{ fontSize: "22px", color: "#454545", fontStyle: "italic", fontWeight: "500", paddingBottom: "150px" }}>Experience centuries of tradition, explore spiritual heritage, and contribute through volunteering at every monastery</p>
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
                        placeholder="Search monasteries by name, location, or sect..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button className={styles.clearBtn} onClick={() => setSearchQuery("")}>✕</button>
                    )}
                </div>
                {searchQuery && (
                    <p className={styles.resultCount}>
                        {filteredMonasteries.length} {filteredMonasteries.length === 1 ? "monastery" : "monasteries"} found
                    </p>
                )}
            </section>

            <section>
                <div className={styles.monastery}>
                    <div className={styles.monasterylist}>
                        {filteredMonasteries.length > 0 ? (
                            filteredMonasteries.map((monastery) => {
                                return (
                                    <div key={monastery._id} className={styles.monasteryCard}>
                                        <Link to={`/monasteries/${encodeURIComponent(monastery.name)}`}>
                                            <img src={`http://localhost:5000${monastery.image[0]}`} alt={monastery.name} style={{ height: "300px", width: "400px", borderRadius: "15px" }} />
                                        </Link>
                                        <p style={{ fontSize: "22px", fontWeight: "700", color: "#008080" }}>{monastery.name}</p>
                                        <p style={{ fontSize: "22px", fontWeight: "400", color: "#454545" }}>{monastery.location}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <div className={styles.noResults}>
                                <p style={{ fontSize: "20px", color: "#888", fontStyle: "italic" }}>No monasteries match your search. Try a different keyword.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section>

            </section>
            <Footer />
        </div>
    )
}
