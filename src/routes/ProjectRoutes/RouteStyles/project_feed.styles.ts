import styled from 'styled-components';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';

export const Container = styled.div.attrs((props) => ({
  style: {},
}))`
  background: #f7f9ff;
  padding-left: 1rem;
  overflow-y: scroll;
`;

export const CustomDataTable = styled(DataTable)`
  width: 100%;
  min-width: calc(100vw - 270px);
  height: calc(100% - 70px);
  border: 1px solid lightgray;
  overflow: auto;
  margin-top: 1rem;
`;

export const CustomButton = styled(Button)`
  white-space: nowrap;
`;

export const RightPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilterButton = styled(Button)`
  margin-left: 0.5rem;
  height: 40px;
`;

export const KBD = styled.div`
  background-color: #eee;
  border-radius: 3px;
  border: 1px solid #b4b4b4;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
  color: #333;
  display: inline-block;
  font-size: 0.85em;
  font-weight: 700;
  line-height: 1;
  padding: 2px 4px;
  white-space: nowrap;
`;

export const MultiSortInstructions = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  font-size: 14px;
  margin-right: 1rem;
`;

export const KeyboardContainer = styled.div`
  margin-bottom: 0.2rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

export const Search = styled.div`
  margin-right: 1.5rem;
`;

export const RightBarContainer = styled.div`
  display: flex;
`;

export const Details = styled.div`
  border: 1px solid lightgray;
  border-radius: 6px;
  padding: 2rem 1rem;
  width: 100%;
  background: white;
`;

export const Tasks = styled.div.attrs((props) => ({
  style: {
    marginTop: props.reference ? '1rem' : 0,
  },
}))`
  border: 1px solid lightgray;
  border-radius: 6px;
  background: white;
`;

export const ContentContainer = styled.div`
  display: flex;
  height: 85vh;
  margin-top: 1.5rem;
  @media (max-width: 1185px) {
    flex-direction: column;
    height: 100vh;
    padding-right: 1rem;
  }
`;

export const ReferenceContainer = styled.div`
  margin-bottom: 0.5rem;
  background: white;
  padding: 1rem;
  border: 1px solid lightgray;
  border-radius: 6px;
  max-height: 12rem;
  @media (max-width: 1185px) {
    margin-top: 1rem;
  }
`;

export const RightSide = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 1185px) {
    margin-left: 0rem;
  }
`;

export const PeopleContainer = styled.div`
  border: 1px solid lightgray;
  border-radius: 6px;
  background: white;
  margin-top: 1rem;
`;

export const JournalContainer = styled.div`
  border: 1px solid lightgray;
  border-radius: 6px;
  background: white;
  margin-top: 1rem;
`;

export const KeytermContainer = styled.div`
  border: 1px solid lightgray;
  border-radius: 6px;
  background: white;
  margin-top: 1rem;
`;

export const Notes = styled.div`
  border: 1px solid lightgray;
  border-radius: 6px;
  padding: 2rem 1rem;
  padding-top: 1rem;
  width: 100%;
  background: white;
  margin-top: 1rem;
  min-height: 95.7rem;
  overflow: scroll;
  @media (max-width: 1185px) {
    min-height: unset;
    overflow: unset;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 1rem;
`;

export const ProjectBodyTemplateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
