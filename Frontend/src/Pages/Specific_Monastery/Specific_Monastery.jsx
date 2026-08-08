import React, { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Header from '../../component/Header/Header.jsx';
import Footer from '../../component/Footer/Footer.jsx';
import styles from './Specific_Monastery.module.css';
import Virtual_Tour from '../../component/Virtual_Tour/Virtual_Tour.jsx';
import MiniMap from '../../component/Mini_Map/Mini_Map.jsx';
import { getIiifThumbnail, getIiifImage } from '../../utils/iiifHelper.js';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Specific_Monastery = () => {
    const { name } = useParams();
    const [monastery, setMonastery] = useState(null);
    const [mediaItems, setMediaItems] = useState([]);
    const [lightboxImg, setLightboxImg] = useState(null);

    const virtualTourRef = useRef(null);
    const scrollToVirtualTour = () => {
        virtualTourRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        fetch(`${API_BASE}/api/monasteries/${encodeURIComponent(name)}`)
            .then(res => res.json())
            .then(data => {
                setMonastery(data);
                if (data._id) {
                    fetch(`${API_BASE}/api/monasteries/${data._id}/media?type=image`)
                        .then(res => res.json())
                        .then(media => {
                            if (Array.isArray(media)) setMediaItems(media);
                        })
                        .catch(err => console.error("Error fetching media:", err));
                }
            })
            .catch(err => console.error("Error fetching monastery:", err));
    }, [name]);

    if (!monastery) {
        return <div>Loading...</div>;
    }

    const getImageSrc = (img, width = 400) => {
        if (typeof img === 'object' && img.gcsUrl) {
            const identifier = img.gcsUrl.replace(/^https:\/\/storage\.googleapis\.com\/[^/]+\//, '');
            return getIiifThumbnail(identifier, width);
        }
        if (typeof img === 'string') {
            if (img.startsWith('http://') || img.startsWith('https://')) return img;
            return `${API_BASE}${img}`;
        }
        return '';
    };

    const getLargeImageSrc = (img) => {
        if (typeof img === 'object' && img.gcsUrl) {
            const identifier = img.gcsUrl.replace(/^https:\/\/storage\.googleapis\.com\/[^/]+\//, '');
            return getIiifImage(identifier, 1200);
        }
        if (typeof img === 'string') {
            if (img.startsWith('http://') || img.startsWith('https://')) return img;
            return `${API_BASE}${img}`;
        }
        return '';
    };

    return (
        <div>
            <Header />
            <section className={styles.header}>
                <img src={`${API_BASE}${monastery.image[0]}`} alt={monastery.name} className={styles.headerimage} />

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
                <Virtual_Tour monasteryId={monastery._id} />
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

                {mediaItems.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px", padding: "20px 0", marginBottom: "20px" }}>
                        {mediaItems.map((item) => (
                            <div
                                key={item._id}
                                style={{
                                    cursor: "pointer",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                    transition: "transform 0.3s",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                                }}
                                onClick={() => setLightboxImg(item)}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            >
                                <img
                                    src={getImageSrc(item, 300)}
                                    alt={item.title}
                                    style={{ height: "200px", width: "280px", objectFit: "cover" }}
                                    loading="lazy"
                                />
                                <p style={{ textAlign: "center", fontSize: "14px", padding: "6px", color: "#454545", margin: 0 }}>
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <div className={styles.slider}>
                    <div className={styles.sliderTrack}>
                        {monastery.image && monastery.image.length > 0 ? (
                            monastery.image.map((img, index) => (
                                <div key={index} className={styles.slide}>
                                    <img src={`${API_BASE}${img}`} alt={`${monastery.name} ${index + 1}`} />
                                </div>
                            ))
                        ) : (
                            <p>No photos available.</p>
                        )}
                    </div>
                </div>
            </section>

            {lightboxImg && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0,0,0,0.85)",
                        zIndex: 10000,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        animation: "fadeIn 0.3s ease",
                    }}
                    onClick={() => setLightboxImg(null)}
                >
                    <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
                    <img
                        src={getLargeImageSrc(lightboxImg)}
                        alt={lightboxImg.title || "High resolution"}
                        style={{
                            maxHeight: "85vh",
                            maxWidth: "90vw",
                            objectFit: "contain",
                            borderRadius: "8px",
                            boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <p style={{ color: "#fff", marginTop: "12px", fontSize: "16px", fontWeight: "500" }}>
                        {lightboxImg.title || "Image"} — Click outside to close
                    </p>
                </div>
            )}

            <Footer />
        </div>
    )
}

export default Specific_Monastery