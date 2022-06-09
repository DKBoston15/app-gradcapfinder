import { usePeopleStore } from '@app/stores/peopleStore';
import { useProjectStore } from '@app/stores/projectStore';
import React, { useState, useEffect } from 'react';
import { GridItem, Header, CardContainer, AddTeamMember } from './styles';
import TeamCard from './TeamCard/TeamCard';
import { useNavigate } from 'react-router-dom';

export default function ProjectTeam() {
  const getProjectPeople = usePeopleStore((state: any) => state.getProjectPeople);
  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const [projectPeople, setProjectPeople] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await getProjectPeople(selectedProject);
      setProjectPeople(data);
    };
    getData();
  }, []);

  return (
    <GridItem>
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
          <AddTeamMember onClick={() => navigate('/projects/people')}>
            Add a team member here <i className="pi pi-arrow-right" />
          </AddTeamMember>
        )}
      </CardContainer>
    </GridItem>
  );
}
