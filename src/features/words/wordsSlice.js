import { createSlice } from '@reduxjs/toolkit'

const initialState = [{ id: 1, word: 'foo', found: 'n'}, { id: 2, word: 'baa', found: 'n'}];

const wordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {
        wordFound(state, action) {
            console.log('wordfound action', action)
        },
        addLocations(state, action) {
            console.log('addLocations action', action);

        }
    }
})

export const { wordFound } = wordsSlice.actions;
export default wordsSlice.reducer;