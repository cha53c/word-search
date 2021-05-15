import { createSlice } from '@reduxjs/toolkit'

const playAgainSlice = createSlice({
    name: 'playAgain',
    initialState: {visible: false},
    reducers: {
        toggleVisible (state) {
            state.visible = !state.visible;
        }
    }

});

export default playAgainSlice.reducer;