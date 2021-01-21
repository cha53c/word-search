import './App.css';
import React, {useState} from 'react';
import utils from "./utils/utils";
import matching from "./utils/matching";

const StarsDisplay = props => (
    <>
        {utils.range(1, props.count).map(starId => <div key={starId} className="star"/>)}
    </>
);
const PlayNumber = props => (
    <button className="number"
            style={{backgroundColor: colors[props.status]}}
            onClick={() => props.onClick(props.id, props.status)}>{props.letter}</button>
);


function App() {
    const MATCHED = 'matched';
    const CANDIDATE = 'candidate';
    const AVAILABLE = 'available';

    const numbers = 9;
    const wordLocations = [[0,1,2],[2,5,8]];
    const grid = ['F', 'O', 'X', 'I', 'M', 'O', 'G', 'F', 'B'];



    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [candidateLetters, setCandidateLetters] = useState([]);
    const [matchedLetters, setMatchedLetters] = useState([]);

    const candidatesAreWrong = utils.sum(candidateNums) > stars;

    const onNumberClick = (number, currentStatus) => {
        if (currentStatus === 'used') {
            return;
        }
        const newCandidateNums = currentStatus === 'available' ? candidateNums.concat(number) :
            candidateNums.filter(cn => cn !== number);
        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums)
        } else {
            const newAvailableNums = availableNums.filter(n => !newCandidateNums.includes(n));
            setAvailableNums(newAvailableNums);
            setStars(8); // in word search this will update list of words found or I could remove a star for each word found
            setCandidateNums([]);
        }
    };

    const onLetterClick = (id, currentStatus) => {
        console.log('id ', id);
        console.log('on click candidate Letters ', candidateLetters);
        setCandidateNums([1]); // TODO should not need this to force re-render
        if (candidateLetters.includes(id)) {
            candidateLetters.pop(id);
        } else {
            candidateLetters.push(id);
        }
        console.log('after click candidate letters', candidateLetters);
        setCandidateLetters(candidateLetters);
        detectMatches();

    };
    const detectMatches = () => {
        // TODO detect multiple matched words
        wordLocations.map( word => {
            if(matching.wordFound(word, candidateLetters)) {
                // this is a winning sequence. How do I change the colour of the numbers
                console.log('you got a match');
                const newMatchedLetters = matchedLetters.concat(candidateLetters);
                setMatchedLetters(newMatchedLetters);
                console.log('matchedLetters', newMatchedLetters);
                setCandidateLetters([]);
            }
        });
    };

    const numberStatus = (number) => {

        const candidate = candidateLetters.includes(number);
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
    }

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

// const utils = {
//     range: (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i),
//     random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
//     sum: arr => arr.reduce((acc, curr) => acc + curr, 0),
// };

// Color Theme
const colors = {
    available: 'lightgray',
    matched: 'lightgreen',
    candidate: 'lightcoral',
}

export default App;
