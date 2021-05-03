import { configureStore } from '@reduxjs/toolkit'

import wordsReducer from '../features/words/wordsSlice'
import gridReducer from '../features/grid/gridSlice'
import counterReducer from '../components/counterSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        words: wordsReducer,
        grid: gridReducer,
    }
})