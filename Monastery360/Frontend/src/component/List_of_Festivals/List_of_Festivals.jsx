import React from 'react'
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import styles from '../List_of_Festivals/List_of_Festivals.module.css'

const List_of_Festivals = () => {
    return (
        <div>
            <Header />
            <section>
                <section className={styles.background}>
                    <div style={{ width: "855px", textAlign: 'center', paddingLeft: "25px" }}>
                        <p style={{ fontSize: "50px", color: "#008080", fontWeight: "700", paddingTop: "25px" }}>Explore Monasteries in Sikkim</p>
                        <p style={{ fontSize: "22px", color: "#008080", fontStyle: "italic", fontWeight: "500" }}>Experience centuries of tradition, explore spiritual heritage, and contribute through volunteering at every monastery</p>
                    </div>
                </section>
            </section>
            <Footer />
        </div>
    )
}

export default List_of_Festivals