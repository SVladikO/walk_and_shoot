import {configureStore, createSlice} from '@reduxjs/toolkit'
import {game} from "../util/game";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        selectedLevel: 1,
        editLevel: 1,
        gameSpeed: 1,
        isUserDead: false,
        isGamePaused: false,
        isSoundEnabled: false,
        isShowSettings: false,
    },
    reducers: {
        setSelectedLevel: ((state, {payload}) => {
            state.selectedLevel = payload;
        }),
        enableSound: state => {
            game.isSoundEnabled = true;
            state.isSoundEnabled = true;
        },
        disableSound: state => {
            game.isSoundEnabled = false;
            state.isSoundEnabled = false;
        },
        increaseGameSpeed: (state, {payload}) => {
            state.healthLevelgameSpeed += payload
        },
        decreaseGameSpeed: (state, {payload}) => {
            state.healthLevelgameSpeed -= payload
        },
        openSettings: state => {
            state.isShowSettings = true;
            state.isGamePaused = true;
            game.inPlay = false;
        },
        closeSettings: state => {
            state.isShowSettings = false;
            state.isGamePaused = false;
            game.inPlay = true;
        },
        setIsUserDead: (state, {payload}) => {
            state.isUserDead = payload;
        },
        setEditLevel: (state, {payload}) => {
            state.editLevel = payload;
        }
    }
})
export const {
    setSelectedLevel,
    enableSound,
    disableSound,
    openSettings,
    closeSettings,
    setIsUserDead,
    setEditLevel,
} = appSlice.actions;

const store = configureStore({
    reducer: appSlice.reducer
})

store.subscribe(() => console.log(1111, store.getState()))

export default appSlice.reducer;