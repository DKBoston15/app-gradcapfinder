import styled from "styled-components";
import { Dialog } from 'primereact/dialog';

export const CustomDialog = styled(Dialog)`
    & .p-dialog-title {
        font-size: 1.6rem !important;
        text-align: center !important;
        background: #2381fe !important;
        color: white;
    }
    & .p-dialog-header {
        background: #2381fe !important;
    }
    & .p-dialog-header-close-icon {
        color: white !important;
    }
`