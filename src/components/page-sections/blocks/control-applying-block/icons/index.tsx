import React, { FC } from 'react';
import { WithClassNameComponentProps } from '../../../../../interfaces';

export const SuccessIcon: FC<WithClassNameComponentProps> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    height="97"
    viewBox="0 0 100 97"
    width="100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clipRule="evenodd"
      d="M52.8038 4.09457L48.9367 0L45.0696 4.09457L26.9845 23.2435L34.7187 30.548L43.6175 21.1257V74.7681H54.2558V21.1257L63.1547 30.548L70.8889 23.2435L52.8038 4.09457ZM0 44.7902V91.5987V96.9178H5.31915H94.6808H100V91.5987V44.7902H89.3617V86.2795H10.6383V44.7902H0Z"
      fill="white"
      fillRule="evenodd"
    />
  </svg>
);

export const RejectIcon: FC<WithClassNameComponentProps> = ({ className }) => (
  <svg className={className} width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.2574 27.5L14.8787 20.1213L19.1213 15.8787L26.5 23.2574L33.8787 15.8787L38.1213 20.1213L30.7426 27.5L38.1213 34.8787L33.8787 39.1213L26.5 31.7426L19.1213 39.1213L14.8787 34.8787L22.2574 27.5Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27 54C41.9117 54 54 41.9117 54 27C54 12.0883 41.9117 0 27 0C12.0883 0 0 12.0883 0 27C0 41.9117 12.0883 54 27 54ZM27 48C38.598 48 48 38.598 48 27C48 15.402 38.598 6 27 6C15.402 6 6 15.402 6 27C6 38.598 15.402 48 27 48Z"
      fill="white"
    />
  </svg>
);
