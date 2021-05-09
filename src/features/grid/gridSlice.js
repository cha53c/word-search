import {createSlice} from '@reduxjs/toolkit'
import {current} from '@reduxjs/toolkit'
import Grid from "../../utils/grid";
import gridSetup from "../../utils/gridSetup";


const gridSlice = createSlice({
    name: 'grid',
    initialState: Grid.setup(5,5, gridSetup.getWords()),
    reducers: {
        // TODO do i need to track if a word is found in the grid?
        wordFound: (state, action) => {
            console.log('state', current(state));
            console.log('state words ', current(state.words));
            console.log('wordfound action', action);
            state.words.find(word => {
                console.log('word', current(word), 'location ', current(word.location), 'payload ', action.payload, 'match?', word.word === action.payload.word);
                return word.word === action.payload.word}).found = true;
        },
    }
})

export const {wordFound} = gridSlice.actions;
export default gridSlice.reducer;