import React, { useContext, useEffect, useState } from 'react';
import { ImageInfo } from '../../interfaces';
import detectFeatures from './detectFeatures';

export const FeaturesContext = React.createContext<Record<string, any> | null>(null);

export const useFeatures = () => {
  return useContext(FeaturesContext);
};

const featuresDetectionResults = detectFeatures();

export const useFeaturesContextValue = () => {
  const [result, setResult] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    let isMounted = true;
    featuresDetectionResults
      .then((result) => {
        ImageInfo.webpSupport = result.webp;

        if (isMounted) {
          setResult(result);
        }
      })
      .catch(console.error);

    return () => {
      isMounted = false;
    };
  });

  return result;
};
