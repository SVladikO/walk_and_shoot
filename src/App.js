import {useState, useEffect} from "react";
import './App.css';

import {Header, LineGroup, CanvasBoard} from './App.style.js';


import {PrimaryButton} from './components/button/button';
import Health from "./components/health/health";
import Bullets from "./components/bullets/bullets";
import GunList from "./components/gun-list/gun-list";
import UserSpeed from "./components/user-speed/user-speed";
import MenuButton from "./components/menu-button/menu-button";
import SoundController from "./components/sound-controller/sound-controller";
import {run} from "./script/run";
import {game} from "./util/game";

import {changeUserHealth} from './util/util';

import MenuPage from "./page/menu/menu.jsx";
import TryAgainPage from './page/try-again/try-again';
import EditLevelPage from './page/edit-level/edit-level.jsx'

import {levels} from "./util/global-variables";

run(game);

function App() {
    const [userHealth, setUserHealth] = useState(100);
    const [selectedLevelId, setSelectedLevelId] = useState(0);

    const [selectedUnitIds, setSelectedUnitIds] = useState([]);
    const [selectedEditLevelIds, setSelectedEditLevelIds] = useState([]);

    const [showMenuPage, setShowMenuPage] = useState(true);
    const [showTryAgainPage, setShowTryAgainPage] = useState(false);
    const [showEditLevelPage, setShowEditLevelPage] = useState(false);

    const [userBulletAmount, setUserBulletAmount] = useState(8);

    const onSelectLevel = levelIndex => {
        game.init();
        if (levelIndex > game.levels.length - 1 || levelIndex < 0) {
            console.warn('wrong level index: ', levelIndex)
            return
        }

        setShowMenuPage(false);
        setSelectedLevelId(levelIndex)
        game.start(levelIndex);
        setUserBulletAmount(game.user.bulletAmount)
    }

    const onShowMenuPage = () => {
        setShowMenuPage(true)
        setShowTryAgainPage(false)
        setShowEditLevelPage(false)
        game.stop();
    }

    const onShowEditLevelPage = index => {
        setShowMenuPage(false)
        setShowEditLevelPage(true)
        if (index === undefined) {
            return
        }
        setSelectedUnitIds([...levels[index].unitIds])
        setSelectedEditLevelIds([...levels[index].blockIds])
    }

    const onTryAgain = () => {
        onSelectLevel(selectedLevelId);
        setShowTryAgainPage(false)
        setUserHealth(100);
        changeUserHealth();
    }

    useEffect(() => {
        window.addEventListener("keypress", (event) => {
            if (event.key === ' ') {
                setUserBulletAmount(game.user.bulletAmount);
            }
        });
    }, []);

    setInterval(() => {
        if (game.user?.isDead()) {
            setShowTryAgainPage(true)
            game.start(selectedLevelId);
        }
    }, 1000)

    return (
        <div>
            <Header isVisible={!showMenuPage && !showTryAgainPage && !showEditLevelPage}>
                <LineGroup>
                    <MenuButton showMenu={onShowMenuPage}/>
                    <PrimaryButton onClick={() => onSelectLevel(selectedLevelId - 1)}>PREV</PrimaryButton>
                    <div>LEVEL {selectedLevelId + 1}</div>
                    <PrimaryButton onClick={() => onSelectLevel(selectedLevelId + 1)}>NEXT</PrimaryButton>
                    <UserSpeed/>
                </LineGroup>
                <LineGroup>
                    <GunList setUserBulletAmount={setUserBulletAmount}/>
                    <Bullets amount={userBulletAmount}/>
                    <Health health={userHealth}/>
                    <SoundController/>
                </LineGroup>
            </Header>

            <CanvasBoard id="canvas_game_board" isVisible={!showMenuPage && !showTryAgainPage && !showEditLevelPage} />

            {showMenuPage && (
                <MenuPage
                    onSelectLevel={onSelectLevel}
                    onShowEditLevelPage={onShowEditLevelPage}
                />
            )
            }
            {showEditLevelPage &&
                <EditLevelPage
                    onSelectLevel={onSelectLevel}
                    selectedEditLevelIds={selectedEditLevelIds}
                    selectedUnitIds={selectedUnitIds}
                    onShowMenuPage={onShowMenuPage}
                />
            }
            {showTryAgainPage &&
                <TryAgainPage
                    selectedLevelId={selectedLevelId}
                    onTryAgain={onTryAgain}
                    onShowMenuPage={onShowMenuPage}/>}
        </div>
    );
}

export default App;
