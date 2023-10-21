import { useEffect, useState } from "react";
import apiService from "../services/api-service";

const TaskList = ({ taskCommandHandler, currentUser }) => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        apiService.getTasks(currentUser.jwt)
            .then(results => {
                console.dir(results.data.tasks);
                setTasks(results.data.tasks);
            })
            .catch(err => {
                console.dir(err);
            });
    }, [currentUser]);

    const onEditTask = (task) => {
        taskCommandHandler({ command: 'edit', task: task });
    }

    const onAddTask = () => {
        console.log('Add new task');
        taskCommandHandler({ command: 'add', task: null })
    }

    return (
        <div>
            <h2>Task List</h2>
            <div className="list">
                {tasks.map( task => <div>
                    {task.id} - {task.priority} - {task.status} - {task.title} - {task.description} - {(new Date(parseInt(task.due_date, 10))).toLocaleDateString()} - {(new Date(parseInt(task.created_at, 10))).toLocaleDateString()} <button onClick={() => onEditTask(task)}>Edit</button>
                </div>)}
            </div>
            <div>
                <button onClick={onAddTask}>Add Task</button>
            </div>
        </div>
    );
};
 
export default TaskList;