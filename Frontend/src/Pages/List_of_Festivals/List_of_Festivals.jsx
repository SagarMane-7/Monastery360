import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../component/Header/Header.jsx';
import Footer from '../../component/Footer/Footer.jsx';
import styles from '../List_of_Festivals/List_of_Festivals.module.css'


const List_of_Festivals = () => {
    const [festivals, setFestivals] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/festivals")
            .then((response) => response.json())
            .then((data) => setFestivals(data))
            .catch((error) => console.error("Error fetching festivals:", error));
    }, []);

    const filteredFestivals = festivals.filter((festival) =>
        festival.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (festival.description || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Header />
            <section className={styles.background}>
                <div style={{ width: "750px", height: "200px", background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(5px)", borderRadius: "15px" }}>
                    <p style={{ fontSize: "50px", color: "#ffffff", fontWeight: "700" }}>Festivals of Sikkim</p>
                    <p style={{ fontSize: "22px", color: "#ffffff", fontStyle: "italic", fontWeight: "500" }}>Sacred celebrations that keep centuries-old traditions alive</p>
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
                        placeholder="Search festivals by name or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button className={styles.clearBtn} onClick={() => setSearchQuery("")}>✕</button>
                    )}
                </div>
                {searchQuery && (
                    <p className={styles.resultCount}>
                        {filteredFestivals.length} {filteredFestivals.length === 1 ? "festival" : "festivals"} found
                    </p>
                )}
            </section>

            <section >
                <div className={styles.festival}>
                    <div className={styles.festivallist}>
                        {filteredFestivals.length > 0 ? (
                            filteredFestivals.map((festival) => (
                                <div key={festival._id} className={styles.festivalCard}>
                                    <Link to={`/festivals/${encodeURIComponent(festival.name)}`}>
                                        <img
                                            src={`http://localhost:5000${festival.image[0]}`}
                                            alt={festival.name}
                                            style={{ height: "300px", width: "400px", borderRadius: "15px" }}
                                        />
                                    </Link>
                                    <p style={{ fontSize: "22px", fontWeight: "700", color: "#008080" }}>
                                        {festival.name}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className={styles.noResults}>
                                <p style={{ fontSize: "20px", color: "#888", fontStyle: "italic" }}>No festivals match your search. Try a different keyword.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default List_of_Festivals