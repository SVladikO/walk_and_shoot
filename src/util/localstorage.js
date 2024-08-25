export const LOCAL_STORAGE_KEY = {
    LEVELS: 'LEVELS'
}

export function setLocalStorage(key, value) {
    console.log('setLocalStorage', {key, value})
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
    console.log('getLocalStorage', {key}, JSON.parse(localStorage.getItem(key)))
    return JSON.parse(localStorage.getItem(key));
}
