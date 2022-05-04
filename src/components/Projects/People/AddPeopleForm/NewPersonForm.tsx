import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
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
import { useLocation } from 'react-router-dom';

const Child = forwardRef((props, ref) => {
  const location = useLocation();
  const user = supabase.auth.user();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [link, setLink] = useState(null);
  const [cvLink, setCVLink] = useState('');
  const [university, setUniversity] = useState('');
  const [professorialStatus, setProfessorialStatus] = useState('');
  const [keyArticle, setKeyArticle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [website, setWebsite] = useState('');
  const [primary, setPrimary] = useState(false);
  const [projectRole, setProjectRole] = useState('');
  const [primaryCount, setPrimaryCount] = useState(0);

  const getPeople = usePeopleStore((state: any) => state.getPeople);
  const addPerson = usePeopleStore((state: any) => state.addPerson);
  const addConnectedPerson = usePeopleStore((state: any) => state.addConnectedPerson);
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

  const projectRoles = [
    { name: 'Co Principal Investigator', value: 'Co Principal Investigator' },
    { name: 'Data Analysis', value: 'Data Analysis' },
    { name: 'Data Collection', value: 'Data Collection' },
    { name: 'Principal Investigator', value: 'Principal Investigator' },
    { name: 'Project Reviewer', value: 'Project Reviewer' },
    { name: 'Research Assistant', value: 'Research Assistant' },
    { name: 'Writing', value: 'Writing' },
    { name: 'Other', value: 'Other' },
  ];

  const onRoleChange = (e: { value: any }) => {
    setSelectedRole(e.value);
  };

  const onProjectRoleChange = (e: { value: any }) => {
    setProjectRole(e.value);
  };

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      if (location.pathname.includes('people')) {
        await addPerson(
          user?.id,
          firstName,
          lastName,
          selectedRole,
          primary,
          link,
          email,
          phone,
          linkedin,
          website,
          cvLink,
          university,
          professorialStatus,
          keyArticle,
          projectRole,
          // @ts-ignore
          props.connectedEntity,
          selectedProject,
        );
      } else {
        await addConnectedPerson(
          user?.id,
          firstName,
          lastName,
          selectedRole,
          primary,
          link,
          email,
          phone,
          linkedin,
          website,
          cvLink,
          university,
          professorialStatus,
          keyArticle,
          projectRole,
          // @ts-ignore
          props.connectedEntity,
          selectedProject,
        );
      }
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
      <InputContainer>
        <CustomDropdown
          id="projectRole"
          value={projectRole}
          options={projectRoles}
          onChange={onProjectRoleChange}
          optionLabel="name"
          filter
          showClear
          filterBy="name"
          placeholder="Select a Project Role"
        />
      </InputContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '98%' }}
          id="email"
          value={email}
          onChange={(e) => {
            // @ts-ignore
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="email">Email</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '98%' }}
          id="phone"
          value={phone}
          onChange={(e) => {
            // @ts-ignore
            setPhone(e.target.value);
          }}
        />
        <label htmlFor="phone">Phone</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '98%' }}
          id="linkedin"
          value={linkedin}
          onChange={(e) => {
            // @ts-ignore
            setLinkedin(e.target.value);
          }}
        />
        <label htmlFor="linkedin">Linkedin</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '98%' }}
          id="website"
          value={website}
          onChange={(e) => {
            // @ts-ignore
            setWebsite(e.target.value);
          }}
        />
        <label htmlFor="website">Website</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '98%' }}
          id="cvLink"
          value={cvLink}
          onChange={(e) => {
            // @ts-ignore
            setCVLink(e.target.value);
          }}
        />
        <label htmlFor="cvLink">CV Link</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '98%' }}
          id="university"
          value={university}
          onChange={(e) => {
            // @ts-ignore
            setUniversity(e.target.value);
          }}
        />
        <label htmlFor="university">University</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '98%' }}
          id="professorialStatus"
          value={professorialStatus}
          onChange={(e) => {
            // @ts-ignore
            setProfessorialStatus(e.target.value);
          }}
        />
        <label htmlFor="professorialStatus">Professorial Status</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '98%' }}
          id="keyArticle"
          value={keyArticle}
          onChange={(e) => {
            // @ts-ignore
            setKeyArticle(e.target.value);
          }}
        />
        <label htmlFor="keyArticle">Key Article</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '98%' }}
          id="link"
          value={link}
          onChange={(e) => {
            // @ts-ignore
            setLink(e.target.value);
          }}
        />
        <label htmlFor="link">Link</label>
      </FloatingLabelContainer>
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
