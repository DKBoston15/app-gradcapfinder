import React, { useState } from 'react';
import { Container, CustomTabMenu, CustomSidebar } from './styles';
import { useNavigate } from 'react-router-dom';
import ViewsList from './ViewsList/ViewsList';

const tasksItems = [
  { label: 'Overview', icon: 'pi pi-fw pi-home' },
  { label: 'Tasks', icon: 'pi pi-fw pi-calendar' },
];

export default function TasksBottomMobileNavBar() {
  const navigate = useNavigate();
  const [visibleBottom, setVisibleBottom] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState();

  const tabChange = (e: any) => {
    setSelectedMenu(e.value.label);
    if (e.value.label === 'Overview') {
      navigate('/tasks/overview');
    }
    if (e.value.label === 'Tasks') {
      navigate('/tasks/tasks');
    }
  };

  return (
    <Container className="card">
      <CustomSidebar
        visible={visibleBottom}
        position="bottom"
        style={{ height: '100%' }}
        onHide={() => setVisibleBottom(false)}>
        {selectedMenu === 'Views' && <ViewsList setVisibleBottom={setVisibleBottom} />}
      </CustomSidebar>
      {tasksItems && <CustomTabMenu model={tasksItems} onTabChange={(e) => tabChange(e)} />}
    </Container>
  );
}
