import React, { useEffect, useRef, useState, useCallback } from "react";
import "aframe";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const FALLBACK_SCENE = {
  name: "Street View",
  type: "360",
  panoramaUrl: "/assets/Street View 360.jpg",
  description: "360° street view of the monastery area.",
  hotspots: [
    {
      _id: "fallback-1",
      name: "Main Prayer Hall",
      position: "2 1.6 -3",
      targetScene: "",
      description: "Seat of Dharma teachings.",
    },
    {
      _id: "fallback-2",
      name: "Prayer Wheels",
      position: "-2 1.2 -4",
      targetScene: "",
      description: "Used by monks and visitors.",
    },
  ],
};

const Virtual_Tour = ({ monasteryId }) => {
  const sceneRef = useRef();
  const [scenes, setScenes] = useState([]);
  const [currentScene, setCurrentScene] = useState(null);
  const [loading, setLoading] = useState(true);
  const [infoText, setInfoText] = useState("");

  useEffect(() => {
    if (!monasteryId) {
      setCurrentScene(FALLBACK_SCENE);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${API_BASE}/api/monasteries/${monasteryId}/scenes`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setScenes(data);
          setCurrentScene(data[0]);
        } else {
          setCurrentScene(FALLBACK_SCENE);
        }
      })
      .catch((err) => {
        console.error("Error fetching scenes:", err);
        setCurrentScene(FALLBACK_SCENE);
      })
      .finally(() => setLoading(false));
  }, [monasteryId]);

  const navigateToScene = useCallback(
    (targetSlug) => {
      if (!targetSlug) return;

      const localScene = scenes.find((s) => s.slug === targetSlug);
      if (localScene) {
        setCurrentScene(localScene);
        setInfoText(`Navigated to: ${localScene.name}`);
        return;
      }

      fetch(`${API_BASE}/api/scenes/${targetSlug}`)
        .then((res) => {
          if (!res.ok) throw new Error("Scene not found");
          return res.json();
        })
        .then((data) => {
          setCurrentScene(data);
          setInfoText(`Navigated to: ${data.name}`);
        })
        .catch((err) => {
          console.error("Error navigating to scene:", err);
          setInfoText("Could not load the target scene.");
        });
    },
    [scenes]
  );

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const handleFirstClick = () => {
      const audioEl = document.querySelector("#chant");
      if (audioEl && audioEl.components.sound) {
        audioEl.components.sound.playSound();
      }
    };

    scene.addEventListener("click", handleFirstClick, { once: true });
    return () => scene.removeEventListener("click", handleFirstClick);
  }, []);

  const getPanoramaUrl = (url) => {
    if (!url) return "/assets/Street View 360.jpg";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return url.startsWith("/") ? url : `/${url}`;
  };

  if (loading) {
    return (
      <div
        style={{
          width: "80%",
          height: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.05)",
          borderRadius: "12px",
        }}
      >
        <p style={{ color: "#008080", fontSize: "18px", fontWeight: "600" }}>
          Loading virtual tour...
        </p>
      </div>
    );
  }

  if (!currentScene) {
    return (
      <div
        style={{
          width: "80%",
          height: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.05)",
          borderRadius: "12px",
        }}
      >
        <p style={{ color: "#888", fontSize: "18px" }}>
          No virtual tour scenes available.
        </p>
      </div>
    );
  }

  return (
    <div style={{ width: "80%", height: "600px", position: "relative" }}>
      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        ref={sceneRef}
        style={{ width: "100%", height: "100%" }}
      >
        <a-sky
          src={getPanoramaUrl(currentScene.panoramaUrl)}
          rotation="0 -90 0"
        ></a-sky>

        <a-entity
          id="chant"
          sound="src: url(/assets/chant.mp3); autoplay: false; loop: true"
        ></a-entity>

        <a-entity id="rig" position="0 1.6 0">
          <a-entity camera look-controls wasd-controls="acceleration: 500">
            <a-entity
              cursor="fuse: false; rayOrigin: mouse"
              position="0 0 -1"
              geometry="primitive: ring; radiusInner: 0.01; radiusOuter: 0.02"
              material="color: yellow; shader: flat"
            ></a-entity>
          </a-entity>
        </a-entity>

        {currentScene.hotspots &&
          currentScene.hotspots.map((hotspot) => (
            <a-image
              key={hotspot._id || hotspot.name}
              className="clickable"
              src="/assets/pin-point.png"
              position={hotspot.position || "0 1.6 -3"}
              scale="0.5 0.5 0.5"
              look-at="#rig"
              data-info={`<h3>${hotspot.name}</h3><p>${hotspot.description || ""}</p>`}
              data-target={hotspot.targetScene || ""}
              onClick={() => {
                setInfoText(
                  `<h3>${hotspot.name}</h3><p>${hotspot.description || ""}</p>`
                );
                if (hotspot.targetScene) {
                  navigateToScene(hotspot.targetScene);
                }
              }}
            ></a-image>
          ))}
      </a-scene>

      {scenes.length > 1 && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
            zIndex: 10,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {scenes.map((s) => (
            <button
              key={s._id || s.slug}
              onClick={() => {
                setCurrentScene(s);
                setInfoText(`Viewing: ${s.name}`);
              }}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                border:
                  currentScene?.slug === s.slug
                    ? "2px solid #cc6e2e"
                    : "1px solid rgba(255,255,255,0.5)",
                background:
                  currentScene?.slug === s.slug
                    ? "rgba(204,110,46,0.7)"
                    : "rgba(0,0,0,0.5)",
                color: "white",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
                transition: "all 0.2s ease",
              }}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      <div
        id="infoPanel"
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          background: "rgba(0,0,0,0.6)",
          color: "white",
          padding: "10px",
          borderRadius: "8px",
          maxWidth: "300px",
          zIndex: 10,
          backdropFilter: "blur(6px)",
        }}
        dangerouslySetInnerHTML={{
          __html:
            infoText ||
            `<h3>${currentScene.name}</h3><p>${currentScene.description || ""}</p>`,
        }}
      ></div>
    </div>
  );
};

export default Virtual_Tour;
