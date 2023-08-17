import { useState } from "react";
import Card from "./components/card";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const App = () => {
    const [isCardSelected, setCardSelected] = useState(false);
    const [gameState, setGameState] = useState({
        score: 0,
        maxSore: 0,
        won: false,
    });

    function handleClick() {
        setCardSelected((isCardSelected) => !isCardSelected);
        console.log(isCardSelected);
    }

    return (
        <div>
            <p>score: {gameState.score}</p>
            <button
                onClick={() =>
                    setGameState((prevState) => ({
                        ...prevState,
                        score: prevState.score + 1,
                    }))
                }
            >
                Click
            </button>
            <Card
                name="A"
                isCardSelected={isCardSelected}
                onClick={() => {
                    setCardSelected((isCardSelected) => !isCardSelected);
                }}
            ></Card>
            {isCardSelected ? <p>true</p> : <p>false</p>}
            <button onClick={handleClick}>State is {isCardSelected}</button>
            <Card name="B" onClick={handleClick}></Card>
            <Card name="C"></Card>
        </div>
    );
};

export default App;
