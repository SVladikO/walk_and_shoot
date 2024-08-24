import styled from 'styled-components';

export const Wrapper = styled.div`
    background: white;
    padding: 50px;
`;

export const Navigation = styled.div`
    padding: 10px 0;
    display: flex;
    gap: 16px;
`;

export const NavigationBtn = styled.button`
    padding: 4px;
    border: none;
    border-radius: 4px;
    ${p => p.isAddUnit && `background: green; color: black;`}
    ${p => p.isAddBlock && `background: black; color: white;`}
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
    ${p => p.isIncludeUnit && p.isIncludeBlock
            ? `color: white; background: red;`
            : p.isIncludeBlock
                    ? `color: white; background: black;`
                    : p.isIncludeUnit
                            ? `color: white; background: green;`
                            : `color: darkgrey;`
    }
`;