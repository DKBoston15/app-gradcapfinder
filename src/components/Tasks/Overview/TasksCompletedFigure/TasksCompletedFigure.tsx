import React, { useEffect, useState } from 'react';
import { GridItem, Box, BoxContainer, BoxTitle } from './styles';
import AnimatedNumbers from 'react-animated-numbers';
import useTaskStore from '@app/stores/tasksv2Store';
import { useGeneralStore } from '@app/stores/generalStore';

export default function TasksCompletedFigure() {
  const [allCompletedTasks, setAllCompletedTasks] = useState(0);
  const [allOpenTasks, setAllOpenTasks] = useState(0);
  const [openProjectTasks, setOpenProjectTasks] = useState(0);
  const [openPersonalTasks, setOpenPersonalTasks] = useState(0);
  const todos = useTaskStore((state: any) => state.todos);
  const navVisible = useGeneralStore((state: any) => state.navVisible);

  useEffect(() => {
    const getData = async () => {
      const completedTasks = todos.filter((task) => task.completed_at).length;
      setAllCompletedTasks(completedTasks);

      const openTasks = todos.filter((task) => !task.completed_at).length;
      setAllOpenTasks(openTasks);

      let openProjectTasks = todos.filter((task) => !task.completed_at);
      openProjectTasks = openProjectTasks.filter((task) => task.project != 0).length;
      setOpenProjectTasks(openProjectTasks);

      let openPersonalTasks = todos.filter((task) => !task.completed_at);
      openPersonalTasks = openPersonalTasks.filter((task) => task.project == 0).length;
      setOpenPersonalTasks(openPersonalTasks);
    };
    getData();
  }, []);

  return (
    <GridItem className="taskMetrics" navVisible={navVisible}>
      <BoxContainer>
        <Box>
          <BoxTitle>All Open Tasks</BoxTitle>
          <AnimatedNumbers animateToNumber={allOpenTasks} fontStyle={{ fontSize: 32 }} />
        </Box>
        <Box>
          <BoxTitle>Open Project/Unassigned Tasks</BoxTitle>
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
