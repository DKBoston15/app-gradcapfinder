import React, { useState, useEffect, useRef } from 'react';
import { Column } from 'primereact/column';
import {
  Container,
  TaskButton,
  TaskButtonTrash,
  ButtonContainer,
  SubContainer,
  PageHeader,
  CustomDataTable,
  HeaderButtonNewTask,
  HeaderContainer,
  CustomPanel,
  FormContainer,
  RightPanel,
  Search,
  FilterButton,
  Badge,
  DateContainer,
  OverdueIcon,
  RowOne,
  RowTwo,
  NotFoundItem,
} from './styles';
import Layout from '@app/layouts/Layout';
import useTaskStore from '@app/stores/tasksv2Store';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { useProjectStore } from '@app/stores/projectStore';
import TaskEditor from '@app/components/TasksV2/Editor/TaskEditor';
import './tasksv2.css';
import { format, isDate, isAfter } from 'date-fns';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';
import { supabase } from '@app/supabase/index';
import TaskNavBar from '@app/components/Navigation/TaskNavBar/TaskNavBar';
import TasksBottomMobileNavBar from '@app/components/Navigation/TasksBottomMobileNavBar/TasksBottomMobileNavBar';
import { useGeneralStore } from '@app/stores/generalStore';
import { Steps } from 'intro.js-react';

const groupIndexMap = {
  literature: 0,
  analysis_techniques: 5,
  analytic_designs: 4,
  samplings: 3,
  research_paradigms: 1,
  research_questions: 2,
  grants: 6,
  figures: 7,
  tables: 8,
  labs: 9,
  models: 10,
  people: 11,
  key_terms: 12,
  journals: 13,
};

const steps = [
  {
    element: '.onboardingAddNewTask',
    intro: 'Click here to add a new task',
    position: 'right',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.onboardingSearch',
    intro: `You can search/filter down your result here`,
    position: 'left',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.onboardingExportButtons',
    intro: 'You can export your tasks in a variety of ways here',
    position: 'right',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.nothing',
    intro:
      'In the table itself you can resize columns, edit, sort, filter, complete or delete a task, and expand each row downwards to add notes',
    position: 'right',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
];

export default function TasksV3() {
  const user = supabase.auth.user();
  const { todos, addTodo, removeTodo, patchTodo, completeTodo, getConnectedItem } = useTaskStore(
    (state) => ({
      todos: state.todos,
      addTodo: state.addTodo,
      removeTodo: state.removeTodo,
      patchTodo: state.patchTodo,
      completeTodo: state.completeTodo,
      getConnectedItem: state.getConnectedItem,
    }),
  );
  const toast = useRef(null);
  const [data, setData] = useState();
  const projects = useProjectStore((state: any) => state.projects);
  const [expandedRows, setExpandedRows] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [panelCollapsed, setPanelCollapsed] = useState(true);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const dt = useRef(null);
  const onboarding = useGeneralStore((state: any) => state.onboarding);
  const setOnboarding = useGeneralStore((state: any) => state.setOnboarding);

  const onExit = () => {
    setOnboarding(false);
  };

  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState();
  const [priority, setPriority] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const [date, setDate] = useState('');

  const [group, setGroup] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [newSelectedGroup, setNewSelectedGroup] = useState();
  const [rawGroupData, setRawGroupData] = useState([]);
  const [editedSelectedProject, setEditedSelectedProject] = useState();
  const [editedSelectedGroup, setEditedSelectedGroup] = useState();
  const [editedGroup, setEditedGroup] = useState();

  const cols = [
    { field: 'title', header: 'Title' },
    { field: 'status', header: 'Status' },
    { field: 'priority', header: 'Priority' },
    { field: 'date', header: 'Date' },
    { field: 'project', header: 'Project' },
    { field: 'time', header: 'Time' },
    { field: 'item', header: 'Item' },
  ];

  const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

  const [filters1, setFilters1] = useState(null);

  const completeTodoHandler = (id) => {
    completeTodo(id);
    toast.current.show({ severity: 'success', summary: 'Task Completed', detail: '', life: 3000 });
  };

  const removeTodoHandler = (id) => {
    removeTodo(id);
    toast.current.show({ severity: 'info', summary: 'Task Deleted', detail: '', life: 3000 });
  };

  const addNewTodo = async () => {
    let projectId = selectedProject;
    if (newSelectedGroup) {
      const project = rawGroupData.filter((group) => group.id === newSelectedGroup.id);
      projectId = parseInt(project[0].project_id);
    }

    let newGroupItem = undefined;
    if (newSelectedGroup) {
      newGroupItem = newSelectedGroup.id;
    }

    addTodo(title, priority, date, projectId, time, status, undefined, undefined, newGroupItem);
    toast.current.show({ severity: 'success', summary: 'Task Added', detail: '', life: 3000 });
    setTime('');
    setTitle('');
    setPriority(undefined);
    setStatus(undefined);
    setSelectedProject(undefined);
    setDate('');
    setNewSelectedGroup(undefined);
  };

  const priorityFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={['P1', 'P2', 'P3', 'P4']}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={filterItemTemplate}
        placeholder="Select a Status"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={['Todo', 'In Progress', 'Done']}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select a Status"
        className="p-column-filter"
        showClear
      />
    );
  };

  const projectFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={projects}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={projectItemTemplate}
        placeholder="Select a Project"
        className="p-column-filter"
        optionLabel="name"
        optionValue="id"
        showClear
        filterMatchMode={'contains'}
      />
    );
  };

  const statusItemTemplate = (option) => {
    const status = option === 'In Progress' ? 'InProgress' : option;
    return <Badge className={`${status}Container`}>{option}</Badge>;
  };

  const filterItemTemplate = (option) => {
    return <Badge className={`${option}Container`}>{option}</Badge>;
  };

  const priorityBodyTemplate = (option) => {
    return <Badge className={`${option.priority}Container`}>{option.priority}</Badge>;
  };

  const statusBodyTemplate = (option) => {
    const status = option.status === 'In Progress' ? 'InProgress' : option.status;
    return <Badge className={`${status}Container`}>{option.status}</Badge>;
  };

  const projectItemTemplate = (option) => {
    return <span>{`${option.name}`}</span>;
  };

  const projectBodyTemplate = (rowData) => {
    const projectName = projects.filter((project) => project.id == rowData.project);
    if (projectName.length > 0) {
      return <>{projectName[0].name}</>;
    }
    return <></>;
  };

  useEffect(() => {
    let tempData = todos;
    for (let index = 0; index < tempData.length; index++) {
      if (tempData[index].date) {
        if (!tempData[index].date.date) {
          if (isDate(tempData[index].date)) {
            tempData[index].date = {
              date: tempData[index].date,
              friendlyValue: format(tempData[index].date, 'yyyy-MM-dd hh:mm b'),
            };
          } else {
            tempData[index].date = {
              date: new Date(tempData[index].date),
              friendlyValue: format(new Date(tempData[index].date), 'yyyy-MM-dd hh:mm b'),
            };
          }
        }
      }
    }
    setData(tempData);
  }, [todos]);

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

  const onRowEditComplete = async (e) => {
    const connectedId = editedSelectedGroup ? editedSelectedGroup.id : null;
    let tempDate = e.newData.date;
    if (tempDate.date) {
      tempDate = tempDate.date;
    }
    await patchTodo(
      e.newData.id,
      e.newData.title,
      e.newData.priority,
      tempDate,
      editedSelectedProject,
      e.newData.time,
      e.newData.status,
      '',
      connectedId,
    );
  };

  const onRowEditInit = async (e) => {
    const item = rawGroupData.filter((a) => a.id == e.data.connected_id);
    setEditedSelectedGroup(item[0]);
    setEditedSelectedProject(e.data.project);
  };

  const rowEditor = (options) => {
    if (options.field === 'title') {
      return titleEditor(options);
    }
    if (options.field === 'priority') {
      return priorityEditor(options);
    }
    if (options.field === 'status') {
      return statusEditor(options);
    }
    if (options.field === 'date') {
      return dateEditor(options);
    }
    if (options.field === 'project') {
      return projectEditor(options);
    }
    if (options.field === 'time') {
      return timeEditor(options);
    }
    if (options.field === 'connected_id') {
      return itemEditor(options);
    }
  };

  const titleEditor = (options) => {
    return (
      <InputText
        style={{ width: '100%' }}
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
        id="taskTitle"
        placeholder="Title"
      />
    );
  };
  const priorityEditor = (options) => {
    return (
      <Dropdown
        showClear
        style={{ width: '7rem', textAlign: 'left' }}
        id="priorityDropdown"
        value={options.value}
        options={['P1', 'P2', 'P3', 'P4']}
        onChange={(e) => {
          options.editorCallback(e.value);
        }}
        placeholder="No Priority"
      />
    );
  };
  const statusEditor = (options) => {
    return (
      <Dropdown
        showClear
        style={{ width: '7em', textAlign: 'left' }}
        id="statusDropdown"
        value={options.value}
        options={['Todo', 'In Progress', 'Done']}
        onChange={(e) => {
          options.editorCallback(e.value);
        }}
        placeholder="No Status"
      />
    );
  };
  const dateEditor = (options) => {
    const handleChange = (e) => {
      options.editorCallback(e.value);
    };
    return (
      <Calendar
        showButtonBar
        style={{ width: '7rem' }}
        id="taskCalendar"
        value={options.value ? options.value.date : ''}
        onChange={(e) => handleChange(e)}
        showTime
        hourFormat="12"
        placeholder="No Due Date"
      />
    );
  };
  const projectEditor = (options) => {
    return (
      <Dropdown
        style={{ width: '8rem' }}
        value={editedSelectedProject}
        options={projects}
        onChange={(e) => {
          let newProject = e.value;
          if (e.value === 0) newProject = true;
          if (newProject) {
            setEditedSelectedProject(e.value);
            setEditedSelectedGroup();
          } else {
            setEditedSelectedProject();
            setEditedSelectedGroup();
          }
        }}
        itemTemplate={projectItemTemplate}
        placeholder="Select a Project"
        id="projectDropdown"
        optionLabel="name"
        optionValue="id"
        showClear
      />
    );
  };
  const itemEditor = (options) => {
    return (
      <Dropdown
        className="itemEditor"
        disabled={editedSelectedProject == 0}
        style={{ width: '8rem' }}
        value={editedSelectedGroup}
        options={editedGroup}
        onChange={(e) => {
          if (e.value) {
            const project = projects.filter((project) => project.id == e.value.project_id);
            setEditedSelectedProject(project[0].id);
            setEditedSelectedGroup(e.value);
          } else {
            setEditedSelectedProject();
            setEditedSelectedGroup();
          }
        }}
        placeholder="Connected Item"
        filter
        filterBy="title"
        showClear
        optionLabel="title"
        optionGroupLabel="label"
        optionGroupChildren="items"
        optionGroupTemplate={groupedItemTemplate}
        itemTemplate={dropdownItemTemplate}
      />
    );
  };

  const dropdownItemTemplate = (option: any) => {
    if (option.title) {
      return <div>{option.title}</div>;
    }
  };

  const timeEditor = (options) => {
    return (
      <InputMask
        style={{ width: '6rem' }}
        mask="99:99:99"
        value={options.value}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Total Time Taken"
      />
    );
  };

  const rowExpansionTemplate = (data) => {
    return <TaskEditor content={data.content} id={data.id} />;
  };

  const actionBodyTemplate = (data) => {
    return (
      <ButtonContainer>
        <TaskButtonTrash
          icon="pi pi-trash"
          onClick={(e) => {
            removeTodoHandler(data.id);
          }}
        />
        {data.status != 'Done' && (
          <TaskButton
            icon="pi pi-check"
            onClick={(e) => {
              completeTodoHandler(data.id);
            }}
          />
        )}
      </ButtonContainer>
    );
  };

  const dateBodyTemplate = (data) => {
    let overdue = false;
    if (data.date) {
      if (data.date.date) {
        if (isDate(data.date.date)) {
          overdue = isAfter(new Date(), data.date.date);
        } else {
          overdue = isAfter(new Date(), new Date(data.date.date));
        }
      }
    }

    const showIcon = data.date && data.status != 'Done';
    return (
      <>
        {data.date && (
          <DateContainer>
            {showIcon && (
              <>
                {overdue ? <OverdueIcon className="pi pi-clock" /> : null} {data.date.friendlyValue}
              </>
            )}
            {!showIcon && data.date.friendlyValue}
          </DateContainer>
        )}
      </>
    );
  };

  useEffect(() => {
    const getData = async () => {
      const groupedItems = [
        {
          label: 'Literature',
          items: [],
        },
        {
          label: 'Paradigms',
          items: [],
        },
        {
          label: 'Questions',
          items: [],
        },
        {
          label: 'Sampling',
          items: [],
        },
        {
          label: 'Designs',
          items: [],
        },
        {
          label: 'Techniques',
          items: [],
        },
        {
          label: 'Grants',
          items: [],
        },
        {
          label: 'Figures',
          items: [],
        },
        {
          label: 'Tables',
          items: [],
        },
        {
          label: 'Labs',
          items: [],
        },
        {
          label: 'Models',
          items: [],
        },
        {
          label: 'People',
          items: [],
        },
        {
          label: 'Key Terms',
          items: [],
        },
        {
          label: 'Journals',
          items: [],
        },
      ];
      const { data } = await supabase.rpc('all_items', { user_id: user?.id });
      setRawGroupData(data);
      data?.forEach((item) => {
        if (selectedProject) {
          if (item.project_id == selectedProject) {
            groupedItems[groupIndexMap[item.type]].items.push(item);
          }
        } else {
          groupedItems[groupIndexMap[item.type]].items.push(item);
        }
      });
      setGroup(groupedItems);
    };
    getData();
  }, [selectedProject]);

  useEffect(() => {
    const getData = async () => {
      const groupedItems = [
        {
          label: 'Literature',
          items: [],
        },
        {
          label: 'Paradigms',
          items: [],
        },
        {
          label: 'Questions',
          items: [],
        },
        {
          label: 'Sampling',
          items: [],
        },
        {
          label: 'Designs',
          items: [],
        },
        {
          label: 'Techniques',
          items: [],
        },
        {
          label: 'Grants',
          items: [],
        },
        {
          label: 'Figures',
          items: [],
        },
        {
          label: 'Tables',
          items: [],
        },
        {
          label: 'Labs',
          items: [],
        },
        {
          label: 'Models',
          items: [],
        },
        {
          label: 'People',
          items: [],
        },
        {
          label: 'Key Terms',
          items: [],
        },
        {
          label: 'Journals',
          items: [],
        },
      ];
      const { data } = await supabase.rpc('all_items', { user_id: user?.id });
      data?.forEach((item) => {
        if (editedSelectedProject) {
          if (item.project_id == editedSelectedProject) {
            groupedItems[groupIndexMap[item.type]].items.push(item);
          }
        } else {
          groupedItems[groupIndexMap[item.type]].items.push(item);
        }
      });
      setEditedGroup(groupedItems);
    };
    getData();
  }, [editedSelectedProject]);

  const groupedItemTemplate = (option: any) => {
    if (option.items.length > 0) {
      return <div>{option.label}</div>;
    } else {
      return (
        <div>
          {option.label}
          <br />
          <NotFoundItem>- No {option.label} Found</NotFoundItem>
        </div>
      );
    }
  };

  const itemTemplate = (option: any) => {
    const item = rawGroupData.filter((item) => item.id == option.connected_id);
    if (item.length > 0) {
      return <div>{item[0].title}</div>;
    }
    return <div></div>;
  };

  const newItemTemplate = (option: any) => {
    return <div>{option.title}</div>;
  };

  const header = () => {
    return (
      <div>
        <Steps enabled={onboarding} steps={steps} initialStep={0} onExit={onExit} />
        <CustomPanel
          toggleable
          collapsed={panelCollapsed}
          onToggle={(e) => setPanelCollapsed(e.value)}
          header={
            <HeaderContainer>
              <HeaderButtonNewTask
                label="New Task"
                icon={`pi ${panelCollapsed ? 'pi-plus' : 'pi-minus'}`}
                className="onboardingAddNewTask"
                onClick={() => setPanelCollapsed(!panelCollapsed)}
              />
              <RightPanel>
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
              </RightPanel>
            </HeaderContainer>
          }>
          <FormContainer>
            <RowOne>
              <InputText
                style={{ width: '12rem', height: '40px' }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="taskTitle"
                placeholder="Title"
              />
              <Dropdown
                showClear
                style={{ width: '10rem', textAlign: 'left', height: '40px' }}
                id="statusDropdown"
                value={status}
                options={[
                  { label: 'Todo', value: 'Todo' },
                  { label: 'In Progress', value: 'In Progress' },
                  { label: 'Done', value: 'Done' },
                ]}
                onChange={(e) => setStatus(e.value)}
                optionLabel="label"
                placeholder="No Status"
              />
              <Dropdown
                showClear
                style={{ width: '10rem', textAlign: 'left', height: '40px' }}
                id="priorityDropdown"
                value={priority}
                options={[
                  { label: 'P1', value: 'P1' },
                  { label: 'P2', value: 'P2' },
                  { label: 'P3', value: 'P3' },
                  { label: 'P4', value: 'P4' },
                ]}
                onChange={(e) => setPriority(e.value)}
                optionLabel="label"
                placeholder="No Priority"
              />
              <Calendar
                showButtonBar
                style={{ width: '12rem', height: '40px' }}
                id="taskCalendar"
                value={date}
                onChange={(e) => setDate(e.value)}
                showTime
                hourFormat="12"
                placeholder="No Due Date"
              />
            </RowOne>
            <RowTwo>
              <Dropdown
                showClear
                style={{ width: '10rem', height: '40px' }}
                id="projectDropdown"
                value={selectedProject}
                options={projects}
                onChange={(e) => {
                  let newProject = e.value;
                  if (e.value === 0) newProject = true;
                  if (newProject) {
                    setSelectedProject(e.value);
                  } else {
                    setSelectedProject();
                    setNewSelectedGroup();
                  }
                }}
                placeholder="No Project"
                optionLabel="name"
                optionValue="id"
              />
              {group.length > 0 && (
                <Dropdown
                  disabled={selectedProject == 0}
                  style={{ width: '15rem', height: '40px' }}
                  value={newSelectedGroup}
                  className="itemEditor"
                  options={group}
                  onChange={(e) => {
                    if (e.value) {
                      const project = projects.filter(
                        (project) => project.id == e.value.project_id,
                      );
                      setSelectedProject(project[0].id);
                      setNewSelectedGroup(e.value);
                    } else {
                      setSelectedProject();
                      setNewSelectedGroup();
                    }
                  }}
                  placeholder="Connected Item"
                  filter
                  filterBy="title"
                  showClear
                  optionLabel="title"
                  optionGroupLabel="label"
                  optionGroupChildren="items"
                  optionGroupTemplate={groupedItemTemplate}
                  itemTemplate={newItemTemplate}
                />
              )}

              <InputMask
                style={{ width: '10rem', height: '40px' }}
                mask="99:99:99"
                value={time}
                onChange={(e) => setTime(e.value)}
                placeholder="Total Time Taken"
              />
              <Button
                label="Add Task"
                icon="pi pi-check"
                onClick={() => addNewTodo()}
                autoFocus
                className="p-button-success p-button-sm"
                style={{ whiteSpace: 'nowrap' }}
              />
            </RowTwo>
          </FormContainer>
        </CustomPanel>
      </div>
    );
  };

  return (
    <Layout>
      <TaskNavBar />
      <TasksBottomMobileNavBar />
      <Toast ref={toast} />
      <Container>
        <SubContainer>
          <PageHeader>Tasks</PageHeader>
          <CustomDataTable
            size="small"
            showGridlines
            resizableColumns
            columnResizeMode="fit"
            stripedRows
            ref={dt}
            selection={selectedTasks}
            selectionMode="checkbox"
            onSelectionChange={(e) => setSelectedTasks(e.value)}
            globalFilter={globalFilter}
            header={header}
            editMode="row"
            onRowEditComplete={onRowEditComplete}
            onRowEditInit={onRowEditInit}
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            filters={filters1}
            filterDisplay="menu"
            globalFilterFields={['title', 'priority', 'date', 'project', 'time', 'status']}
            value={data}
            responsiveLayout="scroll"
            rowExpansionTemplate={rowExpansionTemplate}
            removableSort
            stateStorage="local"
            stateKey="tasks-local"
            emptyMessage="No tasks found.">
            <Column selectionMode="multiple" headerStyle={{ width: '1em' }}></Column>
            <Column expander style={{ width: '1em' }} />
            <Column
              rowEditor
              headerStyle={{ width: '3rem' }}
              bodyStyle={{ textAlign: 'center' }}></Column>
            <Column
              field="title"
              header="Title"
              sortable
              editor={(options) => rowEditor(options)}
              filter
              filterPlaceholder="Search by title"
              filterField="title"></Column>
            <Column
              field="status"
              header="Status"
              style={{ width: '7rem' }}
              sortable
              editor={(options) => rowEditor(options)}
              body={statusBodyTemplate}
              filter
              filterPlaceholder="Search by status"
              filterField="status"
              filterElement={statusFilterTemplate}
            />
            <Column
              field="priority"
              header="Priority"
              style={{ width: '7rem' }}
              sortable
              editor={(options) => rowEditor(options)}
              body={priorityBodyTemplate}
              filter
              filterPlaceholder="Search by priority"
              filterField="priority"
              filterElement={priorityFilterTemplate}
            />
            <Column
              field="date"
              header="Date"
              style={{ width: '10rem' }}
              sortable
              editor={(options) => rowEditor(options)}
              body={dateBodyTemplate}
              sortField="date.date"
              filter
              filterPlaceholder="Search by date"
              filterField="date"></Column>
            <Column
              field="project"
              header="Project"
              sortable
              style={{ width: '15rem' }}
              editor={(options) => rowEditor(options)}
              body={projectBodyTemplate}
              filter
              filterPlaceholder="Search by project"
              showFilterMatchModes={false}
              filterElement={projectFilterTemplate}></Column>
            <Column
              field="connected_id"
              header="Item"
              sortable
              style={{ width: '15rem' }}
              editor={(options) => rowEditor(options)}
              body={itemTemplate}></Column>
            <Column
              field="time"
              header="Time"
              style={{ width: '5rem' }}
              sortable
              editor={(options) => rowEditor(options)}
              filter
              filterPlaceholder="Search by time"
              filterField="time"></Column>
            <Column body={actionBodyTemplate} headerStyle={{ width: '10rem' }}></Column>
          </CustomDataTable>
        </SubContainer>
      </Container>
    </Layout>
  );
}
