import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './scenes/Scene';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [showFigure, setShowFigure] = useState<boolean>(false);
  const [hovered, setHovered] = useState(false);

  const wrist = Number(inputValue); // user input in inches

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleCalculate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isNaN(wrist) && wrist > 0) {
      setShowFigure(true);
    }
  }

  return (
    <>
      <h1>Golden Ratio Calculator</h1>
      <div className='figure-container'>
        <h2>Figure frame</h2>
        <Canvas
          style={{ width: 300, height: 300 }}
          onPointerOver={() => { setHovered(true); }}
          onPointerOut={() => { setHovered(false); }}
        >
          <Scene hovered={hovered} />
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
        </Canvas>
      </div>

      {!showFigure && (
        <div className="input">
          <h3>Input your wrist measurement (in inches)</h3>
          <form onSubmit={handleCalculate}>
            <input
              type="number"
              min="1"
              max="23"
              step="any"
              value={inputValue}
              onChange={handleInputChange}
              required
            />
            <br />
            <button
              disabled={inputValue === "" || isNaN(Number(inputValue))}
            >
              Calculate!
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;