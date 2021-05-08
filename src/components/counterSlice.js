import { createSlice } from '@reduxjs/toolkit'
import gridSetup from "../utils/gridSetup";

const counterSlice = createSlice({
    name: "counter",
    initialState: {found: 0, total: gridSetup.getWords().length},
    reducers: {
        incrementFound: state => {state.found += 1},
        addTotal: (state, action) => {
            state.total = action.payload.value;
        }
    }
})

export const {incrementFound, addTotal } = counterSlice.actions;
export default counterSlice.reducer;