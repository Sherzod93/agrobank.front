import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TheSiteIsTestMode } from '../../../interfaces';
import './test-mode-block.css';

const TestModeBlock: FC = () => {
    const {
        i18n: { t },
      } = useTranslation();

      const theSiteIsTestMode: TheSiteIsTestMode = {
        text: t('global.site-is-test-mode'),
        button: t('global.clear'),
      };

    const [isShow, setShow] =  useState(localStorage.getItem('isTest') !== 'Y');

    return (
        (
            isShow ? <div className="test-mode-block animate__animated animate__fadeInRightBig">
                <div className="test-mode-block-text">
                   {theSiteIsTestMode.text}
                </div>
                <button className="test-mode-block-button" onClick={() => {
                    setShow(!isShow);
                    localStorage.setItem('isTest', 'Y');
                }}>
                     {theSiteIsTestMode.button}
                </button>
            </div> : <></>
        )
    );
};

export { TestModeBlock };