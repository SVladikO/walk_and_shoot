import {useState, useEffect} from "react";
import './App.css';

import {Header, LineGroup} from './App.style.js';

import {game} from './util/glob';
import {run} from './script/run.js';

import Health from "./components/health/health";
import Bullets from "./components/bullets/bullets";
import GunList from "./components/gun-list/gun-list";
import UserSpeed from "./components/user-speed/user-speed";
import MenuButton from "./components/menu-button/menu-button";
import SoundController from "./components/sound-controller/sound-controller";
import Menu from "./components/menu/menu";

function App() {
    const [showMenu, setShowMenu] = useState(true);

    useEffect(() => {
        run(game);
    })

    return (
        <div>
            <Header>
                <LineGroup>
                    <Health/>
                    <Bullets/>
                </LineGroup>
                <GunList/>
                <LineGroup>
                    <UserSpeed/>
                    <SoundController/>
                    <MenuButton showMenu={setShowMenu}/>
                </LineGroup>
            </Header>
            {showMenu && <Menu showMenu={setShowMenu}/>}
        </div>
    );
}

export default App;
