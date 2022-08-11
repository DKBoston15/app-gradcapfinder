import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  CustomDataTable,
  CustomButton,
  RightPanel,
  FilterButton,
  KBD,
  MultiSortInstructions,
  KeyboardContainer,
  ButtonContainer,
  Search,
  RightBarContainer,
  ProjectBodyTemplateContainer,
  ActionBodyContainer,
} from './RouteStyles/project_feed.styles';
import NewAnalysisTechniqueForm from '../../components/Projects/AnalysisTechniques/AddAnalysisTechniqueForm/NewAnalysisTechniqueForm';
import { useProjectStore } from '@app/stores/projectStore';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import Header from '@app/components/Projects/Header/Header';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { useAnalysisTechniquesStore } from '@app/stores/analysisTechniquesStore';
import ProjectDrawer from '@app/components/Projects/ProjectDrawer/ProjectDrawer';
import { BiDuplicate, BiTrash } from 'react-icons/bi';
import { AnalysisTechnique } from '@app/stores/types/analysisTechniques.types';

const columns = [
  { field: 'title', header: 'Title' },
  { field: 'technique', header: 'Technique' },
  { field: 'method', header: 'Method' },
  { field: 'project', header: 'Project' },
  { field: 'link', header: 'Link' },
];
const defaultColumns = [
  { field: 'title', header: 'Title' },
  { field: 'technique', header: 'Technique' },
  { field: 'method', header: 'Method' },
  { field: 'project', header: 'Project' },
  { field: 'link', header: 'Link' },
];

export default function AnalysisTechniques() {
  const toast = useRef(null);
  const dt = useRef(null);
  const navigate = useNavigate();
  const [selectedColumns, setSelectedColumns] = useState(defaultColumns);
  const [multiSortMeta, setMultiSortMeta] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState('');

  const { analysis_techniques, addAnalysisTechnique, deleteAnalysisTechnique } =
    useAnalysisTechniquesStore((state) => ({
      analysis_techniques: state.analysis_techniques,
      addAnalysisTechnique: state.addAnalysisTechnique,
      deleteAnalysisTechnique: state.deleteAnalysisTechnique,
    }));

  const projects = useProjectStore((state: any) => state.projects);

  const onColumnToggle = (event) => {
    let newSelectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      newSelectedColumns.some((sCol) => sCol.field === col.field),
    );
    setSelectedColumns(orderedSelectedColumns);
  };

  const projectBodyTemplate = (rowData) => {
    const projectName = projects.filter((project) => project.id == rowData.project_id);
    if (projectName.length > 0) {
      return (
        <ProjectBodyTemplateContainer>
          <div>{projectName[0].name}</div>
          <div
            onClick={() => {
              setSelectedProjectId(projectName[0].id);
              setVisible(true);
            }}
            style={{
              background: '#2381FE',
              padding: '0.5rem',
              borderRadius: '6px',
              cursor: 'pointer',
            }}>
            <i className="pi pi-folder-open" style={{ color: 'white' }} />
          </div>
        </ProjectBodyTemplateContainer>
      );
    }
    return <></>;
  };

  const linkBody = (rowData) => {
    if (rowData.link) {
      if (rowData.link.length > 1) {
        return (
          <CustomButton
            label="Open Link"
            className="p-button-sm"
            onClick={() => window.open(rowData.link)}
          />
        );
      }
    }
    return <></>;
  };

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
    toast.current.show({
      severity: 'success',
      summary: 'CSV Exported',
      detail: '',
      life: 3000,
    });
  };

  const exportPdf = () => {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, data);
        doc.save('tasks.pdf');
      });
    });
    toast.current.show({ severity: 'success', summary: 'PDF Exported', detail: '', life: 3000 });
  };

  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      saveAsExcelFile(excelBuffer, 'tasks');
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
    toast.current.show({
      severity: 'success',
      summary: 'Excel File Exported',
      detail: '',
      life: 3000,
    });
  };

  const columnComponents = selectedColumns.map((col) => {
    if (col.field === 'project') {
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          body={projectBodyTemplate}
          sortable
          filter
          filterPlaceholder={`Search by ${col.field}`}
          filterField={col.field}
        />
      );
    } else if (col.field === 'link') {
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          body={linkBody}
          sortable
          filter
          filterPlaceholder={`Search by ${col.field}`}
          filterField={col.field}
        />
      );
    } else {
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          sortable
          filter
          filterPlaceholder={`Search by ${col.field}`}
          filterField={col.field}
        />
      );
    }
  });

  const header = (
    <RightPanel>
      <MultiSelect
        value={selectedColumns}
        options={columns}
        optionLabel="header"
        onChange={onColumnToggle}
        style={{ width: '20em' }}
      />
      <RightBarContainer>
        <MultiSortInstructions>
          <KeyboardContainer>
            <KBD>Ctrl/CMD</KBD> + <KBD>Click</KBD>
          </KeyboardContainer>
          for Multi Row Sort
        </MultiSortInstructions>
        <Search className="onboardingSearch p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </Search>
        <ButtonContainer className="onboardingExportButtons">
          <FilterButton
            type="button"
            icon="pi pi-file"
            onClick={() => exportCSV(false)}
            className="mr-2 exportToCSV"
          />
          <Tooltip
            target=".exportToCSV"
            content={`Export to CSV`}
            position="bottom"
            style={{ fontSize: '12px' }}
          />
          <FilterButton
            type="button"
            icon="pi pi-file-excel"
            onClick={exportExcel}
            className="p-button-success mr-2 exportToExcel"
          />
          <Tooltip
            target=".exportToExcel"
            content={`Export to Excel`}
            position="bottom"
            style={{ fontSize: '12px' }}
          />
          <FilterButton
            type="button"
            icon="pi pi-file-pdf"
            onClick={exportPdf}
            className="p-button-warning mr-2 exportToPDF"
          />
          <Tooltip
            target=".exportToPDF"
            content={`Export to PDF`}
            position="bottom"
            style={{ fontSize: '12px' }}
          />
          <FilterButton
            type="button"
            icon="pi pi-filter"
            onClick={() => exportCSV(true)}
            className="p-button-info ml-auto exportToCSVSelection"
          />
          <Tooltip
            target=".exportToCSVSelection"
            content={`Export Selection to CSV`}
            position="bottom"
            style={{ fontSize: '12px' }}
          />
        </ButtonContainer>
      </RightBarContainer>
    </RightPanel>
  );

  const items = [
    {
      label: 'Analysis Techniques',
      command: () => navigate(`/analysis/analysis_techniques`),
    },
  ];

  const duplicateItem = (data) => {
    const newAnalysisTechnique = new AnalysisTechnique();
    newAnalysisTechnique.title = `Copied ${data.title}`;
    newAnalysisTechnique.link = data.link;
    newAnalysisTechnique.technique = data.technique;
    newAnalysisTechnique.method = data.method;
    newAnalysisTechnique.project_id = data.project_id;

    addAnalysisTechnique(newAnalysisTechnique);
    toast.current.show({
      severity: 'success',
      summary: 'Analysis Technique Duplicated',
      detail: '',
      life: 3000,
    });
  };

  const handleDeletion = (id) => {
    deleteAnalysisTechnique(id);
    toast.current.show({
      severity: 'error',
      summary: 'Analysis Technique Deleted',
      detail: '',
      life: 3000,
    });
  };

  const actionBodyTemplate = (data) => {
    return (
      <ActionBodyContainer style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          label="View"
          className="p-button-sm"
          onClick={() => navigate(`/analysis/analysis_techniques/${data.id}`)}
        />
        <BiDuplicate
          style={{ fontSize: '1.5rem', marginLeft: '1rem', cursor: 'pointer' }}
          onClick={() => duplicateItem(data)}
        />
        <BiTrash
          style={{ fontSize: '1.5rem', marginLeft: '1rem', cursor: 'pointer' }}
          onClick={() => handleDeletion(data.id)}
        />
      </ActionBodyContainer>
    );
  };

  return (
    <Container>
      <Toast ref={toast} />
      <Header items={items} title="Analysis Technique">
        <NewAnalysisTechniqueForm />
      </Header>
      <ProjectDrawer
        selectedProjectId={selectedProjectId}
        visible={visible}
        setVisible={setVisible}
      />
      <CustomDataTable
        showGridlines
        sortMode="multiple"
        multiSortMeta={multiSortMeta}
        onSort={(e) => setMultiSortMeta(e.multiSortMeta)}
        stripedRows
        ref={dt}
        selection={selectedItems}
        selectionMode="checkbox"
        onSelectionChange={(e) => setSelectedItems(e.value)}
        globalFilter={globalFilter}
        header={header}
        filterDisplay="menu"
        globalFilterFields={['title', 'technique', 'method', 'project', 'link']}
        value={analysis_techniques}
        removableSort
        stateStorage="local"
        stateKey="analysis-techniques-local"
        emptyMessage="No analysis techniques found.">
        <Column selectionMode="multiple"></Column>
        {columnComponents}
        <Column body={actionBodyTemplate}></Column>
      </CustomDataTable>
    </Container>
  );
}
