import React, { useEffect, useState } from 'react';
import {
  ChecklistItemContainer,
  CheckboxText,
  CustomMultiCheckbox,
  LegendCheckboxContainer,
  LegendContainer,
  TrashIcon,
  DeleteContainer,
  ParentContainer,
  DeleteItem,
  DeleteAction,
  Name,
  EditContainer,
} from './styles';
import '../checklist.css';
import { useNavigate } from 'react-router-dom';
import useChecklistStore from '@app/stores/checklistStore';
import { Divider } from 'primereact/divider';
import EditChecklistDialog from '../EditChecklistDialog/EditChecklistDialog';

const options = [
  { value: 'inProgress', icon: 'pi pi-clock' },
  { value: 'blocked', icon: 'pi pi-minus-circle' },
  { value: 'done', icon: 'pi pi-check-circle' },
];

export default function ChecklistItem({ checklist }) {
  const navigate = useNavigate();
  const [inProgressCount, setInProgressCount] = useState(0);
  const [blockedCount, setBlockedCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [editDisplayPrompt, setEditDisplayPrompt] = useState(false);

  const { removeChecklist } = useChecklistStore((state) => ({
    removeChecklist: state.removeChecklist,
  }));

  useEffect(() => {
    let inProgressCountTemp = 0;
    let blockedCountTemp = 0;
    let doneCountTemp = 0;

    for (let i = 0; i < checklist.checklist.length; i++) {
      if (checklist.checklist[i].val === 'inProgress') {
        inProgressCountTemp++;
      }

      if (checklist.checklist[i].val === 'done') {
        doneCountTemp++;
      }

      if (checklist.checklist[i].val === 'blocked') {
        blockedCountTemp++;
      }
    }

    setInProgressCount(inProgressCountTemp);
    setBlockedCount(blockedCountTemp);
    setDoneCount(doneCountTemp);
  }, [checklist]);
  return (
    <ParentContainer>
      <EditChecklistDialog
        id={checklist.id}
        passedName={checklist.name}
        displayPrompt={editDisplayPrompt}
        setDisplayPrompt={setEditDisplayPrompt}
      />
      <ChecklistItemContainer onClick={() => navigate(`/checklists/${checklist.id}`)}>
        <Name>{checklist.name}</Name>
        <Divider />
        <LegendContainer>
          <div>
            <LegendCheckboxContainer>
              <CustomMultiCheckbox
                value={'inProgress'}
                options={options}
                disabled
                optionValue="value"
                active={`inProgress`}
              />
              <CheckboxText> {inProgressCount} In Progress</CheckboxText>
            </LegendCheckboxContainer>
            <LegendCheckboxContainer>
              <CustomMultiCheckbox
                value={'blocked'}
                options={options}
                disabled
                optionValue="value"
                active={`blocked`}
              />
              <CheckboxText> {blockedCount} Blocked</CheckboxText>
            </LegendCheckboxContainer>
            <LegendCheckboxContainer>
              <CustomMultiCheckbox
                value={'done'}
                options={options}
                disabled
                optionValue="value"
                active={`done`}
              />
              <CheckboxText> {doneCount} Done</CheckboxText>
            </LegendCheckboxContainer>
          </div>
        </LegendContainer>
      </ChecklistItemContainer>
      <DeleteContainer>
        <EditContainer
          onClick={() => {
            setEditDisplayPrompt(true);
          }}>
          <DeleteAction>Edit</DeleteAction>
        </EditContainer>
        <DeleteItem onClick={() => removeChecklist(checklist.id)}>
          <DeleteAction>Delete</DeleteAction>
        </DeleteItem>
      </DeleteContainer>
    </ParentContainer>
  );
}
