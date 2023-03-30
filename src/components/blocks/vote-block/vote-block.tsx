import {
    AbstractBlockProps,
    BlockWithItemsComponentProps,
    VoteComponentProps,
} from '../../../interfaces';
import React, { FC, useState } from 'react';
import voteStyles from './style.module.scss';
import { Checkbox } from '../../units/controls/checkbox/checkbox';
import { Button } from '../../units/controls/button/button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const voteClassname = 'vote-block';

export interface VoteBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<VoteComponentProps> {
}

const VoteBlock: FC<VoteBlockProps> = ({ className, items }) => {

    const isVoted = (item:any) => {
        var id = 'vote-'+item.id;
        return localStorage.getItem(id) === 'Y' || !item.is_active;
    };



    const [selectedOptionId,setSelectedOptionId] = useState(0);
    const {
        i18n: { t, language },
    } = useTranslation();
    const navigate = useNavigate();
    const sendVote = async (item:any) => {
        if(selectedOptionId){
            // Simple GET request using fetch
            const fetchResponse = await fetch('/api/v1/?action=vote&lang='+language+'&csrf='+item.csrf+'&selected_option_id='+selectedOptionId+'&vote_id='+item.id);
            const response = await fetchResponse.json();
            if(response.success){
                localStorage.setItem('vote-'+item.id, 'Y');
                navigate(item.result_page);
            }
        }
    };
    const htmlQuestion:any = (item:any) => {
        return (
            <div>
                <div>
                    <Checkbox
                        className={voteStyles[`${voteClassname}__checkbox`]}
                        checked={ selectedOptionId === item.id }
                        onChange={ () => setSelectedOptionId(item.id) }
                    >
                        <span dangerouslySetInnerHTML={{ __html:item.name }}></span>
                    </Checkbox>
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
                { !isVoted(item) ? (
                    <Button onClick={() => sendVote(items)} className={voteStyles[`${voteClassname}__vote_button`]}>
                        {t('polls.polls-vote')}
                    </Button>
                ) : null }
            </div>
        );
    };
    var arResults = [];
    arResults.push(htmlItem(items));

    return (
        <div>{arResults}</div>
    );
};

export { VoteBlock };