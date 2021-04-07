import {createSlice} from '@reduxjs/toolkit'
import Grid from "../../utils/grid";
import gridSetup from "../../utils/gridSetup";

const initialState = Grid.setup(5,5, gridSetup.getWords())

const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {}
})

export default gridSlice.reducer;