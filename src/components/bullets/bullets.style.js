import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: right;
    align-items: top;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 3px;
    width: 180px;
    position: relative;
`;

export const BulletWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    position: absolute;
    flex-wrap: wrap;
`
export const Bullet = styled.div`
    background: #000000;
    height: 10px;
    width: 10px;
    border-radius: 50%;
`
export const UsedBulletWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4px;
`;
export const UsedBullet = styled.div`
    background: #bababc;
    height: 10px;
    width: 10px;
    border-radius: 50%;
`
export const Notification = styled.div`
    padding: 10px;
    background: rgb(179, 0, 0);
    color: white;
    height: 60px;
    width: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    animation: example 1s infinite;

    @keyframes example {
        25% {
            background-color: rgb(181, 1, 1);
        }
        60% {
            background-color: rgb(191, 15, 15);
        }
        75% {
            background-color: rgb(0, 63, 179);
        }
        100% {
            background-color: rgb(11, 73, 186);
        }
    }
`;