import { createSlice, current} from '@reduxjs/toolkit'
import {wordFound} from '../grid/gridSlice'
import gridSetup from "../../utils/gridSetup";
const initialState = gridSetup.getWords().map( (w, i) => {return { id: i, word: w}})

const wordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {
        addLocations(state, action) {
            console.log('addLocations action', action);

        },
        // extraReducers: (builder) => {
        //     builder.addCase(wordFound, (state, action) => {
        //         console.log('whoo hoo!');
        //     });
        // }

    },
    extraReducers: {
        [wordFound.type]: (state, action) => {
            console.log('wordSlice wordFound! ', action);
            console.log('wordSlice state ', current(state));
        }
    }
})

// export const {wordFound} = wordsSlice.actions;
export default wordsSlice.reducer;