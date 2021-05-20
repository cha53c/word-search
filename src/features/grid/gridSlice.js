import {createSlice} from '@reduxjs/toolkit'
import {current} from '@reduxjs/toolkit'
import Grid from "../../utils/grid";
import gridSetup from "../../utils/gridSetup";


const gridSlice = createSlice({
    name: 'grid',
    // initialState: Grid.setup(5,5, gridSetup.getWords()),
    initialState: Grid.buildNewGrid(5, 5),
    reducers: {
        wordFound: (state, action) => {
            console.log('state', current(state));
            console.log('state words ', current(state.words));
            console.log('wordfound action', action);
            const word = state.words.find(word => word.word === action.payload.word)
            word.found = true;
            console.log('false count ', state.words.filter(w => w.found === false).length);
            if (state.words.filter(w => w.found === false).length === 0) {
                console.log('game completed');
                state.gameComplete = true;
            }
        },
        setNewState: (state, action) => {
            console.log('You are setting the grid state');
            const newGrid = Grid.buildNewGrid(5, 5);
            state.rows = newGrid.rows;
            state.columns = newGrid.columns;
            state.size = newGrid.size;
            state.letters = newGrid.letters;
            state.gameComplete = false;
            state.words = newGrid.words;
            state.locationIndexes = newGrid.locationIndexes;
        }
    }
})

export const {wordFound, setNewState} = gridSlice.actions;
export default gridSlice.reducer;