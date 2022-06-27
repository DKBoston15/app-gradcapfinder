import React, { useState, useEffect } from 'react';
import { TabPanel } from 'primereact/tabview';
import FeedView from '../FeedView/FeedView';
import { Container, Header, CustomTabView, HeaderTitle, CustomTag, CustomBadge } from './styles';
import NoteEditor from '../Notes/NoteEditor/NoteEditor';
import { AnimatePresence } from 'framer-motion';
import PeopleView from '../PeopleView/PeopleView';
import JournalView from '../JournalView/JournalView';
import KeyTermView from '../KeyTermView/KeyTermView';
import TaskView from '../TaskView/TaskView';
import useTaskStore from '@app/stores/tasksv2Store';
import { useParams } from 'react-router-dom';

export default function Feed(props: any) {
  const [activeView, setActiveView] = useState(0);
  const [openTaskCount, setOpenTaskCount] = useState(0);
  const { todos } = useTaskStore((state) => ({
    todos: state.todos,
  }));

  const { id } = useParams();

  const filterToItem = (data) => {
    let filteredTasks = data.filter((task) => task.connected_id === id);
    filteredTasks = filteredTasks.filter((task) => !task.completed_at);
    setOpenTaskCount(filteredTasks.length);
  };

  useEffect(() => {
    filterToItem(todos);
  }, [id, todos]);

  useEffect(() => {
    filterToItem(todos);
  }, []);

  const taskHeaderTemplate = (options) => {
    return (
      <div onClick={options.onClick} className={options.className}>
        {options.titleElement}
        {openTaskCount != 0 && (
          <CustomBadge value={`${openTaskCount}`} severity="warning"></CustomBadge>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      <Container
        id="feed"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}>
        {props.selectedItem && (
          <>
            <Header>
              <HeaderTitle>
                {props.selectedItem.first_name
                  ? `${props.selectedItem.first_name} ${
                      props.selectedItem.last_name != null ? props.selectedItem.last_name : ''
                    }`
                  : props.selectedItem.title
                  ? props.selectedItem.title
                  : props.selectedItem.name}
                {props.selectedItem.primary && <CustomTag severity="warning" value="Primary" />}
              </HeaderTitle>
              {props.children}
            </Header>
            <CustomTabView activeIndex={activeView} onTabChange={(e) => setActiveView(e.index)}>
              <TabPanel header="Details">
                <NoteEditor connectedId={props.selectedItem.id} personal={false} />
                <FeedView connectedId={props.selectedItem.id} />
              </TabPanel>
              <TabPanel
                header="Tasks"
                className="literatureTaskView"
                headerTemplate={taskHeaderTemplate}>
                <TaskView connectedId={props.selectedItem.id} />
              </TabPanel>
              <TabPanel header="People" className="literaturePeopleView">
                <PeopleView connectedId={props.selectedItem.id} />
              </TabPanel>
              <TabPanel header="Journals" className="literatureJournalsView">
                <JournalView connectedId={props.selectedItem.id} />
              </TabPanel>
              <TabPanel header="Key Terms" className="literatureKeyTermsView">
                <KeyTermView connectedId={props.selectedItem.id} />
              </TabPanel>
            </CustomTabView>
          </>
        )}
        {!props.selectedItem && (
          <Header>
            <HeaderTitle>{props.header}</HeaderTitle>
            {props.children}
          </Header>
        )}
      </Container>
    </AnimatePresence>
  );
}
