import React, { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Header from '../../component/Header/Header.jsx';
import Footer from '../../component/Footer/Footer.jsx';
import styles from './Specific_Monastery.module.css';
import Virtual_Tour from '../../component/Virtual_Tour/Virtual_Tour.jsx';
import MiniMap from '../../component/Mini_Map/Mini_Map.jsx';


const Specific_Monastery = () => {
    const { name } = useParams();
    const [monastery, setMonastery] = useState(null);

    const virtualTourRef = useRef(null);
    const scrollToVirtualTour = () => {
        virtualTourRef.current.scrollIntoView({ behavior: 'smooth' });
    };


    useEffect(() => {
        fetch(`http://localhost:5000/api/monasteries/${encodeURIComponent(name)}`)
            .then(res => res.json())
            .then(data => setMonastery(data))
            .catch(err => console.error("Error fetching monastery:", err));
    }, [name]);

    if (!monastery) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Header />
            <section className={styles.header}>
                <img src={`http://localhost:5000${monastery.image[0]}`} alt={monastery.name} className={styles.headerimage} />

                <button className={styles.virtualbtn} onClick={scrollToVirtualTour}> Start Virtual Tour</button>
            </section>


            <section className={styles.description} style={{ textAlign: "center" }}>
                <div style={{ width: "1300px" }}>
                    <p style={{ fontSize: "50px", color: "#008080", fontWeight: "700", paddingTop: "25px" }}>{monastery.name}</p>
                    <p style={{ fontSize: "22px", color: "#454545", fontStyle: "italic", fontWeight: "500" }}>{monastery.description}</p>
                </div>
            </section>

            <section className={styles.history} style={{ textAlign: "center" }}>
                <div style={{ width: "1300px" }}>
                    <p style={{ fontSize: "26px", color: "#008080", fontWeight: "700", paddingTop: "25px" }}>History</p>
                    <p>{monastery.history}</p>
                </div>
            </section>

            <section className={styles.virtualtour} ref={virtualTourRef}>
                <p style={{ fontSize: "26px", color: "#008080", fontWeight: "700", paddingTop: "25px", textAlign: "center" }}>360⁰ Virtual Tour</p>
                <Virtual_Tour />
            </section>

            <section>
                <div className={styles.facts}>
                    <div style={{ height: "225px", width: "500px", borderStyle: "solid", borderWidth: "3px", borderColor: "#cc6e2e", borderRadius: "15px", margin: "50px" }}>
                        <p style={{ color: "#008080", fontWeight: "700" }}>Architecture</p>
                        <p>{monastery.architecture}</p>
                    </div>
                    <div style={{ height: "225px", width: "500px", borderStyle: "solid", borderWidth: "3px", borderColor: "#cc6e2e", borderRadius: "15px", margin: "50px" }}>
                        <p style={{ color: "#008080", fontWeight: "700" }}>Spiritual Significance</p>
                        <p>{monastery.spiritualSignificance}</p>
                    </div>
                    <div style={{ height: "225px", width: "500px", borderStyle: "solid", borderWidth: "3px", borderColor: "#cc6e2e", borderRadius: "15px", margin: "50px" }}>
                        <p style={{ color: "#008080", fontWeight: "700" }}>Facts</p>
                        <p><strong>Established : </strong>{monastery.quickFacts.established}<br /><strong>Tradition : </strong>{monastery.quickFacts.sect}<br /><strong>Monks : </strong>{monastery.quickFacts.monks}<br /><strong>Altitude : </strong>{monastery.quickFacts.altitude}</p>
                    </div>
                    <div style={{ height: "225px", width: "500px", borderStyle: "solid", borderWidth: "3px", borderColor: "#cc6e2e", borderRadius: "15px", margin: "50px" }}>
                        <p style={{ color: "#008080", fontWeight: "700" }}>Visitor Information</p>
                        <p><strong>Visiting Hours : </strong>{monastery.visitorInfo.hours}<br /><strong>Entry Fees : </strong>{monastery.visitorInfo.fees}<br /><strong>Itinerary : </strong>{monastery.visitorInfo.itinerary}<br /><strong>Booking : </strong>{monastery.visitorInfo.booking}</p>
                    </div>
                </div>
            </section >

            <section className={styles.map}>
                <p style={{ fontSize: "26px", color: "#008080", fontWeight: "700", paddingTop: "25px", textAlign: "center" }}>Map</p>
                <MiniMap />
            </section>

            <section className={styles.archives}>
                <p style={{ fontSize: "26px", color: "#008080", fontWeight: "700", paddingTop: "25px", textAlign: "center" }}>Digital Archives</p>
                <div style={{ width: "60%", height: "600px", overflowY: "scroll", borderRadius: "10px", scrollbarWidth: "none" }}>
                    <iframe src="/assets/Rumtek_monastery.pdf" height="100%" width="100%" style={{ border: "none", width: "100%" }} title="Digital Archive"
                    />
                </div>
            </section>

            <section className={styles.gallery}>
                <p style={{ fontSize: "26px", color: "#008080", fontWeight: "700", paddingTop: "25px", textAlign: "center" }}>Photo Gallery</p>

                <div className={styles.slider}>
                    <div className={styles.sliderTrack}>
                        {monastery.image && monastery.image.length > 0 ? (
                            monastery.image.map((img, index) => (
                                <div key={index} className={styles.slide}>
                                    <img src={`http://localhost:5000${img}`} alt={`${monastery.name} ${index + 1}`} />
                                </div>
                            ))
                        ) : (
                            <p>No photos available.</p>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Specific_Monastery