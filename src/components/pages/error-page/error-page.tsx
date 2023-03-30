import cs from 'classnames';
import { random } from 'lodash-es';
import React, { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useBaseBackgroundColor } from '../../../contexts';
import { resolveHtmlEntities } from '../../../helpers';
import { useStyleElement } from '../../../hooks';
import { BaseBackgroundColor, WithClassNameComponentProps } from '../../../interfaces';
import { PageContentFetchState } from '../../../services/reducers';
import { useAppSelector } from '../../../services/store';
import { Tiles } from '../../units/tiles/tiles';
import errorPageStyles from './style.module.scss';

const errorPageClassname = 'error-page';

const ErrorPage: FC<WithClassNameComponentProps> = ({ className }) => {
  const {
    i18n: { t, language, getResourceBundle },
  } = useTranslation();
  const { baseBackgroundColor, setPageBaseBackgroundColor } = useBaseBackgroundColor();
  const [styleElementRef, styleElementCssScope] = useStyleElement();
  const { status = 0, requestPhase: pageContentRequestPhase } = useAppSelector((state) => state.pageContent);
  const [texts, setTexts] = useState<string[]>([]);
  const [textNumber, setTextNumber] = useState<number>(0);
  useEffect(() => {
    try {
      const texts = Object.entries((getResourceBundle(language, '')['error-page'] ?? {}) as { [key: string]: string })
        .filter(([key]) => key.startsWith('text_404_'))
        .map(([, text]) => text);

      setTexts(texts);
      setTextNumber(random(texts.length - 1));
    } catch (e) {
      setTexts([]);
      setTextNumber(0);
    }
  }, [getResourceBundle, language]);

  useEffect(() => {
    if (setPageBaseBackgroundColor) {
      setPageBaseBackgroundColor(BaseBackgroundColor.green);
    }
  }, [setPageBaseBackgroundColor]);

  useEffect(() => {
    const { current: styleElement } = styleElementRef;

    if (!styleElement) {
      return;
    }

    const { sheet: cssSheet } = styleElement;

    if (!cssSheet) {
      return;
    }

    cssSheet.insertRule(
      `.${errorPageStyles[errorPageClassname]}_${styleElementCssScope} .${
        errorPageStyles[`${errorPageClassname}__tiles`]
      }::after {content: '${status}'`,
    );

    return () => {
      Array.from(cssSheet.cssRules).forEach(() => cssSheet.removeRule(0));
    };
  }, [status, styleElementCssScope, styleElementRef]);

  if (pageContentRequestPhase !== PageContentFetchState.rejected) {
    return null;
  }

  const title = t(`error-page.title_${status}`, '');
  const seoTitle = t(`error-page.seo-title_${status}`, title);
  const text = texts[textNumber];

  return (
    <div
      className={cs(
        errorPageStyles[errorPageClassname],
        `${errorPageStyles[errorPageClassname]}_${styleElementCssScope}`,
        errorPageStyles[`${errorPageClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
    >
      <div>
        {title ? (
          <>
            <Helmet>
              {seoTitle ? <title>{resolveHtmlEntities(seoTitle)}</title> : null}
              <meta name="prerender-status-code" content={String(status)} />
            </Helmet>
            <h1
              className={errorPageStyles[`${errorPageClassname}__title`]}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </>
        ) : null}
        {text ? (
          <p className={errorPageStyles[`${errorPageClassname}__text`]} dangerouslySetInnerHTML={{ __html: text }} />
        ) : null}
      </div>
      {status ? (
        <div className={errorPageStyles[`${errorPageClassname}__error-code`]}>
          <Tiles
            className={cs(errorPageStyles[`${errorPageClassname}__tiles`], {
              'recolor-white': baseBackgroundColor !== BaseBackgroundColor.default,
            })}
            animated={true}
          />
          {status}
        </div>
      ) : null}
    </div>
  );
};

export { ErrorPage };
