import React from 'react';
import vokkoLogo from './vokkoLogo.png';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <img src={vokkoLogo} alt="VOKKO logo" />
        </header>
    </div>
  );
}

export default App;
