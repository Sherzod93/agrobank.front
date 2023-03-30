import { useEffect, useState } from 'react';

function getWindowDimensions() {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  return {
    windowWidth,
    windowHeight,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowDimensions;
}
