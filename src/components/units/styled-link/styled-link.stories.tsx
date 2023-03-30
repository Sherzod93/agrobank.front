import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import '../../../styles/index.scss';
import templateStyles from './style.stories.module.scss';
import { StyledLink as StyledLinkComponent } from './styled-link';

export default {
  title: 'Common/Styled Link',
  component: StyledLinkComponent,
} as ComponentMeta<typeof StyledLinkComponent>;

const StyledLink: ComponentStory<typeof StyledLinkComponent> = (_, { globals: { baseBackgroundColor } }) => {
  return (
    <Router>
      <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
        <div
          className={cs(
            templateStyles['template'],
            templateStyles[`template_base-background-color_${baseBackgroundColor}`],
          )}
        >
          <div className={templateStyles['template__layout']}>
            <div>
              <StyledLinkComponent className={'h2'} to={'/'}>
                Олдиндан фоиз
              </StyledLinkComponent>
            </div>
            <div>
              <StyledLinkComponent className={'text text_body_1'} to={'/'}>
                Ипотечный кредит
              </StyledLinkComponent>
            </div>
            <div>
              <StyledLinkComponent className={'text text_body_1'} to={'/'}>
                Агробанк совместно с&nbsp;«O’zbekinvest» выпустил акцию «Омадли&nbsp;апрель»
              </StyledLinkComponent>
            </div>
            <div>
              <StyledLinkComponent className={'h2'} to={'https://ya.ru'}>
                Агробанк совместно с&nbsp;«O’zbekinvest» выпустил акцию «Омадли&nbsp;апрель»
              </StyledLinkComponent>
            </div>
          </div>
        </div>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};

export { StyledLink };
