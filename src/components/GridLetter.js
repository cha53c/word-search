import React from "react";

// Color Theme
const colors = {
    available: 'lightgray',
    matched: 'lightgreen',
    candidate: 'lightcoral',
};

const GridLetter = props => (
    <button className="number"
            style={{backgroundColor: colors[props.status]}}
            onClick={() => props.onClick(props.id, props.status)}>{props.letter}</button>
);



export default GridLetter;