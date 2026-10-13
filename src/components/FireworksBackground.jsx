import { useEffect, useRef, useId } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

// module-level flag — poore app mein sirf ek baar hi preset register hoga
let presetLoaded = false;
let presetLoadingPromise = null;

async function ensurePresetLoaded() {
  if (presetLoaded) return;
  if (!presetLoadingPromise) {
    presetLoadingPromise = loadFireworksPreset(tsParticles).then(() => {
      presetLoaded = true;
    });
  }
  return presetLoadingPromise;
}

function FireworksBackground() {
  const containerRef = useRef(null);
  const rawId = useId();
  const uniqueId = `fireworks-bg-${rawId.replace(/:/g, "")}`;

  useEffect(() => {
    let isMounted = true;
    let container;

    async function init() {
      const el = document.getElementById(uniqueId);
      if (el) el.innerHTML = "";

      await ensurePresetLoaded();

      if (!isMounted) return;

      const container = await tsParticles.load({
        id: uniqueId,
        options: {
          preset: "fireworks",
          background: { color: "transparent" },
          fullScreen: { enable: false },
          detectRetina: true,
          sounds: {
            enable: false, // yahi fix hai — audio context conflict wale errors band ho jayenge
          },
        },
      });

      if (!isMounted) {
        container?.destroy();
        return;
      }

      requestAnimationFrame(() => {
        if (isMounted) container?.refresh();
      });
    }

    init();

    return () => {
      isMounted = false;
      container?.destroy();
      const el = document.getElementById(uniqueId);
      if (el) el.innerHTML = "";
    };
  }, [uniqueId]);

  return (
    <div
      id={uniqueId}
      ref={containerRef}
      className="absolute inset-0 z-0"
    ></div>
  );
}

export default FireworksBackground;