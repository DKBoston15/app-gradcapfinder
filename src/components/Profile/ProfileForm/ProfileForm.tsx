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

const degreeAbbreviations = [
  { label: 'Associate of Arts', value: 'AA' },
  { label: 'Associate of Science', value: 'AS' },
  { label: 'Bachelor of Arts', value: 'BA' },
  { label: 'Bachelor of Science', value: 'BS' },
  { label: 'Master of Architecture', value: 'M.Arch' },
  { label: 'Master of Science in Architecture', value: 'M.S.' },
  { label: 'Master of Arts', value: 'MA' },
  { label: 'Master of Business Administration', value: 'M.B.A' },
  { label: 'Master of Chemistry', value: 'M.Chem' },
  { label: 'Master of Commerce', value: 'M.Com' },
  { label: 'Master of Computer Application', value: 'M.C.A' },
  { label: 'Master of Divinity', value: 'M.Div' },
  { label: 'Master of Education', value: 'M.Ed' },
  { label: 'Master of Emergency Management', value: 'M.E.M' },
  { label: 'Master of Emergency and Disaster Management', value: 'M.E.D.M' },
  { label: 'Master of Engineering', value: 'M.Eng' },
  { label: 'Master of Fine Arts', value: 'M.F.A' },
  { label: 'Master of Health or Healthcare Management', value: 'MSc.HM' },
  { label: 'Master of Health Infromatics', value: 'MSc.HI' },
  { label: 'Master of International Affairs', value: 'M.I.A' },
  { label: 'Master of Laws', value: 'LL.M' },
  { label: 'Master of Library Science', value: 'M.L.S' },
  { label: 'Master of Liberal Arts', value: 'M.L.A' },
  { label: 'Master of Library and Information Science', value: 'M.L.I.S' },
  { label: 'Master of Music', value: 'M.M.' },
  { label: 'Master of Professional Studies', value: 'M.P.S' },
  { label: 'Master of Public Administration', value: 'M.P.A' },
  { label: 'Master of Public Health', value: 'M.P.H' },
  { label: 'Master of Science', value: 'M.S' },
  { label: 'Master of Science in Information', value: 'M.S.I' },
  { label: 'Master of Science in Environmental and Occupational Health', value: 'M.S.EOH' },
  { label: 'Master of Social Work', value: 'M.S.W' },
  { label: 'Master of Strategic Foresight', value: 'M.S.F' },
  { label: 'Master of Sustainable Energy and Environmental Management', value: 'M.S.E.E.M' },
  { label: 'Master of Technology', value: 'M.Tech' },
  { label: 'Master of Technology Managment', value: 'M.T.M' },
  { label: 'Master of Theology', value: 'Th.M' },
  { label: 'Doctor of Acupuncture', value: 'DAc' },
  { label: 'Doctor of Audiology', value: 'AuD' },
  { label: 'Doctor of Biblical Studies', value: 'DBS' },
  { label: 'Doctor of Chiropractic', value: 'DC' },
  { label: 'Doctor of Dental Surgery', value: 'DDS' },
  { label: 'Doctor of Divinity', value: 'DD' },
  { label: 'Doctor of Education', value: 'EdD' },
  { label: 'Doctor of Jurisprudence', value: 'JD' },
  { label: 'Doctor of Immortality', value: 'ImD' },
  { label: 'Doctor of Law and Policy', value: 'DLP' },
  { label: 'Doctor of Medical Dentistry', value: 'DMD' },
  { label: 'Doctor of Medicine', value: 'MD' },
  { label: 'Doctor of Ministry', value: 'DMin' },
  { label: 'Doctor of Metaphysics', value: 'Dr. mph' },
  { label: 'Doctor of Musical Arts', value: 'DMA' },
  { label: 'Doctor of Naturopathy', value: 'ND' },
  { label: 'Doctor of Nursing Practice', value: 'DNP' },
  { label: 'Doctor of Optometry', value: 'OD' },
  { label: 'Doctor of Osteopathy', value: 'DO' },
  { label: 'Doctor of Pharmacy', value: 'PharmD' },
  { label: 'Doctor of Philosophy', value: 'PhD' },
  { label: 'Doctor of Physical Therapy', value: 'D.PT' },
  { label: 'Doctor of Practical Theology', value: 'DPT' },
  { label: 'Doctor of Psychology', value: 'PsyD' },
  { label: 'Doctor of Public Health', value: 'DrPH' },
  { label: 'Doctor of Religious Sciences', value: 'DRS' },
  { label: 'Doctor of Science', value: 'DSc' },
  { label: 'Doctor of Theology', value: 'ThD' },
  { label: 'Doctor of Veterinary Medicine', value: 'DVM' },
];

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
  const [academicStatus, setAcademicStatus] = useState('');
  const [academicStatusObj, setAcademicStatusObj] = useState({});
  const user = supabase.auth.user();

  const { profile, patchProfile } = useProfileStore((state) => ({
    profile: state.profile,
    patchProfile: state.patchProfile,
  }));

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
      academicStatus,
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
        if (profile.academic_status) {
          setAcademicStatus(profile.academic_status.value);
        }
      }

      let tempUniversities: Array<University> = [];

      let { data: dbUniversities } = await supabase
        .from('universities')
        .select('*')
        .order('name', { ascending: true });

      dbUniversities?.forEach((element: any) => {
        tempUniversities.push({ label: element.name, value: `${element.id}` });
      });

      setUniversities(tempUniversities);
      if (dbUniversities) {
        const uni = tempUniversities.filter(
          (university: any) => university.value == profile.university,
        );
        if (uni[0]) {
          setSelectedUniversity(uni[0].value || undefined);
        }
      }

      const graduateStatus = graduateStatuses.filter(
        (graduateStatus: any) => graduateStatus.value == profile.graduate_status,
      );
      if (graduateStatus[0]) {
        setSelectedGraduateStatus(graduateStatus[0].value || undefined);
      }
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
    academic_status,
  }: any) {
    await patchProfile(
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
      academicStatusObj,
    );
  }

  return (
    <ProfileContainer>
      <BGContainer>
        <AvatarUpload />
        <WelcomeText>
          Welcome, <br />
          {firstName} {lastName} {academicStatus && <> {academicStatus}</>}
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
            value={academicStatus}
            filter
            filterBy="label"
            options={degreeAbbreviations}
            onChange={(e) => {
              const degreeObject = degreeAbbreviations.find((element) => element.value === e.value);
              setAcademicStatus(e.value);
              setAcademicStatusObj(degreeObject);
              debouncedProfileUpdate();
            }}
            placeholder="Academic Status"
            tooltipOptions={{ position: 'right' }}
          />
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
                academicStatus,
              });
            }}
          />
        </SwitchSection>
      </Container>
    </ProfileContainer>
  );
}
