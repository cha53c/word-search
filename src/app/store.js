import {configureStore} from '@reduxjs/toolkit'

import wordsReducer from '../features/words/wordsSlice'
import gridReducer from '../features/grid/gridSlice'
import counterReducer from '../components/counterSlice'

const store = configureStore({
    reducer: {
        grid: gridReducer,
        words: wordsReducer,
        counter: counterReducer,
    }
})

export default store;
