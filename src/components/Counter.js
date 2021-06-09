import React from 'react'
import {useSelector} from "react-redux";

const Counter = () => {
    const found = useSelector(state => state.grid.words).filter(w => w.found === true).length;
    const total = useSelector(state => state.grid.words).length;
    return (<div>you've found {found} of {total}</div>)
};

export default Counter;