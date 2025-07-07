import { useState, type ChangeEvent, type FormEvent } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [unit, setUnit] = useState<'in' | 'cm'>('in'); // unit selection
  const [showFigure, setShowFigure] = useState<boolean>(false);

  const wristRaw = Number(inputValue);
  const wrist = unit === 'cm' ? wristRaw * 0.393701 : wristRaw;

  const goldenModel = {
    headRadius: wrist * 0.6,
    shoulderWidth: wrist * 7,
    chestWidth: wrist * 6,
    waistWidth: wrist * 5,
    torsoHeight: wrist * 7.5,
    legLength: wrist * 10,
    armLength: wrist * 9,
  };

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleUnitChange(e: ChangeEvent<HTMLSelectElement>) {
    setUnit(e.target.value as 'in' | 'cm');
  }

  function handleCalculate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isNaN(wristRaw) && wristRaw > 0) {
      setShowFigure(true);
    }
  }

  return (
    <>
      <h1>Golden Ratio Calculator</h1>
      <div>
        <h2>Figure frame</h2>
        <div style={{ background: '#222', padding: '1rem', display: 'inline-block' }}>
          <svg width="200" height="300" viewBox="0 0 200 300">
            {showFigure && (
              <g transform="translate(100, 50)">
                {/* Head */}
                <circle
                  cx="0"
                  cy="0"
                  r={goldenModel.headRadius}
                  fill="#ffe0bd"
                  stroke="black"
                />

                {/* Torso */}
                <polygon
                  points={`
                    ${-goldenModel.waistWidth / 2},${goldenModel.headRadius + 10} 
                    ${goldenModel.waistWidth / 2},${goldenModel.headRadius + 10} 
                    ${goldenModel.shoulderWidth / 2},${goldenModel.torsoHeight + goldenModel.headRadius + 10} 
                    ${-goldenModel.shoulderWidth / 2},${goldenModel.torsoHeight + goldenModel.headRadius + 10}`}
                  fill="#f4a460"
                  stroke="black"
                />

                {/* Legs */}
                <rect
                  x={-goldenModel.waistWidth / 2 + 5}
                  y={goldenModel.torsoHeight + goldenModel.headRadius + 10}
                  width={10}
                  height={goldenModel.legLength}
                  fill="#8d5524"
                />
                <rect
                  x={goldenModel.waistWidth / 2 - 15}
                  y={goldenModel.torsoHeight + goldenModel.headRadius + 10}
                  width={10}
                  height={goldenModel.legLength}
                  fill="#8d5524"
                />

                {/* Arms */}
                <rect
                  x={-goldenModel.shoulderWidth / 2 - 10}
                  y={goldenModel.headRadius + 10}
                  width={8}
                  height={goldenModel.armLength}
                  fill="#ffe0bd"
                />
                <rect
                  x={goldenModel.shoulderWidth / 2 + 2}
                  y={goldenModel.headRadius + 10}
                  width={8}
                  height={goldenModel.armLength}
                  fill="#ffe0bd"
                />
              </g>
            )}
          </svg>
        </div>
      </div>

      {!showFigure && (
        <div className='input'>
          <h3>Input your wrist measurement</h3>
          <form onSubmit={handleCalculate}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              pattern='[0-9]*'
              inputMode='numeric'
              placeholder='Enter wrist size'
            />
            <select value={unit} onChange={handleUnitChange}>
              <option value="in">inches</option>
              <option value="cm">centimeters</option>
            </select>
            <br />
            <button
              disabled={inputValue === "" || isNaN(wristRaw)}>
              calculate!
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
