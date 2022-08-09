import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import {
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
  CheckboxContainer,
  CheckboxLabel,
  InputContainer,
  CustomDropdown,
} from './styles';
import { Checkbox } from 'primereact/checkbox';
import { usePeopleStore } from '@app/stores/peopleStore';
import { projectRoles, roles } from '@app/constants';
import { useProjectStore } from '@app/stores/projectStore';
import { Dropdown } from 'primereact/dropdown';

const Child = forwardRef((props, ref) => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [link, setLink] = useState(null);
  const [cvLink, setCVLink] = useState('');
  const [university, setUniversity] = useState('');
  const [professorialStatus, setProfessorialStatus] = useState('');
  const [keyLiterature, setKeyLiterature] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [website, setWebsite] = useState('');
  const [primary, setPrimary] = useState(false);
  const [projectRole, setProjectRole] = useState('');
  const [primaryCount, setPrimaryCount] = useState(0);
  const [selectedProject, setSelectedProject] = useState();
  const projects = useProjectStore((state: any) => state.projects);
  const projectItemTemplate = (option) => {
    return <span>{`${option.name}`}</span>;
  };

  const { people, addPerson } = usePeopleStore((state) => ({
    people: state.people,
    addPerson: state.addPerson,
  }));

  useEffect(() => {
    const getData = async () => {
      const projectPeople = people.filter((person) => person.project_id == selectedProject);
      const extractedValue = projectPeople.map((item: any) => item.primary);
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

  const onRoleChange = (e: { value: any }) => {
    setSelectedRole(e.value);
  };

  const onProjectRoleChange = (e: { value: any }) => {
    setProjectRole(e.value);
  };

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addPerson(
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
        keyLiterature,
        projectRole,
        // @ts-ignore
        props.connectedEntity,
        selectedProject,
      );
    },
  }));

  return (
    <div>
      <FirstFloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="firstName"
          style={{ width: '100%' }}
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
          style={{ width: '100%' }}
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
          style={{ width: '100%' }}
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
          style={{ width: '100%' }}
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
          style={{ width: '100%' }}
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
          style={{ width: '100%' }}
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
          style={{ width: '100%' }}
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
          style={{ width: '100%' }}
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
          style={{ width: '100%' }}
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
          style={{ width: '100%' }}
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
          style={{ width: '100%' }}
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
          style={{ width: '100%' }}
          id="keyLiterature"
          value={keyLiterature}
          onChange={(e) => {
            // @ts-ignore
            setKeyLiterature(e.target.value);
          }}
        />
        <label htmlFor="keyLiterature">Key Literature</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '100%' }}
          id="link"
          value={link}
          onChange={(e) => {
            // @ts-ignore
            setLink(e.target.value);
          }}
        />
        <label htmlFor="link">Link</label>
      </FloatingLabelContainer>
      <CheckboxContainer className="field-checkbox" style={{ width: '100%' }}>
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
      <FloatingLabelContainer>
        <Dropdown
          style={{ width: '100%' }}
          value={selectedProject}
          options={projects}
          onChange={(e) => {
            let newProject = e.value;
            if (e.value === 0) newProject = true;
            if (newProject) {
              setSelectedProject(e.value);
            } else {
              setSelectedProject();
            }
          }}
          itemTemplate={projectItemTemplate}
          placeholder="Select a Project"
          id="projectDropdown"
          optionLabel="name"
          optionValue="id"
          showClear
        />
      </FloatingLabelContainer>
    </div>
  );
});

export default Child;
