import styled from 'styled-components';
import { Button } from 'primereact/button';

export const CustomButton = styled(Button)`
    height: 3.1rem;
    margin-left: 1rem;
    @media (max-width: 850px) {
        margin-left: 0rem;
      }
`