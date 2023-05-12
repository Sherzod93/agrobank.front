import cs from 'classnames';
import React, { FC, useState } from 'react';
//import { useTranslation } from 'react-i18next';
import { useBaseBackgroundColor } from '../../../../contexts';
import { WithClassNameComponentProps } from '../../../../interfaces';
import { Icon, IconCode } from '../../icon/icon';
import visuallyImpairedModeStyles from './style.module.scss';

const visuallyImpairedModeClassname = 'visually-impaired-mode';
const visuallyImpairedShowClassname = 'containerisation';
const visuallyImpairedHideClassname = 'containerization';
interface VisuallyImpairedModeProps {
  withTitle?: boolean;
}

const dataVimAttributeName = 'data-vi';
const vimSettingsName = 'vim';
const vimBodyStyleSettingsName = 'body_style';
const vimBodyTextColorSettingsName = 'body_text_color';
const hasDataVimAttribute = () => {
  return document.documentElement.hasAttribute(dataVimAttributeName);
};

const saveVimSettings = (BooleanData:boolean) => {
    localStorage.setItem(vimSettingsName, String(BooleanData));
};
const saveVimBodyStyleSettings = ( BackgroundColors: string,TextColor:string) =>{
    localStorage.setItem(vimBodyStyleSettingsName, BackgroundColors);
    localStorage.setItem(vimBodyTextColorSettingsName, TextColor);
};
// const getBodyStylesFromLocal = (Settings: string)=>{
//     return localStorage.getItem(Settings);
// };
const VisuallyImpairedMode: FC<VisuallyImpairedModeProps & WithClassNameComponentProps> = ({
  className,
}) => {


    const setBaseBackgroundColor = ( BackgroundColors: string,TextColor:string) => {
        document.body.style.backgroundColor = BackgroundColors;
        document.body.style.color = TextColor;
        saveVimBodyStyleSettings(BackgroundColors,TextColor);
        const ulMenu:any = document.querySelector('ul[role="menu"]');
        if(ulMenu){
            ulMenu.style.color='black';
        }
    };
    const [toggle, setToggle] = useState(true);
    const { baseBackgroundColor } = useBaseBackgroundColor();

    return (
      <div>
    <button
      className={cs(
        visuallyImpairedModeStyles[visuallyImpairedModeClassname],
        visuallyImpairedModeStyles[`${visuallyImpairedModeClassname}_base-background-color_${baseBackgroundColor}`],
        {
          [visuallyImpairedModeStyles[`${visuallyImpairedModeClassname}_active`]]: hasDataVimAttribute(),
        },
        className,
      )}
      onClick={ () => { setToggle(!toggle); if(!hasDataVimAttribute()){
          saveVimSettings(true);
          document.documentElement.setAttribute(dataVimAttributeName, '');
      }else{
          saveVimSettings(false);
          document.documentElement.removeAttribute(dataVimAttributeName);
      }
      }} >
      <Icon
        className={visuallyImpairedModeStyles[`${visuallyImpairedModeClassname}__icon`]}
        code={IconCode.visuallyImpairedMode}
      />


    </button>
        <div className={ !hasDataVimAttribute() ? visuallyImpairedModeStyles[visuallyImpairedHideClassname]:visuallyImpairedModeStyles[visuallyImpairedShowClassname] } >

            <div><label><input type={'radio'} name={'list_of_modes[]'} checked onClick={() => setBaseBackgroundColor('white','black') } />Обычная версия</label></div>
            <div><label><input type={'radio'} name={'list_of_modes[]'} onClick={() => setBaseBackgroundColor('black','white') } />Черно-белая версия</label></div>
            <div><label><input type={'radio'} name={'list_of_modes[]'} />Включить озвучивание</label></div>
            <div><p>Размер шрифта:</p>
              <div className={visuallyImpairedModeStyles['list_views_scale_feture']} >
                <div onClick={() => { document.documentElement.setAttribute('data-vim', ''); }} >+A</div>
                  <div onClick={() => { document.documentElement.removeAttribute('data-vim'); }} >-A</div></div>
            </div>
            <div><p>Цвета сайта:</p>
              <div className={visuallyImpairedModeStyles['list_views_color_feture']}>
                  <div onClick={() => setBaseBackgroundColor('grey','black') }>A</div>
                  <div onClick={() => setBaseBackgroundColor('#232636','white') }>A</div>
                  <div onClick={() => setBaseBackgroundColor('#9DD1FF','white') }>A</div>
                  <div onClick={() => setBaseBackgroundColor('#C4A484','#3B2716') }>A</div>
                  <div onClick={() => setBaseBackgroundColor('#3B2716','limegreen') }>A</div>
              </div>
            </div>
            <div className={visuallyImpairedModeStyles['list_views_restart_feture']}
                 onClick={() => setBaseBackgroundColor('white','black') }>Сброс настроек</div>
          </div>
      </div>
  );
};

export { VisuallyImpairedMode };
