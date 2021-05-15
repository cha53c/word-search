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
            const word = state.words.find(word => word.word === action.payload.word)
            word.found = true;
            console.log('false count ', state.words.filter(w => w.found === false).length);
            if(state.words.filter(w => w.found === false).length === 0){
                console.log('game over');
                // TODO dispatch congratulations component
                // TODO dispatch to new game button
            }
        },
    }
})

export const {wordFound} = gridSlice.actions;
export default gridSlice.reducer;