import {Wrapper, Notification, Bullet, UsedBullet, BulletWrapper, UsedBulletWrapper} from "./bullets.style";
import {createArrayFromLength} from "../../util/util";

export default function Bullets({amount, maxAmount}) {
    const bullets = createArrayFromLength(amount).map((el, index) => <Bullet key={index}></Bullet>)
    const usedBullets = createArrayFromLength(maxAmount).map((el, index) => <UsedBullet key={index}></UsedBullet>)

    return (
        <div>
            <Wrapper>
                <BulletWrapper>{bullets}</BulletWrapper>
                {amount > 0 && <UsedBulletWrapper>{usedBullets}</UsedBulletWrapper>}
            </Wrapper>
            {amount <= 0 && <Notification id="no_bullets_notification">No bullets. Press SPACE to reload.</Notification>}
        </div>
    )
}