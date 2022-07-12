import React, { useState, useRef, useEffect } from 'react';
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
} from './RouteStyles/project_feed.styles';
import NewSampleForm from '../../components/Projects/Samples/AddSampleForm/NewSampleForm';
import { useProjectStore } from '@app/stores/projectStore';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import Header from '@app/components/Projects/Header/Header';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { useSamplesStore } from '@app/stores/samplesStore';

export default function Samples() {
  const columns = [
    { field: 'title', header: 'Title' },
    { field: 'project', header: 'Project' },
    { field: 'sampling_design', header: 'Sampling Design' },
    { field: 'sampling_technique', header: 'Sampling Technique' },
    { field: 'power_analysis', header: 'Power Analysis' },
    { field: 'final_sample', header: 'Final Sample' },
    { field: 'start_date', header: 'Start Date' },
    { field: 'end_date', header: 'End Date' },
    { field: 'link', header: 'Link' },
  ];
  const defaultColumns = [
    { field: 'title', header: 'Title' },
    { field: 'project', header: 'Project' },
    { field: 'sampling_design', header: 'Sampling Design' },
    { field: 'sampling_technique', header: 'Sampling Technique' },
    { field: 'link', header: 'Link' },
  ];
  const toast = useRef(null);
  const dt = useRef(null);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [selectedColumns, setSelectedColumns] = useState(defaultColumns);
  const [multiSortMeta, setMultiSortMeta] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const { samples, getFilteredSamples, filteredSamples } = useSamplesStore((state) => ({
    samples: state.samples,
    getFilteredSamples: state.getFilteredSamples,
    filteredSamples: state.filteredSamples,
  }));

  useEffect(() => {
    getFilteredSamples(projectId);
  }, [samples]);

  const projects = useProjectStore((state: any) => state.projects);

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field),
    );
    setSelectedColumns(orderedSelectedColumns);
  };

  const projectBodyTemplate = (rowData) => {
    const projectName = projects.filter((project) => project.id == rowData.project_id);
    if (projectName.length > 0) {
      return <>{projectName[0].name}</>;
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
    { label: 'Overview', command: () => navigate(`/projects/${projectId}/overview`) },
    { label: 'Samples', command: () => navigate(`/projects/${projectId}/samples`) },
  ];

  const actionBodyTemplate = (data) => {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center' }}
        onClick={() => navigate(`/projects/${projectId}/sample/${data.id}`)}>
        <Button label="View" className="p-button-sm" />
      </div>
    );
  };

  return (
    <Container>
      <Toast ref={toast} />
      <Header items={items} title="Samples">
        <NewSampleForm />
      </Header>

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
        globalFilterFields={['title', 'project', 'link']}
        value={filteredSamples}
        removableSort
        stateStorage="local"
        stateKey="samples-local"
        emptyMessage="No sample found.">
        <Column selectionMode="multiple"></Column>
        {columnComponents}
        <Column body={actionBodyTemplate}></Column>
      </CustomDataTable>
    </Container>
  );
}