import { useState } from "react";
import Card from "./components/card";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Menu from "./components/menu";
import "./styles/app.css";

const App = () => {
    const [gameState, setGameState] = useState({
        score: 0,
        maxScore: 0,
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
        data.data.map((elem, index) => {
            if (index < 8)
                cards.push({
                    id: elem.id,
                    url: elem.images.fixed_height.url,
                    title: elem.title,
                    value: 0,
                    index: index,
                });
        });
        setImages(cards);
    }

    async function handleStartGameClick() {
        fetchAPI();
        setGameState((prevState) => ({
            ...prevState,
            gameIsLive: !prevState.gameIsLive,
        }));
    }
    function handleCardSelect(index) {
        let newList = images.map((image) => {
            if (image.index === index && image.value === 1) {
                if (gameState.score > gameState.maxScore) {
                    setGameState((prevState) => ({
                        ...prevState,
                        maxScore: prevState.score,
                    }));
                }
                setGameState((prevState) => ({
                    ...prevState,
                    score: 0,
                    gameIsLive: !prevState.gameIsLive,
                }));
            }
            if (image.index === index) {
                image.value = image.value + 1;
                setGameState((prevState) => ({
                    ...prevState,
                    score: prevState.score + 1,
                }));
            }
            return image;
        });
        if (!gameState.gameIsLive) {
            setGameState((prevState) => ({
                ...prevState,
                gameIsLive: !prevState.gameIsLive,
            }));
            console.log(gameState);
            newList = images.map((image) => {
                image.value = 0;
                return image;
            });
        }
        shuffleArray(newList);
        setImages(newList);
        console.log(images);
    }

    function shuffleArray(array) {
        let currentIndex = array.length,
            randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
    }

    return (
        <main>
            <div className="score">
                <p>score: {gameState.score}</p>
                <p>Max score: {gameState.maxScore}</p>
            </div>
            <Menu handleStartGameClick={handleStartGameClick}></Menu>
            <div className="cards-wrapper">
                <div className="cards">
                    {images.map((elem) => {
                        return (
                            <Card
                                name={elem.title}
                                key={elem.id}
                                url={elem.url}
                                value={elem.value}
                                index={elem.index}
                                handleCardSelect={handleCardSelect}
                            ></Card>
                        );
                    })}
                </div>
            </div>
        </main>
    );
};

export default App;
