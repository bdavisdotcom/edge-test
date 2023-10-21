import { useState } from 'react';
import moment from 'moment';

const getEmptyTask = () => {
    return {
        priority: 1,
        title: '',
        description: '',
        due_date: moment().add(1, 'M').toDate(),
        status: 'OPEN'
    };
};

const formatDueDate = (timestamp) => {
    if (!timestamp) {
        const cur = new Date();
        return new Date(cur.setMonth(cur.getMonth()+1));
    }
    return new Date(timestamp);
};

const TaskEdit = ({ taskCommandHandler, currentUser, task }) => {
    const initDate = (task !== null) ? formatDueDate(task.due_date) : formatDueDate(null);
    const [currentTask, setCurrentTask] = useState(task || getEmptyTask());
    const [dueDate, setDueDate] = useState(initDate);

    const onTaskChange = (e) => {
        const field = e.target.name;
        const updatedTask = { ...task };

        switch(e.target.type) {
            case 'date':
                const updatedDate = new Date(e.target.value);
                updatedTask[field] = updatedDate.getTime();
                setDueDate(updatedDate);
            break;
            default:
                updatedTask[field] = e.target.value;
        }

        console.log(`field changed ${field}`);
        console.dir(updatedTask);

        setCurrentTask(updatedTask);
    };

    const onSubmit = () => {
        console.log("Task onSubmit");
    };

    const onCancel = () => {
        console.log("Task onCancel");
        taskCommandHandler({ command: "cancel", taskId: null });
    }

    return (
        <>
            <div className="task">
                <h2>Task Edit</h2>
            </div>
            <div>
                {
                    task && task.id !== null &&
                    <div>
                        <label>ID</label>
                        <label>{task.id}</label>
                    </div>
                }
                <div>
                    <label>Priority</label>
                    <input type="text" name="priority" value={currentTask.priority} onChange={onTaskChange} />
                </div>
                <div>
                    <label>Status</label>
                    <select name="status" value={currentTask.status} onChange={onTaskChange}>
                        <option value="OPEN">OPEN</option>
                        <option value="CLOSED">CLOSED</option>
                    </select>
                </div>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={currentTask.title} onChange={onTaskChange} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea rows={4} name="description" value={currentTask.description} onChange={onTaskChange} />
                </div>
                <div>
                    <label>Due Date</label>
                    <input type="date" name="due_date" value={dueDate.toISOString().split('T')[0]} onChange={onTaskChange} />
                </div>
                {
                    task && task.id !== null &&
                    <>
                        <div>
                            <label>Last Updated</label>
                            <label>{(new Date(currentTask.updated_at)).toISOString().split('T')[0]}</label>
                        </div>
                        <div>
                            <label>Created</label>
                            <label>{(new Date(currentTask.created_at)).toISOString().split('T')[0]}</label>
                        </div>
                    </>
                }
            </div>
            <div>
                <button onClick={onSubmit}>Submit</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </>
    );
}

export default TaskEdit;
