import './App.css';
import React, {useState} from 'react';

import GridLetter from "./components/GridLetter";
import WordList from "./components/WordList";
import WordCount from "./components/WordCount";
import PlayAgain from "./components/PlayAgain";

import utils from "./utils/utils";
import matching from "./utils/matching";
import gridSetup from "./utils/gridSetup";
import userEvent from "@testing-library/user-event";


const StarsDisplay = props => (
    <>
        {utils.range(1, props.count).map(starId => <div key={starId} className="star"/>)}
    </>
);


function App() {
    const MATCHED = 'matched';
    const CANDIDATE = 'candidate';
    const AVAILABLE = 'available';
    const [words, setWords] = useState(gridSetup.getWords());
    // stores the location of the words in the grid by ids
    const [wordLocations, setWordLocation] = useState(gridSetup.getWordLocations());
    // letters in the grid, based on 3x3 grid
    const [grid, setGrid] = useState(gridSetup.getGrid());
    // indexes from wordLocations of the words found
    const [foundWordIndexes, setFoundWordIndexes] = useState([]);
    // letters selected when trying to find a word
    const [selectedLetters, setSelectedLetters] = useState([]);
    // contains the id of the letters for words found
    const [matchedLetters, setMatchedLetters] = useState([]);

    const resettGame = () => {
        setWords(gridSetup.getWords());
        setWordLocation(gridSetup.getWordLocations());
        setGrid(gridSetup.getGrid());
        setFoundWordIndexes([]);
        setSelectedLetters([]);
        setMatchedLetters([]);
    }

    const gameComplete = () => {
        return words.length === foundWordIndexes.length
    }

    const onLetterClick = (id, currentStatus) => {
        console.log('id ', id);
        console.log('on click candidate Letters ', selectedLetters);
        const updatedSelection = (utils.toggleLetterSelection(id, selectedLetters));
        console.log('after click candidate letters', updatedSelection);
        setSelectedLetters(updatedSelection);
        detectMatches(updatedSelection);
    };

    const detectMatches = (selectedLetters) => {
        // TODO detect multiple matched words
        wordLocations.forEach((word, index) => {
            console.log('selection for matching', selectedLetters);
            if (matching.wordFound(word, selectedLetters)) {
                console.log('you got a match');
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

    return (
        <div className="game">
            <div className="help">
                Click on the letters to find the words
            </div>
            <div className="body">
                <div className="left">
                    <WordCount total={words.length} found={foundWordIndexes.length}/>
                    {/*<WordList words={words}/>*/}
                    {gameComplete() && <PlayAgain onClick={resettGame}/>}
                </div>
                <div className="right">
                    {grid.map((letter, index) =>
                        // <button key={number} className="number">{number}</button>
                        <GridLetter key={index}
                                    letter={letter}
                                    id={index}
                                    status={numberStatus(index)}
                                    onClick={onLetterClick}
                        />
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: 10</div>
        </div>
    );
}

export default App;
