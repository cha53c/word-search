import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import GridLetter from "../../components/GridLetter";
import utils from "../../utils/utils";
import matching from "../../utils/matching";
import {wordFound} from "./gridSlice";
import gridSetup from "../../utils/gridSetup";

export const Grid = () => {
    const MATCHED = 'matched';
    const CANDIDATE = 'candidate';
    const AVAILABLE = 'available';
    // TODO reset these hooks for new game
    const [foundWordIndexes, setFoundWordIndexes] = useState([]);
    // letters selected when trying to find a word
    const [selectedLetters, setSelectedLetters] = useState([]);
    // contains the id of the letters for words found
    const [matchedLetters, setMatchedLetters] = useState([]);

    const dispatch = useDispatch();
    const grid = useSelector(state => state.grid);
    console.log('grid letters', grid.letters);
    // TODO change to use word objects from wordSlice. Is this still correct???
    const words = gridSetup.getWords;

    const onLetterClick = (id, currentStatus) => {
        console.log('id ', id);
        console.log('letters ', grid.letters);
        console.log('on click candidate Letters ', selectedLetters);
        const updatedSelection = (utils.toggleLetterSelection(id, selectedLetters));
        console.log('after click candidate letters', updatedSelection);
        setSelectedLetters(updatedSelection);
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
                    const newFoundWordIndexes = foundWordIndexes.concat(index);
                    setFoundWordIndexes(newFoundWordIndexes);
                    console.log('words length', words.length);
                    console.log('foundIndexes', newFoundWordIndexes.length);
                    console.log('matchedLetters', newMatchedLetters);
                }
                setSelectedLetters([]);
            }
        });
    };

    const numberStatus = (number) => {
        const candidate = selectedLetters.includes(number);
        const matched = matchedLetters.includes(number);
        if (matched && candidate) {
            return CANDIDATE;
        }
        if (matched && !candidate) {
            return MATCHED;
        }
        if (!matched && candidate) {
            return CANDIDATE;
        }
        return AVAILABLE
    };

    const gridItems = grid.letters.map((letter, index) =>
        <GridLetter key={index}
                    letter={letter}
                    id={index}
                    status={numberStatus(index)}
                    onClick={onLetterClick}
        />
    )

    return <React.Fragment>{gridItems}</React.Fragment>
}

