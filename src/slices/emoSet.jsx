import { createSlice } from "@reduxjs/toolkit";


const initialState = {
        emotion: "happy"
}

const emoSetSlice = createSlice({
        name: 'emoSet',
        initialState,
        reducers: {
                setEmotion(state, action) {
                        state.emotion = action.payload
                }
        }
})

export const { setEmotion } = emoSetSlice.actions;

export default emoSetSlice.reducer;
