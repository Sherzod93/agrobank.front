import cs from 'classnames';
import { AbstractBlockProps, BlockWithItemsComponentProps, SectionsForSitemap } from '../../../interfaces';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import siteMapStyles from './style.module.scss';

const siteMapClassname = 'site-map';

export interface SiteMapBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<SectionsForSitemap> {}

const SiteMapBlock: FC<SiteMapBlockProps> = ({ className ,items }) => {

    const arMenuResults:any = [];

    const menu:any = (item:any,index:any,url:string) => {
        return (
            <li key={index.toString()} className={siteMapStyles[`${siteMapClassname}__sub-menu`]}>
                {item.clickAble ? (
                    <NavLink to={`${url}`} >
                        <span dangerouslySetInnerHTML={{ __html: item.name }} />
                    </NavLink>
                ):
                    ( <span dangerouslySetInnerHTML={{ __html: item.name }} />)
                }

                {'child' in item ? (
                    <ul>
                        {Object.values(item.child).map((itm:any,subIndex)=>{
                            return menu(itm,subIndex,`${url}/${itm.code}`);
                        })}
                    </ul>
                ) : null}
            </li>
        );
    };

    var arItems:any = Object.values(items);
    console.log(items);
    arItems.forEach((item:any, index:any) => {
        arMenuResults.push(menu(item,index,item.code));
    });
    const html = `
    
    `;
    return (
       <div className={cs(siteMapStyles[siteMapClassname], className)}>
           <ul className={siteMapStyles[`${siteMapClassname}__d-grid`]}
           >
               {arMenuResults}
           </ul>
           <div dangerouslySetInnerHTML={{ __html: html }}></div>
       </div>
    );
};

export { SiteMapBlock };