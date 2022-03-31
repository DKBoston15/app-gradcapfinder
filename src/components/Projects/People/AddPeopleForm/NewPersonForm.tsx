import { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import {
  Container,
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
  CheckboxContainer,
  CheckboxLabel,
  InputContainer,
  CustomDropdown,
} from './styles';
import { supabase } from '@app/supabase/index';
import { useProjectStore } from '@app/stores/projectStore';
import { Checkbox } from 'primereact/checkbox';
import { usePeopleStore } from '@app/stores/peopleStore';

const Child = forwardRef((props, ref) => {
  const user = supabase.auth.user();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [link, setLink] = useState(null);
  const [primary, setPrimary] = useState(false);
  const [primaryCount, setPrimaryCount] = useState(0);

  const getPeople = usePeopleStore((state: any) => state.getPeople);
  const addPerson = usePeopleStore((state: any) => state.addPerson);
  const selectedProject = useProjectStore((state: any) => state.selectedProject);

  useEffect(() => {
    const getData = async () => {
      const data = await getPeople(selectedProject);
      let extractedValue = data.map((item: any) => item.primary);
      let count = 0;
      for (let primaryValue = 0; primaryValue < extractedValue.length; primaryValue++) {
        if (extractedValue[primaryValue]) {
          count++;
        }
      }
      setPrimaryCount(count);
    };
    getData();
  }, []);

  const roles = [
    { name: 'Author', value: 'Author' },
    { name: 'Mentor', value: 'Mentor' },
    { name: 'Colleague', value: 'Colleague' },
    { name: 'Professor', value: 'Professor' },
    { name: 'Student', value: 'Student' },
    { name: 'Chair', value: 'Chair' },
    { name: 'Committee Member', value: 'Committee Member' },
    { name: 'Other', value: 'Other' },
  ];

  const onRoleChange = (e: { value: any }) => {
    setSelectedRole(e.value);
  };

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addPerson(
        user?.id,
        firstName,
        lastName,
        selectedRole,
        primary,
        link,
        // @ts-ignore
        props.connectedEntity,
        selectedProject,
      );
    },
  }));

  return (
    <Container>
      <FirstFloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="firstName"
          // @ts-ignore
          value={firstName}
          // @ts-ignore
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="firstName">First Name</label>
      </FirstFloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="lastName"
          // @ts-ignore
          value={lastName}
          // @ts-ignore
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="link"
          // @ts-ignore
          value={link}
          // @ts-ignore
          onChange={(e) => setLink(e.target.value)}
        />
        <label htmlFor="link">Link</label>
      </FloatingLabelContainer>
      <InputContainer>
        <CustomDropdown
          id="role"
          value={selectedRole}
          options={roles}
          onChange={onRoleChange}
          optionLabel="name"
          filter
          showClear
          filterBy="name"
          placeholder="Select a Role"
        />
      </InputContainer>

      <CheckboxContainer className="field-checkbox">
        <Checkbox
          disabled={primaryCount >= 7 ? true : false}
          tooltip="This project already has a max of 7 people set as a primary person"
          tooltipOptions={{ disabled: primaryCount >= 7 ? false : true }}
          inputId="primary"
          checked={primary}
          onChange={(e) => setPrimary(e.checked)}
        />
        <CheckboxLabel htmlFor="primary">Primary Person?</CheckboxLabel>
      </CheckboxContainer>
    </Container>
  );
});

export default Child;
