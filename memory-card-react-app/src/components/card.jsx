import React from "react";

const Card = ({ name }) => {
    return (
        <div className="card">
            <button>Click {name}</button>
        </div>
    );
};

export default Card;
