import {useEffect, useState} from 'react';

const useDeviceDimensions = (margin = 30) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    midWidth: 0,
    midHeight: 0,
    dimH: 0,
    dimW: 0
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setDimensions({
        width,
        height,
        midWidth: width / 2,
        midHeight: height / 2,
        dimH: (height - margin) / 2.3,
        dimW: (width - margin) / 2.5
      });
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [margin]);

  return dimensions;
};

export default useDeviceDimensions

