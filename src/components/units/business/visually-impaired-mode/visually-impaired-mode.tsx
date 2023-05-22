import cs from 'classnames';
import React, { FC, useState,useEffect } from 'react';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useBaseBackgroundColor } from '../../../../contexts';
import { WithClassNameComponentProps } from '../../../../interfaces';
import { Icon, IconCode } from '../../icon/icon';
import visuallyImpairedModeStyles from './style.module.scss';
import { getSelectedText } from '../../../../utils/get-selected-text';

const visuallyImpairedModeClassname = 'visually-impaired-mode';
const visuallyImpairedShowClassname = 'containerisation';
const visuallyImpairedHideClassname = 'containerization';
interface VisuallyImpairedModeProps {
  withTitle?: boolean;
}

const dataVimAttributeName = 'data-vi';
const vimSettingsName = 'vi';
const vimBodyStyleSettingsName = 'body_style';
const vimBodyTextColorSettingsName = 'body_text_color';
const enableTextReaderSettingName = 'textreader';
const VisuallyImpairedMode: FC<VisuallyImpairedModeProps & WithClassNameComponentProps> = ({
  className,
}) => {
    const {
        i18n: { language,t },
    } = useTranslation();

    const saveVimSettings = (BooleanData:boolean) => {
        localStorage.setItem(vimSettingsName, String(BooleanData));
    };
    const saveVimBodyStyleSettings = ( BackgroundColors: string,TextColor:string) =>{
        localStorage.setItem(vimBodyStyleSettingsName, BackgroundColors);
        localStorage.setItem(vimBodyTextColorSettingsName, TextColor);
    };

    const getVimLocalStorageSettings = (vimLocalStorageSettingsName: string)=>{
        return localStorage.getItem(vimLocalStorageSettingsName);
    };
    const setVimLocalStorageSettings = (vimLocalStorageSettingsName: string,settingValue:string)=>{
        return localStorage.setItem(vimLocalStorageSettingsName,settingValue);
    };
    const htmlElement:any =  document.documentElement;

    const ulMenu:any = document.querySelector('ul[role="menu"]');
    const allButtons:any = document.getElementsByTagName('button');
    const logoIconImg:any = document.querySelector('path[role="logo_icon_img"]');
    const logoIconTxt:any = document.querySelector('path[role="logo_icon_text"]');
    const languageTxt:any = document.querySelector('ul[role="language_selector_text"]');
    const localVimBackgroundColor:any = getVimLocalStorageSettings(vimBodyStyleSettingsName);
    const localVimTextColor:any = getVimLocalStorageSettings(vimBodyTextColorSettingsName);
    const localVimEnableTextReader:any = getVimLocalStorageSettings(enableTextReaderSettingName);
    const allP:any = document.getElementsByTagName('p');
    const allLi:any = document.getElementsByTagName('li');
    const allSvg:any = document.getElementsByTagName('svg');
    const allCheckBxOfVim:any = document.getElementsByName('list_of_modes');
    const [toggle, setToggle] = useState(true);
    const hasDataVimAttribute = () => {
        if(htmlElement.hasAttribute(dataVimAttributeName)){
            return htmlElement.hasAttribute(dataVimAttributeName);
        }else {
            return getVimLocalStorageSettings(vimSettingsName) ==='true';
        }
    };
    const [voiceSwitcher, setVoiceEnable] = useState(false);

    const handleChange = (event:any) => {
        setVimLocalStorageSettings(enableTextReaderSettingName,String(event.target.checked));
        setVoiceEnable(event.target.checked);
        speechSynthesis.cancel();
        window.location.reload();
    };
    const setBaseBackgroundColor = ( BackgroundColors: string,TextColor:string) => {
        htmlElement.style.backgroundColor = BackgroundColors;
        htmlElement.style.color = TextColor;

        if(logoIconTxt && logoIconImg && BackgroundColors ){
            logoIconTxt.style.fill=TextColor;
            logoIconImg.style.fill=TextColor;
        }
        if(languageTxt){
            languageTxt.style.color=BackgroundColors;
        }
        for (let i=0, max=allSvg.length; i < max; i++) {
            allSvg[i].style.fill = TextColor;
        }
        for (let i=0, max=allButtons.length; i < max; i++) {
            allButtons[i].style.color = TextColor;
        }
        for (let i=0, max=allLi.length; i < max; i++) {
                allLi[i].style.backgroundColor = BackgroundColors;
                allLi[i].style.color = TextColor;
                allLi[i].style.borderTopColor = TextColor;
        }
        for (let i=0, max=allP.length; i < max; i++) {
            if(allP[i].hasAttribute('role')){
                allP[i].style.color = 'black';
            }else{
                allP[i].style.color = TextColor;
            }
        }
        saveVimBodyStyleSettings(BackgroundColors,TextColor);

        if(ulMenu){
            ulMenu.style.color='black';
        }
    };

    const resetBaseBackgroundColor = () =>{
        localStorage.removeItem(vimBodyStyleSettingsName);
        localStorage.removeItem(vimBodyTextColorSettingsName);
        localStorage.removeItem(enableTextReaderSettingName);
        htmlElement.removeAttribute('style');
        speechSynthesis.cancel();
        window.location.reload();

    };



    useEffect(() => {


        if (hasDataVimAttribute()) {
            setBaseBackgroundColor(localVimBackgroundColor,localVimTextColor);
        }
        if(allCheckBxOfVim){
            for (let i=0, max=allCheckBxOfVim.length; i < max; i++) {
                if(!localVimBackgroundColor || localVimBackgroundColor==='null'){
                    allCheckBxOfVim[0].checked = true;
                }else{
                    allCheckBxOfVim[0].checked = false;
                }
                if(localVimBackgroundColor==='black'){
                    allCheckBxOfVim[1].checked = true;
                }else{
                    allCheckBxOfVim[1].checked = false;
                }
            }
        }
        if(JSON.parse(localVimEnableTextReader)){
            getSelectedText(language);
        }

    });

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        const id = e.currentTarget.id;

        switch (id) {
            case 'scale_increase':
                htmlElement.setAttribute('data-vim', '');
                break;
            case 'scale_decrease':
                htmlElement.removeAttribute('data-vim');
                break;
            case 'bg_grey_black':
                setBaseBackgroundColor('grey','black');

                break;
            case 'bg_darkblue_white':
                setBaseBackgroundColor('#232636','white');

                break;
            case 'bg_lightblue_white':
                setBaseBackgroundColor('#9DD1FF','white');

                break;
            case 'bg_lightbrown_brown':
                setBaseBackgroundColor('#C4A484','#3B2716');

                break;
            case 'bg_darkbrown_brown':
                setBaseBackgroundColor('#3B2716','limegreen');

                break;
            case 'bg_black_white':
                setBaseBackgroundColor('black','white');

                break;
        }
    };

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
          htmlElement.setAttribute(dataVimAttributeName, '');
      }else{
          saveVimSettings(false);
          resetBaseBackgroundColor();
          htmlElement.removeAttribute(dataVimAttributeName);
      }
      }} >
      <Icon
        className={visuallyImpairedModeStyles[`${visuallyImpairedModeClassname}__icon`]}
        code={IconCode.visuallyImpairedMode}
      />


    </button>
        <div className={ hasDataVimAttribute() ? visuallyImpairedModeStyles[visuallyImpairedShowClassname]:visuallyImpairedModeStyles[visuallyImpairedHideClassname]} >

            <div onClick={() => resetBaseBackgroundColor() } ><label><input type={'radio'} name={'list_of_modes'} />{t('visual-impaired-mode.ordinary-version')}</label></div>
            <div id={'bg_black_white'} onClick={ handleClick }><label><input type={'radio'} name={'list_of_modes'} />{t('visual-impaired-mode.white-black-version')}</label></div>
            <div><label><input type={'checkbox'} onChange={ handleChange } checked={ voiceSwitcher?voiceSwitcher:JSON.parse(localVimEnableTextReader) } />{t('visual-impaired-mode.enable-text-reader')}</label></div>
            <div><p role={'list_views_color_site'} >{t('visual-impaired-mode.font-size')}</p>
              <div className={visuallyImpairedModeStyles['list_views_scale_feture']} >
                <div id={'scale_increase'} onClick={ handleClick } >+A</div>
                  <div id={'scale_decrease'} onClick={ handleClick } >-A</div></div>
            </div>
            <div><p role={'list_views_color_site'}>{t('visual-impaired-mode.site-colors')}</p>
              <div className={visuallyImpairedModeStyles['list_views_color_feture']}>
                  <div id={'bg_grey_black'} onClick={ handleClick }>A</div>
                  <div id={'bg_darkblue_white'} onClick={ handleClick }>A</div>
                  <div id={'bg_lightblue_white'} onClick={ handleClick }>A</div>
                  <div id={'bg_lightbrown_brown'} onClick={ handleClick }>A</div>
                  <div id={'bg_darkbrown_brown'} onClick={ handleClick }>A</div>
              </div>
            </div>
            <div className={visuallyImpairedModeStyles['list_views_restart_feture']}
                 onClick={() => resetBaseBackgroundColor() }>{t('visual-impaired-mode.reset-button')}</div>
          </div>
      </div>
  );
};

export { VisuallyImpairedMode };
