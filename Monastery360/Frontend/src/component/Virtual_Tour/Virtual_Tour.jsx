import React, { useEffect, useRef } from "react";
import "aframe";

const Virtual_Tour = () => {
  const sceneRef = useRef();

  useEffect(() => {
    const scene = sceneRef.current;
    const audioEl = document.querySelector("#chant");
    const infoPanel = document.getElementById("infoPanel");

    // Audio on first click
    scene.addEventListener(
      "click",
      () => {
        if (audioEl && audioEl.components.sound) {
          audioEl.components.sound.playSound();
        }
      },
      { once: true }
    );

    // Hotspots
    const hotspots = scene.querySelectorAll(".clickable");
    hotspots.forEach((h) =>
      h.addEventListener("click", () => {
        infoPanel.innerHTML = h.getAttribute("data-info");
      })
    );

    return () => {
      hotspots.forEach((h) =>
        h.removeEventListener("click", () => {})
      );
    };
  }, []);

  return (
    <div style={{ width: "80%", height: "600px", position: "relative" }}>
      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        ref={sceneRef}
        style={{ width: "100%", height: "100%" }}
      >
        <a-sky src="/assets/Street View 360.jpg" rotation="0 -90 0"></a-sky>

        <a-entity
          id="chant"
          sound="src: url(/assets/chant.mp3); autoplay: false; loop: true"
        ></a-entity>

        <a-entity id="rig" position="0 1.6 0">
          <a-entity camera look-controls  wasd-controls="acceleration: 500">
            <a-entity
              cursor="fuse: false; rayOrigin: mouse"
              position="0 0 -1"
              geometry="primitive: ring; radiusInner: 0.01; radiusOuter: 0.02"
              material="color: yellow; shader: flat"
            ></a-entity>
          </a-entity>
        </a-entity>

        <a-image
          class="clickable"
          src="/assets/pin-point.png"
          position="2 1.6 -3"
          scale="0.5 0.5 0.5"
          look-at="#rig"
          data-info="<h3>Main Prayer Hall</h3><p>Seat of Dharma teachings.</p>"
        ></a-image>
        <a-image
          class="clickable"
          src="/assets/pin-point.png"
          position="-2 1.2 -4"
          scale="0.5 0.5 0.5"
          look-at="#rig"
          data-info="<h3>Prayer Wheels</h3><p>Used by monks and visitors.</p>"
        ></a-image>
      </a-scene>

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
        }}
      >
      </div>
    </div>
  );
};

export default Virtual_Tour;
