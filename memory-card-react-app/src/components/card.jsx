import React from "react";

const Card = ({ name, url, handleCardSelect }) => {
    return (
        <div className="card">
            <img src={url} onClick={handleCardSelect} />
            <p>{name}</p>
        </div>
    );
};

export default Card;
