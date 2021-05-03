import {createSlice, current} from '@reduxjs/toolkit'
import {wordFound} from '../grid/gridSlice'
import gridSetup from "../../utils/gridSetup";

const initialState = gridSetup.getWords().map((w, i) => {
    return {id: i, word: w, found: false}
})

const wordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {
        addLocations(state, action) {
            console.log('addLocations action', action);
        },
    },
    extraReducers: {
        [wordFound.type]: (state, action) => {
            console.log('wordSlice wordFound! ', action);
            console.log('wordSlice state ', current(state));
        }
    }
})

export default wordsSlice.reducer;