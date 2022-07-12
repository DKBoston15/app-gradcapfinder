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
  NotFoundItem,
} from './styles';
import { Column } from 'primereact/column';
import { format, isDate, isAfter } from 'date-fns';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useProjectStore } from '@app/stores/projectStore';
import TaskEditor from '@app/components/TasksV2/Editor/TaskEditor';
import { Dialog } from 'primereact/dialog';
import { supabase } from '@app/supabase/index';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TaskView(props: any) {
  const user = supabase.auth.user();
  const { todos, addTodo, removeTodo, patchTodo, completeTodo } = useTaskStore((state) => ({
    todos: state.todos,
    addTodo: state.addTodo,
    removeTodo: state.removeTodo,
    patchTodo: state.patchTodo,
    completeTodo: state.completeTodo,
  }));
  const { projectId, id } = useParams();
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
  const [newDate, setNewDate] = useState('');
  const [newSelectedGroup, setNewSelectedGroup] = useState('');
  const [rawData, setRawData] = useState([]);

  const addNewTodo = async () => {
    addTodo(
      newTitle,
      newPriority,
      newDate.toString(),
      projectId,
      newTime,
      newStatus,
      undefined,
      undefined,
      newSelectedGroup.id,
    );
    toast.current.show({ severity: 'success', summary: 'Task Added', detail: '', life: 3000 });
    setNewDate('');
    setNewTime('');
    setNewPriority(undefined);
    setNewStatus(undefined);
    setNewTitle('');
  };

  const filterToItem = (data) => {
    let filteredTasks = data.filter((task) => task.connected_id === id);
    filteredTasks = filteredTasks.filter((task) => !task.completed_at);
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
          label: 'Samplings',
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
      const currentItem = data.filter((item) => item.id === id);
      setCurrentItem(currentItem[0]);
      data?.forEach((item) => {
        if (item.project_id == projectId) {
          groupedItems[groupIndexMap[item.type]].items.push(item);
        }
      });
      setGroup(groupedItems);
    };
    getData();
  }, [id]);

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
    return <div>{option.title}</div>;
  };

  useEffect(() => {
    filterToItem(todos);
  }, [id, todos]);

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
    if (newDate && newDate != 'Invalid Date') {
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
    const project = dropdownProjects.filter((project) => project.id != data.project);
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
          if (data.date && data.date != 'Invalid Date') {
            setDate(new Date(data.date));
          }
          setSelectedGroup(currentItem);
          setVisible(true);
        }}
      />
    );
  };
  const dateBodyTemplate = (data) => {
    let overdue = false;
    if (data.date) {
      if (isDate(data.date)) {
        overdue = isAfter(new Date(), data.date);
      } else {
        overdue = isAfter(new Date(), new Date(data.date));
      }
    }

    const showIcon = data.date && data.status != 'Done';
    return (
      <>
        {data.date && (
          <DateContainer>
            {showIcon && (
              <>
                {overdue ? <OverdueIcon className="pi pi-clock" /> : null}
                {
                  <DatePicker
                    selected={isDate(new Date(data.date)) ? new Date(data.date) : null}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    disabled
                    id="datePicker"
                  />
                }
              </>
            )}
            {!showIcon && data.date}
          </DateContainer>
        )}
      </>
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
                  { label: 'P1', value: 'P1' },
                  { label: 'P2', value: 'P2' },
                  { label: 'P3', value: 'P3' },
                  { label: 'P4', value: 'P4' },
                ]}
                onChange={(e) => setPriority(e.value)}
                optionLabel="label"
                placeholder="No Priority"
              />
              <DatePicker
                selected={date}
                style={{ width: '10rem', textAlign: 'left', height: '40px' }}
                onChange={(date) => setDate(date)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                id="newDatePicker"
                placeholderText="Due Date"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <InputText
                style={{ width: '10rem' }}
                value={time}
                onChange={(e) => setTime(e.target.value)}
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
                  { label: 'P1', value: 'P1' },
                  { label: 'P2', value: 'P2' },
                  { label: 'P3', value: 'P3' },
                  { label: 'P4', value: 'P4' },
                ]}
                onChange={(e) => setNewPriority(e.value)}
                optionLabel="label"
                placeholder="No Priority"
              />
              <DatePicker
                selected={newDate}
                style={{ width: '10rem', textAlign: 'left', height: '40px' }}
                onChange={(date) => setNewDate(date)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                id="newDatePicker"
                placeholderText="Due Date"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <InputText
                style={{ width: '10rem' }}
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
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
                onChange={(e) => setNewSelectedGroup(e.value)}
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
