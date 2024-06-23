import {PrimaryButton, SecondaryButton, Wrapper} from "./try-again.style";


export default function TryAgain({selectedLevelId, tryAgain}) {
    return (
        <Wrapper>
            <h2>Level {selectedLevelId + 1}</h2>
            <h1>GAME OWER</h1>
            <PrimaryButton onClick={tryAgain}>TRY AGAIN</PrimaryButton>
            <SecondaryButton className="secondary_btn" onClick="showAllLevels()">Choose other level</SecondaryButton>
        </Wrapper>
    )
}