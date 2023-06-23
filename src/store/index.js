import { configureStore } from "@reduxjs/toolkit";
import setEmotionReducer from '../slices/emoSet'


export const store = configureStore({
        reducer: {
                setEmotionReducer
        }
})
