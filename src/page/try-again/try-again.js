import { Wrapper} from "./try-again.style";
import {PrimaryButton, SecondaryButton} from '../../components/button/button'

export default function TryAgain({selectedLevelId, onTryAgain, onShowMenuPage}) {
    return (
        <Wrapper>
            <h2>Level {selectedLevelId + 1}</h2>
            <h1>GAME OWER</h1>
            <PrimaryButton onClick={onTryAgain}>TRY AGAIN</PrimaryButton>
            <SecondaryButton className="secondary_btn" onClick={onShowMenuPage}>Choose other level</SecondaryButton>
        </Wrapper>
    )
}