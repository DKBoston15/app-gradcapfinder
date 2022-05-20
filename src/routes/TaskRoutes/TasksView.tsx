import { useEntryFeedStore } from '@app/stores/entryFeedStore';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { parse, isAfter, isToday } from 'date-fns';
import Task from '@app/components/Tasks/Tasks/Task';
import { Container, Header, Icon } from './RouteStyles/tasksview.styles';
import NoteEditor from '@app/components/Projects/Notes/NoteEditor/NoteEditor';
import { Toast } from 'primereact/toast';

export default function TasksView() {
  const toast = useRef(null);
  const location = useLocation();
  const getTasks = useEntryFeedStore((state: any) => state.getTasks);
  const entries = useEntryFeedStore((state: any) => state.entries);
  const setEntries = useEntryFeedStore((state: any) => state.setEntries);
  const getPersonalEntries = useEntryFeedStore((state: any) => state.getPersonalEntries);

  const toastNotification = (type: string) => {
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

  useEffect(() => {
    const filterTasks = async () => {
      const data = await getTasks();

      if (location.pathname === '/tasks/today') {
        const todaysTasks = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].date) {
            const date = parse(data[i].date, 'yyyy-MM-dd', new Date());
            if (isToday(date)) {
              todaysTasks.push(data[i]);
            }
          }
        }
        const newTasks = todaysTasks.filter((task) => task.completed_date == null);
        setEntries(newTasks.sort((a: any, b: any) => (b.date > a.date ? -1 : 1)));
      }

      if (location.pathname === '/tasks/upcoming') {
        const upcomingTasks = [];
        const today = new Date();
        for (let i = 0; i < data.length; i++) {
          if (data[i].date) {
            const date = parse(data[i].date, 'yyyy-MM-dd', new Date());
            if (isAfter(date, today)) {
              upcomingTasks.push(data[i]);
            }
          }
        }
        const newTasks = upcomingTasks.filter((task) => task.completed_date == null);
        setEntries(newTasks.sort((a: any, b: any) => (b.date > a.date ? -1 : 1)));
      }

      if (location.pathname === '/tasks/all') {
        const newTasks = data.filter((task) => task.completed_date == null);
        setEntries(newTasks.sort((a: any, b: any) => (b.date > a.date ? -1 : 1)));
      }

      if (location.pathname === '/tasks/completed') {
        const newTasks = data.filter((task) => task.completed_date !== null);
        setEntries(newTasks.sort((a: any, b: any) => (b.date > a.date ? -1 : 1)));
      }

      if (location.pathname === '/tasks/personal') {
        const data = await getPersonalEntries();
      }
    };
    filterTasks();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await getPersonalEntries();
    };
    getData();
  }, [entries]);

  const HeaderText = () => {
    if (location.pathname === '/tasks/today') {
      return (
        <div>
          <Icon className="pi pi-inbox" style={{ color: '#5297FF' }} />
          Today's
        </div>
      );
    }

    if (location.pathname === '/tasks/upcoming') {
      return (
        <div>
          <Icon className="pi pi-calendar-plus" style={{ color: '#24B84C' }} />
          Upcoming
        </div>
      );
    }

    if (location.pathname === '/tasks/all') {
      return (
        <div>
          <Icon className="pi pi-folder-open" style={{ color: '#A971FF' }} />
          All Current
        </div>
      );
    }

    if (location.pathname === '/tasks/completed') {
      return (
        <div>
          <Icon className="pi pi-check-circle" style={{ color: '#24B84C' }} />
          Completed
        </div>
      );
    }

    if (location.pathname === '/tasks/personal') {
      return (
        <div>
          <Icon className="pi pi-user" style={{ color: '#1ABC9C' }} />
          Personal
        </div>
      );
    }
  };

  return (
    <Container>
      <Toast ref={toast} />
      <Header>{HeaderText()}</Header>
      {location.pathname === '/tasks/personal' && <NoteEditor connectedId={null} personal={true} />}

      {entries && (
        <div>
          {entries.map((task) => (
            <Task
              entry={task}
              editable={true}
              link={true}
              personal={false}
              key={task.id}
              toastNotification={toastNotification}
            />
          ))}
        </div>
      )}
    </Container>
  );
}
