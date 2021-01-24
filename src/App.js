import './App.css';
import React, {useState} from 'react';

import PlayNumber from "./components/PlayNumber";
import utils from "./utils/utils";
import matching from "./utils/matching";


const StarsDisplay = props => (
    <>
        {utils.range(1, props.count).map(starId => <div key={starId} className="star"/>)}
    </>
);


function App() {
    const MATCHED = 'matched';
    const CANDIDATE = 'candidate';
    const AVAILABLE = 'available';
    // stores the location of the words in the grid by ids
    const wordLocations = [[0,1,2],[2,5,8]];
    // letters in the grid, based on 3x3 grid
    const grid = ['F', 'O', 'X', 'I', 'M', 'O', 'G', 'F', 'B'];
    // letters selected when trying to find a word
    const [selectedLetters, setSelectedLetters] = useState([]);
    // contains the id of the letters for words found
    const [matchedLetters, setMatchedLetters] = useState([]);

    // TODO conts set up by original number game example remove once not needed
    const numbers = 9;
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);


    const onLetterClick = (id, currentStatus) => {
        console.log('id ', id);
        console.log('on click candidate Letters ', selectedLetters);
        setCandidateNums([1]); // TODO should not need this to force re-render
        // toggle letter selection
        if (selectedLetters.includes(id)) {
            selectedLetters.pop(id);
        } else {
            selectedLetters.push(id);
        }
        console.log('after click candidate letters', selectedLetters);
        setSelectedLetters(selectedLetters);
        detectMatches();

    };
    const detectMatches = () => {
        // TODO detect multiple matched words
        wordLocations.map( word => {
            if(matching.wordFound(word, selectedLetters)) {
                // this is a winning sequence. How do I change the colour of the numbers
                console.log('you got a match');
                const newMatchedLetters = matchedLetters.concat(selectedLetters);
                setMatchedLetters(newMatchedLetters);
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
                    {utils.range(1, stars).map(starId => <div key={starId} className="star"/>)}
                    {/*  <StarsDisplay count={stars}/>*/}
                </div>
                <div className="right">
                    {grid.map((letter, index) =>
                        // <button key={number} className="number">{number}</button>
                        <PlayNumber key={index}
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
