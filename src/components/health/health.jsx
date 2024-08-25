import {Progress} from './health.style';

export default function Health({health}) {
    return  <Progress id="user_healt_progress" value={health} max="100" />
}