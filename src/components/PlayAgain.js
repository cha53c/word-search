import React from 'react';
import {useSelector} from "react-redux";

const PlayAgain = props => {
    const visible = useSelector(state => state.playAgain.visible);
    return (<button onClick = {props.onClick} > Play Again {visible}</button>);
};

export default PlayAgain;