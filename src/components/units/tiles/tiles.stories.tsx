import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React, { useState } from 'react';
import { ProductType } from '../../../interfaces';
import '../../../styles/index.scss';
import templateStyles from './style.stories.module.scss';
import { TilePatternSize, Tiles as TilesComponent, TilingModes } from './tiles';

export default {
  title: 'Components/Tiles',
  component: TilesComponent,
} as ComponentMeta<typeof TilesComponent>;

const Tiles: ComponentStory<typeof TilesComponent> = (props) => {
  const [areTilesAnimated, setAreTilesAnimated] = useState(false);

  return (
    <div
      className={cs(templateStyles['template'])}
      onMouseEnter={() => setAreTilesAnimated(true)}
      onMouseLeave={() => setAreTilesAnimated(false)}
    >
      <TilesComponent
        {...props}
        animated={areTilesAnimated || props.animated}
        hovered={areTilesAnimated || props.hovered}
      />
    </div>
  );
};

Tiles.args = {
  animated: false,
  animationReversed: false,
  hovered: false,
  productType: ProductType.default,
  tilePatternSize: TilePatternSize.default,
  tilingMode: TilingModes.default,
};

export { Tiles };
