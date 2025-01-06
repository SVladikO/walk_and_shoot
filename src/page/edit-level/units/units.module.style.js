import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
`;

export const GunImg = styled.img`
    max-height: 60px;
    min-height: 60px;
`;

export const BulletImg = styled.img`
    max-height: 20px;
    min-height: 20px;
`;

export const InnerWrapperUnit = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
`
export const WrapperUnit = styled.div`
    border: solid 1px black;
    border-radius: 5px;
    width: 250px;

    padding: 5px;

    background: ${p => p.isselected ? '#63f663' : 'white'};
`;