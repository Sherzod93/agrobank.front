import { InfoCardType } from '../../../interfaces';
import { LinkInfoCard } from './link-info-card/link-info-card';
import { MobileApplicationInfoCard } from './mobile-application-info-card/mobile-application-info-card';
import { MobileTopUpInfoCard } from './mobile-top-up-info-card/mobile-top-up-info-card';
import { TextInfoCard } from './text-info-card/text-info-card';
import { TransferInfoCard } from './transfer-info-card/transfer-info-card';

export const infoCardTypeToComponentMap = {
  [InfoCardType.link as const]: LinkInfoCard,
  [InfoCardType.mobileApplication as const]: MobileApplicationInfoCard,
  [InfoCardType.mobileTopUp as const]: MobileTopUpInfoCard,
  [InfoCardType.text as const]: TextInfoCard,
  [InfoCardType.transfer as const]: TransferInfoCard,
};
