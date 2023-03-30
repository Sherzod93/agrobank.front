import { default as detectWebpSupport } from './webp';

const featuresDetectors = {
  webp: detectWebpSupport,
};
let result: Promise<Record<string, any>> | null = null;

const detectFeatures = async () => {
  if (!result) {
    const promises = Object.entries(featuresDetectors).reduce((result, [feature, detect]) => {
      result.push({
        feature,
        detectionPromise: detect(),
      });

      return result;
    }, [] as { feature: string; detectionPromise: Promise<boolean> }[]);

    result = Promise.all(promises.map(({ detectionPromise }) => detectionPromise)).then((detectionResults) => {
      return Object.freeze(
        detectionResults.reduce(
          (result, detectionResult, ix) => Object.assign(result, { [promises[ix].feature]: detectionResult }),
          {},
        ),
      );
    });
  }

  return result;
};

export default detectFeatures;
