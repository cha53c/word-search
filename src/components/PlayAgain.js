import React from 'react';
import {useSelector} from "react-redux";

const PlayAgain = props => {
    const visible = useSelector(state => state.playAgain.visible);
    return visible ? (<button onClick = {props.onClick} > Play Again</button>) :null;
};

export default PlayAgain;