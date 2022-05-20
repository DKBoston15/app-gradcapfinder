import React, { useState, useEffect } from 'react';
import {
  Container,
  SwitchContainer,
  SwitchLabel,
  SwitchSectionHeader,
  SwitchSection,
  SwitchTopHR,
  CustomDropdown,
  InputContainer,
  FieldOfStudyInput,
  CustomInput,
  FieldOfStudyContainer,
  CustomInputMask,
  BGContainer,
  WelcomeText,
  ProfileContainer,
  FloatingLabelContainer,
  InputContainerSecond,
} from './styles';
import { InputSwitch } from 'primereact/inputswitch';
import { graduateStatuses } from '../../../constants';
import { useProfileStore } from '../../../stores/profileStore';
import { supabase } from '../../../supabase';
import { useDebouncedCallback } from 'use-debounce';
import AvatarUpload from '../AvatarUpload/AvatarUpload';
import CVUpload from '../CVUpload/CVUpload';
interface University {
  value: string;
  label: string;
}

interface GraduateStatus {
  value: number;
  label: string;
}

export default function ProfileForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [email, setEmail] = useState<string | undefined>('');
  const [avatar_url, setAvatarUrl] = useState('');
  const [cv_url, setCVUrl] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState<string | undefined>();
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedGraduateStatus, setSelectedGraduateStatus] = useState<number | undefined>();
  const [inGraduateSchool, setInGraduateSchool] = useState(false);
  const [inCoursework, setInCoursework] = useState(false);
  const [conductingResearch, setConductingResearch] = useState(false);
  const [attendingConferences, setAttendingConferences] = useState(false);
  const [writingProposal, setWritingProposal] = useState(false);
  const [writingDissertation, setWritingDissertation] = useState(false);
  const [lookingForPositions, setLookingForPositions] = useState(false);
  const [lookingAtGraduateSchool, setLookingAtGraduateSchool] = useState(false);
  const profile = useProfileStore((state: any) => state.profile);
  const updateProfile = useProfileStore((state: any) => state.updateProfile);
  const user = supabase.auth.user();

  const debouncedProfileUpdate = useDebouncedCallback(() => {
    update({
      firstName,
      lastName,
      fieldOfStudy,
      avatar_url,
      onboarding_complete: true,
      selectedUniversity,
      graduate_status: selectedGraduateStatus,
      cv_url,
    });
  }, 500);

  useEffect(() => {
    const setData = async () => {
      if (profile) {
        setFirstName(profile.first_name);
        setLastName(profile.last_name);
        setFieldOfStudy(profile.field_of_study);
        setEmail(user?.email);
        setPhone(profile.phone_number);
        setAvatarUrl(profile.avatar_url);
        setCVUrl(profile.cv_url);
        setInGraduateSchool(profile.in_graduate_school);
        setInCoursework(profile.in_coursework);
        setConductingResearch(profile.conducting_research);
        setLookingAtGraduateSchool(profile.looking_at_graduate_school);
        setAttendingConferences(profile.attending_conferences);
        setWritingProposal(profile.writing_proposal);
        setWritingDissertation(profile.writing_dissertation);
        setLookingForPositions(profile.looking_for_positions);
      }

      let tempUniversities: Array<University> = [];

      let { data: universities, error } = await supabase
        .from('universities')
        .select('*')
        .order('name', { ascending: true });

      universities?.forEach((element: any) => {
        tempUniversities.push({ label: element.name, value: `${element.id}` });
      });

      setUniversities(tempUniversities);
      if (universities) {
        const uni = tempUniversities.filter(
          (university: any) => university.value == profile.university,
        );
        setSelectedUniversity(uni[0].value || undefined);
      }

      const graduateStatus = graduateStatuses.filter(
        (graduateStatus: any) => graduateStatus.value == profile.graduate_status,
      );
      setSelectedGraduateStatus(graduateStatus[0].value || undefined);
    };
    setData();
  }, []);

  async function update({
    firstName,
    lastName,
    fieldOfStudy,
    avatar_url,
    onboarding_complete,
    selectedUniversity,
    graduate_status,
    cv_url,
  }: any) {
    await updateProfile(
      user?.id,
      firstName,
      lastName,
      fieldOfStudy,
      avatar_url,
      phone,
      onboarding_complete,
      selectedUniversity,
      graduate_status,
      cv_url,
      lookingAtGraduateSchool,
      inGraduateSchool,
      inCoursework,
      conductingResearch,
      attendingConferences,
      writingProposal,
      writingDissertation,
      lookingForPositions,
    );
  }

  return (
    <ProfileContainer>
      <BGContainer>
        <AvatarUpload />
        <WelcomeText>
          Welcome, <br />
          {firstName} {lastName}
        </WelcomeText>
      </BGContainer>

      <Container>
        <InputContainer>
          <FloatingLabelContainer className="p-float-label">
            <CustomInput
              id="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                debouncedProfileUpdate();
              }}
            />
            <label htmlFor="firstName">First Name</label>
          </FloatingLabelContainer>
          <FloatingLabelContainer className="p-float-label">
            <CustomInput
              id="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                debouncedProfileUpdate();
              }}
            />
            <label htmlFor="lastName">Last Name</label>
          </FloatingLabelContainer>
        </InputContainer>
        <InputContainerSecond>
          <FloatingLabelContainer className="p-float-label">
            <CustomInput
              disabled
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                debouncedProfileUpdate();
              }}
            />
            <label htmlFor="email">Email</label>
          </FloatingLabelContainer>
          <FloatingLabelContainer className="p-float-label">
            <CustomInputMask
              id="phone"
              mask="999-999-9999"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                debouncedProfileUpdate();
              }}
            />
            <label htmlFor="phone">Phone</label>
          </FloatingLabelContainer>
        </InputContainerSecond>
        <FieldOfStudyContainer>
          <span className="p-float-label">
            <FieldOfStudyInput
              id="fieldOfStudy"
              value={fieldOfStudy}
              onChange={(e) => {
                setFieldOfStudy(e.target.value);
                debouncedProfileUpdate();
              }}
            />
            <label htmlFor="fieldOfStudy">Field of Study</label>
          </span>
        </FieldOfStudyContainer>

        <SwitchSection>
          <SwitchTopHR />
          <SwitchSectionHeader>Graduate School</SwitchSectionHeader>
          <SwitchContainer>
            <InputSwitch
              inputId="inGraduateSchool"
              checked={inGraduateSchool}
              onChange={(e) => {
                setInGraduateSchool(e.value);
                debouncedProfileUpdate();
              }}
            />
            <SwitchLabel htmlFor="inGraduateSchool">In Graduate School?</SwitchLabel>
          </SwitchContainer>
          <SwitchContainer>
            <InputSwitch
              inputId="inCoursework"
              checked={inCoursework}
              onChange={(e) => {
                setInCoursework(e.value);
                debouncedProfileUpdate();
              }}
            />
            <SwitchLabel htmlFor="inCoursework">Participating in Coursework?</SwitchLabel>
          </SwitchContainer>
          <SwitchContainer>
            <InputSwitch
              inputId="lookingAtGraduateSchool"
              checked={lookingAtGraduateSchool}
              onChange={(e) => {
                setLookingAtGraduateSchool(e.value);
                debouncedProfileUpdate();
              }}
            />
            <SwitchLabel htmlFor="lookingAtGraduateSchool">
              Looking at Graduate Schools?
            </SwitchLabel>
          </SwitchContainer>
          <CustomDropdown
            value={selectedUniversity}
            options={universities}
            onChange={(e) => {
              setSelectedUniversity(e.value);
              debouncedProfileUpdate();
            }}
            placeholder="University"
            tooltipOptions={{ position: 'right' }}
          />
          <div id="graduateStatusDropdown">
            <CustomDropdown
              value={selectedGraduateStatus}
              options={graduateStatuses}
              onChange={(e) => {
                setSelectedGraduateStatus(e.value);
                debouncedProfileUpdate();
              }}
              placeholder="Graduate Status"
              panelClassName="graduateStatusPanel"
            />
          </div>
        </SwitchSection>
        <SwitchSection>
          <SwitchSectionHeader>Dissertation</SwitchSectionHeader>
          <SwitchContainer>
            <InputSwitch
              inputId="conductingResearch"
              checked={conductingResearch}
              onChange={(e) => {
                setConductingResearch(e.value);
                debouncedProfileUpdate();
              }}
            />
            <SwitchLabel htmlFor="conductingResearch">Conducting Research?</SwitchLabel>
          </SwitchContainer>
          <SwitchContainer>
            <InputSwitch
              inputId="writingProposal"
              checked={writingProposal}
              onChange={(e) => {
                setWritingProposal(e.value);
                debouncedProfileUpdate();
              }}
            />
            <SwitchLabel htmlFor="writingProposal">Writing Proposal?</SwitchLabel>
          </SwitchContainer>
          <SwitchContainer>
            <InputSwitch
              inputId="writingDissertation"
              checked={writingDissertation}
              onChange={(e) => {
                setWritingDissertation(e.value);
                debouncedProfileUpdate();
              }}
            />
            <SwitchLabel htmlFor="writingDissertation">Writing Dissertation?</SwitchLabel>
          </SwitchContainer>
        </SwitchSection>
        <SwitchSection>
          <SwitchSectionHeader>Career</SwitchSectionHeader>
          <SwitchContainer>
            <InputSwitch
              inputId="attendingConferences"
              checked={attendingConferences}
              onChange={(e) => {
                setAttendingConferences(e.value);
                debouncedProfileUpdate();
              }}
            />
            <SwitchLabel htmlFor="attendingConferences">Attending Conferences?</SwitchLabel>
          </SwitchContainer>
          <SwitchContainer>
            <InputSwitch
              inputId="lookingForPositions"
              checked={lookingForPositions}
              onChange={(e) => {
                setLookingForPositions(e.value);
                debouncedProfileUpdate();
              }}
            />
            <SwitchLabel htmlFor="lookingForPositions">Looking for Positions?</SwitchLabel>
          </SwitchContainer>
          <CVUpload
            url={cv_url}
            onUpload={(url: any) => {
              setCVUrl(url);
              update({
                firstName,
                lastName,
                fieldOfStudy,
                avatar_url: avatar_url,
                onboarding_complete: true,
                selectedUniversity,
                graduate_status: selectedGraduateStatus,
                cv_url: url,
              });
            }}
          />
        </SwitchSection>
      </Container>
    </ProfileContainer>
  );
}
