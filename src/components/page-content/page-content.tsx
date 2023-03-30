import cs from 'classnames';
import React, { FC, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useBaseBackgroundColor } from '../../contexts';
import { resolveHtmlEntities } from '../../helpers';
import { BaseBackgroundColor, PageContentData } from '../../interfaces';
import { fetchPageContent, PageContentFetchState } from '../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { PageSections } from '../page-sections';
import { ErrorPage } from '../pages/error-page/error-page';
import pageContentStyles from './style.module.scss';


const PageContent: FC = () => {
  const pathnameRef = useRef<string>();
  const { pathname } = useLocation();
  const { setPageBaseBackgroundColor } = useBaseBackgroundColor();
  const {
    content: { isPageForBusiness = null, sections = [], seo = {} as PageContentData['seo'] } = {},
    requestPhase: sectionsRequestPhase,
  } = useAppSelector((state) => state.pageContent);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      ![PageContentFetchState.fulfilled, PageContentFetchState.pending, PageContentFetchState.rejected].includes(
        sectionsRequestPhase,
      ) ||
      pathnameRef.current !== pathname
    ) {
      pathnameRef.current = pathname;
      dispatch(fetchPageContent(pathname));
    }
  }, [dispatch, pathname, sectionsRequestPhase]);

  useEffect(() => {
    if (setPageBaseBackgroundColor && isPageForBusiness !== null) {
      setPageBaseBackgroundColor(isPageForBusiness ? BaseBackgroundColor.deepBlue : BaseBackgroundColor.default);
    }
  }, [isPageForBusiness, setPageBaseBackgroundColor]);

  if (sectionsRequestPhase === PageContentFetchState.rejected) {
    return <ErrorPage className={cs(pageContentStyles['page__content'], pageContentStyles['page__content_error'])} />;
  }

  return (
    <div className={pageContentStyles['page__content']}>
      {seo ? (
        <Helmet>
          {seo.description ? <meta name="description" content={resolveHtmlEntities(seo.description)} /> : null}
          {seo.keywords ? <meta name="keywords" content={resolveHtmlEntities(seo.keywords)} /> : null}
          {seo.title ? <title>{resolveHtmlEntities(seo.title)}</title> : null}
          {seo.og ? (
            <>
              {seo.og.title ? <meta property="og:title" content={resolveHtmlEntities(seo.og.title)} /> : null}
              {seo.og.description ? (
                <meta property="og:description" content={resolveHtmlEntities(seo.og.description)} />
              ) : null}
              {seo.og.url ? <meta property="og:url" content={seo.og.url} /> : null}
              {seo.og.image ? (
                <>
                  {seo.og.image.src ? <meta property="og:image" content={seo.og.image.src} /> : null}
                  {seo.og.image.height ? (
                    <meta property="og:image:height" content={String(seo.og.image.height)} />
                  ) : null}
                  {seo.og.image.width ? <meta property="og:image:width" content={String(seo.og.image.width)} /> : null}
                </>
              ) : null}
            </>
          ) : null}
        </Helmet>
      ) : null}
      {sections.length ? <PageSections sections={sections} /> : null}
    </div>
  );
};

export { PageContent };
