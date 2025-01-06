import {configureStore, createSlice} from '@reduxjs/toolkit'
import {game} from "../utils/game";
import {LOCAL_STORAGE_KEY, LocalStorage} from "../utils/localStorage";
import {levels} from "../utils/levels.data";

const defaultState = {
    selectedLevel: 1,
    levelForEditIndex: 0,
    gameSpeed: 2,
    isUserDead: false,
    isGamePaused: false,
    isUserSoundEnabled: false,
    isEnemySoundEnabled: false,
    isBulletFlyLimited: true,
    isShowSettings: false,
    isUserControlBulletDirection: false,
    isBigBulletsImageEnabled: false,
    isVisibleAllEnemy: false,
    levels
}

const state = LocalStorage.get(LOCAL_STORAGE_KEY.REDUX_STATE)?.app || defaultState;

const appSlice = createSlice({
    name: 'app',
    initialState: state,
    reducers: {
        setSelectedLevel: ((state, {payload}) => {
            state.selectedLevel = payload;
        }),
        enableUserSound: state => {
            game.isUserSoundEnabled = true;
            state.isUserSoundEnabled = true;
        },
        disableUserSound: state => {
            game.isUserSoundEnabled = false;
            state.isUserSoundEnabled = false;
        },
        enableEnemySound: state => {
            game.isEnemySoundEnabled = true;
            state.isEnemySoundEnabled = true;
        },
        disableEnemySound: state => {
            game.isEnemySoundEnabled = false;
            state.isEnemySoundEnabled = false;
        },
        increaseGameSpeed: state => {
            state.gameSpeed += 1;
            game.gameSpeed += 1;
        },
        decreaseGameSpeed: state => {
            state.gameSpeed -= 1;
            game.gameSpeed -= 1;
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
        setLevelForEditIndex: (state, {payload}) => {
            console.log('setLevelForEditIndex', payload)
            state.levelForEditIndex = payload;
        },
        updateLevels: (state, {payload}) => {
            state.levels = payload;
        },
        setIsBulletFlyLimited: (state, {payload}) => {
            state.isBulletFlyLimited = payload;
            game.isBulletFlyLimited = payload;
        },
        setIspUserControlBulletDirection: (state, {payload}) => {
            state.isUserControlBulletDirection = payload;
            game.isUserControlBulletDirection = payload;
        },
        setIsBigBulletsImageEnabled: (state, {payload}) => {
            state.isBigBulletsImageEnabled = payload;
            game.isBigBulletsImageEnabled = payload;
        },
        setIsVisibleAllEnemy: (state, {payload}) => {
            state.isVisibleAllEnemy = payload;
            game.isVisibleAllEnemy = payload;
        }
    }
})
export const {
    setSelectedLevel,
    enableUserSound,
    disableUserSound,
    openSettings,
    closeSettings,
    setIsUserDead,
    setLevelForEditIndex,
    updateLevels,
    setLevelForEdit,
    increaseGameSpeed,
    decreaseGameSpeed,
    enableEnemySound,
    disableEnemySound,
    setIsBulletFlyLimited,
    setIspUserControlBulletDirection,
    setIsBigBulletsImageEnabled,
    setIsVisibleAllEnemy

} = appSlice.actions;

const store = configureStore({
    reducer: appSlice.reducer
})

store.subscribe(() => console.log(1111, store.getState()))

export default appSlice.reducer;