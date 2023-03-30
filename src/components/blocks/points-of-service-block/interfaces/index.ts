import { AbstractBlockProps, Country, PointOfServiceType } from '../../../../interfaces';

export interface PointsOfServiceBlockProps extends AbstractBlockProps {
  posType?: PointOfServiceType | null;
  isCompact?: boolean;
  countries: Country[];
  withCategoryFilter?: boolean;
}
