import {createSlice, configureStore} from '@reduxjs/toolkit'

const appSlice = createSlice({
    name: 'app',
    initialState: {
        availableLevels: [],
        availableEnemies: [],
        availableGuns: [],
        selectedLevel: 1,
        editLevel: 1,
        settings: {
            isSoundEnabled: true,
            isAutoShootEnabled: true,
            gameSpeed: 1,
        },
        // Data per level user play
        playRoom: {
            isGamePaused: false,
            selectedGun: null,
            user: {
                health: 100,
            },
            enemies: [], // one array for dead and alive enemies
            flyBullets: []
        },
    },
    reducers: {
        setSelectedLevel: ((state, payload) => {
            state.selectedLevel = payload.value;
        }),
        incrementSelectedLevel: (state) => {state.selectedLevel++},
        decrementSelectedLevel: (state) => {state.selectedLevel--},
        enableSound: state => {
            state.settings.isSoundEnabled = true;
        },
        disableSound: state => {
            state.settings.isSoundEnabled = false;
        },
        increaseGameSpeed: (state, payload) => {
            state.settings.gameSpeed += payload.value
        },
        decreaseGameSpeed: (state, payload) => {
            state.settings.gameSpeed -= payload.value
        },
        enableAutoShoot: state => {
            state.settings.gameSpeed = true
        },
        disableAutoShoot: state => {
            state.settings.gameSpeed = false
        },

        initUser: (state, payload) => {
            state.playRoom.user = payload.value
        },

        initEnemies: (state, payload) => {
            state.playRoom.enemies = payload.value
        },
        resetEnemies: (state) => {
            state.playRoom.enemies = []
        },

        initFlyBullets: (state, payload) => {
            state.playRoom.flyBullets = payload.value
        },
        resetFlyBullets: (state) => {
            state.playRoom.flyBullets = []
        },
    }
})
export const {
    enableAutoShoot,
    disableAutoShoot,
    incrementSelectedLevel,
    decrementSelectedLevel,
    enableSound,
    disableSound
} = appSlice.actions;

const store = configureStore({
    reducer: appSlice.reducer
})

store.subscribe(() => console.log(1111, store.getState()))

export default appSlice.reducer;