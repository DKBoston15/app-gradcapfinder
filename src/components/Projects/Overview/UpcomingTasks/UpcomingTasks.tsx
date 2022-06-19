import { useEntryFeedStore } from '@app/stores/entryFeedStore';
import { useProjectStore } from '@app/stores/projectStore';
import React, { useEffect, useState, useRef } from 'react';
import { GridItem, Header } from './styles';
import { Toast } from 'primereact/toast';

export default function UpcomingTasks() {
  const toast = useRef(null);
  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const getUpcomingTasksForProject = useEntryFeedStore(
    (state: any) => state.getUpcomingTasksForProject,
  );
  const [tasks, setTasks] = useState([]);

  const getData = async () => {
    const data = await getUpcomingTasksForProject(selectedProject);
    const tasks = data.filter((task: any) => task.date != null);
    setTasks(tasks);
  };

  useEffect(() => {
    getData();
  }, []);

  const toastNotification = (type: string) => {
    getData();
    if (type === 'completion') {
      toast.current.show({
        severity: 'success',
        summary: 'Task Completed',
        detail: '',
        life: 3000,
      });
    }
    if (type === 'deletion') {
      toast.current.show({
        severity: 'error',
        summary: 'Task Deleted',
        detail: '',
        life: 3000,
      });
    }
  };

  return (
    <GridItem className="upcomingTasks">
      <Toast ref={toast} />
      <Header>Upcoming Tasks</Header>
      <div>Needs to be converted</div>
    </GridItem>
  );
}
