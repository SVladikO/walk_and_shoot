import {Progress} from './health.style';

export default function Health({health}) {
    console.log(1111, {health})
    return (
        <Progress id="user_healt_progress" value={health} max="100"></Progress>
    )
}