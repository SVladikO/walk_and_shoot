import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 44px 10px 10px ;
    display: flex;
    gap: 10px;
    flex-direction: column;
`;

export const UnitWrapper = styled.div`
    border: solid 1px black;
    border-radius: 5px;

    display: flex;
    gap: 10px;
    justify-content: left;
    align-items: center;

    padding: 5px;

    background: ${p => p.isSelected ? '#63f663' : 'white'};

    & > img {
        height: 50px;
        width: auto;
    }
`;