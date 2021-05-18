import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setNewState} from "../features/grid/gridSlice";

const PlayAgain = props => {
    const dispatch = useDispatch();
    const visible = useSelector(state => state.grid.gameComplete);
    return visible ? (<button onClick = {() => dispatch(setNewState())}> Play Again</button>) :null;
};

export default PlayAgain;