import {createSlice} from '@reduxjs/toolkit'
import {current} from '@reduxjs/toolkit'
import Grid from "../../utils/grid";
import gridSetup from "../../utils/gridSetup";


const gridSlice = createSlice({
    name: 'grid',
    initialState: Grid.setup(5,5, gridSetup.getWords()),
    reducers: {
        wordFound: (state, action) => {
            console.log('state', current(state));
            console.log('state words ', current(state.words));
            console.log('wordfound action', action);
            state.words.find(word => {
                console.log('word', current(word), 'location ', current(word.location), 'payload ', action.payload, 'match?', word.location === action.payload);
                return current(word.location) === action.payload}).found = true;
        },
    }
})

export const {wordFound} = gridSlice.actions;
export default gridSlice.reducer;