import { useEffect, useState } from "react";
import apiService from "../services/api-service";

const TaskList = ({ currentUser }) => {

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

    const onEditTask = (id) => {
        console.log(id);
    }

    return (
        <div>
            <h2>Task List</h2>
            <div className="list">
                {tasks.map( task => <div>
                    {task.priority} - {task.status} - {task.title} - {task.description} - {(new Date(parseInt(task.due_date, 10))).toLocaleDateString()} - {(new Date(parseInt(task.created_at, 10))).toLocaleDateString()} <button onClick={() => onEditTask(task.id)}>Edit</button>
                </div>)}
            </div>
        </div>
    );
};
 
export default TaskList;