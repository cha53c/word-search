import './App.css';
import React, {useState} from 'react';

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
    const numbers = 9;
     const words = [1,5,9];
     const grid = ['F', 'O', 'X', 'I', 'M', 'O', 'G', 'F', 'G'];
    const letters =  ['F', 'O', 'X', 'I', 'M', 'O', 'G', 'F', 'G'];
    const ids = utils.range(1, numbers);



    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [candidateLetters, setCandidateLetters] = useState([]);
    const [wordFound, setWordFound] = useState(false);


    const candidatesAreWrong = utils.sum(candidateNums) > stars;

    const onNumberClick = (number, currentStatus) => {
        if (currentStatus === 'used') {
            return;
        }
        const newCandidateNums = currentStatus === 'available' ? candidateNums.concat(number) :
            candidateNums.filter( cn => cn !== number);
        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums)
        } else {
            const newAvailableNums = availableNums.filter( n => !newCandidateNums.includes(n));
            setAvailableNums(newAvailableNums);
            setStars(8); // in word search this will update list of words found or I could remove a star for each word found
            setCandidateNums([]);
        }
    };

    const onLetterClick = (id, currentStatus) => {
        console.log('id ', id);
        console.log('on click candidate Letters ', candidateLetters);
        setCandidateNums ([1]); // TODO should not need this to force re-render
        if(candidateLetters.includes(id)){
            candidateLetters.pop(id);
        } else {
            candidateLetters.push(id);
        }
        console.log('after click candidate letters', candidateLetters)
        setCandidateLetters(candidateLetters);
        if(JSON.stringify(candidateLetters) === JSON.stringify([1,5,9])){
            // this is a winning sequence. How do I change the colour of the numbers
            console.log('you got a match');
            setWordFound(true);
        }
    };

    const numberStatus = (number) => {
        // TODO if candidate, but not work calour red
        // TODO if candidate completes word colour whole word green
        // console.log('candidate letters', candidateLetters);
        // console.log('number', number);
        const included = candidateLetters.includes(number);
        if(included && wordFound) {
            return 'candidate';
        }
        if(included){
            // TODO check if word is found
            return 'wrong';
        }
        return 'available'
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
                                    status={numberStatus(letter)}
                                    onClick={onLetterClick}
                        />
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: 10</div>
        </div>
    );
}

const utils = {
    range: (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i),
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),
};

// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
}

export default App;
