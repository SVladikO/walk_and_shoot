import {useState, useEffect} from "react";
import './App.css';

import {Header, LineGroup} from './App.style.js';

import Health from "./components/health/health";
import Bullets from "./components/bullets/bullets";
import GunList from "./components/gun-list/gun-list";
import UserSpeed from "./components/user-speed/user-speed";
import MenuButton from "./components/menu-button/menu-button";
import SoundController from "./components/sound-controller/sound-controller";
import Menu from "./components/menu/menu";
import {run} from "./script/run";
import {game} from "./util/glob";

run(game);

function App() {
    const [showMenu, setShowMenu] = useState(true);
    const [userBulletAmount, setUserBulletAmount] = useState(8);

    useEffect(() => {
        window.addEventListener("keypress", (event) => {
            if (event.key === ' ') {
                setUserBulletAmount(game.user.bulletAmount);
            }
        });
        game.canvas_board.addEventListener("mousedown", () => {
            setUserBulletAmount(game.user.bulletAmount);
        });
    }, []);

    return (
        <div>
            <Header>
                <LineGroup>
                    <Health/>
                    <Bullets amount={userBulletAmount}/>
                </LineGroup>
                <GunList/>
                <LineGroup>
                    <UserSpeed/>
                    <SoundController/>
                    <MenuButton showMenu={setShowMenu}/>
                </LineGroup>
            </Header>
            {showMenu && <Menu showMenu={setShowMenu} setUserBulletAmount={setUserBulletAmount}/>}
        </div>
    );
}

export default App;
