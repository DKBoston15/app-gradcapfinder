import {
  CheckboxText,
  CustomMultiCheckbox,
  LegendContainer,
  LegendCheckboxContainer,
} from './styles';
import React, { useState } from 'react';
import '../checklist.css';
import { Divider } from 'primereact/divider';
import List from '../List/List';

const options = [
  { value: 'inProgress', icon: 'pi pi-clock' },
  { value: 'blocked', icon: 'pi pi-minus-circle' },
  { value: 'done', icon: 'pi pi-check-circle' },
];

export default function ListContainer({ checklist }) {
  return (
    <div>
      <LegendContainer>
        <LegendCheckboxContainer>
          <CustomMultiCheckbox
            value={'inProgress'}
            options={options}
            disabled
            optionValue="value"
            active={`inProgress`}
          />
          <CheckboxText>In Progress</CheckboxText>
        </LegendCheckboxContainer>
        <LegendCheckboxContainer>
          <CustomMultiCheckbox
            value={'blocked'}
            options={options}
            disabled
            optionValue="value"
            active={`blocked`}
          />
          <CheckboxText>Blocked</CheckboxText>
        </LegendCheckboxContainer>
        <LegendCheckboxContainer>
          <CustomMultiCheckbox
            value={'done'}
            options={options}
            disabled
            optionValue="value"
            active={`done`}
          />
          <CheckboxText>Done</CheckboxText>
        </LegendCheckboxContainer>
      </LegendContainer>
      <Divider />
      <List checklist={checklist} />
    </div>
  );
}
