import styled from 'styled-components';

export const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: row;
    padding: 10px;
`;

export const Wrapper = styled.div`
    background: white;
    padding: 50px;
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

export const MapWrapper = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Block = styled.div`
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    //background: green;
    border: solid 1px black;
    ${p => p.isIncludeUnit && p.isIncludeBlock
            ? `color: white; background: red;`
            : p.isIncludeBlock
                    ? `color: white; background: black;`
                    : p.isIncludeUnit
                            ? `background: #63f663;`
                            : `color: darkgrey;`
    }
    
    position: relative;
    
    & > img {
        height: 10px;
        widht: auto;
        position: absolute;
        bottom: 0;
    } 
    & > svg {
        height: 10px;
        widht: auto;
        position: absolute;
        top: 0;
        right: 0;
    }
`;

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