import './App.css';
// TODO clean up unused code
import React, {useState} from 'react';
import { wordFound } from "./features/words/wordsSlice";
import Counter from "./components/Counter";
import PlayAgain from "./components/PlayAgain";
import utils from "./utils/utils";
import gridSetup from "./utils/gridSetup";
import grid from "./utils/grid";
import {WordsList} from "./features/words/WordsList";
import {Grid} from "./features/grid/Grid"

const rows = 5;
const columns = 5;

const StarsDisplay = props => (
    <>
        {utils.range(1, props.count).map(starId => <div key={starId} className="star"/>)}
    </>
);


function App() {
    // const MATCHED = 'matched';
    // const CANDIDATE = 'candidate';
    // const AVAILABLE = 'available';
    // const dispatch = useDispatch();
    // const [newGame, setNewGame] = useState(true);
    const [words, setWords] = useState(gridSetup.getWords);
    // const [grid, setGrid] = useState(Grid.setup(rows, columns, words));
    // console.log('grid ', grid );
    const [foundWordIndexes, setFoundWordIndexes] = useState([]);

    return (
        <div className="game">
            <div className="help">
                Click on the letters to find the words
            </div>
            <div className="body">
                <div className="left">
                    <Counter />
                    <PlayAgain onClick={grid.setup} />
                    <WordsList />
                </div>
                <div className="right">
                    <Grid />
                </div>
            </div>
            <div className="timer">Time Remaining: 10</div>
        </div>
    );
}

export default App;
