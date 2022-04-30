import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/tables.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewTableForm from '../../components/Projects/Tables/AddTableForm/NewTableForm';
import { useTablesStore } from '../../stores/tablesStore';
import TableInfo from '../../components/Projects/Tables/TableInfo/TableInfo';

const options = {
  keys: ['title'],
};

export default function Tables({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const tables = useTablesStore((state: any) => state.tables);
  const [selectedItem, setSelectedItem] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const deleteTable = useTablesStore((state: any) => state.deleteTable);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      console.log(projectId);
      const tempProject = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, tempProject[0].name);
    }
    if (tables.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const tableId = searchParams.get('tableId');
        if (tables && tableId) {
          const filteredTable = tables.filter((table: any) => table.id === tableId);
          setSelectedItem(filteredTable[0]);
        }
      }
    }
    setLoading(false);
  }, [selectedProject, tables]);

  const handleDeletion = () => {
    setSelectedItem(tables[0]);
  };

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={tables}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Tables"
            searchQueryTitle="tableId"
          />
          <Feed selectedItem={selectedItem} header="Pick a Table">
            {selectedItem && (
              <SplitAddButton
                selectedItem={selectedItem}
                deleteFunction={deleteTable}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedItem.title}?`}
                confirmHeader="Delete Table"
                buttonLabel="New Table">
                <NewTableForm />
              </SplitAddButton>
            )}
            {!selectedItem && (
              <AddButton header="+ New Table" buttonLabel="New Table">
                <NewTableForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Details" saving={saving}>
            <TableInfo selectedItem={selectedItem} setSaving={setSaving} />
          </InfoView>
        </>
      )}
    </Container>
  );
}
