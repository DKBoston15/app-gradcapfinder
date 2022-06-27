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

export default function PeopleInfo({ selectedItem, setSaving }: any) {
  const [loading, setLoading] = useState(true);
  const patchPerson = usePeopleStore((state: any) => state.patchPerson);
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

  const { id } = useParams();

  useEffect(() => {
    if (selectedItem) {
      if (selectedItem.first_name && selectedItem.first_name != firstName) {
        setFirstName(selectedItem.first_name);
        setLastName(selectedItem.last_name);
        setEmail(selectedItem.email);
        setPhone(selectedItem.phone);
        setLinkedin(selectedItem.linkedin);
        setWebsite(selectedItem.website);
        setSelectedRole(selectedItem.role);
        setUniversity(selectedItem.university);
        setProfessorialStatus(selectedItem.professorial_status);
        setLink(selectedItem.link);
        setCVLink(selectedItem.cv_link);
        setSelectedRole(selectedItem.role);
        setProjectRole(selectedItem.projectRole);
        setKeyLiterature(selectedItem.key_literature);
        setProjectRole(selectedItem.project_role);
        setPrimary(selectedItem.primary);
        setLoading(false);
      }
    }

    setLoading(false);
  }, [selectedItem, id]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    setSaving(true);
    await patchPerson(
      selectedItem.id,
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
    );
    setTimeout(() => {
      setSaving(false);
    }, 500);
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
                paddingBottom: '0.6em',
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
        </div>
      )}
    </>
  );
}
