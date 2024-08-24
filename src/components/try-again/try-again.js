import { Wrapper} from "./try-again.style";
import {PrimaryButton, SecondaryButton} from '../button/button'

export default function TryAgain({selectedLevelId, onTryAgain, onShowLevelsPage}) {
    return (
        <Wrapper>
            <h2>Level {selectedLevelId + 1}</h2>
            <h1>GAME OWER</h1>
            <PrimaryButton onClick={onTryAgain}>TRY AGAIN</PrimaryButton>
            <SecondaryButton className="secondary_btn" onClick={onShowLevelsPage}>Choose other level</SecondaryButton>
        </Wrapper>
    )
}