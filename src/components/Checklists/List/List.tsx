import React, { useState } from 'react';
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
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const options = [
  { value: 'inProgress', icon: 'pi pi-clock' },
  { value: 'blocked', icon: 'pi pi-minus-circle' },
  { value: 'done', icon: 'pi pi-check-circle' },
];

export default function List({ checklist }) {
  const { patchChecklist } = useChecklistStore((state) => ({
    patchChecklist: state.patchChecklist,
  }));
  const [editedIndex, setEditedIndex] = useState();
  const [editedText, setEditedText] = useState('');
  const [editedId, setEditedId] = useState();

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

  const addItem = (id, nestedLevels) => {
    const isId = (element) => element.id == id;
    const newIndex = checklist.checklist.findIndex(isId) + 1;
    const ids = checklist.checklist.map((item) => item.id);
    const newId = Math.max(...ids) + 1;
    const newItem = {
      id: newId,
      val: '',
      text: 'New Item',
      nestedLevels,
    };
    let newChecklistItems = [...checklist.checklist];
    newChecklistItems.splice(newIndex, 0, newItem);

    const newChecklist = { ...checklist, checklist: newChecklistItems };
    patchChecklist(newChecklist);
  };

  const removeItem = (id) => {
    const newChecklistItems = checklist.checklist.filter((item) => item.id != id);
    console.log(newChecklistItems);
    const newChecklist = { ...checklist, checklist: newChecklistItems };
    patchChecklist(newChecklist);
  };

  const editItemText = () => {
    const newChecklistItems = checklist.checklist.map((item) => {
      if (item.id === editedId) {
        return { ...item, text: editedText };
      }

      return item;
    });

    const newChecklist = { ...checklist, checklist: newChecklistItems };
    console.log(newChecklist);
    patchChecklist(newChecklist);
    setEditedText('');
    setEditedIndex();
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
          {editedIndex == index && (
            <div>
              <InputText
                style={{ marginLeft: '1rem' }}
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <Button
                icon="pi pi-save"
                onClick={() => editItemText()}
                style={{ marginLeft: '0.5rem' }}
              />
            </div>
          )}
          {editedIndex != index && <CheckboxText>{item.text}</CheckboxText>}
          {editedIndex != index && (
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
              <div onClick={() => addItem(item.id, item.nestedLevels)}>
                <MoveIcon className="pi pi-plus-circle" style={{ color: '#2381fe' }} />
              </div>
              <div onClick={() => removeItem(item.id)}>
                <MoveIcon className="pi pi-minus-circle" style={{ color: 'red' }} />
              </div>
              <div
                onClick={() => {
                  if (editedIndex == index) {
                    setEditedText('');
                    setEditedIndex();
                    setEditedId();
                  } else {
                    setEditedText(item.text);
                    setEditedIndex(index);
                    setEditedId(item.id);
                  }
                }}>
                <MoveIcon className="pi pi-pencil" />
              </div>
            </MoveContainer>
          )}
        </CheckboxContainer>
      ))}
    </div>
  );
}
