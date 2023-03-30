const scrollToProductApplyingBlock = (navigate: any, productUrl: string) => {
  const productApplyingBlockElement = document.getElementById('product-applying-block');

  if (window.location.pathname !== productUrl) {
    navigate(productUrl);
  } else {
    if (!productApplyingBlockElement) {
      return;
    }

    window.scrollTo({
      behavior: 'smooth',
      top:
        productApplyingBlockElement.offsetTop -
        parseInt(getComputedStyle(productApplyingBlockElement).getPropertyValue('margin-top')),
    });
  }
};

export { scrollToProductApplyingBlock };
