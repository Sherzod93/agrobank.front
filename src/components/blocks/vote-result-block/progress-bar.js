import React from 'react';

const Progress_bar = ({ bgcolor,progress,height }) => {

    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: '#dfdddd',
        borderRadius: 3,
        marginBottom: 20,
    };

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius:3,
        textAlign: 'right',
    };

    const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 900,
    };

    return (
        <div>
            <div style={Parentdiv}>
                <div style={Childdiv}>
                    <span style={progresstext}></span>
                </div>
            </div>
        </div>
    );

    /*return (
        <div style={Parentdiv}>
            <div style={Childdiv}>
                <span style={progresstext}>{`${progress}%`}</span>
            </div>
        </div>
    );*/
};

export default Progress_bar;