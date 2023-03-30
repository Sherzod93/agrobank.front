import { AdviceData } from '../../advice';
import { MobileApplicationData } from '../../mobile-application';
import { NewsItemData } from '../../news-item';
import { PersonData } from '../../person';
import { ProductData, ProductType } from '../../product';
import { ProductTagData, ProductTagTypes } from '../../product-tag';
import { VacancyData } from '../../vacancy';
import { ImageInfo, ImageInfoData } from '../image-info';

export const buildImageInfo = (image: ImageInfoData): ImageInfo => new ImageInfo(image as unknown as ImageInfoData);

export const prepareAdviceData = (adviceData: AdviceData): AdviceData => ({
  ...adviceData,
  date: new Date(adviceData.date),
  photo: buildImageInfo(adviceData.photo as unknown as ImageInfoData),
});

export const prepareMobileApplicationData = (mobileApplicationData: MobileApplicationData): MobileApplicationData => {
  return {
    ...mobileApplicationData,
    links: mobileApplicationData.links.map((link) => ({
      ...link,
      picture: buildImageInfo(link.picture as unknown as ImageInfoData),
    })),
    screenshots: (mobileApplicationData.screenshots as unknown as ImageInfoData[]).map(buildImageInfo),
  };
};

export const prepareNewsItemData = (newsItem: NewsItemData): NewsItemData => {
  return { ...newsItem };
};

export const preparePersonData = (personData: PersonData): PersonData => {
  const result = { ...personData };

  if (result.photo) {
    result.photo = buildImageInfo(result.photo as unknown as ImageInfoData);
  }

  return result;
};

export const prepareProductData = (productData: ProductData): ProductData => {
  const result: ProductData = {
    ...productData,
    backgroundPicture:
      productData.backgroundPicture && buildImageInfo(productData.backgroundPicture as unknown as ImageInfoData),
    bannerPicture:
      productData.bannerPicture && buildImageInfo(productData.bannerPicture as unknown as ImageInfoData),
    mainBannerPicture:
      productData.mainBannerPicture && buildImageInfo(productData.mainBannerPicture as unknown as ImageInfoData),
    tags: productData.tags.map(prepareProductTagData),
  };

  if (result.type === ProductType.card) {
    result.picture = buildImageInfo(result.picture as unknown as ImageInfoData);
  }

  return result;
};

export const prepareProductTagData = (productTagData: ProductTagData): ProductTagData => {
  if (productTagData.type === ProductTagTypes.date) {
    productTagData.value = new Date(productTagData.value);
  }

  if (productTagData.type === ProductTagTypes.amount && typeof productTagData.value === 'number') {
    productTagData.value = {
      amount: productTagData.value,
    };
  }

  return productTagData;
};

export const prepareVacancyData = (vacancyDate: VacancyData): VacancyData => {
  return {
    ...vacancyDate,
    date: new Date(vacancyDate.date),
  };
};
