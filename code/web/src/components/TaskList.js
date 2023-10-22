import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import apiService from "../services/api-service";

const displayDateFormater = (params) => {
    return (new Date(params.value)).toLocaleString();
}

const getTasks = (user, statusFilter, callback) => {
    return apiService.getTasks(user.jwt)
    .then(results => {
        if (statusFilter !== 'ALL') {
            callback(results.data.tasks.filter(rec => rec.status === statusFilter));

        } else {
            callback(results.data.tasks);
        }
    })
    .catch(err => {
        console.dir(err);
        callback(null, err);
    });
};

const TaskList = ({ taskCommandHandler, currentUser }) => {

    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('ALL');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getTasks(currentUser, filter, (tasks, err) => {
            if (err) {
                setErrorMessage('Error loading tasks. Please see console for details.');
            }
            if (tasks) {
                setTasks(tasks);
            }
        });
    }, [currentUser, filter]);

    const onEditTask = (task) => {
        taskCommandHandler({ command: 'edit', task: task });
    }

    const onDeleteTask = (task) => {
        apiService.deleteTask(currentUser.jwt, task.id)
            .then(results => {
                console.dir(results);
                getTasks(currentUser, filter, (tasks) => {
                    if (tasks) {
                        setTasks(tasks);
                    }
                });
            })
            .catch(err => {
                console.dir(err);
                setErrorMessage('Error deleting task. Please see console for details.');
            });        
    }

    const colDefs = [
        { headerName: 'ID',  field: 'id', cellDataType: 'number', maxWidth: 75, resizable: true },
        { headerName: 'Priority', field: 'priority', cellDataType: 'number', maxWidth: 100, resizable: true },
        { headerName: 'Status', field: 'status', maxWidth: 100, resizable: true },
        { headerName: 'Due Date', field: 'due_date', valueFormatter: displayDateFormater, minWidth: 115, resizable: true },
        { headerName: 'Title', field: 'title', minWidth: 125, resizable: true },
        { headerName: 'description', field: 'description', minWidth: 100, resizable: true },
        { headerName: 'Updated', field: 'updated_at', valueFormatter: displayDateFormater, minWidth: 100, resizable: true },
        { headerName: 'Created', field: 'created_at', valueFormatter: displayDateFormater, minWidth: 100, resizable: true },
        { headerName: '',
            cellRenderer: props =>
                <>
                    <button onClick={ () => props.editButtonClick(props.data) }>{props.editButtonText}</button>
                    <button onClick={ () => props.deleteButtonClick(props.data) }>{props.deleteButtonText}</button>
                </>,
            cellRendererParams: { editButtonText: 'Edit', editButtonClick: onEditTask, deleteButtonText: 'Delete', deleteButtonClick: onDeleteTask }, minWidth: 75, resizable: true }
    ];

    const onAddTask = () => {
        console.log('Add new task');
        taskCommandHandler({ command: 'add', task: null })
    }

    const onFilterChange = (e) => {
        console.log(`${e.target.name} ${e.target.type} ${e.target.value}`)
        setFilter(e.target.value);
    }

    return (
        <div>
            <h2>Task List</h2>
            <div className="ag-theme-alpine" style={ { height: 400 } }>
                <div className="filter-div">
                    <label>Options Filter</label>
                    <div><input type="radio" name="filter" value="ALL" checked={filter === 'ALL'} onChange={onFilterChange} /> <label>ALL</label></div>
                    <div><input type="radio" name="filter" value="OPEN" checked={filter === 'OPEN'} onChange={onFilterChange} /> <label>OPEN</label></div>
                    <div><input type="radio" name="filter" value="CLOSED" checked={filter === 'CLOSED'} onChange={onFilterChange} /> <label>CLOSED</label></div>
                </div>
                
                <AgGridReact
                    rowData={tasks}
                    defaultColDef={{ sortable: true }}
                    columnDefs={colDefs}>
                </ AgGridReact>
                <div className="inline-container">
                    <button onClick={onAddTask}>Add Task</button>
                    <label className="error">{errorMessage}</label>
                </div>
            </div>
        </div>
    );
};
 
export default TaskList;