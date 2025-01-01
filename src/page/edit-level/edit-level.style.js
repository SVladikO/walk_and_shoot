import styled from 'styled-components';

export const Wrapper = styled.div`
    background: white;
    padding: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Navigation = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: right;
    gap: 15px;
`;

export const NavigationBtn = styled.button`
    padding: 8px;
    border: solid 1px black;
    border-radius: 4px;
    color: black;
    font-size: 18px;
    
    ${p => p.isAddUnit && `background: #63f663; `}
    ${p => p.isAddBlock && `background: black; color: white`}
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