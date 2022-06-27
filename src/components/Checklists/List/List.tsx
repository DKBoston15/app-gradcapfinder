import React from 'react';
import {
  CheckboxContainer,
  CheckboxText,
  CustomMultiCheckbox,
  Title,
  MoveIcon,
  MoveContainer,
} from './styles';
import { arrayMoveImmutable } from 'array-move';
import '../checklist.css';
import useChecklistStore from '@app/stores/checklistStore';

const options = [
  { value: 'inProgress', icon: 'pi pi-clock' },
  { value: 'blocked', icon: 'pi pi-minus-circle' },
  { value: 'done', icon: 'pi pi-check-circle' },
];

export default function List({ checklist }) {
  const { patchChecklist } = useChecklistStore((state) => ({
    patchChecklist: state.patchChecklist,
  }));

  function moveUp(i) {
    const newChecklistItems = arrayMoveImmutable(checklist.checklist, i, i - 1);
    const newChecklist = { ...checklist, checklist: newChecklistItems };
    patchChecklist(newChecklist);
  }

  function moveDown(i) {
    let newChecklistItems;
    if (i + 1 === checklist.checklist.length) {
      newChecklistItems = arrayMoveImmutable(checklist.checklist, i, 0);
    } else {
      newChecklistItems = arrayMoveImmutable(checklist.checklist, i, i + 1);
    }
    const newChecklist = { ...checklist, checklist: newChecklistItems };

    patchChecklist(newChecklist);
  }

  const moveLeft = (id) => {
    const newChecklistItems = checklist.checklist.map((item) => {
      let newNestedLevel = item.nestedLevels;
      if (newNestedLevel != 0) {
        newNestedLevel = item.nestedLevels - 1;
      }
      if (item.id === id) {
        return { ...item, nestedLevels: newNestedLevel };
      }

      return item;
    });

    const newChecklist = { ...checklist, checklist: newChecklistItems };

    patchChecklist(newChecklist);
  };

  const moveRight = (id) => {
    const newChecklistItems = checklist.checklist.map((item) => {
      let newNestedLevel = item.nestedLevels;
      if (newNestedLevel != 5) {
        newNestedLevel = item.nestedLevels + 1;
      }
      if (item.id === id) {
        return { ...item, nestedLevels: newNestedLevel };
      }

      return item;
    });

    const newChecklist = { ...checklist, checklist: newChecklistItems };

    patchChecklist(newChecklist);
  };

  const handleCheck = (id, e) => {
    const newChecklistItems = checklist.checklist.map((item) => {
      if (item.id === id) {
        return { ...item, val: e };
      }

      return item;
    });

    const newChecklist = { ...checklist, checklist: newChecklistItems };

    patchChecklist(newChecklist);
  };

  return (
    <div>
      <Title></Title>
      {checklist.checklist?.map((item, index) => (
        <CheckboxContainer key={item.id}>
          <CustomMultiCheckbox
            value={checklist.checklist[index].val}
            options={options}
            onChange={(e) => {
              handleCheck(item.id, e.value);
            }}
            optionValue="value"
            active={`${item.val}`}
            nestedLevels={item.nestedLevels}
          />
          <CheckboxText>{item.text}</CheckboxText>
          <MoveContainer>
            <div onClick={() => moveUp(index)}>
              <MoveIcon className="pi pi-arrow-circle-up" />
            </div>
            <div onClick={() => moveDown(index)}>
              <MoveIcon className="pi pi-arrow-circle-down" />
            </div>
            <div onClick={() => moveRight(item.id)}>
              <MoveIcon className="pi pi-arrow-circle-right" />
            </div>
            <div onClick={() => moveLeft(item.id)}>
              <MoveIcon className="pi pi-arrow-circle-left" />
            </div>
          </MoveContainer>
        </CheckboxContainer>
      ))}
    </div>
  );
}
