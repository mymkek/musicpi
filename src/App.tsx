import React from 'react';
import './App.css';
import {SoundProvider} from "./components/soundProvider";
import {ThemeProvider} from "@emotion/react";
import {theme} from "./theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <SoundProvider/>
        </ThemeProvider>
    );
}

export default App;
