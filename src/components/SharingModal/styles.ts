import styled from 'styled-components';
import { Chips } from 'primereact/chips';

export const CustomChips = styled(Chips)`
  & .p-chips-multiple-container {
    height: 10rem;
    overflow-y: scroll;
  }
`;
