import { usePeopleStore } from '@app/stores/peopleStore';
import { useProjectStore } from '@app/stores/projectStore';
import React, { useState, useEffect } from 'react';
import { GridItem, Header, CardContainer } from './styles';
import TeamCard from './TeamCard/TeamCard';

export default function ProjectTeam() {
  const getProjectPeople = usePeopleStore((state: any) => state.getProjectPeople);
  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const [projectPeople, setProjectPeople] = useState([]);

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
        {projectPeople.map((person) => (
          <TeamCard person={person} key={person.id} />
        ))}
      </CardContainer>
    </GridItem>
  );
}
