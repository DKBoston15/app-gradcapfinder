import { useState, useEffect } from "react";
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
} from "./styles";
import { InputSwitch } from "primereact/inputswitch";
import { graduateStatuses } from "../../constants";
import { useProfileStore } from "../../stores/profileStore";
import { supabase } from "../../supabase";
import { useDebouncedCallback } from "use-debounce";

interface University {
  value: string;
  label: string;
}

interface GraduateStatus {
  value: number;
  label: string;
}

export default function ProfileForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [email, setEmail] = useState<string | undefined>("");
  const [cv_url, setCVUrl] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState<University>();
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedGraduateStatus, setSelectedGraduateStatus] =
    useState<GraduateStatus>();
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
      // avatar_url,
      onboarding_complete: true,
      selectedUniversity,
      graduate_status: selectedGraduateStatus,
      cv_url,
    });
  }, 1500);

  useEffect(() => {
    const setData = async () => {
      if (profile) {
        setFirstName(profile.first_name);
        setLastName(profile.last_name);
        setFieldOfStudy(profile.field_of_study);
        setEmail(user?.email);
        // setAvatarUrl(profile.avatar_url);
        setCVUrl(profile.cv_url);
        setInGraduateSchool(profile.in_graduate_school);
        setInCoursework(profile.in_coursework);
        setConductingResearch(profile.conducting_research);
        setAttendingConferences(profile.attending_conferences);
        setWritingProposal(profile.writing_proposal);
        setWritingDissertation(profile.writing_dissertation);
        setLookingForPositions(profile.looking_for_positions);
      }

      let tempUniversities: Array<University> = [];

      let { data: universities, error } = await supabase
        .from("universities")
        .select("*")
        .order("name", { ascending: true });

      universities?.forEach((element: any) => {
        tempUniversities.push({ label: element.name, value: `${element.id}` });
      });

      setUniversities(tempUniversities);
      if (universities) {
        const uni = tempUniversities.filter(
          (university: any) => university.value == profile.university
        );

        setSelectedUniversity(uni[0]);
      }

      const graduateStatus = graduateStatuses.filter(
        (graduateStatus: any) => graduateStatus.value == profile.graduate_status
      );
      setSelectedGraduateStatus(graduateStatus[0]);
    };
    setData();
  }, [profile]);

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
      onboarding_complete,
      selectedUniversity.value,
      graduate_status.value,
      cv_url,
      inGraduateSchool,
      inCoursework,
      conductingResearch,
      attendingConferences,
      writingProposal,
      writingDissertation,
      lookingForPositions
    );
  }

  return (
    <Container>
      <InputContainer>
        <span className="p-float-label">
          <CustomInput
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="firstName">First Name</label>
        </span>
        <span className="p-float-label">
          <CustomInput
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="lastName">Last Name</label>
        </span>
      </InputContainer>
      <InputContainer>
        <span className="p-float-label">
          <CustomInput
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email Name</label>
        </span>
        <span className="p-float-label">
          <CustomInput
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="phone">Phone</label>
        </span>
      </InputContainer>
      <FieldOfStudyContainer>
        <span className="p-float-label">
          <FieldOfStudyInput
            id="fieldOfStudy"
            value={fieldOfStudy}
            onChange={(e) => setFieldOfStudy(e.target.value)}
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
            onChange={(e) => setInGraduateSchool(e.value)}
          />
          <SwitchLabel htmlFor="inGraduateSchool">
            In Graduate School?
          </SwitchLabel>
        </SwitchContainer>
        <SwitchContainer>
          <InputSwitch
            inputId="inCoursework"
            checked={inCoursework}
            onChange={(e) => setInCoursework(e.value)}
          />
          <SwitchLabel htmlFor="inCoursework">
            Participating in Coursework?
          </SwitchLabel>
        </SwitchContainer>
        <SwitchContainer>
          <InputSwitch
            inputId="lookingAtGraduateSchool"
            checked={lookingAtGraduateSchool}
            onChange={(e) => setLookingAtGraduateSchool(e.value)}
          />
          <SwitchLabel htmlFor="lookingAtGraduateSchool">
            Looking at Graduate Schools?
          </SwitchLabel>
        </SwitchContainer>
        <CustomDropdown
          value={selectedUniversity}
          options={universities}
          onChange={(e: any) => setSelectedUniversity(e.value)}
          placeholder="University"
          tooltipOptions={{ position: "right" }}
        />
        <div id="graduateStatusDropdown">
          <CustomDropdown
            value={selectedGraduateStatus}
            options={graduateStatuses}
            onChange={(e: any) => setSelectedGraduateStatus(e.value)}
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
            onChange={(e) => setConductingResearch(e.value)}
          />
          <SwitchLabel htmlFor="conductingResearch">
            Conducting Research?
          </SwitchLabel>
        </SwitchContainer>
        <SwitchContainer>
          <InputSwitch
            inputId="writingProposal"
            checked={writingProposal}
            onChange={(e) => setWritingProposal(e.value)}
          />
          <SwitchLabel htmlFor="writingProposal">Writing Proposal?</SwitchLabel>
        </SwitchContainer>
        <SwitchContainer>
          <InputSwitch
            inputId="writingDissertation"
            checked={writingDissertation}
            onChange={(e) => setWritingDissertation(e.value)}
          />
          <SwitchLabel htmlFor="writingDissertation">
            Writing Dissertation?
          </SwitchLabel>
        </SwitchContainer>
      </SwitchSection>
      <SwitchSection>
        <SwitchSectionHeader>Career</SwitchSectionHeader>
        <SwitchContainer>
          <InputSwitch
            inputId="attendingConferences"
            checked={attendingConferences}
            onChange={(e) => setAttendingConferences(e.value)}
          />
          <SwitchLabel htmlFor="attendingConferences">
            Attending Conferences?
          </SwitchLabel>
        </SwitchContainer>
        <SwitchContainer>
          <InputSwitch
            inputId="lookingForPositions"
            checked={lookingForPositions}
            onChange={(e) => setLookingForPositions(e.value)}
          />
          <SwitchLabel htmlFor="lookingForPositions">
            Looking for Positions?
          </SwitchLabel>
        </SwitchContainer>
      </SwitchSection>
    </Container>
  );
}
