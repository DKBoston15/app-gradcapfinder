import styled from "styled-components";
import { Dialog } from 'primereact/dialog';

export const CustomDialog = styled(Dialog)`
    width: 30vw;
    @media (max-width: 850px) {
        width: 90%;
    }
`
