import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/project_feed.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewTableForm from '../../components/Projects/Tables/AddTableForm/NewTableForm';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';
import { useProjectStore } from '@app/stores/projectStore';
import Layout from '@app/layouts/Layout';
import ProjectNavBar from '@app/components/Navigation/ProjectNavBar/ProjectNavBar';
import MobileBottomNavBar from '@app/components/Navigation/MobileBottomNavBar/MobileBottomNavBar';
import { useTablesStore } from '@app/stores/tablesStore';
import TableInfo from '@app/components/Projects/Tables/TableInfo/TableInfo';

const options = {
  keys: ['title'],
};

export default function Tables() {
  const [saving, setSaving] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [loading, setLoading] = useState(true);
  const [projectTables, setProjectTables] = useState([]);
  const projects = useProjectStore((state: any) => state.projects);
  const navigate = useNavigate();

  const { tables, deleteTable } = useTablesStore((state) => ({
    tables: state.tables,
    deleteTable: state.deleteTable,
  }));

  const { projectId, id } = useParams();

  useEffect(() => {
    const filteredTables = tables.filter((table) => table.id == id);
    setSelectedTable(filteredTables[0]);
  }, [id, tables]);

  useEffect(() => {
    const filteredProjectTables = tables.filter((table) => table.project_id == projectId);
    setProjectTables(filteredProjectTables);
    setLoading(false);
  }, [id, projectId, tables]);

  const handleDeletion = () => {
    deleteTable(projectId);
    const otherProjects = projects.filter((project: any) => project.id !== projectId);
    navigate(`/projects/${otherProjects[0].id}/overview`);
  };
  return (
    <Layout>
      <ProjectNavBar />
      <MobileBottomNavBar />
      <Container>
        {!loading && (
          <>
            <InfoNavBar
              items={projectTables}
              selectedProject={projectId}
              options={options}
              header="Tables"
              title="tables"
            />
            <Feed selectedItem={selectedTable} header="Pick a Table">
              {selectedTable && (
                <SplitAddButton
                  selectedItem={selectedTable}
                  deleteFunction={deleteTable}
                  handleDeletion={handleDeletion}
                  // @ts-ignore
                  confirmMessage={`Are you sure you want to delete ${selectedTable.title}?`}
                  confirmHeader="Delete Table"
                  buttonLabel="New Table">
                  <NewTableForm />
                </SplitAddButton>
              )}
              {!selectedTable && (
                <AddButton header="+ New Table" buttonLabel="New Table">
                  <NewTableForm />
                </AddButton>
              )}
            </Feed>
            <InfoView header="Details" saving={saving}>
              <TableInfo selectedItem={selectedTable} setSaving={setSaving} />
            </InfoView>
            <MobileInfoView header="Details" saving={saving}>
              <TableInfo selectedItem={selectedTable} setSaving={setSaving} />
            </MobileInfoView>
          </>
        )}
      </Container>
    </Layout>
  );
}
