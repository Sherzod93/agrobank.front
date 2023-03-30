import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { AbstractBlockProps } from '../../../interfaces';

export interface NavigateBlockProps extends AbstractBlockProps {
  url: string;
}

const NavigateBlock: FC<NavigateBlockProps> = ({ url }) => {
  return <Navigate replace={true} to={url} />;
};

export { NavigateBlock };
