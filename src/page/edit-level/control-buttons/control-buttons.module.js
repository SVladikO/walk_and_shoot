import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {updateLevels} from "../../../features/app.slice";
import {ButtonWrapper} from "./control-buttons.module.style";
import Button from "@mui/material/Button";
import {URL} from "../../../App";

const ControlButtons = ({
                            enemies,
                            blockIds,
                            userStartPosition,
                            setBlockIds,
                            setEnemies,
                        }) => {
    const {levelForEditIndex} = useSelector(state => state.app);

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const {levels} = useSelector(state => state.app);


    const onSaveLevelForEdit = () => {
        const levelForEdit = {enemies, blockIds, userStartPosition};
        const newLevels = levels.map((level, index) => index === levelForEditIndex ? levelForEdit : level);

        if (levelForEditIndex === -1) {
            dispatch(updateLevels([...levels, levelForEdit]))
        } else {
            dispatch(updateLevels(newLevels));
        }
    }

    return (
        <ButtonWrapper>
            <Button size="small" variant="contained" onClick={() => navigate(URL.MENU)}>MENU</Button>
            <Button size="small" variant="contained" color="success" onClick={onSaveLevelForEdit}>Save level</Button>
            <Button size="small" variant="contained" color="error" onClick={() => setBlockIds([])}>Clear blocks</Button>
            <Button size="small" variant="contained" color="error" onClick={() => setEnemies([])}>Clear enemies</Button>
            <Button size="small" variant="contained" color="error" onClick={() => {
                    setBlockIds([])
                    setEnemies([])
                }}>Clear board</Button>
        </ButtonWrapper>
    )
}

export default ControlButtons;