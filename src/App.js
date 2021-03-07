import './App.css';
import React, {useState} from 'react';

import GridLetter from "./components/GridLetter";
import WordCount from "./components/WordCount";
import PlayAgain from "./components/PlayAgain";

import utils from "./utils/utils";
import matching from "./utils/matching";
import gridSetup from "./utils/gridSetup";
import Grid from "./utils/grid";
import userEvent from "@testing-library/user-event";

const rows = 3;
const columns = 3;

const StarsDisplay = props => (
    <>
        {utils.range(1, props.count).map(starId => <div key={starId} className="star"/>)}
    </>
);


function App() {
    const MATCHED = 'matched';
    const CANDIDATE = 'candidate';
    const AVAILABLE = 'available';
    const [newGame, setNewGame] = useState(true);
    const [words, setWords] = useState(["FOX", "BOX"]);
    const [grid, setGrid] = useState(Grid.setup(rows, columns, ["FOX", "BOX"]));
    // console.log('grid ', grid );
    // indexes from wordLocations of the words found
    const [foundWordIndexes, setFoundWordIndexes] = useState([]);
    // letters selected when trying to find a word
    const [selectedLetters, setSelectedLetters] = useState([]);
    // contains the id of the letters for words found
    const [matchedLetters, setMatchedLetters] = useState([]);

    const setupGame = () => {
        console.log('game reset');
        grid.newGame = true;
        const words = gridSetup.getWords()
        setWords(words)
        setGrid(Grid.setup(rows, columns, words));
        setFoundWordIndexes([]);
        setSelectedLetters([]);
        setMatchedLetters([]);
    }

    const gameComplete = () => {
        return words.length <= foundWordIndexes.length;
    }

    const onLetterClick = (id, currentStatus) => {
        console.log('id ', id);
        console.log('grid ', grid);
        console.log('letters ', grid.letters);
        console.log('workLocations', grid.wordLocations);
        console.log('on click candidate Letters ', selectedLetters);
        const updatedSelection = (utils.toggleLetterSelection(id, selectedLetters));
        console.log('after click candidate letters', updatedSelection);
        setSelectedLetters(updatedSelection);
        detectMatches(updatedSelection);
    };

    const detectMatches = (selectedLetters) => {
        // TODO detect multiple matched words
        grid.wordLocations.forEach((word, index) => {
            console.log('selection for matching', selectedLetters);
            // TODO don't update count if word was already found
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
                    {gameComplete() && <PlayAgain onClick={setupGame}/>}
                </div>
                <div className="right">
                    {grid.letters.map((letter, index) =>
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
