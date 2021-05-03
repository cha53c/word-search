import React from 'react'
import {useSelector} from "react-redux";

const Counter = () => {
    const found = useSelector(state => state.counter.found);
    const total = useSelector(state => state.counter.total);

    return (<div>you've found {found} of {total}</div>)
};

export default Counter;