import {useState} from "react";

import {Wrapper} from "./sound-controller.style";

import {ReactComponent as MuteIcon} from "../../icons/mute.svg";
import {ReactComponent as UnMuteIcon} from "../../icons/unmute.svg";

import {game} from '../../util/glob';

export default function SoundController() {
    const [isMute, setIsMute] = useState(false)

    const onMute = bool => {
        setIsMute(bool)
        game.isMute = bool
    }

    return (
        <Wrapper>
            {
                isMute
                    ? <MuteIcon onClick={() => onMute(false)}/>
                    : <UnMuteIcon onClick={() => onMute(true)}/>
            }
            {/*<div className="themes">*/}
            {/*    <button onClick="mute()">Mute</button>*/}
            {/*    <button onClick="unmute()">Unmute</button>*/}
            {/*</div>*/}
        </Wrapper>
    )
}