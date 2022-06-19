import useTaskStore from '@app/stores/tasksv2Store';
import React, { useEffect, useState, useRef } from 'react';
import {
  CustomDataTable,
  Badge,
  ButtonContainer,
  TaskButton,
  TaskButtonTrash,
  DateContainer,
  OverdueIcon,
  FormContainer,
  EditButton,
  FormFieldContainer,
  EditContainer,
  FolderIcon,
  HeaderButtonNewTask,
} from './styles';
import { Column } from 'primereact/column';
import { format, isDate, isAfter } from 'date-fns';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { useProjectStore } from '@app/stores/projectStore';
import TaskEditor from '@app/components/TasksV2/Editor/TaskEditor';
import { Dialog } from 'primereact/dialog';
import { supabase } from '@app/supabase/index';

export default function TaskView(props: any) {
  const user = supabase.auth.user();
  const { todos, addTodo, removeTodo, patchTodo, completeTodo } = useTaskStore((state) => ({
    todos: state.todos,
    addTodo: state.addTodo,
    removeTodo: state.removeTodo,
    patchTodo: state.patchTodo,
    completeTodo: state.completeTodo,
  }));
  const projects = useProjectStore((state: any) => state.projects);
  const [data, setData] = useState();
  const [dropdownProjects, setDropdownProjects] = useState([]);
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [rowData, setRowData] = useState('');
  const [expandedRows, setExpandedRows] = useState(null);

  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState();
  const [priority, setPriority] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const [date, setDate] = useState('');

  const [group, setGroup] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [selectedGroup, setSelectedGroup] = useState('');

  const [newVisible, setNewVisible] = useState(false);
  const [newTime, setNewTime] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newStatus, setNewStatus] = useState();
  const [newPriority, setNewPriority] = useState();
  const [newSelectedProject, setNewSelectedProject] = useState();
  const [newDate, setNewDate] = useState('');
  const [newSelectedGroup, setNewSelectedGroup] = useState('');
  const [rawData, setRawData] = useState([]);

  const addNewTodo = async () => {
    addTodo(
      newTitle,
      newPriority,
      newDate.toString(),
      newSelectedProject,
      newTime,
      newStatus,
      undefined,
      undefined,
      newSelectedGroup.id,
    );
    toast.current.show({ severity: 'success', summary: 'Task Added', detail: '', life: 3000 });
    setTime('');
    setTitle('');
    setPriority(undefined);
    setStatus(undefined);
    setSelectedProject(undefined);
    setDate('');
  };

  const filterToItem = (data) => {
    const filteredTasks = data.filter((task) => task.connected_id === props.connectedId);
    setData(filteredTasks);
  };

  useEffect(() => {
    const getData = async () => {
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
      setRawData(data);
      const currentItem = data.filter((item) => item.id === props.connectedId);
      setCurrentItem(currentItem[0]);
      data?.forEach((item) => {
        groupedItems[groupIndexMap[item.type]].items.push(item);
      });
      setGroup(groupedItems);
    };
    getData();
  }, []);

  const groupedItemTemplate = (option: any) => {
    return <div>{option.label}</div>;
  };

  const itemTemplate = (option: any) => {
    return <div>{option.title}</div>;
  };

  useEffect(() => {
    filterToItem(todos);
  }, [todos]);

  useEffect(() => {
    filterToItem(todos);
  }, []);

  useEffect(() => {
    const tempProjects = projects;
    const personalProject = tempProjects.filter((project) => project.name === 'Personal');
    if (personalProject.length < 1) {
      tempProjects.push({ name: 'Personal', id: 0 });
    }

    setDropdownProjects(tempProjects);
  }, []);

  const rowExpansionTemplate = (data) => {
    return <TaskEditor content={data.content} id={data.id} />;
  };

  const getFormattedDate = (newDate) => {
    if (newDate) {
      if (isDate(newDate)) {
        return format(newDate, 'MM/dd/yy HH:mm');
      } else {
        return format(new Date(newDate), 'MM/dd/yy HH:mm');
      }
    }
  };

  const onHide = () => {
    setVisible(false);
    setRowData('');
  };

  const onNewHide = () => {
    setNewVisible(false);
  };

  const completeTodoHandler = (id) => {
    completeTodo(id);
    toast.current.show({ severity: 'success', summary: 'Task Completed', detail: '', life: 3000 });
  };

  const removeTodoHandler = (id) => {
    removeTodo(id);
    toast.current.show({ severity: 'info', summary: 'Task Deleted', detail: '', life: 3000 });
  };

  const statusBodyTemplate = (option) => {
    const status = option.status === 'In Progress' ? 'InProgress' : option.status;
    return <Badge className={`${status}Container`}>{option.status}</Badge>;
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
        <TaskButton
          icon="pi pi-check"
          onClick={(e) => {
            completeTodoHandler(data.id);
          }}
        />
      </ButtonContainer>
    );
  };

  const infoBodyTemplate = (data) => {
    const project = dropdownProjects.filter((project) => project.id === data.project);
    return (
      <FolderIcon
        className="pi pi-folder-open"
        onClick={() => {
          setRowData(data);
          setTime(data.time);
          setTitle(data.title);
          setPriority(data.priority);
          setSelectedProject(project[0].id);
          setStatus(data.status);
          setDate(new Date(data.date));
          setSelectedGroup(currentItem);
          setVisible(true);
        }}
      />
    );
  };

  const dateBodyTemplate = (data) => {
    const overdue = isAfter(new Date(), new Date(data.date));
    return (
      <DateContainer>
        {data.date && (
          <>
            {overdue ? <OverdueIcon className="pi pi-clock" /> : null} {getFormattedDate(data.date)}
          </>
        )}
      </DateContainer>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      <HeaderButtonNewTask
        label="New Task"
        icon={`pi pi-plus`}
        onClick={() => {
          setNewSelectedGroup(currentItem);
          setNewVisible(true);
        }}
      />
      <CustomDataTable
        showGridlines
        stripedRows
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        value={data}
        responsiveLayout="scroll"
        rowExpansionTemplate={rowExpansionTemplate}
        removableSort
        emptyMessage="No tasks found.">
        <Column expander style={{ width: '1em' }} />
        <Column field="title" header="Title" sortable></Column>
        <Column
          field="status"
          header="Status"
          style={{ width: '8rem' }}
          sortable
          body={statusBodyTemplate}
        />
        <Column
          field="date"
          header="Date"
          sortable
          style={{ width: '8rem' }}
          body={dateBodyTemplate}></Column>
        <Column body={actionBodyTemplate} headerStyle={{ width: '1rem' }}></Column>
        <Column body={infoBodyTemplate} headerStyle={{ width: '1rem' }}></Column>
      </CustomDataTable>
      <Dialog
        header={rowData.title}
        visible={visible}
        style={{ width: '40vw' }}
        modal
        onHide={onHide}>
        <FormContainer>
          <FormFieldContainer>
            <div>
              <InputText
                style={{ width: '10rem', marginBottom: '1rem' }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="taskTitle"
                placeholder="Title"
              />
              <Dropdown
                showClear
                style={{ width: '10rem', textAlign: 'left' }}
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
            </div>
            <div>
              <Dropdown
                showClear
                style={{ width: '10rem', textAlign: 'left', marginBottom: '1rem' }}
                id="priorityDropdown"
                value={priority}
                options={[
                  { label: 'Urgent', value: 'Urgent' },
                  { label: 'High', value: 'High' },
                  { label: 'Medium', value: 'Medium' },
                  { label: 'Low', value: 'Low' },
                ]}
                onChange={(e) => setPriority(e.value)}
                optionLabel="label"
                placeholder="No Priority"
              />
              <Calendar
                showButtonBar
                style={{ width: '10rem' }}
                id="taskCalendar"
                value={date}
                onChange={(e) => setDate(e.value)}
                showTime
                hourFormat="12"
                placeholder="No Due Date"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* <Dropdown
                showClear
                style={{ width: '10rem', marginBottom: '1rem' }}
                id="projectDropdown"
                value={selectedProject}
                options={dropdownProjects}
                onChange={(e) => setSelectedProject(e.value)}
                placeholder="No Project"
                optionLabel="name"
                optionValue="id"
              /> */}
              <InputMask
                style={{ width: '10rem' }}
                mask="99:99:99"
                value={time}
                onChange={(e) => setTime(e.value)}
                placeholder="Total Time Taken"
              />
            </div>
          </FormFieldContainer>
          <EditContainer>
            {group.length > 0 && (
              <Dropdown
                style={{ width: '15rem' }}
                value={selectedGroup}
                options={group}
                onChange={(e) => setSelectedGroup(e.value)}
                placeholder="Connected Item"
                filter
                filterBy="title"
                showClear
                optionLabel="title"
                optionGroupLabel="label"
                optionGroupChildren="items"
                optionGroupTemplate={groupedItemTemplate}
                itemTemplate={itemTemplate}
              />
            )}
            <EditButton
              label="Edit Task"
              icon="pi pi-check"
              onClick={async () => {
                let projectId = selectedProject;
                if (selectedGroup.id) {
                  const project = rawData.filter((group) => group.id === selectedGroup.id);
                  projectId = parseInt(project[0].project_id);
                }
                await patchTodo(
                  rowData.id,
                  title,
                  priority,
                  date.toString(),
                  projectId,
                  time,
                  status,
                  rowData.content,
                  selectedGroup.id || props.selectedId,
                );
                setVisible(false);
              }}
              autoFocus
              className=" p-button-sm"
            />
          </EditContainer>
        </FormContainer>
      </Dialog>
      <Dialog
        header="New Task"
        visible={newVisible}
        style={{ width: '40vw' }}
        modal
        onHide={onNewHide}>
        <FormContainer>
          <FormFieldContainer>
            <div>
              <InputText
                style={{ width: '10rem', marginBottom: '1rem' }}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                id="taskTitle"
                placeholder="Title"
              />
              <Dropdown
                showClear
                style={{ width: '10rem', textAlign: 'left' }}
                id="statusDropdown"
                value={newStatus}
                options={[
                  { label: 'Todo', value: 'Todo' },
                  { label: 'In Progress', value: 'In Progress' },
                  { label: 'Done', value: 'Done' },
                ]}
                onChange={(e) => setNewStatus(e.value)}
                optionLabel="label"
                placeholder="No Status"
              />
            </div>
            <div>
              <Dropdown
                showClear
                style={{ width: '10rem', textAlign: 'left', marginBottom: '1rem' }}
                id="priorityDropdown"
                value={newPriority}
                options={[
                  { label: 'Urgent', value: 'Urgent' },
                  { label: 'High', value: 'High' },
                  { label: 'Medium', value: 'Medium' },
                  { label: 'Low', value: 'Low' },
                ]}
                onChange={(e) => setNewPriority(e.value)}
                optionLabel="label"
                placeholder="No Priority"
              />
              <Calendar
                showButtonBar
                style={{ width: '10rem' }}
                id="taskCalendar"
                value={newDate}
                onChange={(e) => setNewDate(e.value)}
                showTime
                hourFormat="12"
                placeholder="No Due Date"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Dropdown
                showClear
                style={{ width: '10rem', marginBottom: '1rem' }}
                id="projectDropdown"
                value={newSelectedProject}
                options={dropdownProjects}
                onChange={(e) => setNewSelectedProject(e.value)}
                placeholder="No Project"
                optionLabel="name"
                optionValue="id"
              />
              <InputMask
                style={{ width: '10rem' }}
                mask="99:99:99"
                value={newTime}
                onChange={(e) => setNewTime(e.value)}
                placeholder="Total Time Taken"
              />
            </div>
          </FormFieldContainer>
          <EditContainer>
            {group.length > 0 && (
              <Dropdown
                style={{ width: '15rem' }}
                value={newSelectedGroup}
                options={group}
                onChange={(e) => setNewSelectedProject(e.value)}
                placeholder="Connected Item"
                filter
                filterBy="title"
                showClear
                optionLabel="title"
                optionGroupLabel="label"
                optionGroupChildren="items"
                optionGroupTemplate={groupedItemTemplate}
                itemTemplate={itemTemplate}
              />
            )}
            <EditButton
              label="Add Task"
              icon="pi pi-plus"
              onClick={async () => {
                await addNewTodo();
                setNewVisible(false);
              }}
              autoFocus
              className=" p-button-sm"
            />
          </EditContainer>
        </FormContainer>
      </Dialog>
    </div>
  );
}