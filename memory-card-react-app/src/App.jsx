import { useState } from "react";
import Card from "./components/card";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Menu from "./components/menu";

const App = () => {
    const [isCardSelected, setCardSelected] = useState(false);
    const [gameState, setGameState] = useState({
        score: 0,
        maxSore: 0,
        won: false,
        gameIsLive: false,
    });
    const [images, setImages] = useState([]);
    const cards = [];

    async function fetchAPI() {
        const response = await fetch(
            "https://api.giphy.com/v1/gifs/search?api_key=BHUOF7tIpJB747L5NMZfskq0fA07yJH0&q=naruto&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips"
        );
        const data = await response.json();
        data.data.map((elem) => {
            cards.push({ id: elem.id, url: elem.url, title: elem.title });
        });
        setImages(cards);
    }

    function handleClick() {
        setCardSelected((isCardSelected) => !isCardSelected);
        console.log(isCardSelected);
    }

    function gameStartClick() {
        setGameState((prevState) => ({
            ...prevState,
            gameIsLive: true,
        }));
        fetchAPI();
        console.log(images);
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
            <Menu gameStart={gameStartClick}></Menu>
            {images.map((elem) => {
                return <Card name={elem.title}></Card>;
            })}
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
