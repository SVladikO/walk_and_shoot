import styled from 'styled-components';

export const Wrapper = styled.div`
    background: white;
    padding: 50px;
`;

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
    ${p =>  p.isSelected ?  `color: white; background: black;` : `color: darkgrey;`}
`;