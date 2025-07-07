import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [goldenRatioResult, setGoldenRatioResult] = useState<boolean>(false);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  function handleCalculate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setGoldenRatioResult(true)
  }

    useEffect(() => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;

  // HEAD
  ctx.beginPath();
  ctx.arc(centerX, 40, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#ffe0bd";
  ctx.fill();
  ctx.stroke();

  // NECK (optional)
  ctx.fillStyle = "#f4a460";
  ctx.fillRect(centerX - 4, 50, 8, 8);

  // TORSO (trapezoid shape using path)
  ctx.beginPath();
  ctx.moveTo(centerX - 20, 58);
  ctx.lineTo(centerX + 20, 58);
  ctx.lineTo(centerX + 15, 100);
  ctx.lineTo(centerX - 15, 100);
  ctx.closePath();
  ctx.fillStyle = "#f4a460";
  ctx.fill();
  ctx.stroke();

  // ARMS
  // Upper arms (vertical for simplicity)
  ctx.fillStyle = "#ffe0bd";
  ctx.fillRect(centerX - 28, 60, 8, 30); // left upper
  ctx.fillRect(centerX + 20, 60, 8, 30); // right upper

  // Forearms
  ctx.fillRect(centerX - 28, 90, 8, 25); // left forearm
  ctx.fillRect(centerX + 20, 90, 8, 25); // right forearm

  // HANDS
  ctx.beginPath();
  ctx.arc(centerX - 24, 118, 4, 0, Math.PI * 2); // left hand
  ctx.arc(centerX + 24, 118, 4, 0, Math.PI * 2); // right hand
  ctx.fillStyle = "#ffe0bd";
  ctx.fill();

  // HIPS
  ctx.fillStyle = "#f4a460";
  ctx.fillRect(centerX - 15, 100, 30, 10);

  // LEGS
  // Thighs
  ctx.fillStyle = "#8d5524";
  ctx.fillRect(centerX - 12, 110, 10, 35); // left thigh
  ctx.fillRect(centerX + 2, 110, 10, 35);  // right thigh

  // Calves
  ctx.fillStyle = "#a47551";
  ctx.fillRect(centerX - 11, 145, 8, 30); // left calf
  ctx.fillRect(centerX + 3, 145, 8, 30);  // right calf

  // FEET
  ctx.fillStyle = "#a47551";
  ctx.fillRect(centerX - 12, 175, 14, 6); // left foot
  ctx.fillRect(centerX + 2, 175, 14, 6);  // right foot

}, []);



  return (
    <>
      <h1>Golden Ratio Calculator</h1>
      <div>
        <h2>Figure frame</h2>
        <canvas id="canvas" width="140" height="200"></canvas>
        {goldenRatioResult === false && (
          <div
            style={{
              width: "140px",
              height: "200px",
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(6px)",
            }}
          >
            <span style={{
              fontSize: "5rem",
              color: "#888",
              fontWeight: "bold",
              textShadow: "0 2px 8px #fff"
            }}>?</span>
          </div>
        )}
      </div>

      {goldenRatioResult === false && (

        <div className='input'>
          <h3>
            input your wrist measerument
          </h3>
          <form onSubmit={handleCalculate}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              pattern='[0-9]*'
              inputMode='numeric'
              placeholder='Enter a number'
            />
            <br />
            <button
              disabled={inputValue === "" || isNaN(Number(inputValue))}>calculate!</button>
          </form>
        </div>
      )}

      {goldenRatioResult && (
        <div className='calculation'>
          <table>
            <thead>
              <tr>
                <th>Ideal</th>
                <th>Current</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default App