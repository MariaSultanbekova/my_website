import { createSlice } from "@reduxjs/toolkit";


const initialState = {
        emotion: "",
        coordinates: ""
}

const emoSetSlice = createSlice({
        name: 'emoSet',
        initialState,
        reducers: {
                setEmotion(state, action) {
                        state.emotion = action.payload
                },
                setCoordinates(state, action) {
                        state.coordinates = action.payload
                }
        }
})

export const { setEmotion } = emoSetSlice.actions;
export const { setCoordinates } = emoSetSlice.actions;

export default emoSetSlice.reducer;
