import {BrowserRouter, Routes, Route} from "react-router";
import './App.css';

import PlayRoomPage from "./page/play-room/play-room.page.jsx";
import MenuPage from "./page/menu/menu.page.jsx";
import EditLevelPage from './page/edit-level/edit-level.page.jsx'

export const URL = {
    PLAY_ROOM: '/play',
    MENU: '/',
    EDIT_LEVEL: '/edit'
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={URL.PLAY_ROOM} element={<PlayRoomPage/>}/>
                <Route path={URL.MENU} element={<MenuPage/>}/>
                <Route path={URL.EDIT_LEVEL} element={<EditLevelPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
