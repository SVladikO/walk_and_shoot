import {Wrapper, Notification} from "./bullets.style";
import {createArrayFromLength} from "../../util/util";

export default function Bullets({amount}) {
    const bullets = createArrayFromLength(amount).map((el, index) => <div key={index}></div>)

    return (
        <div>
            <Wrapper id="bullet_amount">
                {bullets}
            </Wrapper>
            <Notification id="no_bullets_notification"></Notification>
        </div>
    )
}