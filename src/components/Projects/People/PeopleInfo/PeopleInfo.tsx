import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, CustomDropdown, CheckboxContainer, CheckboxLabel, LinkInput } from './styles';
import { usePeopleStore } from '@app/stores/peopleStore';
import { Checkbox } from 'primereact/checkbox';

export default function PeopleInfo({ selectedItem, setSaving }: any) {
  const [loading, setLoading] = useState(true);
  const editPerson = usePeopleStore((state: any) => state.editPerson);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cvLink, setCVLink] = useState('');
  const [university, setUniversity] = useState('');
  const [professorialStatus, setProfessorialStatus] = useState('');
  const [link, setLink] = useState('');
  const [keyArticle, setKeyArticle] = useState('');
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

  useEffect(() => {
    if (selectedItem) {
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
      setKeyArticle(selectedItem.key_article);
      setProjectRole(selectedItem.project_role);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedArticleUpdate = useDebouncedCallback(async () => {
    setSaving(true);
    await editPerson(
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
      keyArticle,
      projectRole,
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
              value={firstName}
              onChange={(e) => {
                // @ts-ignore
                setFirstName(e.target.value);
                debouncedArticleUpdate();
              }}
            />
            <label htmlFor="firstName">First Name</label>
          </CustomInput>
          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="lastName"
              value={lastName}
              onChange={(e) => {
                // @ts-ignore
                setLastName(e.target.value);
                debouncedArticleUpdate();
              }}
            />
            <label htmlFor="lastName">Last Name</label>
          </CustomInput>
          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="email"
              value={email}
              onChange={(e) => {
                // @ts-ignore
                setEmail(e.target.value);
                debouncedArticleUpdate();
              }}
            />
            <label htmlFor="email">Email</label>
          </CustomInput>
          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="phone"
              value={phone}
              onChange={(e) => {
                // @ts-ignore
                setPhone(e.target.value);
                debouncedArticleUpdate();
              }}
            />
            <label htmlFor="phone">Phone</label>
          </CustomInput>
          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="linkedin"
              value={linkedin}
              onChange={(e) => {
                // @ts-ignore
                setLinkedin(e.target.value);
                debouncedArticleUpdate();
              }}
            />
            <label htmlFor="linkedin">Linkedin</label>
          </CustomInput>
          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="website"
              value={website}
              onChange={(e) => {
                // @ts-ignore
                setWebsite(e.target.value);
                debouncedArticleUpdate();
              }}
            />
            <label htmlFor="website">Website</label>
          </CustomInput>

          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="cvLink"
              value={cvLink}
              onChange={(e) => {
                // @ts-ignore
                setCVLink(e.target.value);
                debouncedArticleUpdate();
              }}
            />
            <label htmlFor="cvLink">CV Link</label>
          </CustomInput>
          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="university"
              value={university}
              onChange={(e) => {
                // @ts-ignore
                setUniversity(e.target.value);
                debouncedArticleUpdate();
              }}
            />
            <label htmlFor="university">University</label>
          </CustomInput>
          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="professorialStatus"
              value={professorialStatus}
              onChange={(e) => {
                // @ts-ignore
                setProfessorialStatus(e.target.value);
                debouncedArticleUpdate();
              }}
            />
            <label htmlFor="professorialStatus">Professorial Status</label>
          </CustomInput>
          <CustomInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="keyArticle"
              value={keyArticle}
              onChange={(e) => {
                // @ts-ignore
                setKeyArticle(e.target.value);
                debouncedArticleUpdate();
              }}
            />
            <label htmlFor="keyArticle">Key Article</label>
          </CustomInput>
          <LinkInput className="p-float-label">
            <InputText
              style={{ width: '100%' }}
              id="link"
              value={link}
              onChange={(e) => {
                // @ts-ignore
                setLink(e.target.value);
                debouncedArticleUpdate();
              }}
            />
            <label htmlFor="link">Link</label>
          </LinkInput>
          <CustomDropdown
            id="role"
            value={selectedRole}
            options={roles}
            onChange={(e) => {
              // @ts-ignore
              onRoleChange(e);
              debouncedArticleUpdate();
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
              debouncedArticleUpdate();
            }}
            optionLabel="name"
            filter
            showClear
            filterBy="name"
            placeholder="Select a Project Role"
          />
          <CheckboxContainer className="field-checkbox">
            <Checkbox inputId="primary" checked={primary} onChange={(e) => setPrimary(e.checked)} />
            <CheckboxLabel htmlFor="primary">Primary Person?</CheckboxLabel>
          </CheckboxContainer>
        </div>
      )}
    </>
  );
}
