import {useState, useEffect} from "react";
import './App.css';
import './util/levels.data.js'; //By import we put levels in localStorage
import {Header, LineGroup, CanvasBoard} from './App.style.js';

import {PrimaryButton, ThirdButton} from './components/button/button';
import Health from "./components/health/health";
import Bullets from "./components/bullets/bullets";
import ShootAuto from "./components/shoot-auto/shoot-auto";
import GunList from "./components/gun-list/gun-list";
import UserSpeed from "./components/user-speed/user-speed";
import MenuButton from "./components/menu-button/menu-button";
import SoundController from "./components/sound-controller/sound-controller";
import {run} from "./script/run";
import {game} from "./util/game";

import {changeUserHealth} from './util/util';

import {getLocalStorage, LOCAL_STORAGE_KEY} from './util/localstorage';

import MenuPage from "./page/menu/menu.jsx";
import TryAgainPage from './page/try-again/try-again';
import EditLevelPage from './page/edit-level/edit-level.jsx'

run(game);

function App() {
    const [userHealth, setUserHealth] = useState(100);
    const [isShootModeAuto, setIsShootModeAuto] = useState(game.isShootModeAuto);
    const [selectedLevelId, setSelectedLevelId] = useState(0);

    const [levelForEdit, setLevelForEdit] = useState();

    const [showMenuPage, setShowMenuPage] = useState(true);
    const [showTryAgainPage, setShowTryAgainPage] = useState(false);
    const [showEditLevelPage, setShowEditLevelPage] = useState(false);

    const [userBulletAmount, setUserBulletAmount] = useState(8);

    const onChangeIsShootModeAuto = () => {
        setIsShootModeAuto(!isShootModeAuto);
        game.isShootModeAuto = !isShootModeAuto;
    }

    const onSelectLevel = levelIndex => {
        const levels = getLocalStorage(LOCAL_STORAGE_KEY.LEVELS);
        game.stop();

        if (levelIndex > levels.length - 1 || levelIndex < 0) {
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
        const levels = getLocalStorage(LOCAL_STORAGE_KEY.LEVELS);

        setShowMenuPage(false)
        setShowEditLevelPage(true)
        if (index === undefined) {
            setLevelForEdit({});
            return
        }

        setLevelForEdit(levels[index]);
    }

    const onTryAgain = () => {
        onSelectLevel(selectedLevelId);
        setShowTryAgainPage(false)
        setUserHealth(100);
        changeUserHealth();
    }

    useEffect(() => {
        game.init(() => setUserBulletAmount(game.user.bulletAmount));


        window.addEventListener("keypress", (event) => {
            if (event.key === ' ') {
                setUserBulletAmount(game.user.bulletAmount);
            }
        });
        window.canvas_game_board.addEventListener("mousedown", (game => () => {
                if (game.isShootModeAuto) {
                    game.user.isShootEnabled = true;
                } else {
                    game.user.shootSingle();
                }

                setUserBulletAmount(game.user.bulletAmount);
            })(game)
        );

        window.canvas_game_board.addEventListener("mouseup", (game => () => game.user.isShootEnabled = false)(game));
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
                    <ThirdButton onClick={() => onSelectLevel(selectedLevelId - 1)}>PREV</ThirdButton>
                    <div>LEVEL {selectedLevelId + 1}</div>
                    <ThirdButton onClick={() => onSelectLevel(selectedLevelId + 1)}>NEXT</ThirdButton>
                    <UserSpeed/>
                </LineGroup>
                <LineGroup>
                    <ShootAuto value={isShootModeAuto} onChangeHandler={onChangeIsShootModeAuto} />
                    <GunList setUserBulletAmount={setUserBulletAmount}/>
                    <Bullets amount={userBulletAmount} maxAmount={game?.user?.weapon?.reloadBulletAmount || 8}/>
                    <Health health={userHealth}/>
                    <SoundController/>
                </LineGroup>
            </Header>

            <CanvasBoard id="canvas_game_board" isVisible={!showMenuPage && !showTryAgainPage && !showEditLevelPage}/>

            {showMenuPage && (
                <MenuPage
                    onSelectLevel={onSelectLevel}
                    onShowEditLevelPage={onShowEditLevelPage}
                    setLevelForEdit={setLevelForEdit}
                />
            )
            }
            {showEditLevelPage &&
                <EditLevelPage
                    levelForEdit={levelForEdit}
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
