import { useEffect, useState } from "react";
import "./App.css";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function App() {
  const [text, setText] = useState("");

  const addLetter = (letter) => {
    setText((prev) => prev + letter);
  };

  const backspace = () => {
    setText((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === "Backspace") {
        setText((prev) => prev.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        setText((prev) => prev + e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="page">
      <div className="card">
        <h1>Alphabet Buttons</h1>
        <p className="subtitle">Click letters (or use your keyboard) to build text.</p>

        <div className="output">
          {text || <span className="placeholder">Your text will appear here...</span>}
        </div>

        <div className="actions">
          <button type="button" className="backspace" onClick={backspace}>
            Backspace
          </button>
        </div>

        <div className="keys">
          {LETTERS.map((letter) => (
            <button
              type="button"
              key={letter}
              className="key"
              onClick={() => addLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}




