import {createSlice, configureStore} from '@reduxjs/toolkit'

const appSlice = createSlice({
    name: 'app',
    initialState: {
        selectedLevel: 1,
        editLevel: 1,
        isGamePaused: false,
        selectedGun: null,
        userBulletsInClip: 0,
        maxUserBulletsInClip: 0,
        settings: {
            isSoundEnabled: true,
            isAutoShootEnabled: true,
            gameSpeed: 1,
        },
    },
    reducers: {
        setSelectedLevel: ((state, payload) => {
            state.selectedLevel = payload.value;
        }),
        setUserBulletsInClip: (state, {payload}) => {
            state.userBulletsInClip = payload
        },
        setMaxUserBulletsInClip: (state, {payload}) => {
            state.maxUserBulletsInClip = payload
        },
        incrementSelectedLevel: (state) => {
            state.selectedLevel++
        },
        decrementSelectedLevel: (state) => {
            state.selectedLevel--
        },
        enableSound: state => {
            state.settings.isSoundEnabled = true;
        },
        disableSound: state => {
            state.settings.isSoundEnabled = false;
        },
        increaseGameSpeed: (state, {payload}) => {
            state.settings.gameSpeed += payload
        },
        decreaseGameSpeed: (state, {payload}) => {
            state.settings.gameSpeed -= payload
        },
        enableAutoShoot: state => {
            state.settings.gameSpeed = true
        },
        disableAutoShoot: state => {
            state.settings.gameSpeed = false
        },
    }
})
export const {
    enableAutoShoot,
    disableAutoShoot,
    incrementSelectedLevel,
    decrementSelectedLevel,
    enableSound,
    disableSound,
    setUserBulletsInClip,
    setMaxUserBulletsInClip,
} = appSlice.actions;

const store = configureStore({
    reducer: appSlice.reducer
})

store.subscribe(() => console.log(1111, store.getState()))

export default appSlice.reducer;