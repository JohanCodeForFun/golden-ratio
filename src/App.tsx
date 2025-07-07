import { useState, type ChangeEvent, type FormEvent } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [showFigure, setShowFigure] = useState<boolean>(false);

  const wrist = Number(inputValue); // user input in inches
  const BASE_HEIGHT = 300; // SVG figure height in pixels

  // Proportions relative to full height (not wrist)
  const proportions = {
    headRadius: 0.05,
    shoulderWidth: 0.25,
    chestWidth: 0.22,
    waistWidth: 0.18,
    torsoHeight: 0.3,
    legLength: 0.45,
    armLength: 0.35,
  };

  // Ideal model based on fixed height
  const idealModel = {
    headRadius: proportions.headRadius * BASE_HEIGHT,
    shoulderWidth: proportions.shoulderWidth * BASE_HEIGHT,
    waistWidth: proportions.waistWidth * BASE_HEIGHT,
    torsoHeight: proportions.torsoHeight * BASE_HEIGHT,
    legLength: proportions.legLength * BASE_HEIGHT,
    armLength: proportions.armLength * BASE_HEIGHT,
  };

  // User's model based on wrist scaling (approximate)
  const userHeight = wrist * 8.5 * 2.54; // rough body height in cm, then converted to px
  const userModel = {
    headRadius: proportions.headRadius * userHeight,
    shoulderWidth: proportions.shoulderWidth * userHeight,
    waistWidth: proportions.waistWidth * userHeight,
    torsoHeight: proportions.torsoHeight * userHeight,
    legLength: proportions.legLength * userHeight,
    armLength: proportions.armLength * userHeight,
  };

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
      <div>
        <h2>Figure frame</h2>
        <div style={{ background: '#222', padding: '1rem', display: 'inline-block' }}>
          <svg width="220" height="400" viewBox="0 0 220 400">
            <g transform="translate(110, 50)">
              {/* Goal silhouette (gray) */}
              {showFigure && (
                <g fillOpacity={0.2} stroke="#ccc" fill="#ccc">
                  <circle cx="0" cy="0" r={idealModel.headRadius} />
                  <polygon
                    points={`
                      ${-idealModel.waistWidth / 2},${idealModel.headRadius + 10} 
                      ${idealModel.waistWidth / 2},${idealModel.headRadius + 10} 
                      ${idealModel.shoulderWidth / 2},${idealModel.torsoHeight + idealModel.headRadius + 10} 
                      ${-idealModel.shoulderWidth / 2},${idealModel.torsoHeight + idealModel.headRadius + 10}`}
                  />
                  <rect
                    x={-idealModel.waistWidth / 2 + 5}
                    y={idealModel.torsoHeight + idealModel.headRadius + 10}
                    width={10}
                    height={idealModel.legLength}
                  />
                  <rect
                    x={idealModel.waistWidth / 2 - 15}
                    y={idealModel.torsoHeight + idealModel.headRadius + 10}
                    width={10}
                    height={idealModel.legLength}
                  />
                  <rect
                    x={-idealModel.shoulderWidth / 2 - 10}
                    y={idealModel.headRadius + 10}
                    width={8}
                    height={idealModel.armLength}
                  />
                  <rect
                    x={idealModel.shoulderWidth / 2 + 2}
                    y={idealModel.headRadius + 10}
                    width={8}
                    height={idealModel.armLength}
                  />
                </g>
              )}

              {/* User figure */}
              {showFigure && (
                <g fillOpacity={1} stroke="black">
                  <circle cx="0" cy="0" r={userModel.headRadius} fill="#ffe0bd" />
                  <polygon
                    points={`
                      ${-userModel.waistWidth / 2},${userModel.headRadius + 10} 
                      ${userModel.waistWidth / 2},${userModel.headRadius + 10} 
                      ${userModel.shoulderWidth / 2},${userModel.torsoHeight + userModel.headRadius + 10} 
                      ${-userModel.shoulderWidth / 2},${userModel.torsoHeight + userModel.headRadius + 10}`}
                    fill="#f4a460"
                  />
                  <rect
                    x={-userModel.waistWidth / 2 + 5}
                    y={userModel.torsoHeight + userModel.headRadius + 10}
                    width={10}
                    height={userModel.legLength}
                    fill="#8d5524"
                  />
                  <rect
                    x={userModel.waistWidth / 2 - 15}
                    y={userModel.torsoHeight + userModel.headRadius + 10}
                    width={10}
                    height={userModel.legLength}
                    fill="#8d5524"
                  />
                  <rect
                    x={-userModel.shoulderWidth / 2 - 10}
                    y={userModel.headRadius + 10}
                    width={8}
                    height={userModel.armLength}
                    fill="#ffe0bd"
                  />
                  <rect
                    x={userModel.shoulderWidth / 2 + 2}
                    y={userModel.headRadius + 10}
                    width={8}
                    height={userModel.armLength}
                    fill="#ffe0bd"
                  />
                </g>
              )}
            </g>
          </svg>
        </div>
      </div>

      {!showFigure && (
        <div className="input">
          <h3>Input your wrist measurement (in inches)</h3>
          <form onSubmit={handleCalculate}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="Enter wrist size"
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
