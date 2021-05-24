import {configureStore} from '@reduxjs/toolkit'

import wordsReducer from '../features/words/wordsSlice'
import gridReducer from '../features/grid/gridSlice'
import playAgainReducer from '../components/playAgainSlice'
// import gridLetterReducer from '../components/gridLetterSlice'

const store = configureStore({
    reducer: {
        grid: gridReducer,
        words: wordsReducer,
        playAgain: playAgainReducer,
    }
})

export default store;
