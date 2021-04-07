import React from "react";
import {useSelector} from "react-redux";

export const WordsList = () => {
    const words = useSelector(state => state.words)
    const renderedWords = words.map(word => (
        <li key={word.id}>
            {word.word}
        </li>
    ))
    return (
        <ul style={{listStyleType: "none", paddingLeft: 0}}>
            {renderedWords}
        </ul>
    )
}


// const WordList = props => (
//     <ul style={{listStyleType: "none", paddingLeft: 0}}>
//         {props.words.map((word, index) => (
//             <li key={index}>
//                 {word}
//             </li>
//         ))}
//     </ul>
// );
//
// export default WordList;