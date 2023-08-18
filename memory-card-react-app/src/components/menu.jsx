import React from "react";

const Menu = ({ handleStartGameClick }) => {
    return (
        <div>
            <button onClick={handleStartGameClick}>Start Game</button>
        </div>
    );
};

export default Menu;
