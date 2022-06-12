import React, { useEffect, useState } from 'react';
import { GridItem, Box, BoxContainer, BoxTitle } from './styles';
import AnimatedNumbers from 'react-animated-numbers';
import { useEntryFeedStore } from '@app/stores/entryFeedStore';

export default function TasksCompletedFigure() {
  const [allCompletedTasks, setAllCompletedTasks] = useState(0);
  const [allOpenTasks, setAllOpenTasks] = useState(0);
  const [openProjectTasks, setOpenProjectTasks] = useState(0);
  const [openPersonalTasks, setOpenPersonalTasks] = useState(0);
  const getTasks = useEntryFeedStore((state: any) => state.getTasks);

  useEffect(() => {
    const getData = async () => {
      const data = await getTasks();
      // All Completed Tasks
      const completedTasks = data.filter((task) => task.completed_date !== null).length;
      setAllCompletedTasks(completedTasks);

      // All Open Tasks
      const openTasks = data.filter((task) => task.completed_date === null).length;
      setAllOpenTasks(openTasks);

      // All Open Project Tasks
      let openProjectTasks = data.filter((task) => task.completed_date === null);
      openProjectTasks = openProjectTasks.filter((task) => task.section !== 'personal').length;
      setOpenProjectTasks(openProjectTasks);

      // All Open Personal Tasks
      let openPersonalTasks = data.filter((task) => task.completed_date === null);
      openPersonalTasks = openPersonalTasks.filter((task) => task.section === 'personal').length;
      setOpenPersonalTasks(openPersonalTasks);
    };
    getData();
  }, []);

  return (
    <GridItem className="taskMetrics">
      <BoxContainer>
        <Box>
          <BoxTitle>All Open Tasks</BoxTitle>
          <AnimatedNumbers animateToNumber={allOpenTasks} fontStyle={{ fontSize: 32 }} />
        </Box>
        <Box>
          <BoxTitle>Open Project Tasks</BoxTitle>
          <AnimatedNumbers animateToNumber={openProjectTasks} fontStyle={{ fontSize: 32 }} />
        </Box>
        <Box>
          <BoxTitle>Open Personal Tasks</BoxTitle>
          <AnimatedNumbers animateToNumber={openPersonalTasks} fontStyle={{ fontSize: 32 }} />
        </Box>
        <Box>
          <BoxTitle>All Completed Tasks</BoxTitle>
          <AnimatedNumbers animateToNumber={allCompletedTasks} fontStyle={{ fontSize: 32 }} />
        </Box>
      </BoxContainer>
    </GridItem>
  );
}
