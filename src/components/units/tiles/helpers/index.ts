export const calcTilesCount = (containerWidth: number, tileWidth: number) => {
  return Math.max(3, Math.floor(containerWidth / tileWidth));
};

export const calcDivisionPoint = (actualBackgroundSize: number, count: number) =>
  actualBackgroundSize * Math.ceil((count * 6) / 10);
