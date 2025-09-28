import React from 'react'
import styles from './Map.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MapComponent from '../Map_API/Map_API';

const Map = () => {
  return (
    <div>
      <Header/>
      
      <p style={{fontSize:'50px',fontWeight:'700',color:'#008080', textAlign:'center'}}>
        Explore Monasteries of Sikkim
      </p>
      
      <p style={{fontSize:'22px',fontWeight:'500',color:'#454545', textAlign:'center',fontStyle:'italic'}}>
        Discover the rich cultural and spiritual heritage of Sikkim through our interactive monastery map.<br/>
        Zoom in to explore monasteries, nearby homestays, and local attractions.
      </p>
      
      <div className={styles.map}>
        <MapComponent className={styles.mapBox} />
      </div>

      <div style={{textAlign:'center', marginTop:'20px'}}>
        <p style={{fontSize:'22px',fontWeight:'500',color:'#454545'}}>🗺️ Use the map to find monasteries and plan your journey.</p>
        <p style={{fontSize:'22px',fontWeight:'500',color:'#454545'}}>📍 Click on markers for more details about each location.</p>
        <p style={{fontSize:'22px',fontWeight:'500',color:'#454545'}}>🏡 Nearby homestays and glamping sites are also highlighted.</p>
      </div>
      
      <Footer/>
    </div>
  )
}

export default Map
