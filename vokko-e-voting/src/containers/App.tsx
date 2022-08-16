import vokkoLogo from '../assets/vokko.png'
import './App.css'

function App() {
  return (
    <div className="App">
      <div>
        <a href="about:blank" target="_blank">
          <img src={vokkoLogo} className="logo vokko" alt="vokko logo" />
        </a>
      </div>
      <h1>VOKKO E-Voting-App</h1>
      <p className="read-the-docs">
        Info
      </p>
    </div>
  )
}

export default App
