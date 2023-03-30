import { FC } from 'react';
import { AbstractBlockProps, BlockWithItemsComponentProps, PollsComponentProps } from '../../../interfaces';
import cs from 'classnames';
import pollsListStyles from './style.module.scss';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const pollsListClassname = 'polls-list-block';
export interface PollsListBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<PollsComponentProps> {
}

const PollsListBlock: FC<PollsListBlockProps> = ({ className, items }) => {
    const {
        i18n: { t },
    } = useTranslation();

    const checkPoll = (item:any) => {
        var id = 'vote-'+item.id;
        return localStorage.getItem(id) === 'Y' || !item.is_active;
    };

    const arResults:any = [];
    var arItems:any = Object.values(items);

    const htmlItem:any = (item:any) => {
        return (
            <div className={pollsListStyles[`${pollsListClassname}__poll_content`]}>
                <div className={pollsListStyles[`${pollsListClassname}__poll-title`]}>
                    {item.name}
                </div>
                <div className={pollsListStyles[`${pollsListClassname}__poll_detail`]}>
                    <div>{t('polls.polls-voted')}</div><div> { item.voted }</div>
                </div>
                <div className={pollsListStyles[`${pollsListClassname}__poll_detail`]}>
                    <div>{t('polls.polls-create-date')}</div> <div> { item.create_date }</div>
                </div>
                <div className={pollsListStyles[`${pollsListClassname}__poll_detail`]}>
                    <div>{t('polls.polls-finish-date')}</div> <div> { item.finish_date }</div>
                </div>
                <div className={pollsListStyles[`${pollsListClassname}__button_groups`]}>
                    <NavLink to={item.result_page} className={pollsListStyles[`${pollsListClassname}__button_first`]}><span>{t('polls.polls-results')}</span></NavLink>

                    {
                        !checkPoll(item) ? (
                            <NavLink to={item.vote_page} className={pollsListStyles[`${pollsListClassname}__button_second`]}><span>{t('polls.polls-vote')}</span></NavLink>
                        ) : null
                    }
                </div>
            </div>
        );
    };



    arItems.map((item: any) => {
        arResults.push(htmlItem(item));
    });
    return (
        <div className={cs(pollsListStyles[pollsListClassname], className)}>
            <div  className={pollsListStyles[`${pollsListClassname}__poll`]}>
                <div >
                    {arResults}
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export { PollsListBlock };