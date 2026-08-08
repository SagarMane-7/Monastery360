# Monastery360: Sikkim Monastic Heritage, Virtual Tours & Volunteer Portal

An enterprise-grade, microservice-ready web application showcasing the rich monastic culture, seasonal festivals, and volunteer opportunities of Sikkim. Built with geolocated mapping, virtual 3D tours, automated media processing pipelines, and a contextual chatbot assistant.

---

## Executive Summary
Monastery360 serves as a digital preservation repository and interactive explorer for Sikkim's cultural heritage. By combining geolocated maps, high-fidelity virtual tours, and a real-time volunteer coordinator dashboard, the platform enables tourists, historians, and volunteers to explore monastic hubs, schedule festival calendar events, and coordinate community outreach programs.

---

## System Architecture

The platform utilizes a decoupled client-server design optimized for rich media delivery:

```
                  +-----------------------------------+
                  |          React Frontend           |
                  |     (Vite + Leaflet + A-Frame)    |
                  +-----------------+-----------------+
                                    |
                                    | HTTP / JSON (Port 3000)
                                    v
                  +-----------------+-----------------+
                  |       Node.js Express Server      |
                  +--------+-----------------+--------+
                           |                 |
         Queries telemetry |                 | Media uploads & CDN (Port 5000)
                           v                 v
                  +--------+--------+  +-----+-----------------+
                  |  MongoDB Atlas  |  |  Google Cloud Storage |
                  | (Mongoose ORM)  |  |  (IIIF / FFmpeg APIs) |
                  +-----------------+  +-----------------------+
```

### Component Breakdown
* **Fidelity Dashboard (frontend/)**: Single Page Application (SPA) built using Vite and React, engineered with a fluid grid, Leaflet.js interactive mapping, A-Frame 3D viewport engines, and Karla typography.
* **API Gateway Service (backend/)**: Express.js server administering secure routes, database seeding scripts, OpenAI integration, and media processing.
* **Persistence Layer (MongoDB)**: Scalable document store running Mongoose ODM schemas, pre-configured with text search indexes.
* **Media & Delivery Infrastructure**: 
  - **Google Cloud Storage (GCS)** for secure cloud asset persistence.
  - **IIIF Image API** for real-time, dynamic deep-zoom image delivery.
  - **FFmpeg utility pipeline** for video transcoding and compression on upload.

---

## Technology Stack

| Layer | Technologies & Libraries |
|-------|--------------------------|
| **Frontend Core** | React.js (Vite), Karla Sans-Serif Font System |
| **Graphics & Geospatial** | Leaflet.js (Mapbox Tiles), A-Frame |
| **Backend Core** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Authentication** | Firebase Client & Admin SDK Authentication |
| **Storage & CDN** | Google Cloud Storage (GCS) Client SDK |
| **Media Engine** | IIIF Image API, FFmpeg Video Processing Wrapper |
| **PWA & Offline Caching**| Vite PWA Plugin, Workbox Service Worker |
| **AI Integration** | OpenAI NodeJS SDK (Contextual Chatbot) |

---

## Functional Specifications

### 1. Geolocated Monastic Explorer
Features interactive Leaflet.js maps plotted with geolocated pins for Sikkim's monasteries. Users can filter markers by sect, location, and volunteering availability, displaying contextual sidebars showing virtual tour access, historical timelines, and nearby points of interest.

### 2. Deep-Zoom Media Delivery Pipeline
Leverages the IIIF Image API to deliver ultra-high-resolution canvas images for monastic thangkas and architectural art without incurring heavy load times. Video files are transcoded on-the-fly using FFmpeg wrappers and streamed directly from Google Cloud Storage buckets.

### 3. Progressive Web App (PWA) Support
Engineered with offline caching capabilities via `vite-plugin-pwa`. Critical data, festival maps, and offline assets are cached locally using Workbox strategies, allowing hikers and tourists to access local cultural guides in remote high-altitude zones with weak internet connectivity.

### 4. Natural Language Chatbot
Integrates the OpenAI API. The chatbot acts as a virtual tourist guide, answering historical queries, explaining festival symbolisms, and providing weather warnings for travel itineraries.

---

