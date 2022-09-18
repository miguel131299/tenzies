import "./App.css";
import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [numbers, setNumbers] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(
    function () {
      const winningValue = numbers[0].value;

      const result = numbers.every(
        (elem) => elem.value === winningValue && elem.isHeld
      );

      setTenzies(result);

      if (result) {
        console.log("you won!");
      }
    },
    [numbers]
  );

  const dieElements = numbers.map((dieObj) => (
    <Die
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      key={dieObj.id}
      holdDice={() => holdDice(dieObj.id)}
    />
  ));

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function allNewDice() {
    const numArray = [];

    for (let i = 0; i < 10; i++) {
      numArray.push({
        value: getRandomInt(6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return numArray;
  }

  function newRoll() {
    setNumbers((prevArray) => {
      const newArray = prevArray.map((elem) => {
        if (elem.isHeld) {
          return elem;
        } else {
          return { ...elem, value: getRandomInt(6) + 1, id: nanoid() };
        }
      });
      return newArray;
    });
  }

  function holdDice(id) {
    setNumbers((prevArray) => {
      return prevArray.map((elem) =>
        elem.id === id ? { ...elem, isHeld: !elem.isHeld } : elem
      );
    });
  }

  function resetGame() {
    setNumbers(allNewDice());
    setTenzies(false);
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{dieElements}</div>
      <button className="roll-button" onClick={tenzies ? resetGame : newRoll}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      {tenzies && <Confetti />}
    </main>
  );
}

export default App;
