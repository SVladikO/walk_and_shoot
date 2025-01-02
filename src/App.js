import {BrowserRouter, Routes, Route} from "react-router";
import './App.css';

import PlayRoomPage from "./page/play-room/play-room.page.jsx";
import MenuPage from "./page/menu/menu.jsx";
import TryAgainPage from './page/try-again/try-again';
import EditLevelPage from './page/edit-level/edit-level.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PlayRoomPage/>}/>
                <Route path="/menu" element={<MenuPage/>}/>
                <Route path="/1" element={<EditLevelPage/>}/>
                <Route path="/2" element={<TryAgainPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
