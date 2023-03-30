let result: Promise<boolean> | null = null;

const detectFeature = async () => {
  if (!result) {
    const webpImage = new Image();

    webpImage.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAUAQCdASoBAAEAEDj+AAANwAD+5WoAAAA=';

    result = Promise.resolve()
      .then(() => {
        return webpImage.decode().then(() => true);
      })
      .catch(() => false);
  }

  return result;
};

export default detectFeature;
