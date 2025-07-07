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
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "rgb(200 0 0)";
        ctx.fillRect(10, 10, 50, 50);

        ctx.fillStyle = "rgb(0 0 200 / 50%)";
        ctx.fillRect(30, 30, 50, 50);
      }
    }
  }, []);

  return (
    <>
      <h1>Golden Ratio Calculator</h1>
      <div>
        <h2>Figure frame</h2>
        <canvas id="canvas" width="120" height="230"></canvas>
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