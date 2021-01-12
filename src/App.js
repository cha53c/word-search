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
            onClick={() => props.onClick(props.number, props.status)}>{props.number}</button>
);


function App() {
    const numbers = 9;
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);

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
    }

    const numberStatus = (number) => {
        if (!availableNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
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
                    {utils.range(1, numbers).map(number =>
                        // <button key={number} className="number">{number}</button>
                        <PlayNumber key={number}
                                    number={number}
                                    status={numberStatus(number)}
                                    onClick={onNumberClick}
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
