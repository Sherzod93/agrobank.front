import React, { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { PageContentFetchState } from '../../../services/reducers';
import { useAppSelector } from '../../../services/store';
import { Footer } from '../../footer/footer';
import { Header } from '../../header/header';
import appStyles from '../style.module.scss';
// import { TestModeBlock } from '../../blocks';

const PageLayout: FC = () => {
  const { requestPhase: sectionsRequestPhase } = useAppSelector((state) => state.pageContent);
  const isFooterHidden = sectionsRequestPhase === PageContentFetchState.rejected;
  const navigate = useNavigate();

  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const { target } = event;
      const closestAnchorElement = (target as HTMLElement).closest('a:not([data-router])');

      if (closestAnchorElement && closestAnchorElement === target) {
        const href = closestAnchorElement.getAttribute('href') ?? '';

        if (href.startsWith('/')) {
          navigate(href);
          event.preventDefault();
        }
      }
    };

    window.addEventListener('click', clickHandler, { capture: true });

    return () => {
      window.removeEventListener('click', clickHandler);
    };
  }, [navigate]);

  return (
    <>
      <Header className={appStyles['app__header']} />
      <Outlet />
      {/*<TestModeBlock />*/}
      {!isFooterHidden ? <Footer className={appStyles['app__footer']} /> : null}
    </>
  );
};

export { PageLayout };
