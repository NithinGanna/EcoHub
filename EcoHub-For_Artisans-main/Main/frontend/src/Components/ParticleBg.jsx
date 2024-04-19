// ParticleBg.js
import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadLinksPreset } from "@tsparticles/preset-links";

const ParticleBg = React.memo(() => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadLinksPreset(engine); // Load the links preset
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = {
    background: {
      color: {
        value: "#FFFFFF",
      },
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#617a4f",
      },
      links: {
        color: "#617a4f",
        distance: 150,
        enable: true,
        opacity: 0.6,
        width: 1,
      },
      move: {
        enable: true,
        outMode: "bounce",
        speed: 1,
      },
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 100,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        random: true,
        value: 5,
      },
    },
    detectRetina: true,
  };

  return (
    <>
      {init && (
        <Particles id="particles" init={particlesLoaded} options={options} />
      )}
    </>
  );
});

// Set display name for ParticleBg component
ParticleBg.displayName = "ParticleBg";

export default ParticleBg;
