import cs from 'classnames';
import React, { FC } from 'react';
import { AddressData, WithClassNameComponentProps } from '../../../interfaces';
import { Address } from '../address/address';
import addressesStyles from './style.module.scss';

const addressesClassname = 'addresses';

interface AddressesProps {
  items: AddressData[];
}

const Addresses: FC<AddressesProps & WithClassNameComponentProps> = ({ className, items }) => (
  <ul className={cs(addressesStyles[addressesClassname], className)}>
    {items.map((address) => (
      <Address key={address.id} address={address} className={addressesStyles[`${addressesClassname}__item`]} />
    ))}
  </ul>
);

export { Addresses };
