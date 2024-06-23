import {Wrapper, Notification} from "./bullets.style";
import {createArrayFromLength} from "../../util/util";

export default function Bullets({amount}) {
    const bullets = createArrayFromLength(amount).map((el, index) => <div key={index}></div>)

    return (
        <div>
            <Wrapper>
                {bullets}
            </Wrapper>
            {amount <= 0 && <Notification id="no_bullets_notification">No bullets. Press SPACE to reload.</Notification>}
        </div>
    )
}