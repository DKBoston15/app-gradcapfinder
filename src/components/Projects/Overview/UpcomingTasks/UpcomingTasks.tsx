import { useEntryFeedStore } from '@app/stores/entryFeedStore';
import { useProjectStore } from '@app/stores/projectStore';
import React, { useEffect, useState } from 'react';
import { GridItem, Header } from './styles';
import Task from '../../Tasks/Task/Task';

export default function UpcomingTasks() {
  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const getUpcomingTasksForProject = useEntryFeedStore(
    (state: any) => state.getUpcomingTasksForProject,
  );
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getUpcomingTasksForProject(selectedProject);
      setTasks(data);
    };
    getData();
  }, []);

  return (
    <GridItem>
      <Header>Upcoming Tasks</Header>
      {tasks && (
        <div>
          {tasks.map((task) => (
            <Task entry={task} editable={false} link={true} selectedProject={selectedProject} />
          ))}
        </div>
      )}
    </GridItem>
  );
}
