import {useState, useEffect} from "react";
import './App.css';

import {Header, LineGroup} from './App.style.js';


import {PrimaryButton} from './components/button/button';
import Health from "./components/health/health";
import Bullets from "./components/bullets/bullets";
import GunList from "./components/gun-list/gun-list";
import TryAgain from './components/try-again/try-again';
import UserSpeed from "./components/user-speed/user-speed";
import MenuButton from "./components/menu-button/menu-button";
import SoundController from "./components/sound-controller/sound-controller";
import {run} from "./script/run";
import {game} from "./util/glob";

import {changeUserHealth} from './util/util';

import MenuPage from "./page/menu/menu.jsx";
import EditLevelPage from './page/edit-level/edit-level.jsx'
import {levels} from "./util/global-variables";

run(game);

function App() {
    const [userHealth, setUserHealth] = useState(100);
    const [selectedLevelId, setSelectedLevelId] = useState(0);

    const [selectedUnitIds, setSelectedUnitIds] = useState([]);
    const [selectedEditLevelIds, setSelectedEditLevelIds] = useState([]);

    const [showLevelsPage, setShowLevelsPage] = useState(true);
    const [showEditLevelPage, setShowEditLevelPage] = useState(false);
    const [showTryAgain, setshowTryAgain] = useState(false);

    const [userBulletAmount, setUserBulletAmount] = useState(8);

    const onSelectLevel = levelIndex => {
        if (levelIndex > game.levels.length - 1 || levelIndex < 0) {
            console.warn('wrong level index: ', levelIndex)
            return
        }

        setShowLevelsPage(false);
        setSelectedLevelId(levelIndex)
        game.changeLevel(levelIndex);
        setUserBulletAmount(game.user.bulletAmount)
    }

    const onShowLevelsPage = () => {
        setShowLevelsPage(true)
        setshowTryAgain(false)
    }

    const onShowEditLevelPage = index => {
        setShowLevelsPage(false)
        setShowEditLevelPage(true)
        if (index ===undefined) {
            return
        }
        setSelectedUnitIds([...levels[index].unitIds])
        setSelectedEditLevelIds([...levels[index].blockIds])
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
                    <MenuButton showMenu={setShowLevelsPage}/>
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
            {showLevelsPage && (
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
                />
            }
            {showTryAgain &&
                <TryAgain selectedLevelId={selectedLevelId} onTryAgain={onTryAgain}
                          onShowLevelsPage={onShowLevelsPage}/>}
        </div>
    );
}

export default App;
