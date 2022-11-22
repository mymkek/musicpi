import React, {useMemo} from 'react';
import {keyboardData} from "../utils/keyboardData";

interface KeyboardProps {
    playNone: any;
    playedNote: string;
};



export const Keyboard = (props: KeyboardProps) => {

    const {
        playNone,
        playedNote
    } = props;



    return (
        <div id="piano-keyboard">
            {keyboardData.map(k =>
                <div key={k.note} onClick={() => playNone(k.note)}
                     className={`key ${k.type === 'natural' ? 'key-natural' : 'key-sharp'} ${playedNote === k.note && 'active'}`}></div>
            )}
        </div>
    );
}
