import styled from 'styled-components';

export const WrapperUnits = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
`;

export const WrapperUnit = styled.div`
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