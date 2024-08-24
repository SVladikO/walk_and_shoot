import styled from 'styled-components';


export const Wrapper = styled.div`
    //border: solid 1px black;
    width: 120px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const InputWrapper = styled.div`
    display: flex;
    gap: 2px;
    
    & > input {
        width: 30px;
        font-size: 16px;
    }

    & > span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25px;
        border: solid 1px black;
        border-radius: 2px;
    }
`;
