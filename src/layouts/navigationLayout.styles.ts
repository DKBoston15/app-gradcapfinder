import styled from "styled-components";

export const KBarList = styled.div`
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
        background: #dcdde1;
    }
`

export const KBarItem = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 18;
`