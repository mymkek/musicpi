import React from 'react';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import PauseIcon from '@mui/icons-material/Pause';
import {FormControl, InputLabel, MenuItem} from '@mui/material';
import Select from '@mui/material/Select';
import {octaves} from "../utils/octaves";



interface SettingPanelProps {
    handlePlay: () => void;
    handlePause: () => void;
    octave: number;
    setOctave: (octave: number) => void;
};

export const SettingPanel = (props: SettingPanelProps) => {
    const {
        handlePlay,
        handlePause,
        octave,
        setOctave
    } = props;


    return (
        <Box p={3} component="div" sx={{display: 'flex'}}>

            <Stack direction="row" spacing={2}>
                <IconButton aria-label="play" onClick={handlePlay}>
                    <PlayArrowIcon/>
                </IconButton>
                <IconButton aria-label="pause" onClick={handlePause}>
                    <PauseIcon/>
                </IconButton>
            </Stack>

            <FormControl>
                <InputLabel id='octave-select-label'>Octave</InputLabel>
                <Select
                    value={octave}
                    onChange={(e) => {
                        setOctave(e.target.value as number)
                    }}
                    labelId='octave-select-label'
                    label='Timezone'>
                    {octaves.map((value) => (
                        <MenuItem key={value} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>


        </Box>
    );
}
