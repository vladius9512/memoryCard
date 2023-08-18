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
        console.log(data);
        data.data.map((elem) => {
            cards.push({
                id: elem.id,
                url: elem.images.fixed_height.url,
                title: elem.title,
            });
        });
        setImages(cards);
    }

    function handleCardSelect() {
        setCardSelected((isCardSelected) => !isCardSelected);
        console.log(isCardSelected);
    }

    async function handleStartGameClick() {
        fetchAPI();
        setGameState((prevState) => ({
            ...prevState,
            gameIsLive: !prevState.gameIsLive,
        }));
        console.log(images);
        console.log(gameState);
    }

    return (
        <div>
            <p>score: {gameState.score}</p>
            <Menu handleStartGameClick={handleStartGameClick}></Menu>
            {images.map((elem, index) => {
                if (index <= 8)
                    return (
                        <Card
                            name={elem.title}
                            key={elem.id}
                            url={elem.url}
                            isCardSelected={isCardSelected}
                            handleCardSelect={handleCardSelect}
                        ></Card>
                    );
            })}
            {setGameState.gameIsLive ? (
                images.map((elem, index) => {
                    if (index === 0)
                        return (
                            <Card
                                name={elem.title}
                                key={elem.id}
                                url={elem.url}
                                isCardSelected={isCardSelected}
                                handleCardSelect={handleCardSelect}
                            ></Card>
                        );
                })
            ) : (
                <Menu handleStartGameClick={handleStartGameClick}></Menu>
            )}
        </div>
    );
};

export default App;
