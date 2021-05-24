import React from "react";
import {useSelector} from "react-redux";
import utils from '../utils/utils'



// Color Theme
const colors = {
    available: 'white',
    matched: 'lightgreen',
    candidate: 'lightcoral',
};

const GridLetter = props => {
    const selectedLocations = useSelector(state => state.grid.selectedLocations);
    let matchedLocations = useSelector(state => state.grid.words.filter(w => w.found === true));
    console.log('gridLetter matchedLocations ', matchedLocations);
    matchedLocations = utils.flatten(matchedLocations);
    console.log('gridLetter matchedLocations - flattened', matchedLocations);
    const status = utils.letterStatus(props.id, selectedLocations, matchedLocations);
    return (
        <button className="number"
            // style={{backgroundColor: colors[props.status]}}
                style={{backgroundColor: colors[status]}}
                onClick={() => props.onClick(props.id, props.status)}>{props.letter}</button>
    );
}


export default GridLetter;