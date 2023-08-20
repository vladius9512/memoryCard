import React from "react";
import { useState } from "react";

const Card = ({ name, url, handleCardSelect, index }) => {
    return (
        <div className="card">
            <img src={url} onClick={() => handleCardSelect(index)} />
            <p>{name}</p>
        </div>
    );
};

export default Card;
