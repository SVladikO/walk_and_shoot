import styled from 'styled-components';

export const Wrapper = styled.div`
    color: white;
    flex-direction: column;
    gap: 40px;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const PrimaryButton = styled.div`
        border: solid 2px red;
        padding: 10px;
        color: red;
`;

export const SecondaryButton = styled.div`
    border: solid 2px rgba(255, 255, 255, 0.54);
    padding: 10px;
    margin: 30px 0 0;
    color: rgba(255, 255, 255, 0.54);
`;