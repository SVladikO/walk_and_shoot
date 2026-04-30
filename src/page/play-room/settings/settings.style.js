import styled from "styled-components";


export const SettingsWrapper = styled.div`
    position: absolute;
    top: 70px;
    width: 100%;
`;

export const SettingsInnerWrapper = styled.div`
    min-height: 200px;
    width: 400px;
    padding: 20px 40px;
    margin: 0 auto;
    color: white;
    background: #45516a;
    border: solid 1px black;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    
    & > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        gap: 10px;
    }
`;

export const MoreLessWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    & > div {
        display: flex;
        gap: 10px;
        align-items: center;
    }
    
    & > div > button {
        min-width: 40px !important;
    }
`;

export const SettingsItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.div`
    text-align: center;
    margin: 0 0 20px;
`;
