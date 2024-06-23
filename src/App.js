import {useState, useEffect} from "react";
import './App.css';

import {Header, LineGroup} from './App.style.js';

import Health from "./components/health/health";
import Bullets from "./components/bullets/bullets";
import GunList from "./components/gun-list/gun-list";
import TryAgain from './components/try-again/try-again';
import UserSpeed from "./components/user-speed/user-speed";
import MenuButton from "./components/menu-button/menu-button";
import SoundController from "./components/sound-controller/sound-controller";
import Menu from "./components/menu/menu";
import {run} from "./script/run";
import {game} from "./util/glob";

import {changeUserHealth} from './util/util';

run(game);

function App() {
    const [userHealth, setUserHealth] = useState(100);
    const [selectedLevelId, setSelectedLevelId] = useState(0);
    const [showMenu, setShowMenu] = useState(true);
    const [showTryAgain, setshowTryAgain] = useState(false);
    const [userBulletAmount, setUserBulletAmount] = useState(8);

    const onSelectLevel = levelIndex => {
        setSelectedLevelId(levelIndex)
        setShowMenu(false);
        game.changeLevel(levelIndex);
        setUserBulletAmount(game.user.bulletAmount)
    }

    const onShowMenu = () => {
        setShowMenu(true)
        setshowTryAgain(false)
    }
    const onTryAgain = () => {
        onSelectLevel(selectedLevelId);
        setshowTryAgain(false)
        setUserHealth(100);
        changeUserHealth();
    }

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

    setInterval(() => {
        if (game.user?.isDead()) {
            setshowTryAgain(true)
            game.changeLevel(selectedLevelId);
        }
    }, 1000)

    return (
        <div>
            <Header>
                <LineGroup>
                    <Health health={userHealth}/>
                    <Bullets amount={userBulletAmount}/>
                </LineGroup>
                <GunList setUserBulletAmount={setUserBulletAmount}/>
                <LineGroup>
                    <UserSpeed/>
                    <SoundController/>
                    <MenuButton showMenu={setShowMenu}/>
                </LineGroup>
            </Header>
            {showMenu && <Menu onSelectLevel={onSelectLevel}/>}
            {showTryAgain && <TryAgain selectedLevelId={selectedLevelId} onTryAgain={onTryAgain} onShowMenu={onShowMenu}/>}
        </div>
    );
}

export default App;
