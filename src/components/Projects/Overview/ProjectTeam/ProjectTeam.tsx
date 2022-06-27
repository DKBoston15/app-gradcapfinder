import { usePeopleStore } from '@app/stores/peopleStore';
import { useProjectStore } from '@app/stores/projectStore';
import React, { useState, useEffect } from 'react';
import {
  GridItem,
  Header,
  CardContainer,
  AddTeamMemberButton,
  AddTeamMemberButtonIcon,
} from './styles';
import TeamCard from './TeamCard/TeamCard';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProjectTeam() {
  const people = usePeopleStore((state: any) => state.people);
  const { projectId } = useParams();
  const [projectPeople, setProjectPeople] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let tempProjectPeople = people.filter((person) => person.project_id == projectId);
    tempProjectPeople = tempProjectPeople.filter(
      (person) =>
        person.project_role !== null &&
        person.project_role !== undefined &&
        person.project_role !== '',
    );

    setProjectPeople(tempProjectPeople);
  }, []);

  return (
    <GridItem className="projectTeam">
      <Header>Project Team</Header>
      <CardContainer>
        {projectPeople.length > 0 && (
          <>
            {projectPeople.map((person) => (
              <TeamCard person={person} key={person.id} />
            ))}
          </>
        )}
        {projectPeople.length == 0 && (
          <AddTeamMemberButton onClick={() => navigate(`/projects/${projectId}/people`)}>
            Add a team member here <AddTeamMemberButtonIcon className="pi pi-arrow-right" />
          </AddTeamMemberButton>
        )}
      </CardContainer>
    </GridItem>
  );
}
