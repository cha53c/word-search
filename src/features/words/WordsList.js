import React from "react";
import {useSelector} from "react-redux";

export const WordsList = () => {
    const words = useSelector(state => state.grid.words);
    const renderedWords = words.map(wordObj => {
        return (
            <li key={wordObj.id}>
                <WordItem info={wordObj} />
            </li>
        )
    })

    return (
        <ol style={{paddingLeft: 0}}>
            {renderedWords}
        </ol>
    )
}

const WordItem = ({info}) => info.found ? <del>{info.word}</del> : info.word;

// export default WordList;