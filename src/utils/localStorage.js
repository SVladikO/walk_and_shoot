export const LOCAL_STORAGE_KEY = {
    LEVELS: 'LEVELS',
    REDUX_STATE: 'REDUX_STATE',
}

export const LocalStorage = {
    set: (storageKey, value) => localStorage.setItem(storageKey, JSON.stringify(value)),
    get: storageKey => JSON.parse(localStorage.getItem(storageKey)),
    remove: storageKey => localStorage.removeItem(storageKey),
}
