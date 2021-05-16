import { createSlice } from '@reduxjs/toolkit'

const playAgainSlice = createSlice({
    name: 'playAgain',
    initialState: {visible: false},
    reducers: {
        show (state) {
            state.visible = true;
        },
        hide(state){
            state.visible = false;
        }
    }
});

export const {show, hide} = playAgainSlice.actions;
export default playAgainSlice.reducer;