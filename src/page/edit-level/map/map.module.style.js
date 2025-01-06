import styled from "styled-components";


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
    ${p => p.isIncludeBlock
    ? `color: white; background: black;`
    : p.isIncludeUnit
        ? `background: #63f663;`
        : p.isUserPosition
            ? `background: #7fb7ff;`
            : `color: darkgrey;`
}

    position: relative;

    & > img {
        height: 10px;
        width: auto;
        position: absolute;
        bottom: 0;
    }

    & > svg {
        height: 10px;
        width: auto;
        position: absolute;
        top: 0;
        right: 0;
    }
`;
