import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import {
  CustomInput,
  CustomDropdown,
  CheckboxContainer,
  CheckboxLabel,
  LinkInput,
  LinkContainer,
} from './styles';
import { usePeopleStore } from '@app/stores/peopleStore';
import { Checkbox } from 'primereact/checkbox';
import { InputMask } from 'primereact/inputmask';
import { useParams } from 'react-router-dom';
import './styles.css';
import { projectRoles, roles } from '@app/constants';
import { useProjectStore } from '@app/stores/projectStore';
import { Dropdown } from 'primereact/dropdown';

export default function PeopleInfo({ selectedItem }: any) {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cvLink, setCVLink] = useState('');
  const [university, setUniversity] = useState('');
  const [professorialStatus, setProfessorialStatus] = useState('');
  const [link, setLink] = useState('');
  const [keyLiterature, setKeyLiterature] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [website, setWebsite] = useState('');
  const [primary, setPrimary] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [projectRole, setProjectRole] = useState('');
  const [selectedProject, setSelectedProject] = useState();
  const projects = useProjectStore((state: any) => state.projects);
  const projectItemTemplate = (option) => {
    return <span>{`${option.name}`}</span>;
  };

  const { people, patchPerson } = usePeopleStore((state) => ({
    people: state.people,
    patchPerson: state.patchPerson,
  }));

  const onRoleChange = (e: { value: any }) => {
    setSelectedRole(e.value);
  };

  const onProjectRoleChange = (e: { value: any }) => {
    setProjectRole(e.value);
  };

  const { id } = useParams();

  useEffect(() => {
    const newSelectedItem = people.filter((person) => person.id == selectedItem);
    if (newSelectedItem) {
      if (newSelectedItem[0].first_name && newSelectedItem[0].first_name != firstName) {
        setFirstName(newSelectedItem[0].first_name);
        setLastName(newSelectedItem[0].last_name);
        setEmail(newSelectedItem[0].email);
        setPhone(newSelectedItem[0].phone);
        setLinkedin(newSelectedItem[0].linkedin);
        setWebsite(newSelectedItem[0].website);
        setSelectedRole(newSelectedItem[0].role);
        setUniversity(newSelectedItem[0].university);
        setProfessorialStatus(newSelectedItem[0].professorial_status);
        setLink(newSelectedItem[0].link);
        setCVLink(newSelectedItem[0].cv_link);
        setSelectedRole(newSelectedItem[0].role);
        setProjectRole(newSelectedItem[0].projectRole);
        setKeyLiterature(newSelectedItem[0].key_literature);
        setProjectRole(newSelectedItem[0].project_role);
        setPrimary(newSelectedItem[0].primary);
        setSelectedProject(newSelectedItem[0].project_id);
        setLoading(false);
      }
    }

    setLoading(false);
  }, [selectedItem, id]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    await patchPerson(
      id,
      firstName,
      lastName,
      email,
      phone,
      linkedin,
      website,
      selectedRole,
      cvLink,
      university,
      professorialStatus,
      link,
      keyLiterature,
      projectRole,
      primary,
      selectedProject,
    );
  }, 1500);

  return (
    <>
      {selectedItem && !loading && (
        <div>
          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="firstName"
              value={firstName || ''}
              onChange={(e) => {
                // @ts-ignore
                setFirstName(e.target.value);
                debouncedUpdate();
              }}
            />
            <label htmlFor="firstName">First Name</label>
          </CustomInput>
          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              value={lastName || ''}
              onChange={(e) => {
                // @ts-ignore
                setLastName(e.target.value);
                debouncedUpdate();
              }}
            />
            <label htmlFor="lastName">Last Name</label>
          </CustomInput>
          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="email"
              value={email || ''}
              onChange={(e) => {
                // @ts-ignore
                setEmail(e.target.value);
                debouncedUpdate();
              }}
            />
            <label htmlFor="email">Email</label>
          </CustomInput>
          <CustomInput className="p-float-label">
            <InputMask
              style={{ width: '100%' }}
              id="phone"
              mask="999-999-9999"
              value={phone}
              onChange={(e) => {
                // @ts-ignore
                setPhone(e.target.value);
                debouncedUpdate();
              }}
            />
            <label htmlFor="phone">Phone</label>
          </CustomInput>
          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="linkedin"
              value={linkedin || ''}
              onChange={(e) => {
                // @ts-ignore
                setLinkedin(e.target.value);
                debouncedUpdate();
              }}
            />
            <label htmlFor="linkedin">Linkedin</label>
          </CustomInput>
          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="website"
              value={website || ''}
              onChange={(e) => {
                // @ts-ignore
                setWebsite(e.target.value);
                debouncedUpdate();
              }}
            />
            <label htmlFor="website">Website</label>
          </CustomInput>

          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="cvLink"
              value={cvLink || ''}
              onChange={(e) => {
                // @ts-ignore
                setCVLink(e.target.value);
                debouncedUpdate();
              }}
            />
            <label htmlFor="cvLink">CV Link</label>
          </CustomInput>
          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="university"
              value={university || ''}
              onChange={(e) => {
                // @ts-ignore
                setUniversity(e.target.value);
                debouncedUpdate();
              }}
            />
            <label htmlFor="university">University</label>
          </CustomInput>
          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="professorialStatus"
              value={professorialStatus || ''}
              onChange={(e) => {
                // @ts-ignore
                setProfessorialStatus(e.target.value);
                debouncedUpdate();
              }}
            />
            <label htmlFor="professorialStatus">Professorial Status</label>
          </CustomInput>
          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="keyLiterature"
              value={keyLiterature || ''}
              onChange={(e) => {
                // @ts-ignore
                setKeyLiterature(e.target.value);
                debouncedUpdate();
              }}
            />
            <label htmlFor="keyLiterature">Key Literature</label>
          </CustomInput>
          <LinkContainer>
            <LinkInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="link"
                value={link || ''}
                onChange={(e) => {
                  // @ts-ignore
                  setLink(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="link">Link</label>
            </LinkInput>
            <i
              className="pi pi-external-link"
              onClick={() => window.open(link, '_blank')}
              style={{
                fontSize: '1.5em',
                paddingBottom: '0.2em',
                marginLeft: '1em',
                cursor: 'pointer',
              }}
            />
          </LinkContainer>
          <CustomDropdown
            id="role"
            value={selectedRole}
            options={roles}
            onChange={(e) => {
              // @ts-ignore
              onRoleChange(e);
              debouncedUpdate();
            }}
            optionLabel="name"
            filter
            showClear
            filterBy="name"
            placeholder="Select a Role"
          />
          <CustomDropdown
            id="projectRole"
            value={projectRole}
            options={projectRoles}
            onChange={(e) => {
              // @ts-ignore
              onProjectRoleChange(e);
              debouncedUpdate();
            }}
            optionLabel="name"
            filter
            showClear
            filterBy="name"
            placeholder="Select a Project Role"
          />
          <CheckboxContainer className="field-checkbox">
            <Checkbox
              inputId="primary"
              checked={primary}
              onChange={(e) => {
                // @ts-ignore
                setPrimary(e.checked);
                debouncedUpdate();
              }}
            />
            <CheckboxLabel htmlFor="primary">Primary Person?</CheckboxLabel>
          </CheckboxContainer>
          <CustomInput className="p-float-label">
            <Dropdown
              style={{ width: '100%', marginTop: '-2rem' }}
              value={selectedProject}
              options={projects}
              onChange={(e) => {
                let newProject = e.value;
                if (e.value === 0) newProject = true;
                if (newProject) {
                  setSelectedProject(e.value);
                  debouncedUpdate();
                } else {
                  setSelectedProject();
                  debouncedUpdate();
                }
              }}
              itemTemplate={projectItemTemplate}
              placeholder="Select a Project"
              id="projectDropdown"
              optionLabel="name"
              optionValue="id"
              showClear
            />
          </CustomInput>
        </div>
      )}
    </>
  );
}
