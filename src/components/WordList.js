import React from "react";

const WordList = props => (
    <ul>
        {props.words.map((word, index) => (
            <li key={index}>
                {word}
            </li>
        ))}
    </ul>
);

export default WordList;