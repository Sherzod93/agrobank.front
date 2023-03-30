import {
    AbstractBlockProps,
    BlockWithItemsComponentProps,
    VoteComponentProps,
} from '../../../interfaces';
import React, { FC } from 'react';
import voteStyles from './style.module.scss';
import { useTranslation } from 'react-i18next';
// import ProgressBar from 'react-bootstrap/ProgressBar';
import Progressbar from './progress-bar';

const voteClassname = 'vote-block';

export interface VoteResultBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<VoteComponentProps> {
}

const VoteResultBlock: FC<VoteResultBlockProps> = ({ className, items }) => {

    const {
        i18n: { t },
    } = useTranslation();

    const htmlQuestion:any = (item:any) => {
        return (
            <div>
                <div>{item.name}</div>
                <div className={voteStyles[`${voteClassname}__vote_bar_div`]}>
                    <div className={voteStyles[`${voteClassname}__vote_bar`]}>
                        <Progressbar bgcolor={item.color} progress={item.present}  height={30}  />
                    </div>
                    <div className={voteStyles[`${voteClassname}__vote_present`]}>
                        <div>{item.vote}</div>
                        <div>({item.present}%)</div>
                    </div>
                </div>
            </div>
        );
    };
    const htmlItem:any = (item:any) => {
        var arQuestions:any = [];
        item.questions.map((question:any) => {
            arQuestions.push(htmlQuestion(question));
        });
        return (
            <div className={voteStyles[`${voteClassname}__vote`]}>
                <div className={voteStyles[`${voteClassname}__vote-title`]}>
                    {item.name}
                </div>
                <div>
                    {arQuestions}
                </div>
                <div>

                </div>
                <div className={voteStyles[`${voteClassname}__vote_info`]}>
                    <div className={voteStyles[`${voteClassname}__poll_detail`]}>
                        <div>{t('polls.polls-voted')}</div><div> { item.voted }</div>
                    </div>
                    <div className={voteStyles[`${voteClassname}__poll_detail`]}>
                        <div>{t('polls.polls-create-date')}</div> <div> { item.create_date }</div>
                    </div>
                    <div className={voteStyles[`${voteClassname}__poll_detail`]}>
                        <div>{t('polls.polls-finish-date')}</div> <div> { item.finish_date }</div>
                    </div>
                </div>
            </div>
        );
    };
    var arResults = [];
    arResults.push(htmlItem(items));

    return (
        <div>{arResults}</div>
    );
};

export { VoteResultBlock };