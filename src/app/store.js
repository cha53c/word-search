import { configureStore } from '@reduxjs/toolkit'

import wordsReducer from '../features/words/wordsSlice'
import gridReducer from '../features/grid/gridSlice'

export default configureStore({
    reducer: {
        words: wordsReducer,
        grid: gridReducer,
    }
})