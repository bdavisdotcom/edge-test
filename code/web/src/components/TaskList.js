import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import apiService from "../services/api-service";

const displayDateFormater = (params) => {
    return (new Date(params.value)).toISOString();
}
const TaskList = ({ taskCommandHandler, currentUser }) => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        apiService.getTasks(currentUser.jwt)
            .then(results => {
                setTasks(results.data.tasks);
            })
            .catch(err => {
                console.dir(err);
            });
    }, [currentUser]);

    const onEditTask = (task) => {
        taskCommandHandler({ command: 'edit', task: task });
    }

    const colDefs = [
        { headerName: 'ID',  field: 'id', cellDataType: 'number', maxWidth: 50, resizable: true },
        { headerName: 'Priority', field: 'priority', cellDataType: 'number', maxWidth: 80, resizable: true },
        { headerName: 'Status', field: 'status', maxWidth: 100, resizable: true },
        { headerName: 'Due Date', field: 'due_date', valueFormatter: displayDateFormater, minWidth: 115, resizable: true },
        { headerName: 'Title', field: 'title', minWidth: 125, resizable: true },
        { headerName: 'description', field: 'description', minWidth: 100, resizable: true },
        { headerName: 'Updated', field: 'updated_at', valueFormatter: displayDateFormater, minWidth: 100, resizable: true },
        { headerName: 'Created', field: 'created_at', valueFormatter: displayDateFormater, minWidth: 100, resizable: true },
        { headerName: '',
            cellRenderer: props => <button onClick={ () => props.buttonClick(props.data) }>{props.buttonText}</button>,
            cellRendererParams: { buttonText: 'Edit', buttonClick: onEditTask }, maxWidth: 75, resizable: true }
    ];

    const onAddTask = () => {
        console.log('Add new task');
        taskCommandHandler({ command: 'add', task: null })
    }

    return (
        <div>
            <h2>Task List</h2>
            <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
                <AgGridReact
                    rowData={tasks}
                    defaultColDef={{ sortable: true }}
                    columnDefs={colDefs}>
                </ AgGridReact>
            </div>
            <div>
                <button onClick={onAddTask}>Add Task</button>
            </div>
        </div>
    );
};
 
export default TaskList;