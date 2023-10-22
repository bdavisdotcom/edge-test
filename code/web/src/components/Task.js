import { useState } from 'react';
import TaskList from "./TaskList";
import TaskEdit from './TaskEdit';


const Task = ({ currentUser }) => {

    const [taskMode, setTaskMode] = useState("list");
    const [task, setTask] = useState(null);

    const onTaskCommand = ({ command, task }) => {
        switch(command) {
            case 'list':
                setTask(null);
                setTaskMode(command);
                break;
            case 'edit':
                setTask(task);
                setTaskMode(command);
                break;
            case 'add':
                setTask(null);
                setTaskMode('add');
                break;
            default:
                setTask(null);
                setTaskMode('list');
        }
    };

    return (
        <>
            { taskMode === 'list' && <TaskList taskCommandHandler={onTaskCommand} currentUser={currentUser} /> }
            { taskMode === 'edit' && <TaskEdit taskCommandHandler={onTaskCommand} currentUser={currentUser} task={task} /> }
            { taskMode === 'add' && <TaskEdit taskCommandHandler={onTaskCommand} currentUser={currentUser} task={null} /> }
        </>
    );
}
 
export default Task;