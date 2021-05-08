import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import GridLetter from "../../components/GridLetter";
import utils from "../../utils/utils";
import matching from "../../utils/matching";
import {wordFound} from "./gridSlice";
import {incrementFound} from "../../components/counterSlice";
import gridSetup from "../../utils/gridSetup";

export const Grid = () => {
    const MATCHED = 'matched';
    const CANDIDATE = 'candidate';
    const AVAILABLE = 'available';

    const [foundWordIndexes, setFoundWordIndexes] = useState([]);
    // letters selected when trying to find a word
    const [selectedLetters, setSelectedLetters] = useState([]);
    // contains the id of the letters for words found
    const [matchedLetters, setMatchedLetters] = useState([]);

    const dispatch = useDispatch();
    // const letters = useSelector(state => state.grid.letters);
    const grid = useSelector(state => state.grid);
    console.log('grid letters', grid.letters);
    // const letters = useSelector(state => state.grid.letters);
    // TODO change to use word objects from wordSlice. Is this still correct???
    const words = gridSetup.getWords;
    // const words = useSelector(state => state.words);

    const gameComplete = () => {
        return words.length <= foundWordIndexes.length;
    }

    const onLetterClick = (id, currentStatus) => {
        // if(gameComplete()) {
        //     return;
        // }
        console.log('id ', id);
        console.log('letters ', grid.letters);
        console.log('workLocations', grid.wordLocations);
        console.log('on click candidate Letters ', selectedLetters);
        const updatedSelection = (utils.toggleLetterSelection(id, selectedLetters));
        console.log('after click candidate letters', updatedSelection);
        setSelectedLetters(updatedSelection);
        detectMatches(updatedSelection);
    };

    const detectMatches = (selectedLetters) => {
        console.log('selectedLetters', selectedLetters);
        console.log('locationIndex', grid.locationIndexes);
        // TODO prevent counting already matched words
        grid.wordLocations.forEach((wordLocation, index) => {
            console.log('selection for matching', selectedLetters);
            // TODO don't update count if word was already found
            if (matching.isMatch(wordLocation, selectedLetters)) {
                console.log('you got a match');
                console.log('grid.words', grid.words);
                // TODO this is not the word found, but an array of the letter locations for the word
                const foundWord = grid.words.find( w => w.location === wordLocation);
                dispatch(wordFound(foundWord));
                dispatch(incrementFound());
                const newMatchedLetters = matchedLetters.concat(selectedLetters);
                setMatchedLetters(newMatchedLetters);
                const newFoundWordIndexes = foundWordIndexes.concat(index);
                setFoundWordIndexes(newFoundWordIndexes);
                console.log('words length', words.length);
                console.log('foundIndexes', newFoundWordIndexes.length);
                if (newFoundWordIndexes.length === words.length) {
                    console.log('game over');
                }
                console.log('matchedLetters', newMatchedLetters);
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

