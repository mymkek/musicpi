import React, {useEffect, useState} from 'react';
import Soundfont from 'soundfont-player';
import {Keyboard} from "./keyboard";
import {SettingPanel} from "./settingPanel";
import useInterval from "../hooks/useInterval";
import {config} from "../config";
import {keyboardData} from "../utils/keyboardData";

interface SoundProviderProps {
};

export const SoundProvider = (props: SoundProviderProps) => {


    const [instrument, setInstrument] = useState<any>(null);
    const [playedNote, setPlayedNote] = useState<string>('');
    const [iterator, setIterator] = useState<any>(null);
    const [isPlaying, setPlaying] = useState<boolean>(false);
    const [octave, setOctave] = useState<number>(1);

    useEffect(() => {
        Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano', {
            format: 'mp3',
            soundfont: 'MusyngKite',
            nameToUrl: (name: string, soundfont: string, format: string) => {
                return `https://d1pzp51pvbm36p.cloudfront.net/${soundfont}/${name}-${format}.js`;
            },
        }).then(instrument => {
            setInstrument({
                ...instrument,
            });
        });
    }, []);


    useEffect(() => {
        function* generateDigitsOfPi() {
            let q = 1n;
            let r = 180n;
            let t = 60n;
            let i = 2n;
            while (true) {
                let digit = ((i * 27n - 12n) * q + r * 5n) / (t * 5n);
                yield Number(digit);
                let u = i * 3n;
                u = (u + 1n) * 3n * (u + 2n);
                r = u * 10n * (q * (i * 5n - 2n) + r - t * digit);
                q *= 10n * i * (i++ * 2n - 1n);
                t *= u;
            }
        }

        setIterator(generateDigitsOfPi())
    }, []);

    const playNone = (note: string) => {
        instrument?.play(note);
        setPlayedNote(note);

    }

    useInterval(
        () => {
            const nextPiVal = iterator.next().value;
            playNone(keyboardData[nextPiVal + ((octave - 1) * 12) + 3].note)
        },
        // Delay in milliseconds or null to stop it
        isPlaying ? config.keyPlayDelay : null,
    )

    const handlePlay = () => {
        setPlaying(true);
    }

    const handlePause = () => {
        setPlaying(false)
    }


    return (
        <>
            <SettingPanel handlePlay={handlePlay} handlePause={handlePause} octave={octave} setOctave={setOctave}/>
            <Keyboard playNone={playNone} playedNote={playedNote}/>
        </>
    );
}
