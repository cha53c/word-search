import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import GridLetter from "../../components/GridLetter";
import utils from "../../utils/utils";
import matching from "../../utils/matching";
import {wordFound, setNewState, letterSelected, setSelectedLetters, resetSelectedLetters} from "./gridSlice";
import gridSetup from "../../utils/gridSetup";

// export const startNewGame = (dispatch) => {
//     console.log('start new game');
//     // dispatch(setNewState())
// }

export const Grid = () => {
    const MATCHED = 'matched';
    const CANDIDATE = 'candidate';
    const AVAILABLE = 'available';
    // TODO reset these hooks for new game
    // letters selected when trying to find a word
    // const [selectedLetters, setSelectedLetters] = useState([]);
    // contains the id of the letters for words found
    const [matchedLetters, setMatchedLetters] = useState([]);

    const dispatch = useDispatch();
    // TODO can I selected only what's needed from the grid
    const grid = useSelector(state => state.grid);
    console.log('grid letters', grid.letters);
    // TODO change to use word objects from wordSlice. Is this still correct???
    const words = gridSetup.getWords;

    const startNewGame = (dispatch) => {
        console.log('start new game');
        // dispatch(setNewState())
    }

    const onLetterClick = (id, currentStatus) => {
        console.log('id ', id);
        console.log('letters ', grid.letters);
        // console.log('on click candidate Letters ', selectedLetters);
        // dispatch(letterSelected({location: id}));
        // const updatedSelection = (utils.toggleLetterSelection(id, selectedLetters));
        const updatedSelection = (utils.toggleLetterSelection(id, grid.selectedLocations));
        console.log('after click candidate letters', updatedSelection);
        // setSelectedLetters(updatedSelection);
        dispatch(setSelectedLetters({updatedLocations: updatedSelection}))
        detectMatches(updatedSelection);
    };

    const detectMatches = (selectedLetters) => {
        console.log('selectedLetters', selectedLetters);
        console.log('locationIndex', grid.locationIndexes);
        grid.words.forEach((wordData, index) => {
            console.log('wordData ', wordData);
            console.log('selection for matching', selectedLetters);
            if (matching.isMatch(wordData.location, selectedLetters)) {
                console.log('you got a match');
                console.log('grid.words', grid.words);
                if (wordData.found === false) {
                    dispatch(wordFound(wordData));
                    const newMatchedLetters = matchedLetters.concat(selectedLetters);
                    setMatchedLetters(newMatchedLetters);
                    console.log('words length', words.length);
                    console.log('matchedLetters', newMatchedLetters);
                }
                // setSelectedLetters([]);
                // TODO use setSelectedLetters insstead
                dispatch(resetSelectedLetters());
            }
        });
    };

    const gridItems = grid.letters.map((letter, index) =>
        <GridLetter key={index}
                    letter={letter}
                    id={index}
                    // status={utils.letterStatus(index, selectedLetters, matchedLetters)}
                    // TODO determine status on gridLetter component
                    status={utils.letterStatus(index, grid.selectedLocations, matchedLetters)}
                    onClick={onLetterClick}
        />
    )

    return <React.Fragment>{gridItems}</React.Fragment>
}

